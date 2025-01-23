import mongoose from "mongoose";
import InvalidObjectIdException from "../exceptions/InvalidObjectIdException";


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
export function toObjectId(id: string | mongoose.Types.ObjectId): mongoose.Types.ObjectId {
    if (id instanceof mongoose.Types.ObjectId)
        return id;
    else if (mongoose.Types.ObjectId.isValid(id)) {
        return new mongoose.Types.ObjectId(id);
    }

    throw new InvalidObjectIdException();
}