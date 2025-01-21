import { ORDER_AMOUNT_VALIDATION_FAILED } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";
export default class OrderAmountValidationFailedException extends CustomException {
    /**
    * Constructor for OrderAmountValidationFailedException
    *
    * @throws OrderAmountValidationFailedException
    */
    constructor(
    ) {
        super(ORDER_AMOUNT_VALIDATION_FAILED, 400);
    }
} 