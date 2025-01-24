"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interfaceToMongoProjection = interfaceToMongoProjection;
function interfaceToMongoProjection(keys) {
    return keys.reduce((projection, key) => {
        projection[key] = 1;
        return projection;
    }, {});
}
