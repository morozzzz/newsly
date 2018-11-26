class Cat {
    constructor(cat, state) {
        this.data = cat;
        this.state = state;
    } 
    
    maybeShow = () => {
        if (this.state.clicks > 1) {
            this.data.classList.toggle('hidden-cat');
            setTimeout(() => {
                this.data.classList.toggle('hidden-cat');        
            }, 1500);
        }
        this.state.clicks = 0; 
    }
}

export default Cat;