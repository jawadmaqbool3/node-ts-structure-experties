import mongoose, { PipelineStage } from "mongoose"
import { toObjectId } from "../../utils/mongoos.utils"
import { COMMISSION_TO_TRANSACTION, COMMISSION_TO_TRANSACTION_BY } from "../relations/commission.relation"
import { CUSTOMER_VIEW_CUSTOMER } from "../projections/customer.projection"
import { CUSTOMER_VIEW_TRANSACTION } from "../projections/transaction.projection"
import { CUSTOMER_VIEW_COMMISSION } from "../projections/commission.projection"



/**
 * Prepares a MongoDB pipeline to retrieve a list of commissions given to a customer.
 * The pipeline includes the following stages:
 * 1. Match - filter the commissions to those given to the customer with the given id.
 * 2. Lookup - retrieve the transaction_by customer.
 * 3. Lookup - retrieve the transaction.
 * 4. Unwind - unwind the transaction_by and transaction arrays.
 * 5. Project - select the customer view of the customer, transaction_by customer, transaction, and commission.
 *
 * @param {string|mongoose.Types.ObjectId} customerId - The id of the customer to retrieve the commissions for.
 * @returns {PipelineStage[]} - A MongoDB aggregation pipeline that can be used to retrieve the list of commissions.
 */
export const prepareCustomerCommissionListQuery = (customerId: string | mongoose.Types.ObjectId): PipelineStage[] => {
    return [
        {
            $match: {
                comission_to: toObjectId(customerId)
            }
        },
        {
            $lookup: {
                ...COMMISSION_TO_TRANSACTION_BY,
                pipeline: [
                    {
                        $project: {
                            ...CUSTOMER_VIEW_CUSTOMER
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                ...COMMISSION_TO_TRANSACTION,
                pipeline: [
                    {
                        $project: {
                            ...CUSTOMER_VIEW_TRANSACTION
                        }
                    }
                ]
            }
        },
        {
            $unwind: {
                path: `$${COMMISSION_TO_TRANSACTION.as}`,
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $unwind: {
                path: `$${COMMISSION_TO_TRANSACTION_BY.as}`,
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                ...CUSTOMER_VIEW_COMMISSION,
                [COMMISSION_TO_TRANSACTION.as]: 1,
                [COMMISSION_TO_TRANSACTION_BY.as]: 1,
            }
        }
    ]
}