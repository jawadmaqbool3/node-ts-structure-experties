import { INftType } from "../../interfaces/models/nft-types.interface";
import { interfaceToMongoProjection } from "../../utils/interface.utils";

export const CUSTOMER_VIEW_NFT_TYPE = interfaceToMongoProjection<INftType>([
    "_id",
    "name",
] as (keyof INftType)[]);