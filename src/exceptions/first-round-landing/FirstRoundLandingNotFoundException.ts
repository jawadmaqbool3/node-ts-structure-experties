import CustomException from "../CustomException";

export default class FirstRoundLandingNotFoundException extends CustomException {
   
/**
 * Constructs a new FirstRoundLandingNotFoundException with a predefined message,
 * name, and status code.
 */

    constructor(
    ) {
        super("First round landing not found", "FirstRoundLandingNotFoundException", 400);
    }
} 