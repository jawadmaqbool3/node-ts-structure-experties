import { CURRENCY_AMOUNT_CANNOT_BE_ZERO } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";

export default class CurrencyAmountCannotBeZeroException extends CustomException {

    /**
    * Constructor for CurrencyAmountCannotBeZeroException
    *
    * @throws CurrencyAmountCannotBeZeroException
    */
    constructor(
    ) {
        super(CURRENCY_AMOUNT_CANNOT_BE_ZERO, 400);
    }
} 