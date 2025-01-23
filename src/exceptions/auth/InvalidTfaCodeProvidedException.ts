import { INVALID_TFA_CODE_PROVIDED } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";
export default class InvalidTfaCodeProvidedException extends CustomException {
   
/**
 * Constructor for InvalidTfaCodeProvidedException
 *
 * @throws InvalidTfaCodeProvidedException
 */

    constructor(
    ) {
        super(INVALID_TFA_CODE_PROVIDED,  400);
    }
} 