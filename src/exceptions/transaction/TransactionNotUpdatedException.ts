import { TRANSACTION_NOT_UPDATED } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";

export default class TransactionNotUpdatedException extends CustomException {

    /**
    * Constructor for TransactionNotUpdatedException
    *
    * @throws TransactionNotUpdatedException
    */
    constructor(
    ) {
        super(TRANSACTION_NOT_UPDATED, 400);
    }
} 