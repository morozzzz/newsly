import Button from './Button';

const closeModalButtonElement = document.querySelector('.close-modal-button');

class SourcesModal {
    constructor(modal, onClickFunc, onCloseFunc) {
        this.data = modal;
        this.closeButton = new Button(closeModalButtonElement, onCloseFunc);
        this.data.onclick = onClickFunc;
    }  
    
    fill = (sources) => {
        const sourcesContainer = this.data.querySelector('.sources-container');    
        const template = sourcesContainer.querySelector('#source-item-template'); 
        const templateContent = template.content; 
        const sourceItem = templateContent.querySelector('.source-item');

        sources.forEach((source) => {
            sourceItem.textContent = source.name;
            sourceItem.id = source.id;
            const itemClone = document.importNode(templateContent, true);
            sourcesContainer.appendChild(itemClone); 
        });
    }
}

export default SourcesModal;