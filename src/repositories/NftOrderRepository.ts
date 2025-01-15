import mongoose from "mongoose";
import OrderNotFoundException from "../exceptions/nft-order/OrderNotFoundException";
import { INftOrder } from "../interfaces/models/nft-order.interface";
import NftOrder from "../models/nft-order.model";
import { toObjectId } from "../utils/mongoos.utils";
import Repository from "./Repository";

export default class NftOrderRepository extends Repository<INftOrder> {
    /**
     * Constructs an instance of NftOrderRepository by calling the base Repository class
     * with the NftOrder model, facilitating database operations on NFT orders.
     */

    constructor() {
        super(NftOrder);
    }
    /**
     * Validates whether an NFT order exists in the database.
     * @param _id The MongoDB ObjectId or string _id of the order to validate.
     * @throws OrderNotFoundException if the order does not exist.
     */
    public async validate(_id: string | mongoose.Schema.Types.ObjectId): Promise<void> {
        const order: boolean | null = await this.isExists({ _id: toObjectId(_id) });
        if (!order) throw new OrderNotFoundException();
    }

    /**
     * Retrieves an NFT order by its _id after validating that it exists.
     * @param order_id The MongoDB ObjectId or string _id of the order to retrieve.
     * @returns The found NFT order.
     * @throws OrderNotFoundException if the order does not exist.
     */
    public async getValidated(order_id: string | mongoose.Schema.Types.ObjectId): Promise<INftOrder> {
        const order: INftOrder | null = await this.findById(order_id);
        if (!order) throw new OrderNotFoundException();
        return order;
    }
}