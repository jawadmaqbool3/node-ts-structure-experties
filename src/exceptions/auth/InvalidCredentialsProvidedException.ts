import { INVALID_CREDENTIALS_PROVIDED } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";
export default class InvalidCredentialsProvidedException extends CustomException {
   
/**
 * Constructor for InvalidCredentialsProvidedException
 *
 * @throws InvalidCredentialsProvidedException
 */

    constructor(
    ) {
        super(INVALID_CREDENTIALS_PROVIDED,  400);
    }
} 