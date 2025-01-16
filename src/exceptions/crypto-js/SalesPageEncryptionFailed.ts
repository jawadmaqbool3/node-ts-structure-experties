import CustomException from "../CustomException";

export default class SalesPageEncryptionFailed extends CustomException {
    /**
     * Constructor for SalesPageEncryptionFailed
     *
     * @param {string} [message=Ip not found] - The error message
     * @param {string} [name=SalesPageEncryptionFailed] - The error name
     * @param {number} [statusCode=403] - The HTTP status code
     */
    constructor(    
    ) {
        super("Sales Page Encryption failed", "SalesPageEncryptionFailed", 403);
    }
} 