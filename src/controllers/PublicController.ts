import { NextFunction, response, Response } from 'express';
import Controller from './Controller';
import PublicService from '../services/PublicService';
import { IIPCheckedRequest } from '../interfaces/request.interface';

export default class PublicController extends Controller {

    constructor(
        private publicService = new PublicService()
    ) {
        super();
    }

    public async getInitialSalesPageParams(req: IIPCheckedRequest, res: Response, next: NextFunction): Promise<void> {
        const params = req.checkedIp ? await this.publicService.prepareInitialSalesPageParams(req.checkedIp) : [];
        res.status(200).json({ params });
    }
}

