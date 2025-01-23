import CustomException from "../CustomException";
import {  INVALID_EMAIL_PROVIDED } from "../../messages/exceptions.messages";
export default class InvalidEmailProvidedException extends CustomException {

    /**
     * Constructor for InvalidEmailProvidedException
     *
     * @throws InvalidEmailProvidedException
     */
    constructor(
    ) {
        super(INVALID_EMAIL_PROVIDED, 400);
    }
} 