
export default class CustomException extends Error {
    public statusCode: number;
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