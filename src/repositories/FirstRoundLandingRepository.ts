import mongoose from "mongoose";
import FirstRoundLandingNotFoundException from "../exceptions/first-round-landing/FirstRoundLandingNotFoundException";
import { IFirstRoundLanding, IFirstRoundLandingWithRound } from "../interfaces/models/first-round-landing.interface";
import FirstRoundLanding, { relations as firstRoundLandingRelations } from "../models/first-round-landing.model";
import { toObjectId } from "../utils/mongoos.utils";
import Repository from "./Repository";

export default class FirstRoundLandingRepository extends Repository<IFirstRoundLanding> {
    /**
     * Constructor for FirstRoundLandingRepository
     *
     * @constructor
     */
    constructor() {
        super(FirstRoundLanding);
    }



    /**
     * Find a first round landing with its associated round
     *
     * @param {{$query: object}} query - The MongoDB query object
     *
     * @returns {Promise<IFirstRoundLandingWithRound | null>} - The first round landing document with the associated round
     */
    async findOneWithRound($query: object): Promise<IFirstRoundLandingWithRound | null> {
        const results = await this.model.aggregate(
            [
                { $match: $query },
                firstRoundLandingRelations.round,
                { $unwind: "$round" }
            ]
        );

        return (results.length ? results[0] : null) as IFirstRoundLandingWithRound | null;
    }


    /**
     * Finds a FirstRoundLanding with its associated Round by the given ip and round_id. If it doesn't exist, throws a FirstRoundLandingNotFoundException.
     * @param ip ip address of the user
     * @param round_id id of the Round to find the FirstRoundLanding for
     * @returns the found FirstRoundLanding with its associated Round
     * @throws FirstRoundLandingNotFoundException if the FirstRoundLanding is not found
     */
    public async getValidatedWithRound(ip: string, round_id: string | mongoose.Schema.Types.ObjectId): Promise<IFirstRoundLandingWithRound> {
        const landing: IFirstRoundLandingWithRound | null = await this.findOneWithRound({ round_id: toObjectId(round_id), ip });
        if (!landing) throw new FirstRoundLandingNotFoundException();
        return landing;
    }



}