import { Request } from "express";

export  interface IIPCheckedRequest extends Request {
    checkedIp?: string | null ;
}