"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_messages_1 = require("../../messages/exceptions.messages");
const CustomException_1 = __importDefault(require("../CustomException"));
class NotEnoughQuantityAvailableException extends CustomException_1.default {
    /**
   * Constructor for NotEnoughQuantityAvailableException
   *
   * @throws NotEnoughQuantityAvailableException
   */
    constructor() {
        super(exceptions_messages_1.NOT_ENOUGH_QUANTITY_AVAILABLE, 400);
    }
}
exports.default = NotEnoughQuantityAvailableException;
