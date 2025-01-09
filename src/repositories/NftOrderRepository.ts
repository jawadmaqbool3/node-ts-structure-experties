import { INftOrder } from "../interfaces/models/nft-order.interface";
import NftOrder from "../models/nft-order.model";
import Repository from "./Repository";

export default class NftOrderRepository extends Repository<INftOrder> {
/**
 * Constructs an instance of NftOrderRepository by calling the base Repository class
 * with the NftOrder model, facilitating database operations on NFT orders.
 */

    constructor() {
        super(NftOrder);
    }

}