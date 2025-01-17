import { Response, NextFunction, Request } from "express";
import { IExtendedCustomerRequest } from "../interfaces/request.interface";
import { verify } from "../utils/jwt";
import CustomerRepository from "../repositories/CustomerRepository";
import { TRequestCustomer } from "../types/customer.type";
import { getBearerToken } from "../utils/request.utils";


/**
 * Middleware to check and validate the customer from the incoming request.
 * This middleware extracts the Bearer token from the request, verifies it,
 * and uses the token's payload to find the associated customer in the database.
 * If the customer is found, it extends the request object with the customer details.
 *
 * @param {Request | IExtendedCustomerRequest} req - Express request object that may contain a Bearer token in headers or cookies.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function to pass control to the next middleware.
 *
 * @throws Will pass any errors to the next middleware, including token verification errors or database access issues.
 */

export default async function validateIfAccessToken(req: Request | IExtendedCustomerRequest, res: Response, next: NextFunction) {
    try {
        const token = getBearerToken(req);

        if (token) {
            let { _id } = verify(token);
            let customer = await (new CustomerRepository()).findById(_id);
            if (customer) {
                const extendedRequest: IExtendedCustomerRequest = req;
                const requestCustomer: TRequestCustomer = customer;
                extendedRequest.customer = requestCustomer;
            }
        }

        next();
    } catch (err) {
        next(err);
    }

}