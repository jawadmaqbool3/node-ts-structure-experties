import { ADMIN_NOT_FOUND } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";

export default class AdminNotFoundException extends CustomException {
    /**
    * Constructor for AdminNotFoundException
    *
    * @throws AdminNotFoundException
    */

    constructor(
    ) {
        super(ADMIN_NOT_FOUND, 403);
    }
} 