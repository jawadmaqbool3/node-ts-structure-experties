import CustomException from "../CustomException";

export default class RoundValuesNotFoundException extends CustomException {
    /**
     * Constructor
     *
     * @param {string} message - Error message
     * @param {string} name - Error name
     * @param {number} statusCode - Error status code
     */

    constructor(
    ) {
        super("Round values not found", "RoundValuesNotFoundException", 400);
    }
} 