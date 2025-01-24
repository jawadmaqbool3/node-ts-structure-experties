"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = encryptSalesPageResponse;
const json_utils_1 = require("../utils/json.utils");
const encryption_utils_1 = require("../utils/encryption.utils");
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
function encryptSalesPageResponse(req, res, next) {
    const originalSend = res.send;
    res.send = function (body) {
        if (typeof body === "object" && body.payload === undefined) {
            const { message } = body, rest = __rest(body, ["message"]);
            body = {
                message,
                payload: (0, encryption_utils_1.encryptSalesPagePayload)((0, json_utils_1.stringifyIfObj)(rest)),
            };
        }
        return originalSend.call(this, body);
    };
    next();
}
