import mongoose, { Document } from "mongoose";

export interface IAdminBase  {
    first_name: string;
    last_name: string;
    phone_no: string;
    is_junior: boolean;
    email: string;
    password: string;
    last_login_at: Date;
    email_otp_code: string;
    active: boolean;
    createdAt?: Date; 
    updatedAt?: Date;
}


export interface IAdmin extends IAdminBase, Document {
    _id: mongoose.Types.ObjectId;
}

export interface IAdminLean extends IAdminBase {
    _id: mongoose.Types.ObjectId;
}


