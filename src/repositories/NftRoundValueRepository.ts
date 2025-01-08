import { INftRoundValue } from "../interfaces/models/nft-round-value.interface";
import NftRoundValue from "../models/nft-round-value.model";
import Repository from "./Repository";

export default class NftRoundValueRepository extends Repository<INftRoundValue> {
    constructor() {
        super(NftRoundValue);
    }

    

}