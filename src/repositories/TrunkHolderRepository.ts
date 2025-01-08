import { ITrunkHolder } from "../interfaces/models/trunk-holder.interface";
import TrunkHolder from "../models/trunk-holder.model";
import Repository from "./Repository";

export default class TrunkHolderRepository extends Repository<ITrunkHolder> {
    constructor() {
        super(TrunkHolder);
    }

    public isTrunkHolder(wallet_address: string): Promise<boolean> {
        return this.isExists({ "wallet_address": { "$regex": wallet_address, "$options": "i" } });
    }

}