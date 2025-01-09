import requestIp from 'request-ip';
import { Request } from "express";

/**
 * Gets the IP address of the client making the request.
 *
 * @param {Request} req - The Express request object.
 *
 * @returns {string | null} The IP address of the client, or null if it could not be determined.
 */
export default function getIp(req: Request) {
    return requestIp.getClientIp(req);
}