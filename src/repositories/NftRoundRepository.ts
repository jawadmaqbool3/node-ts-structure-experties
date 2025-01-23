import mongoose from "mongoose";
import RoundNotFoundException from "../exceptions/nft-round/RoundNotFoundException";
import { INftRound } from "../interfaces/models/nft-round.interface";
import NftRound from "../database/models/nft-round.model";
import { toObjectId } from "../utils/mongoos.utils";
import Repository from "./Repository";

export default class NftRoundRepository extends Repository<INftRound> {
    /**
     * Constructor for NftRoundRepository
     * Calls the constructor of the superclass, passing NftRound as the model
     */
    constructor() {
        super(NftRound);
    }


    /**
     * Validates whether an NFT round exists in the database.
     * @param _id The MongoDB ObjectId or string _id of the round to validate.
     * @throws RoundNotFoundException if the round does not exist.
     */

    public async validate(_id: string | mongoose.Types.ObjectId): Promise<void> {
        const round: boolean | null = await this.isExists({ _id: toObjectId(_id) });
        if (!round) throw new RoundNotFoundException();
    }

    /**
     * Finds a Round by its id. If it doesn't exist, throws a RoundNotFoundException.
     * @param round_id id of the Round to find
     * @returns the found Round
     * @throws RoundNotFoundException if the Round is not found
     */
    public async getValidated(round_id: string | mongoose.Types.ObjectId): Promise<INftRound> {
        const round: INftRound | null = await this.findById(round_id);
        if (!round) throw new RoundNotFoundException();
        return round;
    }
}