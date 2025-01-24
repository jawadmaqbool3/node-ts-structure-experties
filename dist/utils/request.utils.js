"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIp = getIp;
exports.getBearerToken = getBearerToken;
const request_ip_1 = __importDefault(require("request-ip"));
/**
 * Gets the IP address of the client making the request.
 *
 * @param {Request} req - The Express request object.
 *
 * @returns {string | null} The IP address of the client, or null if it could not be determined.
 */
function getIp(req) {
    return request_ip_1.default.getClientIp(req);
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
function getBearerToken(req) {
    var _a, _b;
    let token = null;
    if (((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) && req.headers.authorization.startsWith("Bearer"))
        token = req.headers.authorization.split(" ")[1];
    else if ((_b = req === null || req === void 0 ? void 0 : req.cookies) === null || _b === void 0 ? void 0 : _b.auth)
        token = req.cookies.auth;
    return token;
}
