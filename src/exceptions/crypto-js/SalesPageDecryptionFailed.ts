import CustomException from "../CustomException";

export default class SalesPageDecryptionFailed extends CustomException {
    /**
     * Constructor for SalesPageDecryptionFailed
     *
     * @param {string} [message=Sales Page Decryption failed] - The error message
     * @param {string} [name=SalesPageDecryptionFailed] - The error name
     * @param {number} [statusCode=403] - The HTTP status code
     */
    constructor(    
    ) {
        super("Sales Page Decryption failed", "SalesPageDecryptionFailed", 400);
    }
} 