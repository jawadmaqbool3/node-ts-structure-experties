import { INftOrder } from "../interfaces/models/nft-order.interface";
import NftOrder from "../models/nft-order.model";
import Repository from "./Repository";

export default class NftOrderRepository extends Repository<INftOrder> {
    constructor() {
        super(NftOrder);
    }

}