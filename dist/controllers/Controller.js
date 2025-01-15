"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    /**
     * Constructor for the Controller class
     *
     * This function is empty and only used to initialize the class
     */
    constructor() {
    }
    /**
     * Returns a successful response to the client with the provided data
     *
     * @param {Response} res - Express response object
     * @param {object} data - Data to be sent back to the client
     */
    prepareSuccess(res, data) {
        res.status(200).json(data);
    }
}
exports.default = Controller;
