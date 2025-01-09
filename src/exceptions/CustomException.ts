
export default class CustomException extends Error {
    public statusCode: number;
    /**
     * Constructor for CustomException
     *
     * @param {string} message - error message
     * @param {string} name - exception name
     * @param {number} statusCode - http status code
     */
    constructor(
        message: string,
        name: string = "CustomException",
        statusCode: number = 400
    ) {
        super(message);
        this.name = name;
        this.statusCode = statusCode
    }
} 