import CustomException from "../CustomException";
export default class RoundNotFoundException extends CustomException {
    /**
     * Creates a new instance of RoundNotFoundException
     * @param {string} [message] - The error message
     * @param {string} [name] - The error name
     * @param {number} [statusCode] - The HTTP status code
     */
    constructor(
    ) {
        super("Round not found", "RoundNotFoundException", 400);
    }
} 