"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_messages_1 = require("../../messages/exceptions.messages");
const CustomException_1 = __importDefault(require("../CustomException"));
class CurrencyAmountCannotBeZeroException extends CustomException_1.default {
    /**
    * Constructor for CurrencyAmountCannotBeZeroException
    *
    * @throws CurrencyAmountCannotBeZeroException
    */
    constructor() {
        super(exceptions_messages_1.CURRENCY_AMOUNT_CANNOT_BE_ZERO, 400);
    }
}
exports.default = CurrencyAmountCannotBeZeroException;
