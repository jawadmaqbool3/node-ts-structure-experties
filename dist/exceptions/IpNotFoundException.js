"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomException_1 = __importDefault(require("./CustomException"));
class IpNotFoundException extends CustomException_1.default {
    /**
     * Constructor for IpNotFoundException
     *
     * @param {string} [message=Ip not found] - The error message
     * @param {string} [name=IpNotFoundException] - The error name
     * @param {number} [statusCode=403] - The HTTP status code
     */
    constructor() {
        super("IP not found", "IpNotFoundException", 403);
    }
}
exports.default = IpNotFoundException;
