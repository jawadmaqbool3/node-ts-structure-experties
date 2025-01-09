import CustomException from "../CustomException";

export default class FirstRoundLandingNotFoundException extends CustomException {
    constructor(
    ) {
        super("First round landing not found", "FirstRoundLandingNotFoundException", 400);
    }
} 