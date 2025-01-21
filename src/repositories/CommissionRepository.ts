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


    /**
     * Throws a CommissionAlreadyGivenException if a commission has already been given
     * for the given transaction ID.
     * 
     * @param {string | mongoose.Types.ObjectId} transaction_id - The ID of the transaction
     * 
     * @throws {CommissionAlreadyGivenException} - If a commission has already been given for the given transaction ID
     * 
     * @returns {Promise<void>} - A promise that resolves when the operation is complete
     */
    async throwIfAlreadyExists(transaction_id: string | mongoose.Types.ObjectId): Promise<void> {
        if (await this.isExists({ transaction_id: toObjectId(transaction_id) })) throw new CommissionAlreadyGivenException();
    }


}