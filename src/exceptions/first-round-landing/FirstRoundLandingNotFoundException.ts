import { FIRST_ROUND_LANDING_NOT_FOUND } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";

export default class FirstRoundLandingNotFoundException extends CustomException {
    /**
    * Constructor for FirstRoundLandingNotFoundException
    *
    * @throws FirstRoundLandingNotFoundException
    */

    constructor(
    ) {
        super(FIRST_ROUND_LANDING_NOT_FOUND, 400);
    }
} 