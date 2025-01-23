import { NextFunction, Request, Response } from 'express';
import CustomException from '../exceptions/CustomException';
import { DUPLICATE_KEY_EXCEPTION } from '../messages/exceptions.messages';

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

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    console.error((err));

    if (err instanceof CustomException) {
        res.status(err.statusCode).json({ message: err.message });
    }
    if (err.code === 11000) {
        res.status(400).json({ message: DUPLICATE_KEY_EXCEPTION });
    }
    else {
        const status = 500;
        res.status(status).json({ message: 'Internal Server Error' });
    }
};



export { errorHandler };
