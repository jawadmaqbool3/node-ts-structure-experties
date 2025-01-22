import { Response, NextFunction, Request } from "express";
import { IExtendedCustomerRequest } from "../interfaces/request.interface";
import { verifyAccessToken } from "../utils/jwt";
import { getBearerToken } from "../utils/request.utils";
import CustomerRepository from "../repositories/CustomerRepository";
import AccessTokenNotFoundException from "../exceptions/middlewares/AccessTokenNotFoundException";
import InvalidAccessTokenProvidedException from "../exceptions/middlewares/InvalidAccessTokenProvidedException";
import { ICustomer } from "../interfaces/models/customer.interface";



export default function validateCustomer(STRICT_MODE: boolean = true) {
    return async (req: Request | IExtendedCustomerRequest, res: Response, next: NextFunction) => {
        try {
            const token = getBearerToken(req);
            if (STRICT_MODE || token) {
                if (!token) throw new AccessTokenNotFoundException();
                let { _id } = verifyAccessToken(token);
                let customer = await (new CustomerRepository()).findById(_id);
                if (!customer) throw new InvalidAccessTokenProvidedException();
                const extendedRequest: IExtendedCustomerRequest = req;
                const requestCustomer: ICustomer = customer;
                extendedRequest.customer = requestCustomer;
            };
            next();
        } catch (err) {
            next(err);
        }
    }

}