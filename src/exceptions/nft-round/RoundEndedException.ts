import CustomException from "../CustomException";

export default class RoundEndedException extends CustomException {
    constructor(
    ) {
        super("Round has ended", "RoundEndedException", 400);
    }
} 