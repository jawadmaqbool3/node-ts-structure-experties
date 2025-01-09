import CustomException from "../CustomException";

export default class NotEnoughQuantityAvailableException extends CustomException {
    /**
     * Constructor for NotEnoughQuantityAvailableException
     *
     * @throws NotEnoughQuantityAvailableException
     */

    constructor(
    ) {
        super("Not enough quantity available", "NotEnoughQuantityAvailable", 400);
    }
} 