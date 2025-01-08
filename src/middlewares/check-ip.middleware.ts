import { Response, NextFunction, Request } from "express";
import requestIp  from 'request-ip';
import {IIPCheckedRequest} from "../interfaces/request.interface";

export default function checkIP(req: Request, res: Response, next: NextFunction) {

    const ip = requestIp.getClientIp(req); 

    if(!ip) {
        throw new Error('IP not found');
    }

    let ipCheckedRequest : IIPCheckedRequest = req; 

    ipCheckedRequest.checkedIp = ip;

    next();
}