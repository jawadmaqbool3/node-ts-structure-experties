"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomException_1 = __importDefault(require("../CustomException"));
class OrderAmountValidationFailedException extends CustomException_1.default {
    /**
     * Exception thrown when order amount validation fails
     *
     * @constructor
     * @param {string} message - exception message
     * @param {string} name - exception name
     * @param {number} statusCode - http status code
     */
    constructor() {
        super("Order amount validation failed", "OrderAmountValidationFailedException", 400);
    }
}
exports.default = OrderAmountValidationFailedException;
