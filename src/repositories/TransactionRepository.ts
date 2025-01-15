
import { ITransaction } from "../interfaces/models/transaction.interface";
import Transaction from "../models/transaction.model";
import Repository from "./Repository";

export default class TransactionRepository extends Repository<ITransaction> {
    /**
     * Constructor
     *
     * @param {Model<ITransaction>} model - model
     */
    constructor() {
        super(Transaction);
    }

    

}