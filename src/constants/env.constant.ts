import dotenv from 'dotenv';
dotenv.config();

const env = process.env;

const PORT :number =  Number(env.PORT) || 3000;
const SALES_PAGE_ENCRYPTION_KEY: string = env.SALES_PAGE_ENCRYPTION_KEY || '';
const STRIPE_SECRET_KEY: string = env.STRIPE_SECRET_KEY || '';
const TARGET_WALLET_ENCRYPTION_KEY: string = env.TARGET_WALLET_ENCRYPTION_KEY || '';
const JWT_SECRET: string = env.JWT_SECRET || '';
export {
    PORT,
    SALES_PAGE_ENCRYPTION_KEY,
    STRIPE_SECRET_KEY,
    TARGET_WALLET_ENCRYPTION_KEY,
    JWT_SECRET
}