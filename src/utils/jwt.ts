import { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } from "../constants/env.constant";
import { ACCESS_TOKEN_EXPIRATION_TIME, REFRESH_TOKEN_EXPIRATION_TIME } from "../constants/jwt.constant";
import TokenExpiredException from "../exceptions/jwt/TokenExpiredException";
import jwt from "jsonwebtoken";





/**
 * Verifies a given JWT token.
 *
 * @param token The JWT token to verifyAccessToken.
 *
 * @throws {TokenExpiredException} If the token is expired.
 *
 * @returns The decoded token payload.
 */
export function verifyAccessToken(token: string): any {
    try {
        return jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);
    }
    catch (err) {
        throw new TokenExpiredException();
    }
}


/**
 * Verifies a given refresh JWT token.
 *
 * @param token The refresh JWT token to verifyAccessToken.
 *
 * @throws {TokenExpiredException} If the token is expired.
 *
 * @returns The decoded token payload.
 */
export function verifyRefreshToken(token: string): any {
    try {
        return jwt.verify(token, JWT_REFRESH_TOKEN_SECRET);
    }
    catch (err) {
        throw new TokenExpiredException();
    }
}

/**
 * Creates a JWT access token given a payload.
 *
 * @param payload The payload to create the JWT token from.
 *
 * @returns The created JWT token.
 */
export function createAccessToken(payload: object): string {
    return jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION_TIME });
}


/**
 * Creates a JWT refresh token given a payload.
 *
 * @param payload The payload to create the JWT refresh token from.
 *
 * @returns The created JWT refresh token.
 */

export function createRefreshToken(payload: object): string {
    return jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION_TIME });
}
