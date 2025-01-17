import Repository from "./Repository";
import { ICommission } from "../interfaces/models/commission.interface";
import Commission from "../models/commission.model";
import mongoose from "mongoose";
import { toObjectId } from "../utils/mongoos.utils";
import CommissionAlreadyGivenException from "../exceptions/commission/CommissionAlreadyGivenException";

export default class CommissionRepository extends Repository<ICommission> {

    /**
     * Initializes a new instance of the CommissionRepository class.
     * 
     * This constructor calls the base Repository class constructor with the Commission model,
     * setting up the repository for Commission documents.
     */

    constructor() {
        super(Commission);
    }


    async throwIfAlreadyExists(transaction_id: string | mongoose.Types.ObjectId): Promise<void> {
        if (await this.isExists({ transaction_id: toObjectId(transaction_id) })) throw new CommissionAlreadyGivenException();
    }


}