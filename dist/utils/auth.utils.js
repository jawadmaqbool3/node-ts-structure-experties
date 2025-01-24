"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.sanitizeAuthUser = sanitizeAuthUser;
exports.createAuthResponse = createAuthResponse;
exports.validateLoginInput = validateLoginInput;
exports.validateRegistrationInput = validateRegistrationInput;
exports.generateOTP = generateOTP;
exports.generateRandomString = generateRandomString;
exports.verifyTfa = verifyTfa;
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_constant_1 = require("../constants/env.constant");
const PasswordEncryptionFailedException_1 = __importDefault(require("../exceptions/auth/PasswordEncryptionFailedException"));
const jwt_1 = require("./jwt");
const EmailIsNotProvidedException_1 = __importDefault(require("../exceptions/input-validations/EmailIsNotProvidedException"));
const PasswordNotProvidedException_1 = __importDefault(require("../exceptions/input-validations/PasswordNotProvidedException"));
const jwt_constant_1 = require("../constants/jwt.constant");
const validation_utils_1 = require("./validation.utils");
const PasswordValidationException_1 = __importDefault(require("../exceptions/input-validations/PasswordValidationException"));
const EVMWalletNotProvidedException_1 = __importDefault(require("../exceptions/input-validations/EVMWalletNotProvidedException"));
const SolWalletNotProvidedException_1 = __importDefault(require("../exceptions/input-validations/SolWalletNotProvidedException"));
const auth_constant_1 = require("../constants/auth.constant");
const speakeasy_1 = __importDefault(require("speakeasy"));
const FirstNameNotProvidedException_1 = __importDefault(require("../exceptions/input-validations/FirstNameNotProvidedException"));
/**
 * Hashes the given password using the bcrypt library and the AUTH_SALT environment variable.
 * This method is used to hash passwords before storing them in the database.
 *
 * @param {string} password The password to hash.
 *
 * @returns {Promise<string>} - A promise that resolves with the hashed password.
 *
 * @throws {PasswordEncryptionFailedException} If the hashing process fails.
 */
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return bcrypt_1.default.hash(password, env_constant_1.AUTH_SALT);
        }
        catch (err) {
            throw new PasswordEncryptionFailedException_1.default();
        }
    });
}
;
/**
 * Compares a plaintext password with a hashed password to check for a match.
 *
 * @param {string} password - The plaintext password to verify.
 * @param {string} hashed - The hashed password to compare against.
 *
 * @returns {Promise<boolean>} - A promise that resolves to true if the passwords match, or false otherwise.
 */
function comparePassword(password, hashed) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt_1.default.compare(password, hashed);
    });
}
;
/**
 * Sanitizes the given admin/customer model into a {@link TAuthUser} object suitable for returning in an API response.
 * This function removes any sensitive information from the model and returns only the relevant information for the user.
 * @param {IAdmin | ICustomer} model - The admin or customer model to sanitize.
 * @returns {TAuthUser} - The sanitized user object.
 */
function sanitizeAuthUser(model) {
    let is_tfa_verified, is_email_otp_verified;
    if ('is_tfa_verified' in model)
        is_tfa_verified = model.is_tfa_verified;
    if ('is_email_otp_verified' in model)
        is_email_otp_verified = model.is_email_otp_verified;
    return {
        _id: model._id.toString(),
        first_name: model.first_name,
        last_name: model.last_name,
        email: model.email,
        is_tfa_verified,
        is_email_otp_verified
    };
}
/**
 * Creates an authentication response object for a given admin or customer model.
 * This function is used to create a response to the /login endpoint.
 *
 * @param {IAdmin | ICustomer} model - The admin or customer model to create the response for.
 *
 * @returns {TAuthReponse} - The authentication response object containing the access and refresh tokens, and the user object.
 */
function createAuthResponse(model) {
    return {
        access_token: (0, jwt_1.createAccessToken)({ _id: model._id }),
        refresh_token: (0, jwt_1.createRefreshToken)({ _id: model._id }),
        expires_in: jwt_constant_1.ACCESS_TOKEN_EXPIRATION_TIME_IN_SECONDS,
        refresh_expires_in: jwt_constant_1.REFRESH_TOKEN_EXPIRATION_TIME_IN_SECONDS,
        user: sanitizeAuthUser(model)
    };
}
/**
 * Validates the given login credentials, throwing exceptions if either the email or password are not provided.
 * This function is used to validate the input to the /login endpoint.
 *
 * @param {TAuthRequest} credentials - The login credentials to validate.
 *
 * @throws {EmailIsNotProvidedException} If the email is not provided.
 * @throws {PasswordNotProvidedException} If the password is not provided.
 */
function validateLoginInput(credentials) {
    const { email, password } = credentials;
    if (!email)
        throw new EmailIsNotProvidedException_1.default();
    if (!password)
        throw new PasswordNotProvidedException_1.default();
}
function validateRegistrationInput(registerationRequest) {
    const { first_name, email, wallet_address, sol_wallet_address, password } = registerationRequest;
    if ((0, validation_utils_1.validatePassword)(password) === false)
        throw new PasswordValidationException_1.default();
    if ((0, validation_utils_1.validateName)(first_name) === false)
        throw new FirstNameNotProvidedException_1.default();
    if ((0, validation_utils_1.validateEmail)(email) === false)
        throw new EmailIsNotProvidedException_1.default();
    if (!wallet_address)
        throw new EVMWalletNotProvidedException_1.default();
    if (!sol_wallet_address)
        throw new SolWalletNotProvidedException_1.default();
}
/**
 * Generates a 6-digit one-time password (OTP) as a number.
 *
 * @returns {number} The generated OTP.
 */
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}
/**
 * Generates a random string of the given length using the characters in the RANDOM_PASSWORD_CHARACTERS constant.
 *
 * @param {number} length - The length of the string to generate.
 *
 * @returns {string} - The generated random string.
 */
function generateRandomString(length) {
    const characters = auth_constant_1.RANDOM_PASSWORD_CHARACTERS;
    return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}
/**
 * Verifies a Time-based One-Time Password (TOTP) using the provided code and secret.
 * This function uses the speakeasy library to verify the TOTP against the given secret.
 *
 * @param {string} code - The TOTP code to verify.
 * @param {string} secret - The secret key used to generate the TOTP.
 *
 * @returns {boolean} - Returns true if the TOTP is valid, otherwise false.
 */
function verifyTfa(code, secret) {
    return speakeasy_1.default.totp.verify({
        secret: secret,
        encoding: "base32",
        token: code,
    });
}
