import { OTP_CREATION_FAILED } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";
export default class OTPCreationFailedException extends CustomException {

    /**
     * Constructor for OTPCreationFailedException
     *
     * @throws OTPCreationFailedException
     */
    constructor(
    ) {
        super(OTP_CREATION_FAILED, 400);
    }
} 