import CustomException from "../CustomException";
import { NAME_VALIDATION_EXCEPTION_MESSAGE, PASSWORD_VALIDATION_EXCEPTION_MESSAGE } from "../../messages/exceptions.messages";
export default class NameValidationException extends CustomException {

    /**
     * Constructor for NameValidationException
     *
     * @throws NameValidationException
     */
    constructor(
    ) {
        super(NAME_VALIDATION_EXCEPTION_MESSAGE, 400);
    }
} 