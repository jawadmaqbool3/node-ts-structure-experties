"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUSTOMER_VIEW_NFT = void 0;
const interface_utils_1 = require("../../utils/interface.utils");
exports.CUSTOMER_VIEW_NFT = (0, interface_utils_1.interfaceToMongoProjection)([
    "_id",
    "name",
    "nft_type_id",
    "booths",
]);
