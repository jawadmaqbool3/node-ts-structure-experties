import { ACCESS_TOKEN_NOT_FOUND, INVALID_ACCESS_TOKEN_PROVIDED } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";

export default class InvalidAccessTokenProvidedException extends CustomException {
    /**
    * Constructor for InvalidAccessTokenProvidedException
    *
    * @throws InvalidAccessTokenProvidedException
    */

    constructor(
    ) {
        super(INVALID_ACCESS_TOKEN_PROVIDED, 403);
    }
} 