import { Response, NextFunction, Request } from "express";
import { IExtendedCustomerRequest } from "../interfaces/request.interface";
import { stringifyIfObj } from "../utils/json.utils";
import { encryptSalesPagePayload } from "../utils/encryption.utils";


/**
 * Encrypts the response body with the sales page encryption key before sending it.
 * If the response body is an object, it will be stringified and encrypted.
 * If the response body is a string, it will be encrypted as is.
 * The response body will be replaced with an object with a single property called
 * "payload" that contains the encrypted response body.
 * @param {Request | IExtendedCustomerRequest} req - request
 * @param {Response} res - response
 * @param {NextFunction} next - next function
 */
export default function encryptSalesPageResponse(
  req: Request | IExtendedCustomerRequest,
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