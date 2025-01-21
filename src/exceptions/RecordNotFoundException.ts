import { RECORD_NOT_FOUND } from "../messages/exceptions.messages";
import CustomException from "./CustomException";

export default class RecordNotFoundException extends CustomException {

    /**
     * Constructs a new RecordNotFoundException.
     *
     * @param {string} message - The exception message, defaults to "Record not found".
     */

    constructor(message: string = RECORD_NOT_FOUND) {

        super(message, 400);
    }
}
