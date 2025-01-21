import { SALES_PAGE_DECRYPTION_FAILED } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";

export default class SalesPageDecryptionFailed extends CustomException {

    /**
     * Constructor for SalesPageDecryptionFailed
     *
     * @throws SalesPageDecryptionFailed
     */

    constructor(
    ) {
        super(SALES_PAGE_DECRYPTION_FAILED, 400);
    }
} 