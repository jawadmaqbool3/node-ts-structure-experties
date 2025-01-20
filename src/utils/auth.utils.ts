import bcrypt from 'bcrypt';
import { AUTH_SALT } from '../constants/env.constant';
import PasswordEncryptionFailedException from '../exceptions/auth/PasswordEncryptionFailedException';
import { IAdmin } from '../interfaces/models/admin.interface';
import { ICustomer } from '../interfaces/models/customer.interface';
import { TAuthReponse, TAuthRequest, TAuthUser } from '../types/auth.type';
import { createAccessToken, createRefreshToken } from './jwt';
import EmailIsNotProvidedException from '../exceptions/auth/EmailIsNotProvidedException';
import PasswordNotProvidedException from '../exceptions/auth/PasswordNotProvidedException';
export async function hashPassword(password: string): Promise<string> {
    try {
        return bcrypt.hash(password, AUTH_SALT);
    } catch (err) {
        throw new PasswordEncryptionFailedException();
    }
};

export async function comparePassword(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed);
};



export function sanitizeAuthUser(model: IAdmin | ICustomer): TAuthUser {
    return {
        _id: model._id.toString(),
        first_name: model.first_name,
        last_name: model.last_name,
        email: model.email
    };
}

export function createAuthResponse(model: TAuthUser): TAuthReponse {
    return {
        access_token: createAccessToken(model),
        refresh_token: createRefreshToken(model),
        expires_in: 3600,
        user: model
    }
}


export function authenticateLoginInput(credentials: TAuthRequest) {
    const { email, password } = credentials;
    if (!email) throw new EmailIsNotProvidedException();
    if (!password) throw new PasswordNotProvidedException();
}

export function generateOTP(): number {
    return Math.floor(100000 + Math.random() * 900000);
}