import { NextFunction, Response } from "express";
import { IExtendedCustomerRequest } from "../../interfaces/request.interface";
import Controller from "../Controller";
import { TFilter } from "../../types/pagination.type";
import CustomerService from "../../services/CustomerService";
import CommissionService from "../../services/CommissionService";


export default class CommissionController extends Controller {

    /**
     * Constructor
     *
     * @param {CommissionService} [commissionService=new CommissionService()] - commission service
     */
    constructor(
        private commissionService = new CommissionService(),
    ) {
        super();
    }


    /**
     * Retrieves a list of commissions given to the given customer.
     *
     * @param {IExtendedCustomerRequest} req - The request object with the customer object.
     * @param {Response} res - The response object to send the list of transactions in.
     * @param {NextFunction} next - The next function to pass the error to if list fails.
     *
     * @returns {Promise<void>}
     */
    public async list(req: IExtendedCustomerRequest, res: Response, next: NextFunction): Promise<void> {

        try {
            const filters: TFilter = req.query;
            const customer = req.customer;
            const transactions = customer ? await this.commissionService.customerCommissionList(customer, filters) : null;
            return this.prepareSuccess(res, transactions as object);
        } catch (error) {
            next(error);
        }
    }

}

