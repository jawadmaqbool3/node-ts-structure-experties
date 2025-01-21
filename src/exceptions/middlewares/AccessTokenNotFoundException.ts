import { ACCESS_TOKEN_NOT_FOUND } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";

export default class AccessTokenNotFoundException extends CustomException {
    /**
    * Constructor for AccessTokenNotFoundException
    *
    * @throws AccessTokenNotFoundException
    */

    constructor(
    ) {
        super(ACCESS_TOKEN_NOT_FOUND, 403);
    }
} 