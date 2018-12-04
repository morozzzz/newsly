import Observer from '../Observer';

class CountrySelectorModel {
    constructor() {        
        this.data = {};
        this.country = '';   
    }

    setData = (data) => {
        this.data = data;
        Observer.notify('COUNTRIES_UPDATED', this.data);
    }

    updateCountry = (data) => {
        this.country = data;
        Observer.notify('SET_COUNTRY', { country: this.country} );        
    }
}

export default CountrySelectorModel;
