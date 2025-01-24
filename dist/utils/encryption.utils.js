"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptSalesPagePayload = encryptSalesPagePayload;
exports.decryptSalesPagePayload = decryptSalesPagePayload;
exports.encryptTargetWallet = encryptTargetWallet;
const crypto_js_1 = __importDefault(require("crypto-js"));
const SalesPageEncryptionKeyNotFound_1 = __importDefault(require("../exceptions/crypto-js/SalesPageEncryptionKeyNotFound"));
const SalesPageEncryptionFailed_1 = __importDefault(require("../exceptions/crypto-js/SalesPageEncryptionFailed"));
const SalesPageDecryptionFailed_1 = __importDefault(require("../exceptions/crypto-js/SalesPageDecryptionFailed"));
const env_constant_1 = require("../constants/env.constant");
const TargetWalletEncryptionKeyNotFound_1 = __importDefault(require("../exceptions/crypto-js/TargetWalletEncryptionKeyNotFound"));
const TargetWalletEncryptionFailed_1 = __importDefault(require("../exceptions/crypto-js/TargetWalletEncryptionFailed"));
/**
 * Encrypt a given string with the sales page encryption key
 *
 * @param {string} data - string to encrypt
 *
 * @returns {string} - encrypted string
 *
 * @throws {SalesPageEncryptionKeyNotFound} - if the sales page encryption key is missing
 * @throws {SalesPageEncryptionFailed} - if the encryption process fails
 */
function encryptSalesPagePayload(data) {
    try {
        return encrypt(data, getOrThrowSalesPageEncryptionKey());
    }
    catch (err) {
        if (err instanceof SalesPageEncryptionKeyNotFound_1.default)
            throw err;
        else
            throw new SalesPageEncryptionFailed_1.default();
    }
}
/**
 * Decrypt a given string with the sales page encryption key
 *
 * @param {string} data - string to decrypt
 *
 * @returns {string} - decrypted string
 *
 * @throws {SalesPageSalesPageEncryptionKeyNotFound} - if the sales page encryption key is missing
 * @throws {SalesPageDecryptionFailed} - if the decryption process fails
 */
function decryptSalesPagePayload(data) {
    try {
        return decrypt(data, getOrThrowSalesPageEncryptionKey());
    }
    catch (err) {
        if (err instanceof SalesPageEncryptionKeyNotFound_1.default)
            throw err;
        else
            throw new SalesPageDecryptionFailed_1.default();
    }
}
/**
 * Retrieve the sales page encryption key from the environment variables
 *
 * @returns {string} - the sales page encryption key
 *
 * @throws {SalesPageSalesPageEncryptionKeyNotFound} - if the sales page encryption key is not found in the environment variables
 */
function getOrThrowSalesPageEncryptionKey() {
    const secretKey = env_constant_1.SALES_PAGE_ENCRYPTION_KEY;
    if (!secretKey)
        throw new SalesPageEncryptionKeyNotFound_1.default();
    return secretKey;
}
/**
 * Encrypts a given string using AES encryption with the provided key.
 *
 * @param {string} data - The string data to encrypt.
 * @param {string} key - The encryption key used for encrypting the data.
 *
 * @returns {string} - The encrypted string in base64 format.
 */
function encrypt(data, key) {
    return crypto_js_1.default.AES.encrypt(data.toString(), key).toString();
}
/**
 * Decrypts a given encrypted string using AES decryption with the provided key.
 *
 * @param {string} data - The encrypted string data to decrypt.
 * @param {string} key - The decryption key used for decrypting the data.
 *
 * @returns {string} - The decrypted string in UTF-8 format.
 */
function decrypt(data, key) {
    return crypto_js_1.default.AES.decrypt(data, key).toString(crypto_js_1.default.enc.Utf8);
}
/**
 * Encrypt a given target wallet with the target wallet encryption key
 *
 * @param {string} wallet - target wallet to encrypt
 *
 * @returns {string} - encrypted target wallet
 *
 * @throws {TargetWalletEncryptionKeyNotFound} - if the target wallet encryption key is missing
 * @throws {TargetWalletEncryptionFailed} - if the encryption process fails
 */
function encryptTargetWallet(wallet) {
    try {
        return encrypt(wallet, getOrThrowTargetWalletEncryptionKey());
    }
    catch (err) {
        if (err instanceof TargetWalletEncryptionKeyNotFound_1.default)
            throw err;
        else
            throw new TargetWalletEncryptionFailed_1.default();
    }
}
/**
 * Retrieves the target wallet encryption key from the environment variables
 *
 * @returns {string} - the target wallet encryption key
 *
 * @throws {TargetWalletEncryptionKeyNotFound} - if the target wallet encryption key is not found in the environment variables
 */
function getOrThrowTargetWalletEncryptionKey() {
    const secretKey = env_constant_1.TARGET_WALLET_ENCRYPTION_KEY;
    if (!secretKey)
        throw new TargetWalletEncryptionKeyNotFound_1.default();
    return secretKey;
}
