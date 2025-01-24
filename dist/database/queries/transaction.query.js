"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareCustomerTransactionListQuery = void 0;
const mongoos_utils_1 = require("../../utils/mongoos.utils");
const transaction_projection_1 = require("../projections/transaction.projection");
const transaction_relation_1 = require("../relations/transaction.relation");
const nft_order_projection_1 = require("../projections/nft-order.projection");
const transaction_enum_1 = require("../../enums/transaction.enum");
const nft_order_relation_1 = require("../relations/nft-order.relation");
const nft_projection_1 = require("../projections/nft.projection");
const nft_relation_1 = require("../relations/nft.relation");
const nft_type_projection_1 = require("../projections/nft-type.projection");
/**
 * Prepares a MongoDB aggregation pipeline to retrieve a list of successful transactions for a specific customer.
 *
 * The pipeline includes the following stages:
 * 1. Match - Filters transactions by the provided customer ID and ensures the transaction status is 'SUCCESS'.
 * 2. Lookup - Joins the transactions with the related order information using the order ID.
 * 3. Nested Lookup - Within the order lookup, further joins the orders with related NFTs and their types.
 * 4. Projection - Selects specific fields from the transactions, orders, NFTs, and NFT types to form the final result.
 *
 * @param {string | mongoose.Types.ObjectId} customerId - The ID of the customer for whom transactions are being retrieved.
 * @returns {PipelineStage[]} - A MongoDB aggregation pipeline to retrieve the desired transaction list.
 */
const prepareCustomerTransactionListQuery = (customerId) => {
    return [{
            $match: {
                customer_id: (0, mongoos_utils_1.toObjectId)(customerId),
                transaction_status: transaction_enum_1.TransactionStatus.SUCCESS
            },
        },
        {
            $lookup: Object.assign(Object.assign({}, transaction_relation_1.TRANSACTION_TO_ORDER), { pipeline: [
                    {
                        $lookup: Object.assign(Object.assign({}, nft_order_relation_1.ORDER_TO_NFT), { pipeline: [
                                {
                                    $lookup: Object.assign(Object.assign({}, nft_relation_1.NFT_TO_NFT_TYPE), { pipeline: [
                                            {
                                                $project: nft_type_projection_1.CUSTOMER_VIEW_NFT_TYPE
                                            }
                                        ] })
                                },
                                {
                                    $project: Object.assign(Object.assign({}, nft_projection_1.CUSTOMER_VIEW_NFT), { [nft_relation_1.NFT_TO_NFT_TYPE.as]: 1 }),
                                }
                            ] })
                    },
                    {
                        $project: Object.assign(Object.assign({}, nft_order_projection_1.CUSTOMER_VIEW_ORDER), { [nft_order_relation_1.ORDER_TO_NFT.as]: 1 })
                    }
                ] })
        },
        {
            $project: Object.assign(Object.assign({}, transaction_projection_1.CUSTOMER_VIEW_TRANSACTION), { [transaction_relation_1.TRANSACTION_TO_ORDER.as]: 1 })
        }];
};
exports.prepareCustomerTransactionListQuery = prepareCustomerTransactionListQuery;
