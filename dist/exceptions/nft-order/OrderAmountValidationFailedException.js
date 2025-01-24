"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_messages_1 = require("../../messages/exceptions.messages");
const CustomException_1 = __importDefault(require("../CustomException"));
class OrderAmountValidationFailedException extends CustomException_1.default {
    /**
    * Constructor for OrderAmountValidationFailedException
    *
    * @throws OrderAmountValidationFailedException
    */
    constructor() {
        super(exceptions_messages_1.ORDER_AMOUNT_VALIDATION_FAILED, 400);
    }
}
exports.default = OrderAmountValidationFailedException;
