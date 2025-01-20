import fs from 'fs';
export function render(path: string, data: Record<string, any>): string {
    let fileContent = fs.readFileSync(path, 'utf8');
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            fileContent = fileContent.replace(`{{${key}}}`, data[key]);
        }
    }
    return fileContent;
}