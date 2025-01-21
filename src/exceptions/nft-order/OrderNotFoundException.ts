import { ORDER_NOT_FOUND } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";
export default class OrderNotFoundException extends CustomException {
   /**
    * Constructor for OrderNotFoundException
    *
    * @throws OrderNotFoundException
    */
    constructor(
    ) {
        super(ORDER_NOT_FOUND, 400);
    }
} 