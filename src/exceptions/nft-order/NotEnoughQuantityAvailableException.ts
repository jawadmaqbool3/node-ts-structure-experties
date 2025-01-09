import CustomException from "../CustomException";

export default class NotEnoughQuantityAvailableException extends CustomException {
    constructor(
    ) {
        super("Not enough quantity available", "NotEnoughQuantityAvailable", 400);
    }
} 