export default class RecordNotFoundException extends Error {
    
    constructor(message: string = "Record not found") {
        
        super(message);
        
        this.name = 'RecordNotFoundException';

        Object.setPrototypeOf(this, RecordNotFoundException.prototype);
    }
}
