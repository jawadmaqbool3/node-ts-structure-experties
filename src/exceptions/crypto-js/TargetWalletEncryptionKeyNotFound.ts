import CustomException from "../CustomException";

export default class TargetWalletEncryptionKeyNotFound extends CustomException {
    /**
     * Constructor for TargetWalletEncryptionKeyNotFound
     *
     * @param {string} [message=Target wallet encryption key not found] - The error message
     * @param {string} [name=TargetWalletEncryptionKeyNotFound] - The error name
     * @param {number} [statusCode=403] - The HTTP status code
     */
    constructor(    
    ) {
        super("Target wallet encryption key not found", "TargetWalletEncryptionKeyNotFound", 400);
    }
} 