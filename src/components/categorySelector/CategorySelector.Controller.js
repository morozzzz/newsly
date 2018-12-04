import Observer from '../Observer';
import CategorySelectorView from './CategorySelector.View';
import CategorySelectorModel from './CategorySelector.Model';
import { categories }  from '../../constants';
import { handleSelector } from '../Selector.Helpers';

class CategorySelectorController {
    constructor() {
        this.model = new CategorySelectorModel();
        this.view = new CategorySelectorView();
    }    

    handleListItem = (event) => {        
        const target = event.target;
        const classList = target && target.classList;
        
        if(classList && classList.contains('category-selector-item')) { 
            const itemId = target.id;
            const itemType = 'category-selector-item';
            const itemText = target.innerHTML;

            if(itemId === 'unselected-category') {
                this.view.updateLabel('Select Category');
                this.model.updateCategory(''); 
            } else {
                this.view.updateLabel(itemText);
                this.model.updateCategory(itemId);
            }  
            
            this.view.hide();
        }               
    }

    init = () => {
        Observer.subscribe('CATEGORIES_UPDATED', this.view.fill);
        Observer.subscribe('SHOW_CATEGORIES', this.view.show);
        Observer.subscribe('HIDE_CATEGORIES', this.view.hide);        
        
        this.model.setData(categories);
        
        this.view.label.onclick = handleSelector;
        this.view.element.onclick = this.handleListItem;    
    }
}

export default CategorySelectorController;