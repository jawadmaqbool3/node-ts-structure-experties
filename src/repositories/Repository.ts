import { Document, Model } from "mongoose";

export default class Repository<T> {
    protected model: Model<T>;
    constructor(model: Model<T>) {
        this.model = model;
    }

    public findOne(query: object): Promise<T | null> {
        return this.model.findOne(query).exec();
    }

    public findById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    public findMany(query: object): Promise<T[]> {
        return this.model.find(query).exec();
    }

    public findAll(): Promise<T[]> {
        return this.model.find().exec();
    }

    public applyPipeline(pipeline: any[]): Promise<any[]> {
        return this.model.aggregate(pipeline).exec();
    }

    public create(data: object): Promise<T> {
        return this.model.create(data);
    }

    public update(id: string, data: object): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    public updateOrCreate(id: string, data: object): Promise<T> {
        return this.model.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
    }

    public async findOrCreate(query: object, data: object = {}): Promise<T> {
        const doc = await this.model.findOne(query);
        if (doc) {
            return doc;
        }
        return this.model.create(Object.keys(data).length ? data : query);
    }

    public delete(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id).exec();
    }
}