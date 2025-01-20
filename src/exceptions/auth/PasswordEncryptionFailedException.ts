import CustomException from "../CustomException";
export default class PasswordEncryptionFailedException extends CustomException {
    /**
     * Exception thrown when order amount validation fails
     * 
     * @constructor
     * @param {string} message - exception message
     * @param {string} name - exception name
     * @param {number} statusCode - http status code
     */
    constructor(
    ) {
        super("Password encryption failed", "PasswordEncryptionFailedException", 400);
    }
} 