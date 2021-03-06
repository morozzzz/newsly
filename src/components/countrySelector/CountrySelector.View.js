class CountrySelectorView {
    constructor() {        
        this.element = document.querySelector('.country-selector');
        this.label = document.querySelector('.selected-country'); 
    }

    fill = (data) => {
        const template = document.getElementById('country-item-template'); 
        const templateContent = template.content; 
        const listItem = templateContent.querySelector('li');
        for(let item in data) {            
            listItem.textContent = item;
            listItem.id = data[item];
            const itemClone = document.importNode(templateContent, true);
            this.element.appendChild(itemClone);        
        }
    }

    updateLabel = (text) => {
        this.label.innerHTML = text;
    }

    show = () => {        
        this.element.classList.remove('hidden');       
    } 
    
    hide = () => {        
        this.element.classList.add('hidden');        
    }    
}

export default CountrySelectorView;
