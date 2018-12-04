import Observer from '../Observer';
import NewsListModel from './NewsList.Model';
import NewsListView from './NewsList.View';

class NewsListContainer {
    constructor() {
        this.model = new NewsListModel();
        this.view = new NewsListView();
    }

    async getAndShowNews(criteria) {
        this.view.switchLoadingIndication();

        await this.model.getNews(criteria)

        this.view.show(this.model.data);    
        this.view.switchLoadingIndication();
    }

    init = () => {
        Observer.subscribe('GET_AND_SHOW_NEWS', this.getAndShowNews.bind(this));        
    }
}

export default NewsListContainer;