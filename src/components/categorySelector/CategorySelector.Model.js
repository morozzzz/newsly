import Observer from '../Observer';

class CategorySelectorModel {
    constructor() {        
        this.data = {};
        this.category = '';   
    }

    setData = (data) => {
        this.data = data;
        Observer.notify('CATEGORIES_UPDATED', this.data);
    }

    updateCategory = (data) => {
        this.category = data; 
        Observer.notify('SET_CATEGORY', { category: this.category });        
    }
}

export default CategorySelectorModel;
