export class Demo {

    constructor() {
        this.message = `-- MESSAGE:`
    }

    getMessage(message) {
        return `${this.message} ${message}`
    }
}