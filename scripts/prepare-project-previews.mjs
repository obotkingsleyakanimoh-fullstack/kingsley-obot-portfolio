import { copyFile, mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const root = process.cwd();
const destinationDir = path.join(root, 'src', 'assets', 'project-previews');
const sourceDirs = [
  path.join(root, 'dist', 'project-previews'),
  path.join(root, 'public', 'project-previews'),
];
const projectIds = [
  'pharmaivo',
  'techmatrix',
  'jobready',
  'satoshivault',
  'again',
  'zitso',
  'kingdavid',
  'breathofkings',
  'reunion',
];
const extensions = ['.webp', '.png', '.jpg', '.jpeg'];

await mkdir(destinationDir, { recursive: true });

async function exists(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

async function findSource(projectId) {
  for (const sourceDir of sourceDirs) {
    let entries;
    try {
      entries = new Set(await readdir(sourceDir));
    } catch {
      continue;
    }

    for (const extension of extensions) {
      const candidate = path.join(sourceDir, `${projectId}${extension}`);
      if (entries.has(`${projectId}${extension}`) && await exists(candidate)) {
        return candidate;
      }
    }
  }
  return null;
}

console.log('Preparing local project screenshots for Vite…');
console.log(`Source assets: ${destinationDir}`);
console.log('Looking first in dist/project-previews, then public/project-previews.');

let copied = 0;
let alreadyReady = 0;
const missing = [];

for (const projectId of projectIds) {
  const destination = path.join(destinationDir, `${projectId}.webp`);
  if (await exists(destination)) {
    alreadyReady += 1;
    continue;
  }

  const source = await findSource(projectId);
  if (!source) {
    missing.push(projectId);
    continue;
  }

  const extension = path.extname(source).toLowerCase();
  if (extension === '.webp') {
    await copyFile(source, destination);
    console.log(`✓ ${projectId}.webp copied from ${path.relative(root, source)}`);
  } else {
    await sharp(source)
      .rotate()
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 78, effort: 5, smartSubsample: true })
      .toFile(destination);
    console.log(`✓ ${path.basename(source)} converted to ${projectId}.webp`);
  }
  copied += 1;
}

console.log(`\nReady: ${alreadyReady + copied}/${projectIds.length} local homepage previews (${copied} copied/converted, ${alreadyReady} already in src/assets).`);
if (missing.length) {
  console.warn(`Missing previews: ${missing.join(', ')}`);
  console.warn('Keep the screenshot files in dist/project-previews or public/project-previews and restart npm run dev.');
} else {
  console.log('All nine previews are now direct local Vite assets. No screenshot API or runtime capture is used.');
}
