import CustomException from "../CustomException";

export default class TransactionNotUpdatedException extends CustomException {

    /**
     * Constructor
     *
     * @param {string} message - exception message
     * @param {string} name - exception name
     * @param {number} statusCode - http status code
     */
    constructor(
    ) {
        super("Transaction not updated", "TransactionNotUpdatedException", 400);
    }
} 