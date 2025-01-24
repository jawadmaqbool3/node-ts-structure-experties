"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRANSACTION_TO_ROUND = exports.TRANSACTION_TO_REFERRAL = exports.TRANSACTION_TO_ORDER = exports.TRANSACTION_TO_CUSTOMER = void 0;
exports.TRANSACTION_TO_CUSTOMER = {
    from: "customers",
    localField: "customer_id",
    foreignField: "_id",
    as: "customer"
};
exports.TRANSACTION_TO_ORDER = {
    from: "nft_orders",
    localField: "order_id",
    foreignField: "_id",
    as: "order"
};
exports.TRANSACTION_TO_REFERRAL = {
    from: "referrals",
    localField: "referral_id",
    foreignField: "_id",
    as: "referral"
};
exports.TRANSACTION_TO_ROUND = {
    from: "nft_rounds",
    localField: "round_id",
    foreignField: "_id",
    as: "round"
};
