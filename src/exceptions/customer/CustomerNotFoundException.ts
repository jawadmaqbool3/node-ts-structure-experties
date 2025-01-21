import { CUSTOMER_NOT_FOUND } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";
export default class CustomerNotFoundException extends CustomException {
     /**
    * Constructor for CustomerNotFoundException
    *
    * @throws CustomerNotFoundException
    */

     constructor(
    ) {
        super(CUSTOMER_NOT_FOUND, 400);
    }
} 