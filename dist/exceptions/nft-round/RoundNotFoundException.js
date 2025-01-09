"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomException_1 = __importDefault(require("../CustomException"));
class RoundNotFoundException extends CustomException_1.default {
    /**
     * Creates a new instance of RoundNotFoundException
     * @param {string} [message] - The error message
     * @param {string} [name] - The error name
     * @param {number} [statusCode] - The HTTP status code
     */
    constructor() {
        super("Round not found", "RoundNotFoundException", 400);
    }
}
exports.default = RoundNotFoundException;
