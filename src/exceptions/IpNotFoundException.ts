import CustomException from "./CustomException";

export default class IpNotFoundException extends CustomException {
    constructor(
    ) {
        super("IP not found", "IpNotFoundException", 403);
    }
} 