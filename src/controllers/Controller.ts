export default class Controller<T> {
    protected service: T;
    constructor(service: T) {
        this.service = service;
    }
} 
