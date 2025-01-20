import Repository from "./Repository";
import { IAdmin } from "../interfaces/models/admin.interface";
import Admin from "../models/admin.model";


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
}