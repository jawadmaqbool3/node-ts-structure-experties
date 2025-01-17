import express from 'express';

import bodyParser from 'body-parser';

import router from './routes';

import { connectDB } from './utils/mongodb.utils';

import colors from 'colors';

import { errorHandler } from './utils/error-handler.utils';

import { PORT } from './constants/env.constant';

import cors from 'cors';

connectDB();

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(router);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(colors.green(`Server is running at ${PORT}`));
});