import { INftOrder } from "../../interfaces/models/nft-order.interface";
import { interfaceToMongoProjection } from "../../utils/interface.utils";

export const CUSTOMER_VIEW_ORDER = interfaceToMongoProjection<INftOrder>([
    "_id",
    "purchase_wallet",
    "target_wallet",
    "units"
] as (keyof INftOrder)[]);