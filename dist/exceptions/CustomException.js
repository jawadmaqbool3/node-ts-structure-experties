"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomException extends Error {
    /**
     * Constructor for CustomException
     *
     * @param {string} message - error message
     * @param {number} statusCode - http status code
     */
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.default = CustomException;
