"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomException_1 = __importDefault(require("../CustomException"));
class NotEnoughQuantityAvailableException extends CustomException_1.default {
    /**
     * Constructor for NotEnoughQuantityAvailableException
     *
     * @throws NotEnoughQuantityAvailableException
     */
    constructor() {
        super("Not enough quantity available", "NotEnoughQuantityAvailable", 400);
    }
}
exports.default = NotEnoughQuantityAvailableException;
