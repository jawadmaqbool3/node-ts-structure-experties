import FirstRoundLanding, { IFirstRoundLanding } from "../models/first-round-landing.model";
import Repository from "./Repository";

export default class FirstRoundLandingRepository extends Repository<IFirstRoundLanding> {
    constructor() {
        super(FirstRoundLanding);
    }

    

}