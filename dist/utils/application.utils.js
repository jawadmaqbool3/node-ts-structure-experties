"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDevMode = void 0;
const env_constant_1 = require("../constants/env.constant");
const application_modes_enum_1 = require("../enums/application-modes.enum");
exports.isDevMode = (env_constant_1.NODE_ENV === application_modes_enum_1.ApplicationModes.DEV);
