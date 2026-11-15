import { spawnSync } from 'node:child_process';
import { mkdir, mkdtemp, rm, stat, writeFile, open, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const projects = [
  { id: 'pharmaivo', name: 'Pharmaivo', url: 'https://pharmaivo.com/' },
  { id: 'techmatrix', name: 'TechMatrix Arena', url: 'https://techmatrixarena.com/' },
  { id: 'jobready', name: 'JobReady Africa', url: 'https://jobreadyafrica.com/' },
  { id: 'satoshivault', name: 'SatoshiVault', url: 'https://satoshivault.online/' },
  { id: 'again', name: 'Again Market', url: 'https://again-marketplace.vercel.app/' },
  { id: 'zitso', name: 'Zitso Energy', url: 'https://zitsoenergy.com/' },
  { id: 'kingdavid', name: 'King David Ministries', url: 'https://kingdavidministries.netlify.app/' },
  { id: 'breathofkings', name: 'Breath of Kings', url: 'https://elaborate-meringue-3c8b50.netlify.app/' },
  { id: 'reunion', name: 'Mavir Leaders College Reunion Hub', url: 'https://reunion-glow-hub.vercel.app/' },
];

const projectRoot = process.cwd();
const outputDir = path.join(projectRoot, 'src', 'assets', 'project-previews');
const chromeCandidates = [
  process.env.CHROME_PATH,
  process.env.CHROME_BIN,
  process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'Application', 'chrome.exe'),
  process.env.PROGRAMFILES && path.join(process.env.PROGRAMFILES, 'Google', 'Chrome', 'Application', 'chrome.exe'),
  process.env['PROGRAMFILES(X86)'] && path.join(process.env['PROGRAMFILES(X86)'], 'Google', 'Chrome', 'Application', 'chrome.exe'),
  process.env.PROGRAMFILES && path.join(process.env.PROGRAMFILES, 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/microsoft-edge',
  'chrome',
  'google-chrome',
  'chromium',
  'chromium-browser',
  'msedge',
].filter(Boolean);

function findBrowser() {
  for (const candidate of chromeCandidates) {
    if (candidate.includes(path.sep) && !existsSync(candidate)) continue;
    const probe = spawnSync(candidate, ['--version'], { encoding: 'utf8', timeout: 8000, windowsHide: true });
    if (!probe.error && probe.status === 0) return candidate;
  }
  return null;
}

function runCapture(browser, project, targetPath, profilePath) {
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    '--disable-background-networking',
    '--disable-dev-shm-usage',
    '--disable-blink-features=AutomationControlled',
    `--user-data-dir=${profilePath}`,
    '--window-size=1440,1000',
    '--force-device-scale-factor=1',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=12000',
    `--screenshot=${targetPath}`,
    project.url,
  ];
  const result = spawnSync(browser, args, {
    cwd: projectRoot,
    encoding: 'utf8',
    timeout: 90000,
    windowsHide: true,
    maxBuffer: 4 * 1024 * 1024,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    const detail = (result.stderr || result.stdout || '').trim().slice(-1200);
    throw new Error(`Chrome exited with code ${result.status}${detail ? `: ${detail}` : ''}`);
  }
}

const browser = findBrowser();
if (!browser) {
  console.error('Chrome or Edge was not found. Install Google Chrome, or set CHROME_PATH to the browser executable.');
  console.error('Windows PowerShell example: $env:CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"');
  process.exit(1);
}

await mkdir(outputDir, { recursive: true });
console.log(`Using browser: ${browser}`);
console.log(`Saving WebP homepage screenshots directly as Vite source assets to: ${outputDir}`);

const results = [];
for (const [index, project] of projects.entries()) {
  const rawPath = path.join(outputDir, `${project.id}.capture.png`);
  const oldPngPath = path.join(outputDir, `${project.id}.png`);
  const targetPath = path.join(outputDir, `${project.id}.webp`);
  const profilePath = await mkdtemp(path.join(tmpdir(), 'kingsley-portfolio-chrome-'));
  process.stdout.write(`[${index + 1}/${projects.length}] Capturing ${project.name} … `);
  try {
    runCapture(browser, project, rawPath, profilePath);
    const rawInfo = await stat(rawPath);
    if (rawInfo.size < 8_000) {
      throw new Error(`Screenshot is unexpectedly small (${rawInfo.size} bytes). The site may have blocked the capture.`);
    }
    const signature = Buffer.alloc(8);
    const file = await open(rawPath, 'r');
    await file.read(signature, 0, 8, 0);
    await file.close();
    if (signature.toString('hex') !== '89504e470d0a1a0a') {
      throw new Error('The browser did not return a valid PNG screenshot.');
    }

    const webpInfo = await sharp(rawPath)
      .rotate()
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 78, effort: 5, smartSubsample: true })
      .toFile(targetPath);

    await unlink(rawPath);
    if (existsSync(oldPngPath)) await unlink(oldPngPath);
    const saving = Math.max(0, Math.round((1 - webpInfo.size / rawInfo.size) * 100));
    console.log(`OK (${Math.round(rawInfo.size / 1024)} KB PNG → ${Math.round(webpInfo.size / 1024)} KB WebP, ${saving}% smaller)`);
    results.push({
      id: project.id,
      name: project.name,
      url: project.url,
      image: `/${path.posix.join('project-previews', `${project.id}.webp`)}`,
      originalBytes: rawInfo.size,
      bytes: webpInfo.size,
      status: 'captured',
    });
  } catch (error) {
    await rm(rawPath, { force: true });
    console.log(`FAILED — ${error.message}`);
    results.push({ id: project.id, name: project.name, url: project.url, status: 'failed', error: error.message });
  } finally {
    await rm(profilePath, { recursive: true, force: true });
  }
}

await writeFile(path.join(outputDir, 'capture-report.json'), JSON.stringify({ capturedAt: new Date().toISOString(), browser, format: 'webp', quality: 78, maxWidth: 1280, results }, null, 2));
const ok = results.filter((item) => item.status === 'captured').length;
console.log(`\nFinished: ${ok}/${projects.length} homepage screenshots captured and converted to WebP.`);
if (ok < projects.length) {
  console.log('Any failed project will show a clear “screenshot not created” message and a link to its real website.');
  process.exitCode = 1;
} else {
  console.log('Refresh the portfolio with Ctrl + Shift + R. The cards and case-study modals import the local WebP files directly from src/assets.');
}
