import { TOKEN_EXPIRED } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";

export default class TokenExpiredException extends CustomException {
   /**
    * Constructor for TokenExpiredException
    *
    * @throws TokenExpiredException
    */
   
       constructor(
       ) {
           super(TOKEN_EXPIRED, 400);
       }
} 