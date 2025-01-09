"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomException extends Error {
    /**
     * Constructor for CustomException
     *
     * @param {string} message - error message
     * @param {string} name - exception name
     * @param {number} statusCode - http status code
     */
    constructor(message, name = "CustomException", statusCode = 400) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }
}
exports.default = CustomException;
