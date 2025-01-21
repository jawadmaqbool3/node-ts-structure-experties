import { Request } from "express";
import { TRequestCustomer } from "../types/customer.type";
import { TRequestAdmin } from "../types/admin.type";
import { ICustomer } from "./models/customer.interface";
import { IAdmin } from "./models/admin.interface";

export  interface IExtendedCustomerRequest extends Request {
    checkedIp?: string | null ;
    customer?: ICustomer 
}

export  interface IExtendedAdminRequest extends Request {
    checkedIp?: string | null ;
    admin?: IAdmin 
}