import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stylesDir = path.join(__dirname, 'styles');
const outputDir = path.join(__dirname, 'project-dist');
const bundlePath = path.join(outputDir, 'bundle.css');

await fs.mkdir(outputDir, { recursive: true });

const files = await fs.readdir(stylesDir, { withFileTypes: true });

const stylesArr = [];

for (const file of files) {
    const filePath = path.join(stylesDir, file.name);

    if (file.isFile() && path.extname(filePath) === '.css') {
        const data = await fs.readFile(filePath, 'utf-8');
        stylesArr.push(data);
    }

    await fs.writeFile(bundlePath, stylesArr.join('\n'), 'utf-8');
}