import { OTP_EXPIRED } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";
export default class OTPExpiredException extends CustomException {
    /**
    * Constructor for OTPExpiredException
    *
    * @throws OTPExpiredException
    */
    constructor(
    ) {
        super(OTP_EXPIRED, 400);
    }
} 