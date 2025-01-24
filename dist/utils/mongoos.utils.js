"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toObjectId = toObjectId;
const mongoose_1 = __importDefault(require("mongoose"));
const InvalidObjectIdException_1 = __importDefault(require("../exceptions/InvalidObjectIdException"));
/**
 * Converts the given id to a mongoose ObjectId, if it is valid.
 *
 * If the given id is already a mongoose ObjectId, it is returned as is.
 * If the given id is a string or a number, it is converted to a mongoose ObjectId.
 * If the given id is not a valid ObjectId string, it returns null.
 *
 * @param {any} id The id to convert.
 * @returns {mongoose.Types.ObjectId | null} The converted ObjectId or null if it is not valid.
 * @throws InvalidObjectIdException If the given id is not a valid ObjectId string.
 */
function toObjectId(id) {
    if (id instanceof mongoose_1.default.Types.ObjectId)
        return id;
    else if (mongoose_1.default.Types.ObjectId.isValid(id)) {
        return new mongoose_1.default.Types.ObjectId(id);
    }
    throw new InvalidObjectIdException_1.default();
}
