"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomException_1 = __importDefault(require("../CustomException"));
const exceptions_messages_1 = require("../../messages/exceptions.messages");
class EmailIsNotProvidedException extends CustomException_1.default {
    /**
     * Constructor for EmailIsNotProvidedException
     *
     * @throws EmailIsNotProvidedException
     */
    constructor() {
        super(exceptions_messages_1.EMAIL_IS_NOT_PROVIDED, 400);
    }
}
exports.default = EmailIsNotProvidedException;
