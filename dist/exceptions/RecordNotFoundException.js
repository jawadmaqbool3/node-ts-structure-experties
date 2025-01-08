"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RecordNotFoundException extends Error {
    constructor(message = "Record not found") {
        super(message);
        this.name = 'RecordNotFoundException';
        Object.setPrototypeOf(this, RecordNotFoundException.prototype);
    }
}
exports.default = RecordNotFoundException;
