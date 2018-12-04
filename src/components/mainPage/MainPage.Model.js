import Observer from '../Observer';

class MainPageModel {
    constructor() {
        this.data = {
            category: '',
            country: '',
            keyWord: '',   
        };       
    }

    update = (newData) => {
        this.data = Object.assign(this.data, newData);
    }
}

export default MainPageModel;