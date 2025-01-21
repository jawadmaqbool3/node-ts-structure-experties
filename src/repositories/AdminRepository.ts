import Repository from "./Repository";
import { IAdmin } from "../interfaces/models/admin.interface";
import Admin from "../models/admin.model";
import { generateOTP } from "../utils/auth.utils";
import mongoose from "mongoose";


export default class AdminRepository extends Repository<IAdmin> {
    constructor() {
        super(Admin);
    }

    /**
     * Searches for an admin by their email address in a case-insensitive manner.
     *
     * @param email The email address to search for.
     * 
     * @returns A promise that resolves to the found admin or null if no admin matches the email address.
     */
    public searchByEmail(email: string): Promise<IAdmin | null> {
        return this.findOne({ "email": { "$regex": `^${email}$`, "$options": "i" } });
    }




    /**
     * Resets the OTP for the specified admin. This sets the OTP code and the generation time.
     * This also sets the OTP verification status to false.
     *
     * @param _id The ID of the admin to reset the OTP for.
     *
     * @returns A promise that resolves to the updated admin object on success or null on failure.
     */
    public async resetOTP(_id: string | mongoose.Types.ObjectId): Promise<IAdmin | null> {
        const otp = generateOTP();
        return await this.update(_id, {
            email_otp_code: otp,
            is_email_otp_verified: false,
            otp_generated_at: new Date()
        });
    }
}