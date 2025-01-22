import Controller from "../Controller";
import { Response, NextFunction } from "express";
import { IExtendedCustomerRequest } from "../../interfaces/request.interface";
import TransactionService from "../../services/TransactionService";
import { TFilter } from "../../types/pagination.type";


export default class TransactionController extends Controller {
    constructor(
        private transactionService = new TransactionService()
    ) {
        super();
    }
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

