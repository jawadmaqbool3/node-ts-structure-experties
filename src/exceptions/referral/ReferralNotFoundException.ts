import CustomException from "../CustomException";
export default class ReferralNotFoundException extends CustomException {
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
        super("Referral not found", "ReferralNotFoundException", 400);
    }
} 