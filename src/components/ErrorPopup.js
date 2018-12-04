class ErrorPopup{
    constructor() {        
        this.popupContainer = document.querySelector('.error-popup-container');
        this.messageContainer = document.querySelector('.error-message');
        this.closebuttom = document.querySelector('.close-error-popup');

        if(!ErrorPopup.instance) {
            ErrorPopup.instance = this; 
            this.init();            
        };

        return ErrorPopup.instance;
    }

    show = (message) => {        
        this.messageContainer.innerHTML = message;
        this.popupContainer.classList.remove('hidden');       
    } 
    
    hide = () => {        
        this.popupContainer.classList.add('hidden');        
    }    

    init = () => {
        this.closebuttom.onclick = this.hide;
    }
}

export default new ErrorPopup();
