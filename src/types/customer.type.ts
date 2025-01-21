import mongoose from "mongoose";


export type TRequestCustomer = {
    _id: mongoose.Types.ObjectId, 
    parent_id: mongoose.Types.ObjectId | null,
    grand_parent_id: mongoose.Types.ObjectId | null,
    first_name: string, 
    last_name?: string,
    email: string,
}
