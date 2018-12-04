import Observer from '../Observer';
import MainPageModel from './MainPage.Model';

class MainPageController {
    constructor() { 
        this.model = new MainPageModel();
        this.keyWordInput = document.getElementById('key-word');        
        this.newsBySourceButton = document.querySelector('.sources-button');
        this.getNewsButton = document.querySelector('.get-news');
        this.sourcesHumburger = document.querySelector('.sources-humb');
        this.optionsHumburger = document.querySelector('.options-humb');
    } 
    
    handleInput = (event) => {
        const text = event.target.value;
        
        this.model.update({ keyWord: text });  
    }

    handleGetNewsButton = () => {   
        Observer.notify('GET_AND_SHOW_NEWS', this.model.data)       
    }    

    handleNewsBySourceButton = () => {
        Observer.notify('SHOW_SOURCES_MODAL');
    }

   
    showOptions = () => {
        Observer.notify('SHOW_OPTIONS');
    }

    hideOptions = (event) => {       
        Observer.notify('HIDE_OPTIONS');
    }

    init = () => {
        Observer.subscribe('SET_COUNTRY', this.model.update);
        Observer.subscribe('SET_CATEGORY', this.model.update);

        this.getNewsButton.onclick = this.handleGetNewsButton;
        this.newsBySourceButton.onclick = this.handleNewsBySourceButton;
        this.sourcesHumburger.onclick = this.handleNewsBySourceButton;
        this.optionsHumburger.onclick = this.showOptions;
        this.keyWordInput.onchange = this.handleInput;
    }
}

export default MainPageController;