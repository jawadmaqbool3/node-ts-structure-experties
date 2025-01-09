import CustomException from "./CustomException";

export default class RecordNotFoundException extends CustomException {
    
    constructor(message: string = "Record not found") {
        
        super(message, "RecordNotFoundException", 400);
    }
}
