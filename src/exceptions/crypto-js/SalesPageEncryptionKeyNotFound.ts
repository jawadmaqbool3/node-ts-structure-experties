import { SALES_PAGE_ENCRYPTION_KEY_NOT_FOUND } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";

export default class SalesPageEncryptionKeyNotFound extends CustomException {
 
    
    /**
     * Constructor for SalesPageEncryptionKeyNotFound
     *
     * @throws SalesPageEncryptionKeyNotFound
     */

    constructor(    
    ) {
        super(SALES_PAGE_ENCRYPTION_KEY_NOT_FOUND, 400);
    }
} 