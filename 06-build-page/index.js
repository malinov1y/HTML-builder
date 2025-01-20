import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const assetsDir = path.join(__dirname, 'assets');
const outputDir = path.join(__dirname, 'project-dist');
const assetsOutputDir = path.join(outputDir, 'assets');
const stylesDir = path.join(__dirname, 'styles');
const templatePath = path.join(__dirname, 'template.html');
const htmlPath = path.join(outputDir, 'index.html');
const bundlePath = path.join(outputDir, 'style.css');




await fs.mkdir(outputDir, { recursive: true });

const templateStr = await fs.readFile(templatePath, 'utf-8');
const tags = templateStr.match(/{{\s*(\w+)\s*}}/g);

let newTemplate = templateStr;

for (const tag of tags) {
  const tagName = tag.replace(/{{\s*|\s*}}/g, '');
  const componentsPath = path.join(__dirname, 'components', `${tagName}.html`);
  const componentsData = await fs.readFile(componentsPath, 'utf-8');
  newTemplate = newTemplate.replace(tag, componentsData);
}

await fs.writeFile(htmlPath, newTemplate, 'utf-8');




const files = await fs.readdir(stylesDir, { withFileTypes: true });
const stylesArr = [];

for (const file of files) {
  const filePath = path.join(stylesDir, file.name);

  if (file.isFile() && path.extname(filePath) === '.css') {
    const data = await fs.readFile(filePath, 'utf-8');
    stylesArr.push(data);
  }
}

await fs.writeFile(bundlePath, stylesArr.join('\n'), 'utf-8');




await fs.mkdir(assetsOutputDir, { recursive: true });

const assetFiles = await fs.readdir(assetsDir, { withFileTypes: true });

for (const file of assetFiles) {
  const startPath = path.join(assetsDir, file.name);
  const finishPath = path.join(assetsOutputDir, file.name);

  if (file.isDirectory()) {
    await copyDir(startPath, finishPath);
  } else if (file.isFile()) {
    await fs.copyFile(startPath, finishPath);
  }
}




async function copyDir(startDir, finishDir) {
  await fs.mkdir(finishDir, { recursive: true });

  const files = await fs.readdir(startDir, { withFileTypes: true });

  for (const file of files) {
    const startPath = path.join(startDir, file.name);
    const finishPath = path.join(finishDir, file.name);

    if (file.isDirectory()) {
      await copyDir(startPath, finishPath);
    } else if (file.isFile()) {
      await fs.copyFile(startPath, finishPath);
    }
  }
}