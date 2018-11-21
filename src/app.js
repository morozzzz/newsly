import '@babel/polyfill';
import './template';
import 'isomorphic-fetch';
import { countries, categories, apiKey, baseUrl, defaultLanguage, dateOptions }  from './constants';

const state = {
    category: '',
    country: '',
    keyWord: '',
    clicks: 0,    
};

const getData = ({ endPoint = 'top-headlines', category, country, source, keyWord }) => {
    let url;
    
    if(endPoint === 'sources') {
        url = `${baseUrl}/${endPoint}?apiKey=${apiKey}`;
    } else if (source) {
        url = `${baseUrl}/${endPoint}?sources=${source}&apiKey=${apiKey}`;
    } else {
        url = `${baseUrl}/${endPoint}?country=${country}&category=${category}&q=${keyWord}&language=${defaultLanguage}&apiKey=${apiKey}`;
    }   
     
    return new Promise((resolve, reject) => {
        
        fetch(url)
            .then((response) => response.json())
            .then((data) => {                
                data.status === 'ok' ? resolve(data) : reject(data.message);
            })
            .catch((message) => {
                throw Error(message);             
            })
            .finally(() => {
                if (state.clicks > 1) {
                    showCat();
                }
                state.clicks = 0;                
            });
    }); 
};

const showCat = () => {
    cat.classList.toggle('hidden-cat');
    setTimeout(() => {
        cat.classList.toggle('hidden-cat');        
    }, 1500);
};

const getSources = () => {       
    return getData({ endPoint: 'sources' });  
};

const fillSelector = (selector, data, templateId) => {
    const template = document.getElementById(templateId); 
    const templateContent = template.content; 
    const listItem = templateContent.querySelector('li');

    for(let item in data) {            
        listItem.textContent = item;
        listItem.id = data[item];
        const itemClone = document.importNode(templateContent, true);
        selector.appendChild(itemClone);        
    }
};

const handleSelectorItem = (event) => {
    const target = event.target;
    const classList = target && Array.from(target.classList);
    const itemType = classList && classList.find((item) => {
        return item.includes('selector-item');
    });
      
    if(itemType) {        
        const itemText = target.innerHTML;
        const itemId = target.id;

        switch(itemType) {
        case 'country-selector-item':
            if(itemId === 'unselected-country' ) {
                countrySelectorLabel.innerHTML = 'Select Country';
                state.country = ''; 
            } else {
                countrySelectorLabel.innerHTML = itemText;
                state.country = itemId;                 
            }                       
            break;                
        case 'category-selector-item':   
            if(itemId === 'unselected-category' ) {
                categorySelectorLabel.innerHTML = 'Select Category';
                state.category = ''; 
            } else {
                categorySelectorLabel.innerHTML = itemText;
                state.category = itemId;                 
            }
            break;
        }           
    }        
};

const handleSelector = (event) => {
    const currentTarget = event.currentTarget;    
    let target = event.target;
    let isSelector;
    let selectorType;
   
    while(target !== currentTarget) {        
        if(target.classList.contains('option-list-container')) {
            isSelector = true;    
            selectorType = target.id;        
            break;
        }
        target = target.parentElement;
    }    

    if(isSelector && selectorType) {
        showList(selectorType);
    }  
};

const showList = selectorType => {
    switch(selectorType) {
    case 'categories':        
        categorySelector.classList.toggle('hidden');
        break;
                
    case 'countries':
        countrySelector.classList.toggle('hidden');
        break;
    }
};

const handleKeyWordInput = (event) => {
    const text = event.target.value;
    state.keyWord = text;    
};

const fillSourcesModal = (sources, sourcesModal) => {   
    const sourcesContainer = sourcesModal.querySelector('.sources-container');    
    const template = sourcesContainer.querySelector('#source-item-template'); 
    const templateContent = template.content; 
    const sourceItem = templateContent.querySelector('.source-item');

    sources.forEach((source) => {
        sourceItem.textContent = source.name;
        sourceItem.id = source.id;
        const itemClone = document.importNode(templateContent, true);
        sourcesContainer.appendChild(itemClone); 
    });
};

const showOrHideSourcesModal = () => {
    document.documentElement.scrollTop = 0;
    mainPage.classList.toggle('hidden');
    sourcesModal.classList.toggle('hidden');
    sourcesModal.scrollTop = 0;
};

const handleSourceItem = (event) => {
    const target = event.target;
   
    if(target.classList.contains('source-item')) {
        showOrHideSourcesModal();
        getAndShowNews({ source: target.id });    
    }   
};

const switchLoadingIndication = () => {
    newsContainer.classList.toggle('loading');
};

const showNews = articles => {
    const template = document.getElementById('article-template');
    const templateContent = template.content;
    const title = templateContent.querySelector('h2');
    const image = templateContent.querySelector('img');
    const description = templateContent.querySelector('.description');
    const author = templateContent.querySelector('.author');
    const date = templateContent.querySelector('.date');
    const link = templateContent.querySelector('.news-link');
    const authorContainer = templateContent.querySelector('.author-container');
    const dateContainer = templateContent.querySelector('.date-container');

    [image, authorContainer, dateContainer].forEach((node) => {
        const classList = node.classList;
        classList.contains('hidden') && classList.toggle('hidden');
    });

    newsContainer.innerHTML = '';
    articles.forEach((article) => {
        const urlToImage = article.urlToImage;
        const articleAuthor = article.author;
        const articleDate = article.publishedAt;      
        
        urlToImage === null ? image.classList.toggle('hidden') : image.src = urlToImage;
        articleAuthor === null ? authorContainer.classList.toggle('hidden') : author.textContent = articleAuthor;
        articleDate === null ? dateContainer.classList.toggle('hidden') : date.textContent = new Date(articleDate).toLocaleDateString('en-US', dateOptions);
        title.textContent = article.title;
        description.textContent = article.description;  
        link.href = article.url;

        const articleClone = document.importNode(templateContent, true);
        newsContainer.appendChild(articleClone); 
    });
    
    newslist.scrollTop = 0; 
};

const showOptions = () => {
    if(optionsContainer.classList.contains('visible')) {
        return;
    }

    optionsContainer.classList.add('visible');
    setTimeout(() => {
        document.body.addEventListener('click', hideOptions);
    }, 10);
};

const hideOptions = (event) => {
    let target = event.target; 
    const currentTarget = event.currentTarget;  

    while(target !== currentTarget) {
        const classList = target.classList;

        if(classList.contains('search-options')) {            
            return;
        } else if(classList.contains('get-news')) {
            break;            
        }
        target = target.parentNode;
    }
    optionsContainer.classList.remove('visible');
    document.body.removeEventListener('click', hideOptions);
};

const handleGetNewsButton = () => {    
    state.clicks++;
    getAndShowNews(state);
};

async function getAndShowNews(criteria) {           
    switchLoadingIndication();

    const data = await getData(criteria);
    
    showNews(data.articles);    
    switchLoadingIndication();
};

const mainPage = document.querySelector('#main-page');
const countrySelector = document.querySelector('.county-selector');
const categorySelector = document.querySelector('.category-selector');
const getNewsButton = document.querySelector('.get-news');
const optionsContainer = document.querySelector('.search-options');
const countrySelectorLabel = document.querySelector('.selected-country');
const categorySelectorLabel = document.querySelector('.selected-categoty');
const keyWordInput = document.getElementById('key-word');
const newsBySourceButton = document.querySelector('.sources-button');
const sourcesModal = document.querySelector('.sources-modal');
const sourcesModalCloseButton = document.querySelector('.close-modal-button');
const newsContainer = document.querySelector('.news-container');
const newslist = document.querySelector('.main-wrapper');
const optionsHumburger = document.querySelector('.options-humb');
const sourcesHumburger = document.querySelector('.sources-humb');
const cat = document.querySelector('.cat');
const surpriseContainer = document.querySelector('.surprise');

categorySelector.onclick = handleSelectorItem;
countrySelector.onclick = handleSelectorItem;
optionsContainer.onclick = handleSelector;
getNewsButton.onclick = handleGetNewsButton;
newsBySourceButton.onclick = showOrHideSourcesModal;
keyWordInput.onchange = handleKeyWordInput;
sourcesModalCloseButton.onclick = showOrHideSourcesModal;
sourcesModal.onclick = handleSourceItem;
sourcesHumburger.onclick = showOrHideSourcesModal;
optionsHumburger.onclick = showOptions;

fillSelector(countrySelector, countries, 'country-item-template');
fillSelector(categorySelector, categories, 'category-item-template');

getSources().then((data) => {
    fillSourcesModal(data.sources, sourcesModal);
}).catch((message) => {
    throw Error(message);
});

getAndShowNews(state);
