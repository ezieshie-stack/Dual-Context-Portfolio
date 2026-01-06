import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');

export async function getJsonData(filename: string) {
    const fullPath = path.join(dataDirectory, `${filename}.json`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents);
}

export async function getHomeData() {
    return await getJsonData('home');
}
