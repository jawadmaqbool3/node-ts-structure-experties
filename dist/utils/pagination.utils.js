"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = paginate;
const mongoose_1 = __importDefault(require("mongoose"));
let sort = { _id: -1 };
let Model;
let fieldExceptions = [];
function paginate() {
    return __awaiter(this, arguments, void 0, function* (query = [], model, filterData, exceptions = []) {
        fieldExceptions = exceptions;
        const page = filterData.page || 1;
        const limit = filterData.limit || 0;
        delete filterData.page;
        delete filterData.limit;
        Model = model;
        let queryObj = queryParamsToMongoQuery(filterData);
        queryObj = validKeys(queryObj);
        if (queryObj) {
            if (exceptions.length == 0)
                query.unshift({
                    $match: queryObj
                });
            else
                query.push({
                    $match: queryObj
                });
        }
        query.push({
            $facet: {
                data: [
                    { $sort: sort },
                    ...(limit ? [
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                    ] : [])
                ],
                total_count: [
                    { $count: "count" }
                ]
            }
        });
        const modelValues = yield model.aggregate(query);
        const totalCount = modelValues[0].total_count.length > 0 ? modelValues[0].total_count[0].count : 0;
        return {
            list: modelValues[0].data,
            pagination: {
                total_record: totalCount,
                page: page,
                pages: limit ? Math.ceil(totalCount / limit) : 1,
            },
        };
    });
}
function validKeys(queryObj) {
    for (const key in queryObj) {
        if (queryObj.hasOwnProperty(key)) {
            const isValidKey = (!!Model.schema.path(key) || fieldExceptions.includes(key));
            if (!isValidKey) {
                delete queryObj[key];
            }
        }
    }
    return queryObj;
}
function queryParamsToMongoQuery(queryParams) {
    let mongoQuery = {};
    let orMongoQuery = [];
    Object.keys(queryParams).forEach((key) => {
        const value = queryParams[key];
        if (key.startsWith('_or_')) {
            const baseKey = key.replace("_or_", '');
            orMongoQuery.push(applyQueryConditions(value, baseKey, mongoQuery));
        }
        else if (key.startsWith('_sort_')) {
            let baseKey = key.replace("_sort_", '');
            let sortQuery = { [baseKey]: value == "asc" ? 1 : -1 };
            if (Object.keys(validKeys(sortQuery)).length) {
                sort = sortQuery;
            }
        }
        else {
            mongoQuery = Object.assign({}, mongoQuery, applyQueryConditions(value, key, mongoQuery));
        }
    });
    if (orMongoQuery.length) {
        mongoQuery.$or = orMongoQuery;
    }
    return mongoQuery;
}
function isValidDate(value) {
    const date = new Date(value);
    return !isNaN(date.getTime());
}
function isValidNumber(value) {
    return !isNaN(Number(value));
}
function applyQueryConditions(value, key, mongoQuery) {
    if (key.endsWith('_min') || key.endsWith('_max')) {
        const baseKey = key.replace(/_(min|max)$/, '');
        if (!mongoQuery[baseKey]) {
            mongoQuery[baseKey] = {};
        }
        if (key.endsWith('_min')) {
            if (isValidNumber(value)) {
                mongoQuery[baseKey].$gte = Number(value);
            }
            else if (isValidDate(value)) {
                mongoQuery[baseKey].$gte = new Date(value);
            }
        }
        if (key.endsWith('_max')) {
            if (isValidNumber(value)) {
                mongoQuery[baseKey].$lte = Number(value);
            }
            else if (isValidDate(value)) {
                mongoQuery[baseKey].$lte = new Date(value);
            }
        }
    }
    else if (key.endsWith('_like')) {
        const baseKey = key.replace('_like', '');
        mongoQuery[baseKey] = { $regex: value, $options: 'i' };
    }
    else {
        if (mongoose_1.default.Types.ObjectId.isValid(value) && value !== 'unidentified') {
            mongoQuery[key] = new mongoose_1.default.Types.ObjectId(value);
        }
        else if (value === 'true' || value === 'false') {
            mongoQuery[key] = (value === 'true' ? true : false);
        }
        else if (isValidNumber(value)) {
            mongoQuery[key] = Number(value);
        }
        else {
            mongoQuery[key] = value;
        }
    }
    return mongoQuery;
}
