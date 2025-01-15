import CustomException from "./CustomException";

export default class InvalidObjectIdException extends CustomException {

    /**
     * Constructor for InvalidObjectIdException
     *
     * @throws InvalidObjectIdException
     */
    constructor(
    ) {
        super("Invalid Object Id", "InvalidObjectIdException", 400);
    }
}



