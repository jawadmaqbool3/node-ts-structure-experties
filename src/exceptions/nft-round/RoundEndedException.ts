import CustomException from "../CustomException";

export default class RoundEndedException extends CustomException {

    /**
     * Constructor
     *
     * @param {string} message - exception message
     * @param {string} name - exception name
     * @param {number} statusCode - http status code
     */
    constructor(
    ) {
        super("Round has ended", "RoundEndedException", 400);
    }
} 