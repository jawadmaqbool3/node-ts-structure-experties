import { TFA_VERIFICATION_FAILED } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";
export default class TFAVerificationFailedException extends CustomException {

    /**
     * Constructor for TFAVerificationFailedException
     *
     * @throws TFAVerificationFailedException
     */
    constructor(
    ) {
        super(TFA_VERIFICATION_FAILED, 400);
    }
} 