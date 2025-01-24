"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomException_1 = __importDefault(require("../CustomException"));
const exceptions_messages_1 = require("../../messages/exceptions.messages");
class NameValidationException extends CustomException_1.default {
    /**
     * Constructor for NameValidationException
     *
     * @throws NameValidationException
     */
    constructor() {
        super(exceptions_messages_1.NAME_VALIDATION_EXCEPTION_MESSAGE, 400);
    }
}
exports.default = NameValidationException;
