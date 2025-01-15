import CustomException from "../CustomException";

export default class TransactionNotFoundException extends CustomException {

    /**
     * Constructor
     *
     * @param {string} message - exception message
     * @param {string} name - exception name
     * @param {number} statusCode - http status code
     */
    constructor(
    ) {
        super("Transaction not found", "TransactionNotFoundException", 400);
    }
} 