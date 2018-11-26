class Selector {
    constructor(selector, selectorLabel, state) {
        this.data = selector;
        this.selectorLabel = selectorLabel;
        this.state = state;
        this.itemText = null;
        this.itemId = null;
        this.itemType = null;
    }

    fill = (data, templateId) => {
        const template = document.getElementById(templateId); 
        const templateContent = template.content; 
        const listItem = templateContent.querySelector('li');
    
        for(let item in data) {            
            listItem.textContent = item;
            listItem.id = data[item];
            const itemClone = document.importNode(templateContent, true);
            this.data.appendChild(itemClone);        
        }
    }

    handleItem (event) {        
        const target = event.target;
        const classList = target && Array.from(target.classList);
        const itemType = classList && classList.find((item) => {
            return item.includes('selector-item');
        });
          
        if(itemType) {                
            this.itemType = itemType;    
            this.itemText = target.innerHTML;
            this.itemId = target.id;
        }               
    }
}

export default Selector;