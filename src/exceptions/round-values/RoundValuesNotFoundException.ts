import CustomException from "../CustomException";

export default class RoundValuesNotFoundException extends CustomException {
    constructor(
    ) {
        super("Round values not found", "RoundValuesNotFoundException", 400);
    }
} 