

import { toObjectId } from "../../utils/mongoos.utils"
import mongoose, { PipelineStage } from "mongoose"
import { CUSTOMER_VIEW_CUSTOMER } from "../projections/customer.projection"

export const prepareCustomerAffiliateListQuery = (customerId: string | mongoose.Types.ObjectId): PipelineStage[] => {
    return [{
        $match: {
            parent_id: toObjectId(customerId),
        },
    },
    {
        $project: {
            ...CUSTOMER_VIEW_CUSTOMER,
        }
    }]
}