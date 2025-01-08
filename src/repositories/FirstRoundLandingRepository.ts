import { IFirstRoundLanding, IFirstRoundLandingWithRound } from "../interfaces/models/first-round-landing.interface";
import FirstRoundLanding, { relations as firstRoundLandingRelations } from "../models/first-round-landing.model";
import Repository from "./Repository";

export default class FirstRoundLandingRepository extends Repository<IFirstRoundLanding> {
    constructor() {
        super(FirstRoundLanding);
    }


    async findOneWithRound($query: object): Promise<IFirstRoundLandingWithRound | null> {
        const results = await this.model.aggregate(
            [
                { $match: $query },
                firstRoundLandingRelations.round,
                { $unwind: "$round" }
            ]
        );

        return (results.length ?  results[0] : null) as IFirstRoundLandingWithRound | null;
    }



}