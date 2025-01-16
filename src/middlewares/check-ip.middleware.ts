import { Response, NextFunction, Request } from "express";
import { IIPCheckedRequest } from "../interfaces/request.interface";
import IpNotFoundException from "../exceptions/middlewares/IpNotFoundException";
import getIp from "../utils/request.utils";

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
export default function checkIP(req: Request, res: Response, next: NextFunction) {

    const ip = getIp(req);

    if (!ip) {
        throw new IpNotFoundException();
    }

    let ipCheckedRequest: IIPCheckedRequest = req;

    ipCheckedRequest.checkedIp = ip;

    next();
}