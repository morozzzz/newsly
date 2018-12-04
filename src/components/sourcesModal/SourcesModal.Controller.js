import Observer from '../Observer';
import SourcesModalModel from './SourcesModal.Model';
import SourcesModalView from './SourcesModal.View';

class SourcesModalController {
    constructor() {
        this.model = new SourcesModalModel();
        this.view = new SourcesModalView();
    }  
    
    handleSourceItem = (event) => {
        const target = event.target;
       
        if(target.classList.contains('source-item')) {
            this.view.hide();

            Observer.notify('GET_AND_SHOW_NEWS', { source: target.id });  
        }   
    }
    
    init = () => {
        this.view.init();
        this.model.init();

        this.view.closeButton.onclick = this.view.hide;
        this.view.element.onclick = this.handleSourceItem;

        Observer.subscribe('SHOW_SOURCES_MODAL', this.view.show);
    }    
}

export default SourcesModalController;