"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_constant_1 = require("../../constants/env.constant");
const CustomException_1 = __importDefault(require("../CustomException"));
class TargetWalletEncryptionKeyNotFound extends CustomException_1.default {
    /**
    * Constructor for TargetWalletEncryptionKeyNotFound
    *
    * @throws TargetWalletEncryptionKeyNotFound
    */
    constructor() {
        super(env_constant_1.TARGET_WALLET_ENCRYPTION_KEY, 400);
    }
}
exports.default = TargetWalletEncryptionKeyNotFound;
