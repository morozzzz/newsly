class Observer {
    constructor() {
        this.events = new Map();

        Observer.instance = Observer.instance || this;

        return Observer.instance;
    }

    subscribe(action, callback) {
        this.events.set(action, callback);
    }

    unsubscribe(action) {
        this.events.delete(action);
    }

    notify(action, payload) {
        const callback = this.events.get(action);

        if(typeof callback === 'function') {
            callback(payload);
        }
    }
}

export default new Observer();