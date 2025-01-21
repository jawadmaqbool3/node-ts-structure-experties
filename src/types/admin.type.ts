import mongoose from "mongoose";


export type TRequestAdmin = {
    _id: mongoose.Types.ObjectId, 
    first_name: string, 
    last_name?: string,
    email: string,
}
