import { readdir, mkdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public', 'project-previews');
const distDir = path.join(root, 'dist', 'project-previews');
const imageExtensions = /\.(png|jpe?g|tiff?|bmp)$/i;

async function imageFiles(directory) {
  try {
    return (await readdir(directory, { withFileTypes: true }))
      .filter((entry) => entry.isFile() && imageExtensions.test(entry.name))
      .map((entry) => path.join(directory, entry.name));
  } catch {
    return [];
  }
}

let sourceDir = publicDir;
let files = await imageFiles(publicDir);

// Some earlier builds may have the captures only in dist/. If so, import them
// into public/ so the next Vite build and the dev server both use WebP files.
if (files.length === 0) {
  sourceDir = distDir;
  files = await imageFiles(distDir);
}

if (files.length === 0) {
  console.log('No PNG/JPG screenshots found in public/project-previews or dist/project-previews.');
  console.log('Run npm run capture:projects to capture the live project homepages directly as WebP.');
  process.exit(0);
}

await mkdir(publicDir, { recursive: true });
console.log(`Converting ${files.length} existing screenshot(s) to WebP…`);
console.log(`Source folder: ${sourceDir}`);

let converted = 0;
let beforeTotal = 0;
let afterTotal = 0;

for (const sourcePath of files) {
  const name = path.basename(sourcePath, path.extname(sourcePath));
  const outputPath = path.join(publicDir, `${name}.webp`);
  try {
    const before = await stat(sourcePath);
    const output = await sharp(sourcePath)
      .rotate()
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 78, effort: 5, smartSubsample: true })
      .toFile(outputPath);

    // Delete the heavier source only after the WebP is written successfully.
    await unlink(sourcePath);
    beforeTotal += before.size;
    afterTotal += output.size;
    converted += 1;
    const saved = Math.max(0, Math.round((1 - output.size / before.size) * 100));
    console.log(`✓ ${path.basename(sourcePath)} → ${path.basename(outputPath)} (${Math.round(before.size / 1024)} KB → ${Math.round(output.size / 1024)} KB, ${saved}% smaller)`);
  } catch (error) {
    console.error(`✗ ${path.basename(sourcePath)}: ${error.message}`);
    process.exitCode = 1;
  }
}

const totalSaved = beforeTotal > 0 ? Math.round((1 - afterTotal / beforeTotal) * 100) : 0;
console.log(`\nConverted ${converted}/${files.length} images. Total: ${Math.round(beforeTotal / 1024)} KB → ${Math.round(afterTotal / 1024)} KB (${totalSaved}% smaller).`);
console.log('The portfolio now references .webp files. Run npm run build, then npm run preview.');
