"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomException_1 = __importDefault(require("./CustomException"));
class RecordNotFoundException extends CustomException_1.default {
    /**
     * Constructs a new RecordNotFoundException.
     *
     * @param {string} message - The exception message, defaults to "Record not found".
     */
    constructor(message = "Record not found") {
        super(message, "RecordNotFoundException", 400);
    }
}
exports.default = RecordNotFoundException;
