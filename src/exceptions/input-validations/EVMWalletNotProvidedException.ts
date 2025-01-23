import { EVM_WALLET_NOT_PROVIDED } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";
export default class EVMWalletNotProvidedException extends CustomException {

    /**
     * Constructor for EVMWalletNotProvidedException
     *
     * @throws EVMWalletNotProvidedException
     */
    constructor(
    ) {
        super(EVM_WALLET_NOT_PROVIDED, 400);
    }
} 