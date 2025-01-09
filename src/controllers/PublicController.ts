import { Response } from 'express';
import Controller from './Controller';
import SalesPageService from '../services/SalesPageService';
import { IIPCheckedRequest } from '../interfaces/request.interface';
import { TPlaceOrderRequestParams } from '../types/nft-order.type';
import NftOrderService from '../services/NftOrderService';
import TrunkHolderService from '../services/TrunkHolderService';
import RoundValuesService from '../services/RoundValuesService';
import { TGetRoundValuesParams } from '../types/nft-values.type';
import { TPaymentIntentCreateRequest } from '../types/stripe.type';
import StripeService from '../services/StripeService';

export default class PublicController extends Controller {

    /**
     * Constructor
     *
     * @param {SalesPageService} salesPageService - sales page service
     * @param {NftOrderService} nftOrderService - nft order service
     * @param {TrunkHolderService} trunkHolderService - trunk holder service
     * @param {RoundValuesService} roundValueService - round value service
     */
    constructor(
        private salesPageService = new SalesPageService(),
        private nftOrderService = new NftOrderService(),
        private trunkHolderService = new TrunkHolderService(),
        private roundValueService = new RoundValuesService(),
        private stripeService = new StripeService()
    ) {
        super();
    }

    /**
     * Get initial sales page parameters
     *
     * @param {IIPCheckedRequest} req - request
     * @param {Response} res - response
     *
     * @returns {Promise<void>}
     */
    public async getInitialSalesPageParams(req: IIPCheckedRequest, res: Response): Promise<void> {
        const params = req.checkedIp ? await this.salesPageService.prepareInitialSalesPageParams(req.checkedIp) : [];
        return this.returnSuccess(res, { params });
    }

    /**
     * Place order
     *
     * @param {IIPCheckedRequest} req - request
     * @param {Response} res - response
     *
     * @returns {Promise<void>}
     */
    public async placeOrder(req: IIPCheckedRequest, res: Response): Promise<void> {
        const orderParams: TPlaceOrderRequestParams = {
            ip: req.checkedIp,
            ...req.body
        };
        const order = req.checkedIp ? await this.nftOrderService.placeOrder(orderParams) : null;
        return this.returnSuccess(res, { order });
    }

    /**
     * Check if given wallet address is a trunk holder
     *
     * @param {IIPCheckedRequest} req - request
     * @param {Response} res - response
     *
     * @returns {Promise<void>}
     */
    public async checkTrunkHolder(req: IIPCheckedRequest, res: Response): Promise<void> {
        const wallet_address: string = req.body.wallet_address;
        const isTrunkHolder = await this.trunkHolderService.isTrunkHolder(wallet_address);
        return this.returnSuccess(res, { isTrunkHolder });
    }

    /**
     * Get round values
     *
     * @param {IIPCheckedRequest} req - request
     * @param {Response} res - response
     *
     * @returns {Promise<void>}
     */
    public async getNftRoundValues(req: IIPCheckedRequest, res: Response): Promise<void> {
        
        const queryParams: TGetRoundValuesParams = {
            ...req.body
        };
        
        const roundValues = await this.roundValueService.getRoundValues(queryParams);
        
        return this.returnSuccess(res, { roundValues });
    }


    public async createStripePaymentIntent(req: IIPCheckedRequest, res: Response): Promise<void> {
        const intentRequest: TPaymentIntentCreateRequest = {
            ...req.body
        }
        const paymentIntent = await this.stripeService.createPaymentIntent(intentRequest);
        return this.returnSuccess(res, { paymentIntent });
    }
}

