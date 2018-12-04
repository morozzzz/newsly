import Observer from '../Observer';
import CountrySelectorView from './CountrySelector.View';
import CountrySelectorModel from './CountrySelector.Model';
import { countries }  from '../../constants';
import { handleSelector } from '../Selector.Helpers';

class CountrySelectorController {
    constructor() {
        this.model = new CountrySelectorModel();
        this.view = new CountrySelectorView();
    }    

    handleListItem = (event) => {        
        const target = event.target;
        const classList = target && target.classList;
        
        if(classList && classList.contains('country-selector-item')) { 
            const itemId = target.id;
            const itemType = 'country-selector-item';
            const itemText = target.innerHTML;

            if(itemId === 'unselected-country') {
                this.view.updateLabel('Select Country');
                this.model.updateCountry(''); 
            } else {
                this.view.updateLabel(itemText);
                this.model.updateCountry(itemId);
            }  
            
            this.view.hide();
        }               
    }

    init = () => {
        Observer.subscribe('COUNTRIES_UPDATED', this.view.fill);
        Observer.subscribe('SHOW_COUNTRIES', this.view.show);
        Observer.subscribe('HIDE_COUNTRIES', this.view.hide);        
        
        this.model.setData(countries);
        
        this.view.label.onclick = handleSelector;
        this.view.element.onclick = this.handleListItem;
    }
}

export default CountrySelectorController;