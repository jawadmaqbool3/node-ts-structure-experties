import { IFirstRoundLanding } from "../interfaces/models/first-round-landing.interface";
import FirstRoundLanding from "../models/first-round-landing.model";
import Repository from "./Repository";

export default class FirstRoundLandingRepository extends Repository<IFirstRoundLanding> {
    constructor() {
        super(FirstRoundLanding);
    }

    

}