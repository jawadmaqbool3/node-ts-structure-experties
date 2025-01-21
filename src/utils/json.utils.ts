
/**
 * Checks if the given string is valid JSON.
 * @param {string} str The string to check
 * @returns {boolean} True if the string is valid JSON, false otherwise
 */
export function isJsonString(str: string): boolean {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
/**
 * If the given string is valid JSON, this function returns the parsed JSON object.
 * Otherwise, it returns the original string.
 * @param {string} str The string to parse
 * @returns {object|string} The parsed JSON object or the original string
 */
export function parseIfJson(str: string): object | string {
    if(isJsonString(str)) return JSON.parse(str);
    else return str
}


/**
 * If the given object is a string, this function returns the original string.
 * Otherwise, it returns the stringified JSON representation of the object.
 * @param {object|string} obj The object or string to stringify
 * @returns {string} The stringified JSON object or the original string
 */
export function stringifyIfObj(obj: object | string): string {
    if(typeof obj === 'string') return obj;
    else return JSON.stringify(obj)
}
