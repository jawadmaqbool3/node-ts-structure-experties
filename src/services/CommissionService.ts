import mongoose, { Model } from "mongoose";
import { ITransaction } from "../interfaces/models/transaction.interface";
import CommissionRepository from "../repositories/CommissionRepository";
import Service from "./Service";
import CustomerRepository from "../repositories/CustomerRepository";
import { ICustomer } from "../interfaces/models/customer.interface";
import { TParentAndGrandParent } from "../types/commission.type";
import { CommissionType } from "../enums/commission.enum";
import { toObjectId } from "../utils/mongoos.utils";
import { GRAND_PARENT_COMMISSION_PERCENTAGE, PARENT_COMMISSION_PERCENTAGE } from "../constants/commission.constant";
import { calculatePercentage } from "../utils/number.utils";
import { prepareCustomerCommissionListQuery } from "../database/queries/commission.query";
import { TFilter, TPaginationResults } from "../types/pagination.type";
import { ICommission } from "../interfaces/models/commission.interface";


export default class CommissionService extends Service {

    /**
     * Constructor
     *
     * @param {CommissionRepository} [commissionRepository=new CommissionRepository()] - commission repository
     * @param {CustomerRepository} [customerRepository=new CustomerRepository()] - customer repository
     */
    constructor(
        private commissionRepository = new CommissionRepository(),
        private customerRepository = new CustomerRepository(),
    ) {
        super();
    }



    /**
     * Applies commissions to the given transaction. If the transaction has a referral ID,
     * it will apply the parent and grandparent commissions to the respective customers.
     * If the transaction does not have a referral ID, it will apply the parent commission
     * to the customer with the given customer ID.
     *
     * @param {ITransaction} transaction - The transaction to which the commissions will be applied
     *
     * @returns {Promise<void>} - A promise that resolves when the commissions have been applied
     *
     * @throws {CommissionAlreadyGivenException} - If a commission has already been given for the given transaction
     */
    public async applyCommissions(transaction: ITransaction) {

        const { referral_id, customer_id, _id } = transaction;

        await this.commissionRepository.throwIfAlreadyExists(_id);

        if (!referral_id && !customer_id)

            if (referral_id && customer_id) {
                const { parent, grandParent }: TParentAndGrandParent =
                    referral_id ?
                        await this.getParentAndGrandParent(referral_id) :
                        await this.getParentAndGrandParent(customer_id);

                parent && await this.applyCommissionToParent(parent, transaction);
                grandParent && await this.applyCommissionToGrandParent(grandParent, transaction);
            }
    }


    /**
     * Applies the parent commission to the given parent customer based on the given transaction.
     *
     * @param {ICustomer} parent - The parent customer to which the commission will be applied
     * @param {ITransaction} transaction - The transaction used to calculate the commission amount
     *
     * @returns {Promise<void>} - A promise that resolves when the commission has been applied
     */
    private async applyCommissionToParent(
        parent: ICustomer,
        transaction: ITransaction,
    ): Promise<void> {
        this.createCommissionEntry(
            transaction,
            parent._id,
            calculatePercentage(transaction.currency_amount, PARENT_COMMISSION_PERCENTAGE),
            PARENT_COMMISSION_PERCENTAGE,
            CommissionType.PARENT
        )
    }

    /**
     * Applies the grand parent commission to the given grand parent customer based on the given transaction.
     *
     * @param {ICustomer} grandParent - The grand parent customer to which the commission will be applied
     * @param {ITransaction} transaction - The transaction used to calculate the commission amount
     *
     * @returns {Promise<void>} - A promise that resolves when the commission has been applied
     */
    private async applyCommissionToGrandParent(
        grandParent: ICustomer,
        transaction: ITransaction,
    ) {
        this.createCommissionEntry(
            transaction,
            grandParent._id,
            calculatePercentage(transaction.currency_amount, GRAND_PARENT_COMMISSION_PERCENTAGE),
            PARENT_COMMISSION_PERCENTAGE,
            CommissionType.GRAND_PARENT
        )
    }


    /**
     * Creates a commission entry in the repository based on the given transaction details.
     *
     * @param {ITransaction} transaction - The transaction related to the commission.
     * @param {string | mongoose.Types.ObjectId} comission_to - The ID of the customer to whom the commission is given.
     * @param {number} comission_token - The token amount of the commission.
     * @param {number} commission_percentage - The percentage of the commission.
     * @param {CommissionType} type - The type of commission (e.g., parent or grandparent).
     *
     * @returns {Promise<void>} - A promise that resolves when the commission entry is created.
     */

    private async createCommissionEntry(
        transaction: ITransaction,
        comission_to: string | mongoose.Types.ObjectId,
        comission_token: number,
        commission_percentage: number,
        type: CommissionType
    ) {
        this.commissionRepository.create({
            comission_to,
            transaction_by: transaction.customer_id ? toObjectId(transaction.customer_id) : undefined,
            transaction_id: transaction._id,
            transaction_network: transaction.transaction_network,
            comission_token,
            commission_percentage,
            type
        })
    }




    /**
     * Retrieves the parent and grand parent customers of the given referral ID.
     *
     * @param {string | mongoose.Types.ObjectId} referral_id - The referral ID to retrieve the parent and grand parent for.
     *
     * @returns {Promise<TParentAndGrandParent>} - A promise that resolves to an object containing the parent and grand parent customers.
     */
    private async getParentAndGrandParent(referral_id: string | mongoose.Types.ObjectId): Promise<TParentAndGrandParent> {
        let parent: ICustomer | null = await this.customerRepository.findById(referral_id),
            grandParent: ICustomer | null = null;

        if (parent && parent.parent_id)
            grandParent = await this.customerRepository.findById(parent.parent_id);


        return {
            parent,
            grandParent
        } as TParentAndGrandParent;
    }



    /**
     * Retrieves a list of all commissions given to the given customer.
     *
     * @param {ICustomer} customer - The customer whose commissions to retrieve.
     * @param {TFilter} filters - The filters to apply to the list of commissions.
     *
     * @returns {Promise<TPaginationResults<Model<ICommission>>>} - A promise that resolves to a paginated list of commissions.
     */
    public async customerCommissionList(customer: ICustomer, filters: TFilter): Promise<TPaginationResults<Model<ICommission>>> {
        return await this.commissionRepository.paginate(prepareCustomerCommissionListQuery(customer._id), filters);
    }


}
