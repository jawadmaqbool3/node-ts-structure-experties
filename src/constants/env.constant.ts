import dotenv from 'dotenv';
dotenv.config();

const env = process.env;

const PORT: number = Number(env.PORT) || 3000;
const SALES_PAGE_ENCRYPTION_KEY: string = env.SALES_PAGE_ENCRYPTION_KEY || '';
const STRIPE_SECRET_KEY: string = env.STRIPE_SECRET_KEY || '';
const TARGET_WALLET_ENCRYPTION_KEY: string = env.TARGET_WALLET_ENCRYPTION_KEY || '';
const JWT_ACCESS_TOKEN_SECRET: string = env.JWT_ACCESS_TOKEN_SECRET || '';
const AUTH_SALT: string = env.AUTH_SALT || '';
const JWT_REFRESH_TOKEN_SECRET: string = env.JWT_REFRESH_TOKEN_SECRET || '';
const EMAIL_HOST: string = env.EMAIL_HOST || '';
const EMAIL_PORT: number = Number(env.EMAIL_PORT) || 465;
const EMAIL_SECURE: boolean = Boolean(env.EMAIL_SECURE) || false;
const EMAIL_USER: string = env.EMAIL_USER || '';
const EMAIL_PASSWORD: string = env.EMAIL_PASSWORD || '';
export {
    PORT,
    SALES_PAGE_ENCRYPTION_KEY,
    STRIPE_SECRET_KEY,
    TARGET_WALLET_ENCRYPTION_KEY,
    JWT_ACCESS_TOKEN_SECRET,
    JWT_REFRESH_TOKEN_SECRET,
    AUTH_SALT,
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_SECURE,
    EMAIL_USER,
    EMAIL_PASSWORD,
}