import requestIp from 'request-ip';
import { Request } from "express";
import { IExtendedCustomerRequest } from '../interfaces/request.interface';

/**
 * Gets the IP address of the client making the request.
 *
 * @param {Request} req - The Express request object.
 *
 * @returns {string | null} The IP address of the client, or null if it could not be determined.
 */
export function getIp(req: Request): string | null {
    return requestIp.getClientIp(req);
}


/**
 * Retrieves the Bearer token from the request. It first checks the
 * Authorization header, and if that doesn't exist, it checks the
 * 'auth' cookie. If neither exists, it returns null.
 *
 * @param {Request} req - The Express request object.
 *
 * @returns {string | null} The Bearer token, or null if it could not be determined.
 */
export function getBearerToken(req: Request | IExtendedCustomerRequest): string | null {
    let token: string | null = null;

    if (req?.headers?.authorization && req.headers.authorization.startsWith("Bearer"))
        token = req.headers.authorization.split(" ")[1];

    else if (req?.cookies?.auth)
        token = req.cookies.auth

    return token
}