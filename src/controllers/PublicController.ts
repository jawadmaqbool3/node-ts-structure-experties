import { NextFunction, Request, Response } from 'express';
import Controller from './Controller';
import PublicService from '../services/PublicService';

export default class PublicController extends Controller<PublicService> {
    constructor() {
        super(new PublicService());
    }

    public async  getInitialSalesPageParams(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const params = await this.service.getInitialSalesPageParams();
            res.status(200).json({ params });
        } catch (error) {
            next(error);
        }        
    }
}

