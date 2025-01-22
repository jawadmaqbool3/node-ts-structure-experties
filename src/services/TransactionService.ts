import CurrencyAmountCannotBeZeroException from "../exceptions/transaction/CurrencyAmountCannotBeZeroException";
import { ITransaction } from "../interfaces/models/transaction.interface";
import NftRoundRepository from "../repositories/NftRoundRepository";
import TransactionRepository from "../repositories/TransactionRepository";
import { TCreateTransactionRequest, TUpdateTransactionRequest } from "../types/transaction.type";
import Service from "./Service";
import NftOrderRepository from "../repositories/NftOrderRepository";
import ReferralRepository from "../repositories/ReferralRepository";
import CustomerRepository from "../repositories/CustomerRepository";
import { toObjectId } from "../utils/mongoos.utils";
import { ChainType, CurrencyTypes, TransactionStatus } from "../enums/transaction.enum";
import TransactionHashCannotBeEmptyException from "../exceptions/transaction/TransactionHashCannotBeEmptyException";
import { ICustomer } from "../interfaces/models/customer.interface";
import { TFilter, TPaginationResults } from "../types/pagination.type";
import { Model } from "mongoose";
import { prepareCustomerTransactionListQuery } from "../mongo/queries/transaction.query";


export default class TransactionService extends Service {
    /**
     * Constructor for TransactionService
     *
     * @param {TransactionRepository} transactionRepository - Repository for managing transactions
     * @param {NftRoundRepository} nftRoundRepository - Repository for managing NFT rounds
     * @param {NftOrderRepository} nftOrderRepository - Repository for managing NFT orders
     * @param {ReferralRepository} referralRepository - Repository for managing referrals
     * @param {CustomerRepository} customerRepository - Repository for managing customers
     */

    constructor(
        private transactionRepository = new TransactionRepository(),
        private nftRoundRepository = new NftRoundRepository(),
        private nftOrderRepository = new NftOrderRepository(),
        private referralRepository = new ReferralRepository(),
        private customerRepository = new CustomerRepository(),
    ) {
        super();
    }


    /**
     * Creates a new transaction with the given parameters after validating the
     * round, order, referral and customer IDs if they exist.
     *
     * @param {TCreateTransactionRequest} transactionRequest - The parameters required to create a transaction
     *
     * @returns {Promise<ITransaction>} - A promise that resolves to the created transaction
     *
     * @throws {CurrencyAmountCannotBeZeroException} - If the currency amount is zero or less
     * @throws {NftRoundNotFoundException} - If the round with the given ID cannot be found
     * @throws {NftOrderNotFoundException} - If the order with the given ID cannot be found
     * @throws {ReferralNotFoundException} - If the referral with the given ID cannot be found
     * @throws {CustomerNotFoundException} - If the customer with the given ID cannot be found
     */
    public async createTransaction(transactionRequest: TCreateTransactionRequest): Promise<ITransaction> {

        const {
            currency_amount,
            currency_symbol,
            currency_contract_address,
            transaction_network,
            token_contract_address,
            chain_type,
            round_id,
            order_id,
            referral_id,
            customer_id,
            transaction_hash,
            ...rest
        } = transactionRequest;

        await this.validateCreateTransactionRequest(transactionRequest);

        const sanitizedRequest = {
            ...rest,
            currency_amount,
            transaction_hash,
            currency_symbol: currency_symbol || CurrencyTypes.USDT,
            currency_contract_address,
            transaction_network,
            token_contract_address,
            round_id: toObjectId(round_id),
            order_id: toObjectId(order_id),
            referral_id: referral_id ? toObjectId(referral_id) : null,
            customer_id: customer_id ? toObjectId(customer_id) : null,
            chain_type,
        };

        const transaction = await this.transactionRepository.create(sanitizedRequest);

        return transaction;
    }


    /**
     * Updates an existing transaction with the provided parameters after validating
     * the transaction request.
     *
     * @param {TUpdateTransactionRequest} transactionRequest - The parameters required to update a transaction.
     *   - _id: The unique identifier of the transaction.
     *   - transaction_time: The timestamp of the transaction.
     *   - transaction_hash: The hash of the transaction.
     *   - transaction_status: The status of the transaction.
     *
     * @returns {Promise<ITransaction | null>} - A promise that resolves to the updated transaction
     * or null if no transaction was found with the given ID.
     *
     * @throws {TransactionNotFoundException} - If the transaction with the given ID cannot be found.
     * @throws {TransactionHashCannotBeEmptyException} - If the transaction status is successful
     * and the transaction hash is empty.
     */

    public async updateTransaction(transactionRequest: TUpdateTransactionRequest): Promise<ITransaction | null> {
        const {
            _id,
            transaction_time,
            transaction_hash,
            transaction_status,
        } = transactionRequest;

        await this.validateUpdateTransactionRequest(transactionRequest);

        return await this.transactionRepository.update(
            _id,
            {
                transaction_time,
                transaction_hash,
                transaction_status,
            }
        );

    }

    /**
     * Validates a transaction request by checking the existence of the round, order,
     * referral (if provided), and customer (if provided), and that the transaction
     * currency amount is greater than zero.
     *
     * @param {TCreateTransactionRequest} transactionRequest - The parameters required to create a transaction.
     *   - currency_amount: The amount of currency to be transferred.
     *   - round_id: The unique identifier of the round.
     *   - order_id: The unique identifier of the order.
     *   - referral_id: The unique identifier of the referral (optional).
     *   - customer_id: The unique identifier of the customer (optional).
     *
     * @throws {CurrencyAmountCannotBeZeroException} - If the currency amount is zero or less.
     * @throws {NftRoundNotFoundException} - If the round with the given ID cannot be found.
     * @throws {NftOrderNotFoundException} - If the order with the given ID cannot be found.
     * @throws {ReferralNotFoundException} - If the referral with the given ID cannot be found.
     * @throws {CustomerNotFoundException} - If the customer with the given ID cannot be found.
     */
    private async validateCreateTransactionRequest({
        round_id,
        order_id,
        referral_id,
        customer_id,
        currency_amount,
        chain_type,
        transaction_hash
    }: TCreateTransactionRequest): Promise<void> {
        if (currency_amount <= 0) throw new CurrencyAmountCannotBeZeroException();
        if (!transaction_hash &&
            chain_type === ChainType.BSC ||
            chain_type === ChainType.SOL ||
            chain_type === ChainType.ETH
        ) throw new TransactionHashCannotBeEmptyException();
        await this.nftRoundRepository.validate(round_id);
        await this.nftOrderRepository.validate(order_id);
        if (referral_id) await this.referralRepository.validate(referral_id);
        if (customer_id) await this.customerRepository.validate(customer_id);
    }

    /**
     * Validates an update transaction request by checking the existence of the
     * transaction and that the transaction hash is not empty if the transaction
     * status is successful.
     *
     * @param {TUpdateTransactionRequest} transactionRequest - The parameters required to update a
     * transaction.
     *   - _id: The unique identifier of the transaction.
     *   - transaction_hash: The hash of the transaction (optional).
     *   - transaction_status: The status of the transaction (optional).
     *
     * @throws {TransactionNotFoundException} - If the transaction with the given ID cannot be found.
     * @throws {TransactionHashCannotBeEmptyException} - If the transaction status is successful and the
     * transaction hash is empty.
     */
    private async validateUpdateTransactionRequest({ _id, transaction_hash, transaction_status }: TUpdateTransactionRequest): Promise<void> {
        await this.transactionRepository.validate(_id);
        if (transaction_status === TransactionStatus.SUCCESS && !transaction_hash) throw new TransactionHashCannotBeEmptyException()
    }


    /**
     * Retrieves a paginated list of transactions for a given customer based on the provided filters.
     *
     * @param {ICustomer} customer - The customer for whom to retrieve the transaction list.
     * @param {TFilter} filters - The filters to apply for pagination and searching.
     *
     * @returns {Promise<TPaginationResults<Model<ITransaction>>>} - A promise that resolves to the paginated results of the customer's transactions.
     */

    public async customerList(customer: ICustomer, filters: TFilter): Promise<TPaginationResults<Model<ITransaction>>> {
        return await this.transactionRepository.paginate(
            prepareCustomerTransactionListQuery(customer._id),
            filters
        );
    }





}