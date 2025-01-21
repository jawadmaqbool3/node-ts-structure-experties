import { TARGET_WALLET_ENCRYPTION_FAILED } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";

export default class TargetWalletEncryptionFailed extends CustomException {
    
        /**
         * Constructor for TargetWalletEncryptionFailed
         *
         * @throws TargetWalletEncryptionFailed
         */
    
        constructor(    
        ) {
            super(TARGET_WALLET_ENCRYPTION_FAILED, 400);
        }
} 