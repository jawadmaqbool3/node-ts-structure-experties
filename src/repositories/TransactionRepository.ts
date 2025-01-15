
import mongoose from "mongoose";
import TransactionNotFoundException from "../exceptions/transaction/TransactionNotFoundException";
import { ITransaction } from "../interfaces/models/transaction.interface";
import Transaction from "../models/transaction.model";
import { toObjectId } from "../utils/mongoos.utils";
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

    public async validate(_id: string | mongoose.Schema.Types.ObjectId): Promise<void> {
        const transaction: boolean | null = await this.isExists({ _id: toObjectId(_id) });
        if (!transaction) throw new TransactionNotFoundException();
    }



}