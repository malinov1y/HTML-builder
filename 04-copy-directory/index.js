import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function copyDir() {
    const startDir = path.join(__dirname, 'files');
    const finishDir = path.join(__dirname, 'files-copy');

    await fs.rm(finishDir, { recursive: true, force: true });
    await fs.mkdir(finishDir, { recursive: true });

    const files = await fs.readdir(startDir, { withFileTypes: true });

    for (const file of files) {
        const startPath = path.join(startDir, file.name);
        const finishPath = path.join(finishDir, file.name);

        if (file.isFile()){
            await fs.copyFile(startPath, finishPath);
        }
    }
}

copyDir();