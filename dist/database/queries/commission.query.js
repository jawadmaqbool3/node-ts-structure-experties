"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareCustomerCommissionListQuery = void 0;
const mongoos_utils_1 = require("../../utils/mongoos.utils");
const commission_relation_1 = require("../relations/commission.relation");
const customer_projection_1 = require("../projections/customer.projection");
const transaction_projection_1 = require("../projections/transaction.projection");
const commission_projection_1 = require("../projections/commission.projection");
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
const prepareCustomerCommissionListQuery = (customerId) => {
    return [
        {
            $match: {
                comission_to: (0, mongoos_utils_1.toObjectId)(customerId)
            }
        },
        {
            $lookup: Object.assign(Object.assign({}, commission_relation_1.COMMISSION_TO_TRANSACTION_BY), { pipeline: [
                    {
                        $project: Object.assign({}, customer_projection_1.CUSTOMER_VIEW_CUSTOMER)
                    }
                ] })
        },
        {
            $lookup: Object.assign(Object.assign({}, commission_relation_1.COMMISSION_TO_TRANSACTION), { pipeline: [
                    {
                        $project: Object.assign({}, transaction_projection_1.CUSTOMER_VIEW_TRANSACTION)
                    }
                ] })
        },
        {
            $unwind: {
                path: `$${commission_relation_1.COMMISSION_TO_TRANSACTION.as}`,
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $unwind: {
                path: `$${commission_relation_1.COMMISSION_TO_TRANSACTION_BY.as}`,
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: Object.assign(Object.assign({}, commission_projection_1.CUSTOMER_VIEW_COMMISSION), { [commission_relation_1.COMMISSION_TO_TRANSACTION.as]: 1, [commission_relation_1.COMMISSION_TO_TRANSACTION_BY.as]: 1 })
        }
    ];
};
exports.prepareCustomerCommissionListQuery = prepareCustomerCommissionListQuery;
