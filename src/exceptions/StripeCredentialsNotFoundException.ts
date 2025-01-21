import { STRIPE_CREDENTIALS_NOT_FOUND } from "../messages/exceptions.messages";
import CustomException from "./CustomException";

export default class StripeCredentialsNotFoundException extends CustomException {
    /**
     * Constructor for StripeCredentialsNotFoundException
     *
     * @throws StripeCredentialsNotFoundException
     */
    constructor(
    ) {
        super(STRIPE_CREDENTIALS_NOT_FOUND, 403);
    }
} 