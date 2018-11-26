import { dateOptions }  from '../constants';

class NewsContainer {
    constructor(newsContainer, newsList) {
        this.data = newsContainer;
        this.newsList = newsList;
    } 
        
    showNews = (articles) => {        
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
    
        this.data.innerHTML = '';
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
            this.data.appendChild(articleClone); 
        });        
        
        this.newsList.scrollTop = 0; 
    }
    
    switchLoadingIndication = () => {
        this.data.classList.toggle('loading');
    } 
}

export default NewsContainer;