import { Response, NextFunction, Request } from "express";
import EncryptedPayloadNotFound from "../exceptions/middlewares/EncryptedPayloadNotFound";
import { decryptSalesPagePayload } from "../utils/encryption.utils";
import { parseIfJson } from "../utils/json.utils";
import { IIPCheckedRequest } from "../interfaces/request.interface";

/**
 * Decodes an encrypted payload from the request body and assigns it to the
 * request body as a plain object. If no payload is present, throws an
 * EncryptedPayloadNotFound exception.
 *
 * @param {Request | IIPCheckedRequest} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next function
 */
export default function decryptRequest(req: Request | IIPCheckedRequest, res: Response, next: NextFunction) {
    if (req.method === 'POST' || req.method === 'PUT') {
        const { payload } = req.body;
        if (!payload) throw new EncryptedPayloadNotFound();
   
        const decryptedPayload = decryptSalesPagePayload(payload);
      
        delete req.body.payload;
        req.body = parseIfJson(decryptedPayload);
    }

    next();
}