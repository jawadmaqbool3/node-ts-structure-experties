import CustomException from "./CustomException";

export default class RecordNotFoundException extends CustomException {
    
/**
 * Constructs a new RecordNotFoundException.
 *
 * @param {string} message - The exception message, defaults to "Record not found".
 */

    constructor(message: string = "Record not found") {
        
        super(message, "RecordNotFoundException", 400);
    }
}
