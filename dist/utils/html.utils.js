"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = render;
const fs_1 = __importDefault(require("fs"));
/**
 * Renders an HTML template with data.
 * @param templatePath Path to the template file. The file must contain
 *                     placeholders in the format of {{key}}, where key is
 *                     a key in the data object.
 * @param data Data to be replaced in the template. The keys in this object
 *             must match the placeholders in the template file.
 * @returns The rendered template as a string.
 */
function render(templatePath, data) {
    let fileContent = fs_1.default.readFileSync(templatePath, 'utf8');
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const value = String(data[key]);
            fileContent = fileContent.replace(new RegExp(`{{${key}}}`, 'g'), value);
        }
    }
    return fileContent;
}
