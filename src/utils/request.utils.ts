import requestIp from 'request-ip';
import { Request } from "express";

export default function getIp(req: Request) {
    return requestIp.getClientIp(req);
}