import express from 'express';

import dotenv from 'dotenv';

import bodyParser from 'body-parser';

import router from './routes';

import { connectDB } from './utils/mongodb.utils';

import colors from 'colors';

import { errorHandler } from './utils/error-handler.utils';

dotenv.config();

connectDB();

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());

app.use(router);

app.use(errorHandler);

app.listen(port, () => {
    console.log(colors.green(`Server is running at ${port}`));
});