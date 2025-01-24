"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUSTOMER_VIEW_COMMISSION = void 0;
const interface_utils_1 = require("../../utils/interface.utils");
exports.CUSTOMER_VIEW_COMMISSION = (0, interface_utils_1.interfaceToMongoProjection)([
    "comission_token",
    "type",
    "createdAt",
    "commission_percentage"
]);
