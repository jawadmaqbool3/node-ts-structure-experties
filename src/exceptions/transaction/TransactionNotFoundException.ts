import { TRANSACTION_NOT_FOUND } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";

export default class TransactionNotFoundException extends CustomException {
    /**
    * Constructor for TransactionNotFoundException
    *
    * @throws TransactionNotFoundException
    */
    constructor(
    ) {
        super(TRANSACTION_NOT_FOUND, 400);
    }
} 