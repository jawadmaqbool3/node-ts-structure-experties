"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomException_1 = __importDefault(require("../CustomException"));
class RoundValuesNotFoundException extends CustomException_1.default {
    /**
     * Constructor
     *
     * @param {string} message - Error message
     * @param {string} name - Error name
     * @param {number} statusCode - Error status code
     */
    constructor() {
        super("Round values not found", "RoundValuesNotFoundException", 400);
    }
}
exports.default = RoundValuesNotFoundException;
