import { INft } from "../../interfaces/models/nft.interface";
import { interfaceToMongoProjection } from "../../utils/interface.utils";

export const CUSTOMER_VIEW_NFT = interfaceToMongoProjection<INft>([
    "_id",
    "name",
    "nft_type_id",
    "booths",
] as (keyof INft)[]);