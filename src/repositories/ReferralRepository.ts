import mongoose from "mongoose";
import { toObjectId } from "../utils/mongoos.utils";
import Repository from "./Repository";
import { IReferral } from "../interfaces/models/referrals.interface";
import Referral from "../database/models/referrals.model";
import ReferralNotFoundException from "../exceptions/referral/ReferralNotFoundException";

export default class ReferralRepository extends Repository<IReferral> {
    /**
     * Constructor for ReferralRepository
     *
     * @constructor
     */
    constructor() {
        super(Referral);
    }

 
    /**
     * Validates whether a referral exists in the database.
     *
     * @param _id The MongoDB ObjectId or string _id of the referral to validate.
     *
     * @throws ReferralNotFoundException if the referral does not exist.
     */
    public async validate(_id: string | mongoose.Types.ObjectId): Promise<void> {
        const customer: boolean | null = await this.isExists({ _id: toObjectId(_id) });
        if (!customer) throw new ReferralNotFoundException();
    }

  

    /**
     * Retrieves a referral by its _id after validating that it exists.
     *
     * @param order_id The MongoDB ObjectId or string _id of the referral to retrieve.
     *
     * @returns The found referral.
     *
     * @throws ReferralNotFoundException if the referral does not exist.
     */
    public async getValidated(order_id: string | mongoose.Types.ObjectId): Promise<IReferral> {
        const referral: IReferral | null = await this.findById(order_id);
        if (!referral) throw new ReferralNotFoundException();
        return referral;
    }


}