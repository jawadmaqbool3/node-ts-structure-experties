import { PASSWORD_NOT_PROVIDED } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";
export default class PasswordNotProvidedException extends CustomException {
    
    /**
     * Constructor for PasswordNotProvidedException
     *
     * @throws PasswordNotProvidedException
     */
    constructor(
    ) {
        super(PASSWORD_NOT_PROVIDED, 400);
    }
} 