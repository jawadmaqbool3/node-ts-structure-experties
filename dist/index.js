"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const mongodb_utils_1 = require("./utils/mongodb.utils");
const colors_1 = __importDefault(require("colors"));
const RecordNotFoundException_1 = __importDefault(require("./exceptions/RecordNotFoundException"));
dotenv_1.default.config();
(0, mongodb_utils_1.connectDB)();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.json());
app.use(routes_1.default);
app.use((err, req, res, next) => {
    console.error(colors_1.default.red(err.message));
    if (err instanceof RecordNotFoundException_1.default) {
        res.status(404).json({ message: err.message });
    }
    else {
        const status = 500;
        res.status(status).json({ message: 'Internal Server Error' });
    }
});
app.listen(port, () => {
    console.log(colors_1.default.green(`Server is running at ${port}`));
});
