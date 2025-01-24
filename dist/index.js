"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const mongodb_utils_1 = require("./utils/mongodb.utils");
const colors_1 = __importDefault(require("colors"));
const error_handler_utils_1 = require("./utils/error-handler.utils");
const env_constant_1 = require("./constants/env.constant");
const cors_1 = __importDefault(require("cors"));
const settlement_command_1 = __importDefault(require("./commands/settlement.command"));
const application_utils_1 = require("./utils/application.utils");
(0, mongodb_utils_1.connectDB)();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(routes_1.default);
app.use(error_handler_utils_1.errorHandler);
app.listen(env_constant_1.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    application_utils_1.isDevMode && (0, settlement_command_1.default)();
    console.log(colors_1.default.green(`Server is running at ${env_constant_1.PORT}`));
}));
