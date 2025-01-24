"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUSTOMER_VIEW_CUSTOMER = void 0;
const interface_utils_1 = require("../../utils/interface.utils");
exports.CUSTOMER_VIEW_CUSTOMER = (0, interface_utils_1.interfaceToMongoProjection)([
    "_id",
    "first_name",
    "wallet_address",
    "email",
]);
