import CustomException from "../CustomException";
export default class EmailIsNotProvidedException extends CustomException {
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
        super("Email is not provided", "EmailIsNotProvidedException", 400);
    }
} 