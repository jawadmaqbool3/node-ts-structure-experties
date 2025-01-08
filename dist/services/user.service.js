"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllUsers = fetchAllUsers;
exports.fetchByIdUser = fetchByIdUser;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.destroyUser = destroyUser;
const user_model_1 = __importDefault(require("./../models/user.model"));
function fetchAllUsers() {
    return user_model_1.default.find().exec();
}
function fetchByIdUser(id) {
    return user_model_1.default.findById(id).exec();
}
function createUser(user) {
    const newUser = new user_model_1.default(user);
    return newUser.save();
}
function updateUser(id, user) {
    return user_model_1.default.findByIdAndUpdate(id, user, { new: true }).exec();
}
function destroyUser(id) {
    return user_model_1.default.findByIdAndDelete(id).exec();
}
