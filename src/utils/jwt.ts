import { JWT_SECRET } from "../constants/env.constant";
import TokenExpiredException from "../exceptions/jwt/TokenExpiredException";
import jwt from "jsonwebtoken";





/**
 * Verifies a given JWT token.
 *
 * @param token The JWT token to verify.
 *
 * @throws {TokenExpiredException} If the token is expired.
 *
 * @returns The decoded token payload.
 */
export function verify(token: string): any {
    try {
        return jwt.verify(token, JWT_SECRET);
    }
    catch (err) {
        throw new TokenExpiredException();
    }
}
