import { Request } from "express";
import { TRequestCustomer } from "../types/customer.type";

export  interface IExtendedCustomerRequest extends Request {
    checkedIp?: string | null ;
    customer?: TRequestCustomer 
}