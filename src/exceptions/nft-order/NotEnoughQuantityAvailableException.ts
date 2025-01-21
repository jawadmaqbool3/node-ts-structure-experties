import { NOT_ENOUGH_QUANTITY_AVAILABLE } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";

export default class NotEnoughQuantityAvailableException extends CustomException {
     /**
    * Constructor for NotEnoughQuantityAvailableException
    *
    * @throws NotEnoughQuantityAvailableException
    */


    constructor(
    ) {
        super(NOT_ENOUGH_QUANTITY_AVAILABLE, 400);
    }
} 