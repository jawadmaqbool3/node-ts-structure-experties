import NftType, { INftType } from "../models/nft-type.model";
import Repository from "./Repository";

export default class NftTypeRepository extends Repository<INftType> {
    constructor() {
        super(NftType);
    }

    

}