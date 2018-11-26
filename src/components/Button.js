class Button {
    constructor(button, onclickFunc) {
        this.data = button;
        this.data.onclick = onclickFunc;
    }
}

export default Button;