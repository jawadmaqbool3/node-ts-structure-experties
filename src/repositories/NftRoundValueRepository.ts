import NftRoundValue, { INftRoundValue } from "../models/nft-round-value.model";
import Repository from "./Repository";

export default class NftRoundValueRepository extends Repository<INftRoundValue> {
    constructor() {
        super(NftRoundValue);
    }

    

}