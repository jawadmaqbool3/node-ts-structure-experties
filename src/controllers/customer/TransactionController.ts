import Controller from "../Controller";
import { Response, NextFunction } from "express";
import { IExtendedCustomerRequest } from "../../interfaces/request.interface";
import TransactionService from "../../services/TransactionService";
import { TFilter } from "../../types/pagination.type";


export default class TransactionController extends Controller {
    /**
     * Constructor
     *
     * @param {TransactionService} transactionService - transaction service
     */
    constructor(
        private transactionService = new TransactionService()
    ) {
        super();
    }
    /**
     * Lists all the transactions for the given customer.
     *
     * @param {IExtendedCustomerRequest} req - The request object with the customer object.
     * @param {Response} res - The response object to send the list of transactions in.
     * @param {NextFunction} next - The next function to pass the error to if list fails.
     *
     * @returns {Promise<void>}
     */
    public async list(req: IExtendedCustomerRequest, res: Response, next: NextFunction) {
        try {
            const filters: TFilter = req.query;
            const customer = req.customer;
            const transactions = customer ? await this.transactionService.customerList(customer, filters) : null;
            return this.prepareSuccess(res, transactions as object);
        } catch (error) {
            next(error);
        }

    }
}

