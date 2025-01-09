"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getIp;
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
