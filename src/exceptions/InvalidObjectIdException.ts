import { INVALID_OBJECT_ID } from "../messages/exceptions.messages";
import CustomException from "./CustomException";

export default class InvalidObjectIdException extends CustomException {

    /**
     * Constructor for InvalidObjectIdException
     *
     * @throws InvalidObjectIdException
     */
    constructor(
    ) {
        super(INVALID_OBJECT_ID, 400);
    }
}



