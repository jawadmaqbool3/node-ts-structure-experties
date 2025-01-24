"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateIp;
const IpNotFoundException_1 = __importDefault(require("../exceptions/middlewares/IpNotFoundException"));
const request_utils_1 = require("../utils/request.utils");
/**
 * Middleware that checks if the client's IP address is available and
 * if so, assigns it to the request object so that it can be accessed
 * by the controller.
 *
 * @function validateIp
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next
 */
function validateIp(req, res, next) {
    const ip = (0, request_utils_1.getIp)(req);
    if (!ip) {
        throw new IpNotFoundException_1.default();
    }
    let ipCheckedRequest = req;
    ipCheckedRequest.checkedIp = ip;
    next();
}
