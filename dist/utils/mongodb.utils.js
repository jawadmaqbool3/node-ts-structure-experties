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
exports.disconnectDB = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const colors_1 = __importDefault(require("colors"));
/**
 * Establishes a connection to the MongoDB database using the URI specified in the environment variable MONGO_URI.
 * Logs a success message if the connection is established, or an error message and exits the process if the connection fails.
 *
 * @throws Error if the MongoDB URI is not provided.
 */
/**
 * Establishes a connection to the MongoDB database using the URI specified in the environment variable MONGO_URI.
 * Logs a success message if the connection is established, or an error message and exits the process if the connection fails.
 *
 * @throws Error if the MongoDB URI is not provided.
 * @returns A Promise that resolves to void if the connection is successful, or rejects to Error if the connection fails.
 */
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const dbURI = process.env.MONGO_URI;
    try {
        if (!dbURI)
            throw new Error('MongoDB URI is not provided');
        yield mongoose_1.default.connect(dbURI, {});
        console.log(colors_1.default.green('MongoDB connected successfully'));
    }
    catch (error) {
        console.error(colors_1.default.green('Error connecting to MongoDB'));
        process.exit(1);
    }
});
exports.connectDB = connectDB;
/**
 * Disconnects the MongoDB connection. Logs a success message if the disconnection is successful, or an error message if the disconnection fails.
 *
 * @returns A Promise that resolves to void if the disconnection is successful, or rejects to Error if the disconnection fails.
 */
const disconnectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.disconnect();
        console.log('MongoDB disconnected');
    }
    catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
    }
});
exports.disconnectDB = disconnectDB;
