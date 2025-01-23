import CustomException from "../CustomException";
import { EMAIL_IS_NOT_PROVIDED } from "../../messages/exceptions.messages";
export default class EmailIsNotProvidedException extends CustomException {

    /**
     * Constructor for EmailIsNotProvidedException
     *
     * @throws EmailIsNotProvidedException
     */
    constructor(
    ) {
        super(EMAIL_IS_NOT_PROVIDED, 400);
    }
} 