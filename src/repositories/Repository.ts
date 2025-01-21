import mongoose, { Model } from "mongoose";

export default class Repository<T> {
    protected model: Model<T>;
    /**
     * Constructor
     *
     * @param {Model<T>} model - The mongoose model instance
     */
    constructor(model: Model<T>) {
        this.model = model;
    }

    /**
     * Finds a single document that matches the specified query.
     *
     * @param {object} query - The MongoDB query object used to find the document.
     * 
     * @returns {Promise<T | null>} - A promise that resolves to the found document or null if no document matches the query.
     */

    /**
     * Finds a single document that matches the specified query.
     *
     * @param {object} query - The MongoDB query object used to find the document.
     * 
     * @returns {Promise<T | null>} - A promise that resolves to the found document or null if no document matches the query.
     */
    public findOne(query: object): Promise<T | null> {
        return this.model.findOne(query).exec();
    }

    /**
     * Finds a single document that matches the specified id.
     *
     * @param {mongoose.Types.ObjectId | string} id - The id of the document to find.
     * 
     * @returns {Promise<T | null>} - A promise that resolves to the found document or null if no document matches the id.
     */
    public findById(id:  mongoose.Types.ObjectId | string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    /**
     * Finds multiple documents that matches the specified query.
     *
     * @param {object} query - The MongoDB query object used to find the documents.
     * 
     * @returns {Promise<T[]>} - A promise that resolves to an array of found documents.
     */
    
    public findMany(query: object): Promise<T[]> {
        return this.model.find(query).exec();
    }

    /**
     * Finds all documents in the collection.
     * 
     * @returns {Promise<T[]>} - A promise that resolves to an array of all found documents.
     */
    public findAll(): Promise<T[]> {
        return this.model.find().exec();
    }

    /**
     * Applies a MongoDB aggregation pipeline to the collection.
     * 
     * @param {any[]} pipeline - The MongoDB aggregation pipeline to apply.
     * 
     * @returns {Promise<any[]>} - A promise that resolves to an array of the results of the pipeline.
     */
    public applyPipeline(pipeline: any[]): Promise<any[]> {
        return this.model.aggregate(pipeline).exec();
    }

    /**
     * Creates a new document in the collection.
     * 
     * @param {object} data - The data to create the document with.
     * 
     * @returns {Promise<T>} - A promise that resolves to the created document.
     */
    public create(data: Partial<T>): Promise<T> {
        return this.model.create(data);
    }

    /**
     * Updates a document in the collection with the specified id using the provided data.
     *
     * @param {string | mongoose.Types.ObjectId} id - The id of the document to update.
     * @param {object} data - The data to update the document with.
     * 
     * @returns {Promise<T | null>} - A promise that resolves to the updated document or null if no document matches the id.
     */

    public update(id: string | mongoose.Types.ObjectId, data: Partial<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    /**
     * Updates a document in the collection with the specified id using the provided data.
     * If no document matches the id, creates a new document with the provided data.
     * 
     * @param {string} id - The id of the document to update or create.
     * @param {object} data - The data to update the document with or create a new one with.
     * 
     * @returns {Promise<T>} - A promise that resolves to the updated or created document.
     */
    public updateOrCreate(id: string, data: object): Promise<T> {
        return this.model.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
    }

    /**
     * Finds a document in the collection that matches the query, or creates a new document with the data if no document matches.
     * 
     * @param {object} query - The query to match against.
     * @param {object} [data={}] - The data to create the document with if no document matches the query.
     * 
     * @returns {Promise<T>} - A promise that resolves to the found or created document.
     */
    public async findOrCreate(query: object, data: object = {}): Promise<T> {
        const doc = await this.model.findOne(query);
        if (doc) {
            return doc;
        }
        return this.model.create(Object.keys(data).length ? data : query);
    }

    /**
     * Checks if a document exists in the collection that matches the specified query.
     *
     * @param {object} query - The MongoDB query object used to check for the document's existence.
     * 
     * @returns {Promise<boolean>} - A promise that resolves to true if a document exists that matches the query, otherwise false.
     */

    public async isExists(query: object): Promise<boolean> {
        return await this.model.exists(query)? true : false;
    }

    /**
     * Deletes a document from the collection with the specified id.
     *
     * @param {string} id - The id of the document to delete.
     * 
     * @returns {Promise<T | null>} - A promise that resolves to the deleted document or null if no document matches the id.
     */
    public delete(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id).exec();
    }
}