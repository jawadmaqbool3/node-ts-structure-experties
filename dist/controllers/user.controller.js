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
exports.destroy = exports.update = exports.show = exports.create = exports.index = void 0;
const RecordNotFoundException_1 = __importDefault(require("../exceptions/RecordNotFoundException"));
const user_service_1 = require("./../services/user.service");
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_service_1.fetchAllUsers)();
        res.status(200).json({ users });
    }
    catch (error) {
        next(error);
    }
});
exports.index = index;
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const newUser = yield (0, user_service_1.createUser)(user);
        res.status(201).json({ user: newUser });
    }
    catch (error) {
        next(error);
    }
});
exports.create = create;
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.fetchByIdUser)(req.params.id);
        if (!user)
            throw new RecordNotFoundException_1.default();
        res.status(200).json({ user });
    }
    catch (error) {
        next(error);
    }
});
exports.show = show;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const updatedUser = yield (0, user_service_1.updateUser)(req.params.id, user);
        if (!user)
            throw new RecordNotFoundException_1.default();
        res.status(200).json({ user: updatedUser });
    }
    catch (error) {
        next(error);
    }
});
exports.update = update;
const destroy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.destroyUser)(req.params.id);
        if (!user)
            throw new RecordNotFoundException_1.default();
        res.status(200).json({ user });
    }
    catch (error) {
        next(error);
    }
});
exports.destroy = destroy;
