
export function isJsonString(str: string): boolean {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
export function parseIfJson(str: string): object | string {
    if(isJsonString(str)) return JSON.parse(str);
    else return str
}


export function stringifyIfObj(obj: object | string): string {
    if(typeof obj === 'string') return obj;
    else return JSON.stringify(obj)
}
