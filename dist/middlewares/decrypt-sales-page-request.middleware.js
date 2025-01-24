"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = decryptSalesPageRequest;
const EncryptedPayloadNotFound_1 = __importDefault(require("../exceptions/middlewares/EncryptedPayloadNotFound"));
const encryption_utils_1 = require("../utils/encryption.utils");
const json_utils_1 = require("../utils/json.utils");
/**
 * Decrypts any incoming request body that has a payload field, decrypts it with the sales page encryption key, and replaces the request body with the decrypted payload.
 *
 * @param {Request | IExtendedCustomerRequest} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
function decryptSalesPageRequest(req, res, next) {
    if (req.method === 'POST' || req.method === 'PUT') {
        const { payload } = req.body;
        if (!payload)
            throw new EncryptedPayloadNotFound_1.default();
        const decryptedPayload = (0, encryption_utils_1.decryptSalesPagePayload)(payload);
        delete req.body.payload;
        req.body = (0, json_utils_1.parseIfJson)(decryptedPayload);
    }
    next();
}
