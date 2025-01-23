import { MAX_PASSWORD_LENGTH, MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH } from "../constants/auth.constant";

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePassword(password: string = '') {
    if(!password) return false;
    if(password.length < MIN_PASSWORD_LENGTH) return false;
    if(password.length > MAX_PASSWORD_LENGTH) return false;
    return true;
}


export function validateName(name: string = '') {
    if(!name) return false;
    if(name.length < MIN_NAME_LENGTH) return false;
    if(name.length > MAX_PASSWORD_LENGTH) return false;
    return true;
}