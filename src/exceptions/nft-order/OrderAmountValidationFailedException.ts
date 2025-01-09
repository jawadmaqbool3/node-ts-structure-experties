import CustomException from "../CustomException";
export default class OrderAmountValidationFailedException extends CustomException {
    constructor(
    ) {
        super("Order amount validation failed", "OrderAmountValidationFailedException", 400);
    }
} 