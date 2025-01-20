import CustomException from "../CustomException";

export default class TokenExpiredException extends CustomException {
    /**
     * Constructor for TokenExpiredException
     *
     * @param {string} [message=Token expired] - The error message
     * @param {string} [name=TokenExpiredException] - The error name
     * @param {number} [statusCode=403] - The HTTP status code
     */
    constructor(
    ) {
        super("Token expired", "TokenExpiredException", 401);
    }
} 