import { Response, NextFunction, Request } from "express";
import requestIp  from 'request-ip';
import {IIPCheckedRequest} from "../interfaces/request";

export default function checkIP(req: Request, res: Response, next: NextFunction) {

    const ip = requestIp.getClientIp(req); 

    let ipCheckedRequest : IIPCheckedRequest = req; 

    ipCheckedRequest.checkedIp = ip;

    next();
}