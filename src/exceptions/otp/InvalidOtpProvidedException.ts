import { INVALID_OTP_PROVIDED } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";
export default class InvalidOtpProvidedException extends CustomException {
    /**
    * Constructor for InvalidOtpProvidedException
    *
    * @throws InvalidOtpProvidedException
    */
    constructor(
    ) {
        super(INVALID_OTP_PROVIDED, 400);
    }
} 