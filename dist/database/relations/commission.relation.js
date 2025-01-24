"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMISSION_TO_TRANSACTION = exports.COMMISSION_TO_TRANSACTION_BY = void 0;
exports.COMMISSION_TO_TRANSACTION_BY = {
    from: "customers",
    localField: "transaction_by",
    foreignField: "_id",
    as: "transactionBy"
};
exports.COMMISSION_TO_TRANSACTION = {
    from: "transactions",
    localField: "transaction_id",
    foreignField: "_id",
    as: "transaction"
};
