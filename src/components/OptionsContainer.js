import CategorySelector from './CategorySelector';
import CountrySelector from './CountrySelector';
import KeyWordInput from './KeyWordInput';
import { countries, categories }  from '../constants';

const countrySelectorElement = document.querySelector('.county-selector');
const categorySelectorElement = document.querySelector('.category-selector');
const countrySelectorLabel = document.querySelector('.selected-country');
const categorySelectorLabel = document.querySelector('.selected-categoty');
const keyWordInputElement = document.getElementById('key-word');

class OptionsContainer {
    constructor(container, state) {
        this.data = container;
        this.data.onclick = this.handleSelector;        
        this.countrySelector = new CountrySelector(countrySelectorElement, countrySelectorLabel, state);
        this.categorySelector = new CategorySelector(categorySelectorElement, categorySelectorLabel, state);
        this.keyWordInput = new KeyWordInput(keyWordInputElement, state);
    }

    onLoad = () => {
        this.countrySelector.fill(countries, 'country-item-template');
        this.categorySelector.fill(categories, 'category-item-template');
    }

    handleSelector = (event) => {
        const currentTarget = event.currentTarget;    
        let target = event.target;
        let isSelector;
        let selectorType;
       
        while(target !== currentTarget) {        
            if(target.classList.contains('option-list-container')) {
                isSelector = true;    
                selectorType = target.id;        
                break;
            }
            target = target.parentElement;
        }    
    
        if(isSelector && selectorType) {
            this.showList(selectorType);
        }  
    }

    showList = (selectorType) => {
        switch(selectorType) {
        case 'categories':        
            this.categorySelector.data.classList.toggle('hidden');
            break;
                    
        case 'countries':
            this.countrySelector.data.classList.toggle('hidden');
            break;
        }
    }    
}

export default OptionsContainer;