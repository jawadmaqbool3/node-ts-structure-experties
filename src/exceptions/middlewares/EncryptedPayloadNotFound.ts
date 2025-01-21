import { ENCRYPTED_PAYLOAD_NOT_FOUND } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";

export default class EncryptedPayloadNotFound extends CustomException {
    /**
    * Constructor for EncryptedPayloadNotFound
    *
    * @throws EncryptedPayloadNotFound
    */

    constructor(
    ) {
        super(ENCRYPTED_PAYLOAD_NOT_FOUND, 400);
    }
} 