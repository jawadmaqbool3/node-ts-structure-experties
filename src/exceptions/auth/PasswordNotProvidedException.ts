import CustomException from "../CustomException";
export default class PasswordNotProvidedException extends CustomException {
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
        super("Password is not provided", "PasswordNotProvidedException", 400);
    }
} 