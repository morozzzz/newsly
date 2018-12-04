import services from '../../services';

class NewsListController {
    constructor() {
        this.data = {};
    } 

    async getNews(criteria) {
        this.data = await services.makeRequest(criteria, 'GET');

        if(!this.data.totalResults) {
            const ErrorPopupModule = await import(/* webpackChunkName: "ErrorPopup" */ '../ErrorPopup');
            const ErrorPopup = ErrorPopupModule.default;
            ErrorPopup.show('There is no news is available');
        }
    }   
}

export default NewsListController;