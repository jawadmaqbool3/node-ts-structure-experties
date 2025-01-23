import { SOL_WALLET_NOT_PROVIDED } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";
export default class SolWalletNotProvidedException extends CustomException {

    /**
     * Constructor for SolWalletNotProvidedException
     *
     * @throws SolWalletNotProvidedException
     */
    constructor(
    ) {
        super(SOL_WALLET_NOT_PROVIDED, 400);
    }
} 