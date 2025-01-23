import { EMAIL_ALREADY_EXISTS } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";

export default class EmailAlreadyExistsException extends CustomException {

    /**
     * Constructor for EmailAlreadyExistsException
     *
     * @throws EmailAlreadyExistsException
     */
    constructor(
    ) {
        super(EMAIL_ALREADY_EXISTS, 400);
    }
} 