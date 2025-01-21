import fs from 'fs';
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