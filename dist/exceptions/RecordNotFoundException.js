"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_messages_1 = require("../messages/exceptions.messages");
const CustomException_1 = __importDefault(require("./CustomException"));
class RecordNotFoundException extends CustomException_1.default {
    /**
     * Constructs a new RecordNotFoundException.
     *
     * @param {string} message - The exception message, defaults to "Record not found".
     */
    constructor(message = exceptions_messages_1.RECORD_NOT_FOUND) {
        super(message, 400);
    }
}
exports.default = RecordNotFoundException;
