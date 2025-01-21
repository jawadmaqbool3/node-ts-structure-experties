import express from 'express';

import bodyParser from 'body-parser';

import router from './routes';

import { connectDB } from './utils/mongodb.utils';

import colors from 'colors';

import { errorHandler } from './utils/error-handler.utils';

import { PORT } from './constants/env.constant';

import cors from 'cors';

import settlementCommand from './commands/settlement.command';

import { isDevMode } from './utils/application';

connectDB();

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(router);

app.use(errorHandler);

app.listen(PORT, async () => {
    isDevMode && settlementCommand()
    console.log(colors.green(`Server is running at ${PORT}`));
});