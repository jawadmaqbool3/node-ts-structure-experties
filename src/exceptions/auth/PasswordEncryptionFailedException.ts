import { PASSWORD_ENCRYPTION_FAILED } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";
export default class PasswordEncryptionFailedException extends CustomException {

    /**
     * Constructor for PasswordEncryptionFailedException
     *
     * @throws PasswordEncryptionFailedException
     */
    constructor(
    ) {
        super(PASSWORD_ENCRYPTION_FAILED, 400);
    }
} 