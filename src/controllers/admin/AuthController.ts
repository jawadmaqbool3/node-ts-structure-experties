import Controller from "../Controller";
import { Response, NextFunction } from "express";
import { IExtendedCustomerRequest } from "../../interfaces/request.interface";


export default class AuthController extends Controller {
   
    constructor(
      
    ) {
        super();
    }
    

    public login(req: IExtendedCustomerRequest, res: Response, next: NextFunction) {

    }
}

