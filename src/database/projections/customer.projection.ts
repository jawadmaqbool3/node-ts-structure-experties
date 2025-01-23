import { ICustomer } from "../../interfaces/models/customer.interface";
import { interfaceToMongoProjection } from "../../utils/interface.utils";



export const CUSTOMER_VIEW_CUSTOMER = interfaceToMongoProjection<ICustomer>([
    "_id",
    "first_name",
    "wallet_address",
    "email",
] as (keyof ICustomer)[]);