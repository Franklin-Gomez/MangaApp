let instance;
let counter = 0;

class Counter { 
    constructor() {
        if (instance) {
            throw new Error("You can only create one instance!");
        }

        instance = this;
    }

    getInstane(){
        return this;
    }

}

const counter1 = new Counter();

const counter2 = new Counter();
