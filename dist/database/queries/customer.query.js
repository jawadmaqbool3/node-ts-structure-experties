"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareCustomerAffiliateListQuery = void 0;
const mongoos_utils_1 = require("../../utils/mongoos.utils");
const customer_projection_1 = require("../projections/customer.projection");
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
const prepareCustomerAffiliateListQuery = (customerId) => {
    return [{
            $match: {
                parent_id: (0, mongoos_utils_1.toObjectId)(customerId),
            },
        },
        {
            $project: Object.assign({}, customer_projection_1.CUSTOMER_VIEW_CUSTOMER)
        }];
};
exports.prepareCustomerAffiliateListQuery = prepareCustomerAffiliateListQuery;
