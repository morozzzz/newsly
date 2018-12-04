import observer from '../Observer';

class SourcesModalView {
    constructor() {
        this.element = document.querySelector('.sources-modal');
        this.sourcesContainer = this.element.querySelector('.sources-container');
        this.closeButton = document.querySelector('.close-modal-button');
    }  
    
    fill = ({ sources }) => {  
        this.reset();

        const template = this.element.querySelector('#source-item-template'); 
        const templateContent = template.content; 
        const sourceItem = templateContent.querySelector('.source-item');

        sources.forEach((source) => {
            sourceItem.textContent = source.name;
            sourceItem.id = source.id;
            const itemClone = document.importNode(templateContent, true);
            this.sourcesContainer.appendChild(itemClone); 
        });
    }

    reset = () => {
        this.sourcesContainer.innerHTML = '';
    }

    hide = () => {
        document.documentElement.scrollTop = 0;
        this.element.classList.add('hidden');
        this.element.scrollTop = 0;
    }

    show = () => {
        this.element.classList.remove('hidden');        
    }

    init = () => {
        observer.subscribe('SOURCES_UPDATED', this.fill);
    }
}

export default SourcesModalView;