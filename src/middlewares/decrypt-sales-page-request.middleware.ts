import { Response, NextFunction, Request } from "express";
import EncryptedPayloadNotFound from "../exceptions/middlewares/EncryptedPayloadNotFound";
import { decryptSalesPagePayload } from "../utils/encryption.utils";
import { parseIfJson } from "../utils/json.utils";
import { IIPCheckedRequest } from "../interfaces/request.interface";


/**
 * Decrypts any incoming request body that has a payload field, decrypts it with the sales page encryption key, and replaces the request body with the decrypted payload.
 *
 * @param {Request | IIPCheckedRequest} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
export default function decryptSalesPageRequest(req: Request | IIPCheckedRequest, res: Response, next: NextFunction) {
    if (req.method === 'POST' || req.method === 'PUT') {
        const { payload } = req.body;
        if (!payload) throw new EncryptedPayloadNotFound();

        const decryptedPayload = decryptSalesPagePayload(payload);

        delete req.body.payload;
        req.body = parseIfJson(decryptedPayload);
    }

    next();
}