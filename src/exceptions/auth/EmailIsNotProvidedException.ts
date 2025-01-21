import CustomException from "../CustomException";
export default class EmailIsNotProvidedException extends CustomException {

    /**
     * Exception thrown when an email is not provided.
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