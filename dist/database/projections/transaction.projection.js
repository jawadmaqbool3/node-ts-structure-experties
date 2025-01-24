"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUSTOMER_VIEW_TRANSACTION = void 0;
const interface_utils_1 = require("../../utils/interface.utils");
exports.CUSTOMER_VIEW_TRANSACTION = (0, interface_utils_1.interfaceToMongoProjection)([
    "_id",
    "currency_amount",
    "currency_symbol",
    "transaction_time",
    "transaction_hash",
    "currency_worth",
    "wallet_address",
    "chain_type"
]);
