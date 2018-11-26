import Selector from './Selector';

class CategorySelector extends Selector {
    constructor(selector, selectorLabel, state) {
        super(selector, selectorLabel, state);
        this.data.onclick = this.handleItem.bind(this);                
    }

    handleItem(event) {        
        super.handleItem(event);
        
        if (this.itemType === 'category-selector-item') {
            
            if(this.itemId === 'unselected-category') {
                this.selectorLabel.innerHTML = 'Select Category';
                this.state.category = ''; 
            } else {
                this.selectorLabel.innerHTML = this.itemText;
                this.state.category = this.itemId;                 
            }          
        }
    }
}

export default CategorySelector;
