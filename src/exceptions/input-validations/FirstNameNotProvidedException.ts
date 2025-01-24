import { FIRST_NAME_NOT_PROVIDED } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";

export default class FirstNameNotProvidedException extends CustomException {

    /**
     * Constructor for FirstNameNotProvidedException
     *
     * @throws FirstNameNotProvidedException
     */
    constructor(
    ) {
        super(FIRST_NAME_NOT_PROVIDED, 400);
    }
} 