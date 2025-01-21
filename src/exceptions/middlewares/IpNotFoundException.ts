import { IP_NOT_FOUND } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";

export default class IpNotFoundException extends CustomException {
   /**
    * Constructor for IpNotFoundException
    *
    * @throws IpNotFoundException
    */

    constructor(    
    ) {
        super(IP_NOT_FOUND, 403);
    }
} 