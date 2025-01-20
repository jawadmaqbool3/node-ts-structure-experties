import CustomException from "../CustomException";

export default class SalesPageEncryptionKeyNotFound extends CustomException {
    /**
     * Constructor for SalesPageEncryptionKeyNotFound
     *
     * @param {string} [message=Sales Page Encryption key not found] - The error message
     * @param {string} [name=SalesPageEncryptionKeyNotFound] - The error name
     * @param {number} [statusCode=403] - The HTTP status code
     */
    constructor(    
    ) {
        super("Sales Page Encryption key not found", "SalesPageEncryptionKeyNotFound", 400);
    }
} 