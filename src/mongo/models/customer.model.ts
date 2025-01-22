import mongoose, { Model } from 'mongoose';
import { ICustomer } from '../../interfaces/models/customer.interface';

export const relations = {}

const customerSchema = new mongoose.Schema<ICustomer>({
    first_name: { type: String, required: true },
    last_name: { type: String },
    wallet_address: { type: String, required: true },
    sol_wallet_address: { type: String, required: true },
    password: { type: String, required: true },
    remember_token: { type: String },
    status: { type: Boolean, default: true },
    email: { type: String, required: true },
    grand_parent_id: { type: String },
    parent_id: { type: String },
}, { timestamps: true });

const Customer: Model<ICustomer> = mongoose.model<ICustomer>('customers', customerSchema);

export default Customer;
