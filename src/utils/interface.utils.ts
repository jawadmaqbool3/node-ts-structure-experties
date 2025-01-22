export function interfaceToMongoProjection<T>(keys: (keyof T)[]): { [K in keyof T]: 1 } {
    return keys.reduce((projection, key) => {
        projection[key] = 1;
        return projection;
    }, {} as { [K in keyof T]: 1 });
}