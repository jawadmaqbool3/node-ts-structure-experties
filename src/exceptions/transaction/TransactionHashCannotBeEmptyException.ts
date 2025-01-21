import { TRANSACTION_HASH_CANNOT_BE_EMPTY } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";

export default class TransactionHashCannotBeEmptyException extends CustomException {

    /**
    * Constructor for TransactionHashCannotBeEmptyException
    *
    * @throws TransactionHashCannotBeEmptyException
    */
    constructor(
    ) {
        super(TRANSACTION_HASH_CANNOT_BE_EMPTY, 400);
    }
} 