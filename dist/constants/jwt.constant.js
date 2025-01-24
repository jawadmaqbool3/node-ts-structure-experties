"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN_EXPIRATION_TIME_IN_SECONDS = exports.ACCESS_TOKEN_EXPIRATION_TIME_IN_SECONDS = void 0;
const time_1 = require("../utils/time");
exports.ACCESS_TOKEN_EXPIRATION_TIME_IN_SECONDS = (0, time_1.convertDaysToSeconds)(1);
exports.REFRESH_TOKEN_EXPIRATION_TIME_IN_SECONDS = (0, time_1.convertDaysToSeconds)(7);
