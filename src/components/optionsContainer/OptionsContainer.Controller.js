import Observer from '../Observer';
import OptionsContainerView from './OptionsContainer.View';

class OptionsContainerController {
    constructor() {
        this.view = new OptionsContainerView();
    } 
    
    onShow = () => {
        if(this.view.element.classList.contains('visible')) {
            return;
        }
    
        this.view.show();

        setTimeout(() => {
            document.body.addEventListener('click', this.onHide);
        }, 10);
    }

    onHide = (event) => {        
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
        
        this.view.hide();

        document.body.removeEventListener('click', this.onHide);
    }

    init = () => {
        Observer.subscribe('SHOW_OPTIONS', this.onShow);
        Observer.subscribe('HIDE_OPTIONS', this.onHide);
    }
}

export default OptionsContainerController;