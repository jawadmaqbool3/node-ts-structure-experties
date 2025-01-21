
export default class CustomException extends Error {
    public statusCode: number;
    /**
     * Constructor for CustomException
     *
     * @param {string} message - error message
     * @param {number} statusCode - http status code
     */
    constructor(
        message: string,
        statusCode: number = 400
    ) {
        super(message);
        this.statusCode = statusCode
    }
} 