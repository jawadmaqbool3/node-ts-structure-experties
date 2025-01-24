"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_messages_1 = require("../../messages/exceptions.messages");
const CustomException_1 = __importDefault(require("../CustomException"));
class AccessTokenNotFoundException extends CustomException_1.default {
    /**
    * Constructor for AccessTokenNotFoundException
    *
    * @throws AccessTokenNotFoundException
    */
    constructor() {
        super(exceptions_messages_1.ACCESS_TOKEN_NOT_FOUND, 403);
    }
}
exports.default = AccessTokenNotFoundException;
