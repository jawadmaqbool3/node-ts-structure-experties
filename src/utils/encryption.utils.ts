import CryptoJS from 'crypto-js';
import SalesPageSalesPageEncryptionKeyNotFound from '../exceptions/crypto-js/SalesPageEncryptionKeyNotFound';
import SalesPageEncryptionFailed from '../exceptions/crypto-js/SalesPageEncryptionFailed';
import SalesPageDecryptionFailed from '../exceptions/crypto-js/SalesPageDecryptionFailed';
import { SALES_PAGE_ENCRYPTION_KEY, TARGET_WALLET_ENCRYPTION_KEY } from '../constants/env.constant';
import TargetWalletEncryptionKeyNotFound from '../exceptions/crypto-js/TargetWalletEncryptionKeyNotFound';
import TargetWalletEncryptionFailed from '../exceptions/crypto-js/TargetWalletEncryptionFailed';

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
export function encryptSalesPagePayload(data: string): string {
    try {
        return encrypt(
            data,
            getOrThrowSalesPageEncryptionKey()
        );
    }
    catch (err) {
        if (err instanceof SalesPageSalesPageEncryptionKeyNotFound) throw err;
        else throw new SalesPageEncryptionFailed();
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
export function decryptSalesPagePayload(data: string): string {
    try {
        return decrypt(
            data,
            getOrThrowSalesPageEncryptionKey()
        );
    }
    catch (err) {
        if (err instanceof SalesPageSalesPageEncryptionKeyNotFound) throw err;
        else throw new SalesPageDecryptionFailed();
    }
}



/**
 * Retrieve the sales page encryption key from the environment variables
 *
 * @returns {string} - the sales page encryption key
 *
 * @throws {SalesPageSalesPageEncryptionKeyNotFound} - if the sales page encryption key is not found in the environment variables
 */

function getOrThrowSalesPageEncryptionKey(): string {
    const secretKey: string = SALES_PAGE_ENCRYPTION_KEY;
    if (!secretKey) throw new SalesPageSalesPageEncryptionKeyNotFound();
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

function encrypt(data: string, key: string): string {
    return CryptoJS.AES.encrypt(data.toString(), key).toString();
}

/**
 * Decrypts a given encrypted string using AES decryption with the provided key.
 *
 * @param {string} data - The encrypted string data to decrypt.
 * @param {string} key - The decryption key used for decrypting the data.
 *
 * @returns {string} - The decrypted string in UTF-8 format.
 */

function decrypt(data: string, key: string): string {
    return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
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
export function encryptTargetWallet(wallet: string): string {
    try {
        return encrypt(wallet, getOrThrowTargetWalletEncryptionKey());
    }
    catch (err) {
        if (err instanceof TargetWalletEncryptionKeyNotFound) throw err;
        else throw new TargetWalletEncryptionFailed();
    }
}

/**
 * Retrieves the target wallet encryption key from the environment variables
 *
 * @returns {string} - the target wallet encryption key
 *
 * @throws {TargetWalletEncryptionKeyNotFound} - if the target wallet encryption key is not found in the environment variables
 */
function getOrThrowTargetWalletEncryptionKey(): string {
    const secretKey: string = TARGET_WALLET_ENCRYPTION_KEY;
    if (!secretKey) throw new TargetWalletEncryptionKeyNotFound();
    return secretKey;
}