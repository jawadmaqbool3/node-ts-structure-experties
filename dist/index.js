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
const error_handler_utils_1 = require("./utils/error-handler.utils");
dotenv_1.default.config();
(0, mongodb_utils_1.connectDB)();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.json());
app.use(routes_1.default);
app.use(error_handler_utils_1.errorHandler);
app.listen(port, () => {
    console.log(colors_1.default.green(`Server is running at ${port}`));
});
