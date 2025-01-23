import CustomException from "../CustomException";
import { PASSWORD_VALIDATION_EXCEPTION_MESSAGE } from "../../messages/exceptions.messages";
export default class PasswordValidationException extends CustomException {

    /**
     * Constructor for PasswordValidationException
     *
     * @throws PasswordValidationException
     */
    constructor(
    ) {
        super(PASSWORD_VALIDATION_EXCEPTION_MESSAGE, 400);
    }
} 