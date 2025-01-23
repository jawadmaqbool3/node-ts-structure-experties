

import { toObjectId } from "../../utils/mongoos.utils"
import mongoose, { PipelineStage } from "mongoose"
import { CUSTOMER_VIEW_CUSTOMER } from "../projections/customer.projection"

/**
 * Prepares a MongoDB pipeline to retrieve a list of customers that are directly referred by the given customer.
 * The pipeline includes the following stages:
 * 1. Match - filter the customers to those that have the given customer as their parent.
 * 2. Project - select the customer view of the customer.
 *
 * @param {string | mongoose.Types.ObjectId} customerId - The id of the customer whose direct referrals to retrieve.
 *
 * @returns {PipelineStage[]} - A MongoDB aggregation pipeline that can be used to retrieve the list of customers.
 */
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