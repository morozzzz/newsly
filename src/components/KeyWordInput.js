class KeyWordInput {
    constructor(input, state) {
        this.data = input;
        this.state = state;
        this.data.onchange = this.handleInput;
    }

    handleInput = (event) => {
        const text = event.target.value;
        this.state.keyWord = text;        
    }
}

export default KeyWordInput;