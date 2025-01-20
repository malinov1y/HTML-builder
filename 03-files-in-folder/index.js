import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderPath = path.join(__dirname, 'secret-folder');

const files = await fs.readdir(folderPath, { withFileTypes: true });

for (const file of files) {
    const filePath = path.join(folderPath, file.name)

    if (file.isFile()) {
        const stats = await fs.stat(filePath);
        const fileExtension = path.extname(filePath).slice(1);
        const fileName = path.basename(file.name, path.extname(filePath));
        const fileSize = stats.size;

        console.log(`${fileName} - ${fileExtension} - ${fileSize}`);
    }
}