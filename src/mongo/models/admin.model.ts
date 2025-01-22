import mongoose, { Model } from 'mongoose';
import { IAdmin } from '../../interfaces/models/admin.interface';


export const relations = {}

const adminSchema = new mongoose.Schema<IAdmin>({
    first_name: {type: String, required: true},
    last_name: {type: String},
    phone_no: {type: String},
    is_junior: {type: Boolean, default: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
    last_login_at: {type: Date},
    email_otp_code: {type: Number},
    active: {type: Boolean, default: true},
    is_email_otp_verified: {type: Boolean, default: false},
    is_tfa_verified: {type: Boolean, default: false},
    otp_generated_at: {type: Date},
}, { timestamps: true });

const Admin: Model<IAdmin> = mongoose.model<IAdmin>('admins', adminSchema);

export default Admin;
