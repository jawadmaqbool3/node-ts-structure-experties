import mongoose, { PipelineStage } from "mongoose"
import { toObjectId } from "../../utils/mongoos.utils"
import { COMMISSION_TO_TRANSACTION, COMMISSION_TO_TRANSACTION_BY } from "../relations/commission.relation"
import { CUSTOMER_VIEW_CUSTOMER } from "../projections/customer.projection"
import { CUSTOMER_VIEW_TRANSACTION } from "../projections/transaction.projection"
import { CUSTOMER_VIEW_COMMISSION } from "../projections/commission.projection"



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