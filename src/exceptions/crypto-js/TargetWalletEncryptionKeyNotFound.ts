import { TARGET_WALLET_ENCRYPTION_KEY } from "../../constants/env.constant";
import CustomException from "../CustomException";

export default class TargetWalletEncryptionKeyNotFound extends CustomException {
    /**
    * Constructor for TargetWalletEncryptionKeyNotFound
    *
    * @throws TargetWalletEncryptionKeyNotFound
    */

    constructor(
    ) {
        super(TARGET_WALLET_ENCRYPTION_KEY, 400);
    }
} 