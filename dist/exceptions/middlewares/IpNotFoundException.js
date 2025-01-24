"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_messages_1 = require("../../messages/exceptions.messages");
const CustomException_1 = __importDefault(require("../CustomException"));
class IpNotFoundException extends CustomException_1.default {
    /**
     * Constructor for IpNotFoundException
     *
     * @throws IpNotFoundException
     */
    constructor() {
        super(exceptions_messages_1.IP_NOT_FOUND, 403);
    }
}
exports.default = IpNotFoundException;
