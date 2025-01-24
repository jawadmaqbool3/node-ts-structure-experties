"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = verifyAccessToken;
exports.verifyRefreshToken = verifyRefreshToken;
exports.createAccessToken = createAccessToken;
exports.createRefreshToken = createRefreshToken;
const env_constant_1 = require("../constants/env.constant");
const jwt_constant_1 = require("../constants/jwt.constant");
const TokenExpiredException_1 = __importDefault(require("../exceptions/jwt/TokenExpiredException"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Verifies a given JWT token.
 *
 * @param token The JWT token to verifyAccessToken.
 *
 * @throws {TokenExpiredException} If the token is expired.
 *
 * @returns The decoded token payload.
 */
function verifyAccessToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, env_constant_1.JWT_ACCESS_TOKEN_SECRET);
    }
    catch (err) {
        throw new TokenExpiredException_1.default();
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
function verifyRefreshToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, env_constant_1.JWT_REFRESH_TOKEN_SECRET);
    }
    catch (err) {
        throw new TokenExpiredException_1.default();
    }
}
/**
 * Creates a JWT access token given a payload.
 *
 * @param payload The payload to create the JWT token from.
 *
 * @returns The created JWT token.
 */
function createAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, env_constant_1.JWT_ACCESS_TOKEN_SECRET, { expiresIn: jwt_constant_1.ACCESS_TOKEN_EXPIRATION_TIME_IN_SECONDS });
}
/**
 * Creates a JWT refresh token given a payload.
 *
 * @param payload The payload to create the JWT refresh token from.
 *
 * @returns The created JWT refresh token.
 */
function createRefreshToken(payload) {
    return jsonwebtoken_1.default.sign(payload, env_constant_1.JWT_ACCESS_TOKEN_SECRET, { expiresIn: jwt_constant_1.REFRESH_TOKEN_EXPIRATION_TIME_IN_SECONDS });
}
