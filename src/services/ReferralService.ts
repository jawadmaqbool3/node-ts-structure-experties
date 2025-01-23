import Service from "./Service";
import ReferralRepository from "../repositories/ReferralRepository";
import { IReferral } from "../interfaces/models/referrals.interface";
export default class ReferralService extends Service {


    

    constructor(
        private referralRepository = new ReferralRepository(),
    ) {
        super();
    }


    /**
     * Retrieves referral information based on the provided referral ID.
     *
     * @param {string} referral_id - The unique identifier of the referral to retrieve.
     * @returns {Promise<IReferral | null>} - A promise that resolves to the referral information if found, or null if not found.
     */

    public async getReferralInfo(referral_id: string): Promise<IReferral | null> {
        return this.referralRepository.findOne({ referral_id });
    }


}
