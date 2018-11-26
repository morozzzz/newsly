import Selector from './Selector';

class CountrySelector extends Selector {
    constructor(selector, selectorLabel, state) {
        super(selector, selectorLabel, state);
        this.data.onclick = this.handleItem.bind(this);                        
    }

    handleItem(event) {
        super.handleItem(event);
        if (this.itemType === 'country-selector-item') {
            if(this.itemId === 'unselected-country' ) {
                this.selectorLabel.innerHTML = 'Select Country';
                this.state.country = ''; 
            } else {
                this.selectorLabel.innerHTML = this.itemText;
                this.state.country = this.itemId;                 
            }    
        }
    }
}

export default CountrySelector;