"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const CustomException_1 = __importDefault(require("../exceptions/CustomException"));
const exceptions_messages_1 = require("../messages/exceptions.messages");
/**
 * Handles any errors that may occur during the request and response
 * lifecycle, and sends a JSON response back to the client with the
 * error message and status code.
 *
 * If the error is an instanceof CustomException, it will be sent back
 * to the client with the same status code and message as the error.
 * Otherwise, it will be sent back with a 500 status code and the
 * message 'Internal Server Error'.
 *
 * @param {Error} err - The error that was thrown
 * @param {Request} req - The Express request object
 * @param {Response} res - The Express response object
 * @param {NextFunction} next - The Express next function
 */
const errorHandler = (err, req, res, next) => {
    console.error((err));
    if (err instanceof CustomException_1.default) {
        res.status(err.statusCode).send({ message: err.message });
    }
    if (err.code === 11000) {
        res.status(400).send({ message: exceptions_messages_1.DUPLICATE_KEY_EXCEPTION });
    }
    else {
        const status = 500;
        res.status(status).send({ message: 'Internal Server Error' });
    }
};
exports.errorHandler = errorHandler;
