import colors from 'colors';
import { NextFunction, Request, Response } from 'express';
import RecordNotFoundException from '../exceptions/RecordNotFoundException';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    console.error((err));

    if (err instanceof RecordNotFoundException) {
        res.status(404).json({ message: err.message });
    }
    
    else {
        const status = 500;
        res.status(status).json({ message: 'Internal Server Error' });
    }
};



export { errorHandler };
