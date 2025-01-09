"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkIP;
const IpNotFoundException_1 = __importDefault(require("../exceptions/IpNotFoundException"));
const request_utils_1 = __importDefault(require("../utils/request.utils"));
/**
 * Middleware that checks if the client's IP address is available and
 * if so, assigns it to the request object so that it can be accessed
 * by the controller.
 *
 * @function checkIP
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next
 */
function checkIP(req, res, next) {
    const ip = (0, request_utils_1.default)(req);
    if (!ip) {
        throw new IpNotFoundException_1.default();
    }
    let ipCheckedRequest = req;
    ipCheckedRequest.checkedIp = ip;
    next();
}
