import CurrencyAmountCannotBeZeroException from "../exceptions/transaction/CurrencyAmountCannotBeZeroException";
import { ITransaction } from "../interfaces/models/transaction.interface";
import NftRoundRepository from "../repositories/NftRoundRepository";
import TransactionRepository from "../repositories/TransactionRepository";
import { TCreateTransactionRequest } from "../types/transaction.type";
import Service from "./Service";
import NftOrderRepository from "../repositories/NftOrderRepository";
import ReferralRepository from "../repositories/ReferralRepository";
import CustomerRepository from "../repositories/CustomerRepository";
import { toObjectId } from "../utils/mongoos.utils";
import { CurrencyTypes } from "../enums/transaction.enum";


export default class TransactionService extends Service {
    constructor(
        private transactionRepository = new TransactionRepository(),
        private nftRoundRepository = new NftRoundRepository(),
        private nftOrderRepository = new NftOrderRepository(),
        private referralRepository = new ReferralRepository(),
        private customerRepository = new CustomerRepository(),
    ) {
        super();
    }

    public async createTransaction(transactionRequest: TCreateTransactionRequest): Promise<ITransaction> {
        const {
            round_id,
            order_id,
            referral_id,
            customer_id,
            currency_amount,
            currency_symbol,
            currency_contract_address,
            transaction_network,
            token_contract_address,
            currency_worth,
            wallet_address,
            chain_type,
        } = transactionRequest;

        if (currency_amount <= 0) throw new CurrencyAmountCannotBeZeroException();

        this.nftRoundRepository.validate(round_id);
        this.nftOrderRepository.validate(order_id);
        referral_id && this.referralRepository.validate(referral_id);
        customer_id && this.customerRepository.validate(customer_id);

        const transaction = await this.transactionRepository.create({
            currency_amount,
            currency_symbol: currency_symbol || CurrencyTypes.USDT,
            currency_contract_address,
            transaction_network,
            token_contract_address,
            currency_worth: currency_worth || 0,
            round_id:  toObjectId(round_id),
            order_id:  toObjectId(order_id),
            referral_id: referral_id? toObjectId(referral_id): null,
            customer_id: customer_id? toObjectId(customer_id): null,
            wallet_address: wallet_address || null,
            chain_type,
        });

        return transaction;
    }



    

}