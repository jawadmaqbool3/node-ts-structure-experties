import CustomException from "./CustomException";

export default class StripeCredentialsNotFoundException extends CustomException {
    /**
     * Constructor for StripeCredentialsNotFoundException
     *
     * @param {string} [message=Stripe credentials not found] - The error message
     * @param {string} [name=StripeCredentialsNotFoundException] - The error name
     * @param {number} [statusCode=403] - The HTTP status code
     */
    constructor(
    ) {
        super("Stripe credentials not found", "StripeCredentialsNotFoundException", 403);
    }
} 