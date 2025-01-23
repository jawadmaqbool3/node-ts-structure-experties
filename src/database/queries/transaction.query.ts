import { toObjectId } from "../../utils/mongoos.utils"
import { CUSTOMER_VIEW_TRANSACTION } from "../projections/transaction.projection"
import { TRANSACTION_TO_ORDER } from "../relations/transaction.relation"
import { CUSTOMER_VIEW_ORDER } from "../projections/nft-order.projection"
import mongoose, { PipelineStage } from "mongoose"
import { TransactionStatus } from "../../enums/transaction.enum"
import { ORDER_TO_NFT } from "../relations/nft-order.relation"
import { CUSTOMER_VIEW_NFT } from "../projections/nft.projection"
import { NFT_TO_NFT_TYPE } from "../relations/nft.relation"
import { CUSTOMER_VIEW_NFT_TYPE } from "../projections/nft-type.projection"

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

export const prepareCustomerTransactionListQuery = (customerId: string | mongoose.Types.ObjectId): PipelineStage[] => {
    return [{
        $match: {
            customer_id: toObjectId(customerId),
            transaction_status: TransactionStatus.SUCCESS
        },
    },
    {
        $lookup: {
            ...TRANSACTION_TO_ORDER,
            pipeline: [
                {
                    $lookup: {
                        ...ORDER_TO_NFT,
                        pipeline: [
                            {
                                $lookup: {
                                    ...NFT_TO_NFT_TYPE,
                                    pipeline: [
                                        {
                                            $project: CUSTOMER_VIEW_NFT_TYPE
                                        }
                                    ]
                                }
                            },
                            {
                                $project: {
                                    ...CUSTOMER_VIEW_NFT,
                                    [NFT_TO_NFT_TYPE.as]: 1
                                },

                            }
                        ]
                    }
                },
                {
                    $project: {
                        ...CUSTOMER_VIEW_ORDER,
                        [ORDER_TO_NFT.as]: 1
                    }
                }
            ]
        }
    },
    {
        $project: {
            ...CUSTOMER_VIEW_TRANSACTION,
            [TRANSACTION_TO_ORDER.as]: 1,
        }
    }]
}