import { ITrunkHolder } from "../interfaces/models/trunk-holder.interface";
import TrunkHolder from "../models/trunk-holder.model";
import Repository from "./Repository";

export default class TrunkHolderRepository extends Repository<ITrunkHolder> {
    /**
     * Constructor for TrunkHolderRepository
     * Calls the parent constructor with TrunkHolder as the model
     */
    constructor() {
        super(TrunkHolder);
    }

    /**
     * Checks if the given wallet address is a trunk holder
     * @param wallet_address the wallet address to check
     * @returns a promise that resolves to true if the wallet address is a trunk holder, false otherwise
     */
    public isTrunkHolder(wallet_address: string): Promise<boolean> {
        return this.isExists({ "wallet_address": { "$regex": wallet_address, "$options": "i" } });
    }

}