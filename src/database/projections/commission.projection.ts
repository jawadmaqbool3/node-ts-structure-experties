import { ICommission } from "../../interfaces/models/commission.interface";
import { interfaceToMongoProjection } from "../../utils/interface.utils";



export const CUSTOMER_VIEW_COMMISSION = interfaceToMongoProjection<ICommission>([
    "comission_token",
    "type",
    "createdAt",
    "commission_percentage"
] as (keyof ICommission)[]);