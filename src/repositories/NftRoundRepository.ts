import { INftRound } from "../interfaces/models/nft-round.interface";
import NftRound from "../models/nft-round.model";
import Repository from "./Repository";

export default class NftRoundRepository extends Repository<INftRound> {
    constructor() {
        super(NftRound);
    }

    

}