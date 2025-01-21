import { ROUND_NOT_FOUND } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";
export default class RoundNotFoundException extends CustomException {
    /**
    * Constructor for RoundNotFoundException
    *
    * @throws RoundNotFoundException
    */
    constructor(
    ) {
        super(ROUND_NOT_FOUND, 400);
    }
} 