"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomException_1 = __importDefault(require("../CustomException"));
class FirstRoundLandingNotFoundException extends CustomException_1.default {
    /**
     * Constructs a new FirstRoundLandingNotFoundException with a predefined message,
     * name, and status code.
     */
    constructor() {
        super("First round landing not found", "FirstRoundLandingNotFoundException", 400);
    }
}
exports.default = FirstRoundLandingNotFoundException;
