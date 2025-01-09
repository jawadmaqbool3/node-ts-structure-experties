import CustomException from "../CustomException";
export default class OrderAmountValidationFailedException extends CustomException {
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
        super("Order amount validation failed", "OrderAmountValidationFailedException", 400);
    }
} 