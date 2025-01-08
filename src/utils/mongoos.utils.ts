import mongoose from "mongoose";

export function toObjectId(id: any): mongoose.Schema.Types.ObjectId | null {
    if (mongoose.Types.ObjectId.isValid(id)) {
        if (id instanceof mongoose.Schema.Types.ObjectId) {
            return id;
        }
        return new mongoose.Schema.Types.ObjectId(id);
    }
    return null;
}