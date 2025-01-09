import CustomException from "../CustomException";
export default class RoundNotFoundException extends CustomException {
    constructor(
    ) {
        super("Round not found", "RoundNotFoundException", 400);
    }
} 