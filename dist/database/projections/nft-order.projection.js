"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUSTOMER_VIEW_ORDER = void 0;
const interface_utils_1 = require("../../utils/interface.utils");
exports.CUSTOMER_VIEW_ORDER = (0, interface_utils_1.interfaceToMongoProjection)([
    "_id",
    "purchase_wallet",
    "target_wallet",
    "units"
]);
