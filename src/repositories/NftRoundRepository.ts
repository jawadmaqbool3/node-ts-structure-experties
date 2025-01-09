import { INftRound } from "../interfaces/models/nft-round.interface";
import NftRound from "../models/nft-round.model";
import Repository from "./Repository";

export default class NftRoundRepository extends Repository<INftRound> {
    /**
     * Constructor for NftRoundRepository
     * Calls the constructor of the superclass, passing NftRound as the model
     */
    constructor() {
        super(NftRound);
    }

    

}