import express from "express";
import router from './routes';
import { connectDB } from './utils/mongodb.utils';
import cors from 'cors';
import { errorHandler } from "./utils/error-handler.utils";

const app = express();

const serviceInit = () => {
    connectDB();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(errorHandler);
}

serviceInit();  

app.use('/', router);

module.exports = app;