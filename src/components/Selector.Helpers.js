import Observer from './Observer';

function handleSelector(event) {
    const  selectorType = event.currentTarget.id;  
    
    if(selectorType === 'categories') {            
        Observer.notify('SHOW_CATEGORIES');
    } else if(selectorType === 'countries') {
        Observer.notify('SHOW_COUNTRIES');
    }
}

export {
    handleSelector,
};