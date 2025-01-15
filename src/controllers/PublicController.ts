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
import { TCreateTransactionRequest, TUpdateTransactionRequest } from '../types/transaction.type';
import TransactionService from '../services/TransactionService';
import ReferralService from '../services/ReferralService';

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
        private stripeService = new StripeService(),
        private transactionService = new TransactionService(),
        private referralService = new ReferralService(),
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
        return this.prepareSuccess(res, { params });
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
        return this.prepareSuccess(res, { order });
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
        return this.prepareSuccess(res, { isTrunkHolder });
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
        return this.prepareSuccess(res, { roundValues });
    }
    /**
     * Creates a stripe payment intent
     *
     * @param {IIPCheckedRequest} req - request
     * @param {Response} res - response
     *
     * @returns {Promise<void>}
     */
    public async createStripePaymentIntent(req: IIPCheckedRequest, res: Response): Promise<void> {
        const intentRequest: TPaymentIntentCreateRequest = {
            ...req.body
        }
        const paymentIntent = await this.stripeService.createPaymentIntent(intentRequest);
        return this.prepareSuccess(res, { paymentIntent });
    }
    /**
     * Creates a new transaction based on the request body and returns the created transaction.
     *
     * @param {IIPCheckedRequest} req - The incoming request containing transaction details in the body.
     * @param {Response} res - The response object used to return the result of the transaction creation.
     *
     * @returns {Promise<void>} - A promise that resolves when the response is sent back to the client.
     */
    public async createTransaction(req: IIPCheckedRequest, res: Response): Promise<void> {
        const transactionRequest: TCreateTransactionRequest = {
            ...req.body
        }
        const transaction = await this.transactionService.createTransaction(transactionRequest);
        return this.prepareSuccess(res, { transaction });
    }

    /**
     * Updates an existing transaction based on the request body and returns the updated transaction.
     *
     * @param {IIPCheckedRequest} req - The incoming request containing transaction details in the body.
     * @param {Response} res - The response object used to return the result of the transaction creation.
     *
     * @returns {Promise<void>} - A promise that resolves when the response is sent back to the client.
     */
    public async updateTransaction(req: IIPCheckedRequest, res: Response): Promise<void> {
        const transactionRequest: TUpdateTransactionRequest = {
            ...req.body
        }
        const transaction = await this.transactionService.updateTransaction(transactionRequest);
        return this.prepareSuccess(res, { transaction });
    }


    /**
     * Retrieves referral information based on the referral ID provided in the request parameters.
     *
     * @param {IIPCheckedRequest} req - The incoming request containing the referral ID in the parameters.
     * @param {Response} res - The response object used to return the referral information.
     *
     * @returns {Promise<void>} - A promise that resolves when the response is sent back to the client.
     */

    public async getReferralInfo(req: IIPCheckedRequest, res: Response): Promise<void> {
        const { refferal_id } = req.params;
        const transaction = await this.referralService.getReferralInfo(refferal_id);
        return this.prepareSuccess(res, { transaction });
    }
}

