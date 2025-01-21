import { COMMISSION_ALREADY_GIVEN } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";
export default class CommissionAlreadyGivenException extends CustomException {
   
    /**
     * Constructor for CommissionAlreadyGivenException
     *
     * @throws CommissionAlreadyGivenException
     */
    constructor(
    ) {
        super(COMMISSION_ALREADY_GIVEN, 400);
    }
} 