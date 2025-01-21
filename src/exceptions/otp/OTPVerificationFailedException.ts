import { OTP_VERIFICATION_FAILED } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";
export default class OTPVerificationFailedException extends CustomException {

    /**
     * Constructor for OTPVerificationFailedException
     *
     * @throws OTPVerificationFailedException
     */
    constructor(
    ) {
        super(OTP_VERIFICATION_FAILED, 400);
    }
} 