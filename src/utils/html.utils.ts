import fs from 'fs';
/**
 * Renders an HTML template with data.
 * @param templatePath Path to the template file. The file must contain
 *                     placeholders in the format of {{key}}, where key is
 *                     a key in the data object.
 * @param data Data to be replaced in the template. The keys in this object
 *             must match the placeholders in the template file.
 * @returns The rendered template as a string.
 */
export function render(templatePath: string, data: Record<string, any>): string {
    let fileContent = fs.readFileSync(templatePath, 'utf8');
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const value = String(data[key]);
            fileContent = fileContent.replace(new RegExp(`{{${key}}}`, 'g'), value);
        }
    }
    return fileContent;
}