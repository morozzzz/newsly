class OptionsContainerView {
    constructor() {
        this.element = document.querySelector('.search-options');
    } 
    
    show = () => {    
        this.element.classList.add('visible');
        setTimeout(() => {
            document.body.addEventListener('click', this.hideOptions);
        }, 10);
    }

    hide = (event) => {    
        this.element.classList.remove('visible');
        document.body.removeEventListener('click', this.hideOptions);
    } 
}

export default OptionsContainerView;