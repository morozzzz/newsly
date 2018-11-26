import OptionsContainer from './OptionsContainer';
import SourcesModal from './SourcesModal';
import Button from './Button';
import Cat from './Cat';

import getData from '../services';

const optionsContainerElement = document.querySelector('.search-options');
const getNewsButtonElement = document.querySelector('.get-news');
const sourcesModalElement = document.querySelector('.sources-modal');
const newsBySourceButtonElement = document.querySelector('.sources-button');
const newsContainerElement = document.querySelector('.news-container');
const newslistElemtet = document.querySelector('.main-wrapper');
const optionsHumburgerElement = document.querySelector('.options-humb');
const sourcesHumburgerElement = document.querySelector('.sources-humb');
const catElement = document.querySelector('.cat');

class MainPage {
    constructor(page) {
        this.data = page;
        this.state = {
            category: '',
            country: '',
            keyWord: '',
            clicks: 0,    
        };
        this.optionsContainer = new OptionsContainer(optionsContainerElement, this.state);
        this.sourcesModal = new SourcesModal(sourcesModalElement, this.handleSourceItem, this.showOrHideSourcesModal);
        this.newsBySourceButton = new Button(newsBySourceButtonElement, this.showOrHideSourcesModal);
        this.getNewButton = new Button(getNewsButtonElement, this.handleGetNewsButton);
        this.sourcesHumburger = new Button(sourcesHumburgerElement, this.showOrHideSourcesModal);
        this.optionsHumburger = new Button(optionsHumburgerElement, this.showOptions);
        this.cat = new Cat(catElement, this.state);
        this.newsContainer = null;        
    }

    onLoad = () => {
        this.optionsContainer.onLoad();

        this.getSources().then((data) => {
            this.sourcesModal.fill(data.sources);
        }).catch((message) => {
            throw Error(message);
        });
    }

    handleGetNewsButton = () => {    
        this.state.clicks++;        
        this.getAndShowNews(this.state);
    }

    async getAndShowNews(criteria) {   
        await import(/* webpackChunkName: "NewsContainer" */ './NewsContainer')
        .then(module => {
            const NewsContainer = module.default;
            this.newsContainer = new NewsContainer(newsContainerElement, newslistElemtet);    
        })
        .catch((message) => {
            throw Error(message);
        });

        this.newsContainer.switchLoadingIndication();

        const data = await getData(criteria);
        this.cat.maybeShow();
        this.newsContainer.showNews(data.articles);    
        this.newsContainer.switchLoadingIndication();
    }

    handleSourceItem = (event) => {
        const target = event.target;
       
        if(target.classList.contains('source-item')) {
            this.showOrHideSourcesModal();
            this.getAndShowNews({ source: target.id });    
        }   
    }

    showOrHideSourcesModal = () => {
        document.documentElement.scrollTop = 0;
        this.data.classList.toggle('hidden');
        this.sourcesModal.data.classList.toggle('hidden');
        this.sourcesModal.data.scrollTop = 0;
    }

    getSources = () => {            
        return getData({ endPoint: 'sources' });  
    }

    showOptions = () => {
        if(this.optionsContainer.data.classList.contains('visible')) {
            return;
        }
    
        this.optionsContainer.data.classList.add('visible');
        setTimeout(() => {
            document.body.addEventListener('click', this.hideOptions);
        }, 10);
    }

    hideOptions = (event) => {
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
        this.optionsContainer.data.classList.remove('visible');
        document.body.removeEventListener('click', this.hideOptions);
    }
}

export default MainPage;