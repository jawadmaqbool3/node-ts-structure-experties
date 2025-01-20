import CustomException from "../CustomException";

export default class TargetWalletEncryptionFailed extends CustomException {
    /**
     * Constructor for TargetWalletEncryptionFailed
     *
     * @param {string} [message=Target wallet encryption failed] - The error message
     * @param {string} [name=TargetWalletEncryptionFailed] - The error name
     * @param {number} [statusCode=403] - The HTTP status code
     */
    constructor(    
    ) {
        super("Target wallet encryption failed", "TargetWalletEncryptionFailed", 400);
    }
} 