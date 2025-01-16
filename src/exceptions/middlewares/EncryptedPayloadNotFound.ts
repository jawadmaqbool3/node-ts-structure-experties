import CustomException from "../CustomException";

export default class EncryptedPayloadNotFound extends CustomException {
    /**
     * Constructor for EncryptedPayloadNotFound
     *
     * @param {string} [message=Ip not found] - The error message
     * @param {string} [name=EncryptedPayloadNotFound] - The error name
     * @param {number} [statusCode=403] - The HTTP status code
     */
    constructor(
    ) {
        super("Encrypted payload not found", "EncryptedPayloadNotFound", 403);
    }
} 