import { ROUND_HAS_ENDED } from "../../messages/exceptions.messages";
import CustomException from "../CustomException";

export default class RoundEndedException extends CustomException {

    /**
    * Constructor for RoundEndedException
    *
    * @throws RoundEndedException
    */
    constructor(
    ) {
        super(ROUND_HAS_ENDED, 400);
    }
} 