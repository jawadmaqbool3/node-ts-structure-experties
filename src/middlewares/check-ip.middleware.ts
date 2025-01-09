import { Response, NextFunction, Request } from "express";
import {IIPCheckedRequest} from "../interfaces/request.interface";
import IpNotFoundException from "../exceptions/IpNotFoundException";
import getIp from "../utils/request.utils";

export default function checkIP(req: Request, res: Response, next: NextFunction) {

    const ip = getIp(req); 

    if(!ip) {
        throw new IpNotFoundException();
    }

    let ipCheckedRequest : IIPCheckedRequest = req; 

    ipCheckedRequest.checkedIp = ip;

    next();
}