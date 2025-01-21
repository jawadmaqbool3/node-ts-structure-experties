import CustomException from "../CustomException";
export default class OTPCreationFailedException extends CustomException {

    /**
     * Constructor for OTPCreationFailedException
     *
     * @param {string} [message=OTP creation failed] - The error message
     * @param {string} [name=OTPCreationFailedException] - The error name
     * @param {number} [statusCode=400] - The HTTP status code
     */

    constructor(
    ) {
        super("OTP creation failed", "OTPCreationFailedException", 400);
    }
} 