import CustomException from "../CustomException";

export default class TransactionHashCannotBeEmptyException extends CustomException {

    /**
     * Constructor
     *
     * @param {string} message - exception message
     * @param {string} name - exception name
     * @param {number} statusCode - http status code
     */
    constructor(
    ) {
        super("Transaction hash cannot be empty", "TransactionHashCannotBeEmptyException", 400);
    }
} 