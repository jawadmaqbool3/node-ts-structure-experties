import { REFERRAL_NOT_FOUND } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";
export default class ReferralNotFoundException extends CustomException {
    /**
    * Constructor for ReferralNotFoundException
    *
    * @throws ReferralNotFoundException
    */
    constructor(
    ) {
        super(REFERRAL_NOT_FOUND, 400);
    }
} 