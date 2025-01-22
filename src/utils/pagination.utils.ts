import { PipelineStage, Model as TModel } from "mongoose";
import { TFilter, TPaginationResults } from "../types/pagination.type";
import mongoose from "mongoose";

let sort: object = { _id: -1 };
let Model: TModel<any>;
let fieldExceptions: string[] = [];
export async function paginate<T>(query: PipelineStage[] = [], model: TModel<T>, filterData: TFilter, exceptions: string[] = []) {

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
            } as never);
        else
            query.push({
                $match: queryObj
            } as never);
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
    } as never);

    const modelValues = await model.aggregate(query);

    const totalCount = modelValues[0].total_count.length > 0 ? modelValues[0].total_count[0].count : 0;

    return {
        list: modelValues[0].data,
        pagination: {
            total_record: totalCount,
            page: page,
            pages: limit ? Math.ceil(totalCount / limit) : 1,
        },
    } as TPaginationResults<typeof model>;
}

function validKeys(queryObj: { [key: string]: any }) {
    for (const key in queryObj) {
        if (queryObj.hasOwnProperty(key)) {

            const isValidKey = (!!Model.schema.path(key) || fieldExceptions.includes(key));

            if (!isValidKey) {
                delete queryObj[key]
            }
        }
    }
    return queryObj;
}


function queryParamsToMongoQuery(queryParams: { [key: string]: any }) {

    let mongoQuery: any = {};

    let orMongoQuery: object[] = [];

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

function isValidDate(value: string) {

    const date = new Date(value);

    return !isNaN(date.getTime());
}

function isValidNumber(value: string) {

    return !isNaN(Number(value));
}


function applyQueryConditions(value: string, key: string, mongoQuery: any) {

    if (key.endsWith('_min') || key.endsWith('_max')) {

        const baseKey = key.replace(/_(min|max)$/, '');

        if (!mongoQuery[baseKey]) {

            mongoQuery[baseKey] = {};
        }

        if (key.endsWith('_min')) {

            if (isValidNumber(value)) {

                mongoQuery[baseKey].$gte = Number(value);
            } else if (isValidDate(value)) {

                mongoQuery[baseKey].$gte = new Date(value);
            }
        }

        if (key.endsWith('_max')) {

            if (isValidNumber(value)) {

                mongoQuery[baseKey].$lte = Number(value);

            } else if (isValidDate(value)) {

                mongoQuery[baseKey].$lte = new Date(value);
            }
        }
    } else if (key.endsWith('_like')) {

        const baseKey = key.replace('_like', '');

        mongoQuery[baseKey] = { $regex: value, $options: 'i' };
    } else {

        if (mongoose.Types.ObjectId.isValid(value) && value !== 'unidentified') {

            mongoQuery[key] = new mongoose.Types.ObjectId(value);

        } else if (value === 'true' || value === 'false') {

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