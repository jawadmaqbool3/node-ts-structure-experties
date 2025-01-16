import CustomException from "../CustomException";

export default class IpNotFoundException extends CustomException {
    /**
     * Constructor for IpNotFoundException
     *
     * @param {string} [message=Ip not found] - The error message
     * @param {string} [name=IpNotFoundException] - The error name
     * @param {number} [statusCode=403] - The HTTP status code
     */
    constructor(    
    ) {
        super("IP not found", "IpNotFoundException", 403);
    }
} 