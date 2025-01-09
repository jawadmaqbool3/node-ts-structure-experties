import { INftType } from "../interfaces/models/nft-types.interface";
import NftType from "../models/nft-type.model";
import Repository from "./Repository";

export default class NftTypeRepository extends Repository<INftType> {
    /**
     * Constructor
     *
     * @param {Model<INftType>} model - model
     */
    constructor() {
        super(NftType);
    }

    

}