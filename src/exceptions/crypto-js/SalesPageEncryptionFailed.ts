import { SALES_PAGE_ENCRYPTION_FAILED } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";

export default class SalesPageEncryptionFailed extends CustomException {


    /**
     * Constructor for SalesPageEncryptionFailed
     *
     * @throws SalesPageEncryptionFailed
     */

    constructor(
    ) {
        super(SALES_PAGE_ENCRYPTION_FAILED, 400);
    }
} 