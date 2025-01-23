import bcrypt from 'bcrypt';
import { AUTH_SALT } from '../constants/env.constant';
import PasswordEncryptionFailedException from '../exceptions/auth/PasswordEncryptionFailedException';
import { IAdmin } from '../interfaces/models/admin.interface';
import { ICustomer } from '../interfaces/models/customer.interface';
import { TAuthReponse, TAuthRequest, TAuthUser, TCustomRegistrationRequest } from '../types/auth.type';
import { createAccessToken, createRefreshToken } from './jwt';
import EmailIsNotProvidedException from '../exceptions/input-validations/EmailIsNotProvidedException';
import PasswordNotProvidedException from '../exceptions/input-validations/PasswordNotProvidedException';
import { ACCESS_TOKEN_EXPIRATION_TIME_IN_SECONDS, REFRESH_TOKEN_EXPIRATION_TIME_IN_SECONDS } from '../constants/jwt.constant';
import { validateEmail, validateName, validatePassword } from './validation.utils';
import PasswordValidationException from '../exceptions/input-validations/PasswordValidationException';
import EVMWalletNotProvidedException from '../exceptions/input-validations/EVMWalletNotProvidedException';
import SolWalletNotProvidedException from '../exceptions/input-validations/SolWalletNotProvidedException';
import { RANDOM_PASSWORD_CHARACTERS } from '../constants/auth.constant';
import speakeasy from 'speakeasy';

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
export async function hashPassword(password: string): Promise<string> {
    try {
        return bcrypt.hash(password, AUTH_SALT);
    } catch (err) {
        throw new PasswordEncryptionFailedException();
    }
};

/**
 * Compares a plaintext password with a hashed password to check for a match.
 *
 * @param {string} password - The plaintext password to verify.
 * @param {string} hashed - The hashed password to compare against.
 *
 * @returns {Promise<boolean>} - A promise that resolves to true if the passwords match, or false otherwise.
 */

export async function comparePassword(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed);
};



/**
 * Sanitizes the given admin/customer model into a {@link TAuthUser} object suitable for returning in an API response.
 * This function removes any sensitive information from the model and returns only the relevant information for the user.
 * @param {IAdmin | ICustomer} model - The admin or customer model to sanitize.
 * @returns {TAuthUser} - The sanitized user object.
 */
export function sanitizeAuthUser(model: IAdmin | ICustomer): TAuthUser {
    let is_tfa_verified, is_email_otp_verified;
    if ('is_tfa_verified' in model) is_tfa_verified = model.is_tfa_verified;
    if ('is_email_otp_verified' in model) is_email_otp_verified = model.is_email_otp_verified;
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
export function createAuthResponse(model: IAdmin | ICustomer): TAuthReponse {
    return {
        access_token: createAccessToken({ _id: model._id }),
        refresh_token: createRefreshToken({ _id: model._id }),
        expires_in: ACCESS_TOKEN_EXPIRATION_TIME_IN_SECONDS,
        refresh_expires_in: REFRESH_TOKEN_EXPIRATION_TIME_IN_SECONDS,
        user: sanitizeAuthUser(model)
    }
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
export function validateLoginInput(credentials: TAuthRequest): void {
    const { email, password } = credentials;
    if (!email) throw new EmailIsNotProvidedException();
    if (!password) throw new PasswordNotProvidedException();
}


export function validateRegistrationInput(registerationRequest: TCustomRegistrationRequest): void {
    const {
        first_name,
        email,
        wallet_address,
        sol_wallet_address,
        password
    } = registerationRequest;
    if (validatePassword(password) === false) throw new PasswordValidationException();
    if (validateName(first_name) === false) throw new EmailIsNotProvidedException();
    if (validateEmail(email) === false) throw new EmailIsNotProvidedException();
    if (!wallet_address) throw new EVMWalletNotProvidedException();
    if (!sol_wallet_address) throw new SolWalletNotProvidedException();
}



/**
 * Generates a 6-digit one-time password (OTP) as a number.
 *
 * @returns {number} The generated OTP.
 */
export function generateOTP(): number {
    return Math.floor(100000 + Math.random() * 900000);
}



/**
 * Generates a random string of the given length using the characters in the RANDOM_PASSWORD_CHARACTERS constant.
 *
 * @param {number} length - The length of the string to generate.
 *
 * @returns {string} - The generated random string.
 */
export function generateRandomString(length: number): string {
    const characters = RANDOM_PASSWORD_CHARACTERS;
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

export function verifyTfa(code: string, secret: string): boolean {
    return speakeasy.totp.verify({
        secret: secret,
        encoding: "base32",
        token: code,
    });
}