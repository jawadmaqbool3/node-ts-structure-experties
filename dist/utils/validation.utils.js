"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = validateEmail;
exports.validatePassword = validatePassword;
exports.validateName = validateName;
const auth_constant_1 = require("../constants/auth.constant");
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function validatePassword(password = '') {
    if (!password)
        return false;
    if (password.length < auth_constant_1.MIN_PASSWORD_LENGTH)
        return false;
    if (password.length > auth_constant_1.MAX_PASSWORD_LENGTH)
        return false;
    return true;
}
function validateName(name = '') {
    if (!name)
        return false;
    if (name.length < auth_constant_1.MIN_NAME_LENGTH)
        return false;
    if (name.length > auth_constant_1.MAX_PASSWORD_LENGTH)
        return false;
    return true;
}
