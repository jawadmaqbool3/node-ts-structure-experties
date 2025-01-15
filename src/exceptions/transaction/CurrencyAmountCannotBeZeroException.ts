import CustomException from "../CustomException";

export default class CurrencyAmountCannotBeZeroException extends CustomException {

    /**
     * Constructor
     *
     * @param {string} message - exception message
     * @param {string} name - exception name
     * @param {number} statusCode - http status code
     */
    constructor(
    ) {
        super("Currency amount cannot be zero", "CurrencyAmountCannotBeZeroException", 400);
    }
} 