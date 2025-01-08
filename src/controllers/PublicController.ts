import { NextFunction, response, Response } from 'express';
import Controller from './Controller';
import SalesPageService from '../services/SalesPageService';
import { IIPCheckedRequest } from '../interfaces/request.interface';
import { TPlaceOrderRequestParams } from '../types/place-order.type';
import NftOrderService from '../services/NftOrderService';

export default class PublicController extends Controller {

    constructor(
        private salesPageService = new SalesPageService(),
        private nftOrderService = new NftOrderService(),
    ) {
        super();
    }

    public async getInitialSalesPageParams(req: IIPCheckedRequest, res: Response, next: NextFunction): Promise<void> {
        const params = req.checkedIp ? await this.salesPageService.prepareInitialSalesPageParams(req.checkedIp) : [];
        res.status(200).json({ params });
    }

    public async placeOrder(req: IIPCheckedRequest, res: Response, next: NextFunction): Promise<void> {
        const orderParams: TPlaceOrderRequestParams = {
            ip: req.checkedIp,
            ...req.body
        };
        const order = req.checkedIp ? await this.nftOrderService.placeOrder(orderParams) : null;
        res.status(200).json({ order });
    }
}

