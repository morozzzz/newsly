import { dateOptions }  from '../../constants';

class NewsListView {
    constructor(newsContainer, newsList) {
        this.element = document.querySelector('.news-container');
        this.container = document.querySelector('.main-wrapper');;
    } 
        
    show = ({ articles }) => {        
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
        
        this.reset();

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
            
            this.element.appendChild(articleClone); 
        });        
        
        this.container.scrollTop = 0; 
    }

    reset = () => {
        this.element.innerHTML = '';        
    }
    
    switchLoadingIndication = () => {
        this.element.classList.toggle('loading');
    } 
}

export default NewsListView;