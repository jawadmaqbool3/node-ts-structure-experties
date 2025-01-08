"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = require("./../../controllers/user.controller");
router.get('/', user_controller_1.index);
router.post('/', user_controller_1.create);
router.get('/:id', user_controller_1.show);
router.put('/:id', user_controller_1.update);
router.delete('/:id', user_controller_1.destroy);
exports.default = router;
