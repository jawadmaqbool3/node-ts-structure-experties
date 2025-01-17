import mongoose from "mongoose";


export type TRequestCustomer = {
    _id: mongoose.Types.ObjectId, 
    parent_id: mongoose.Types.ObjectId
    first_name: string, 
    email: string,
}
