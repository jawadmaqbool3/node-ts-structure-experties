import dotenv from 'dotenv';
dotenv.config();

const PORT :number =  Number(process.env.PORT) || 3000;
const SALES_PAGE_ENCRYPTION_KEY: string = process.env.SALES_PAGE_ENCRYPTION_KEY || '';
const STRIPE_SECRET_KEY: string = process.env.STRIPE_SECRET_KEY || '';
const TARGET_WALLET_ENCRYPTION_KEY: string = process.env.TARGET_WALLET_ENCRYPTION_KEY || '';

export {
    PORT,
    SALES_PAGE_ENCRYPTION_KEY,
    STRIPE_SECRET_KEY,
    TARGET_WALLET_ENCRYPTION_KEY
}