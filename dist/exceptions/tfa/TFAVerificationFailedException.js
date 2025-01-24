"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_messages_1 = require("../../messages/exceptions.messages");
const CustomException_1 = __importDefault(require("../CustomException"));
class TFAVerificationFailedException extends CustomException_1.default {
    /**
     * Constructor for TFAVerificationFailedException
     *
     * @throws TFAVerificationFailedException
     */
    constructor() {
        super(exceptions_messages_1.TFA_VERIFICATION_FAILED, 400);
    }
}
exports.default = TFAVerificationFailedException;
