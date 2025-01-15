import { ChainType, CurrencyTypes, NetworkType } from "../enums/transaction.enum";

export type TCreateTransactionRequest = {
    currency_amount: number,
    currency_symbol: CurrencyTypes,
    currency_contract_address: string | undefined,
    transaction_network: NetworkType,
    token_contract_address: string | undefined,
    currency_worth: number | undefined,
    round_id: string,
    order_id: string,
    referral_id: string | undefined,
    wallet_address: string | undefined,
    customer_id: string | undefined,
    chain_type: ChainType,
}