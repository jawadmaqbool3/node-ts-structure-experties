"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_messages_1 = require("../../messages/exceptions.messages");
const CustomException_1 = __importDefault(require("../CustomException"));
class InvalidTfaCodeProvidedException extends CustomException_1.default {
    /**
     * Constructor for InvalidTfaCodeProvidedException
     *
     * @throws InvalidTfaCodeProvidedException
     */
    constructor() {
        super(exceptions_messages_1.INVALID_TFA_CODE_PROVIDED, 400);
    }
}
exports.default = InvalidTfaCodeProvidedException;
