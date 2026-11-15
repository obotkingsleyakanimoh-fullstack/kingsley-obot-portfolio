# Vercel build fix for Kingsley Obot Portfolio

## Why this patch is needed

The Vercel log fails at `node_modules/.bin/tsc: Permission denied` (exit 126). The GitHub repository currently has generated `node_modules/` and `dist/` directories committed. Those are machine/build outputs and should not be versioned. Vercel should install dependencies from `package-lock.json` into a clean Linux build environment.

The build log also reports that `esbuild@0.25.12` has an install script which npm did not approve. The `allowScripts` entry in this package manifest explicitly approves that exact version so Vite/esbuild can prepare its platform binary.

Node is pinned to the Vercel-supported `22.x` line instead of `>=20.9.0`, which allowed Vercel to select a newer major automatically.

## Apply the patch

1. In the existing project folder, replace the root `package.json` with this patch's `package.json`.
2. Add this patch's `.gitignore` to the project root.
3. Keep `src/assets/project-previews/*.webp`. Those are the actual project screenshots and must remain committed.
4. Open PowerShell in the project root and run:

```powershell
# Remove generated folders from Git tracking, but keep the local folders on disk.
git rm -r --cached --ignore-unmatch node_modules dist

# Remove the generated TypeScript cache from Git tracking if it is tracked.
git rm --cached --ignore-unmatch tsconfig.tsbuildinfo

# Check that the real project screenshots remain in the source tree.
Get-ChildItem .\src\assets\project-previews

# Stage the updated project settings and commit the cleanup.
git add .gitignore package.json package-lock.json src/assets/project-previews
 git add -u
 git commit -m "Fix Vercel build and ignore generated folders"
 git push origin main
```

If `package-lock.json` changes because of the Node/npm environment or a dependency update, run `npm install` locally and commit the updated lockfile. Do not delete or ignore the source WebP screenshots in `src/assets/project-previews`.

## Verify before deploying

Run locally:

```powershell
npm run build
```

Then push the commit. In Vercel, use the normal settings:

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: leave the default (`npm install`)

After the push, Vercel should clone the source-only repository and reinstall dependencies. It should no longer find a committed `node_modules/.bin/tsc` shim to execute.
