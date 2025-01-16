import { Response, NextFunction, Request } from "express";
import { IIPCheckedRequest } from "../interfaces/request.interface";
import { stringifyIfObj } from "../utils/json.utils";
import { encryptSalesPagePayload } from "../utils/encryption.utils";

/**
 * Encrypts any response body sent back to the client by converting it to a JSON string.
 *
 * @param {Request | IIPCheckedRequest} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
export default function encryptResponse(
  req: Request | IIPCheckedRequest,
  res: Response,
  next: NextFunction
) {
  const originalSend = res.send;

  res.send = function (body: any): Response<object> {
    if (typeof body === "object" && body.payload === undefined) {
     
      const { message, ...rest } = body;

      body = {
        message,
        payload: encryptSalesPagePayload(stringifyIfObj(rest)),
      };
    }
    return originalSend.call(this, body);
  };

  next();
}