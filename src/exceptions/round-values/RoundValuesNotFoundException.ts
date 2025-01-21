import { ROUND_VALUES_NOT_FOUND } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";

export default class RoundValuesNotFoundException extends CustomException {
    /**
    * Constructor for RoundValuesNotFoundException
    *
    * @throws RoundValuesNotFoundException
    */

    constructor(
    ) {
        super(ROUND_VALUES_NOT_FOUND, 400);
    }
} 