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

export const prepareCustomerTransactionListQuery = (customerId: string | mongoose.Types.ObjectId): PipelineStage[] => {

    return [{
        $match: {
            "customer_id": toObjectId(customerId),
            "transaction_status": TransactionStatus.SUCCESS
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