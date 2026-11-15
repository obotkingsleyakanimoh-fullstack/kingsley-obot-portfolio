# Kingsley Obot — Full-Stack Developer & Product Builder Portfolio

This is the refreshed portfolio build. The homepage copy is more specific to recruiter and freelance-client audiences, the profile photograph is presented as a clean circular portrait without text layered over the image, and the nine project cards use local homepage screenshots.

## Run locally

```powershell
npm install
npm run dev
```

The `predev` script prepares your existing screenshots as local Vite image assets before the server starts. It looks first in `dist/project-previews`, then in `public/project-previews`, and copies/converts each image into `src/assets/project-previews` as WebP.

## Build and preview

```powershell
npm run build
npm run preview
```

## Refresh screenshots when a live project changes

```powershell
npm run capture:projects
```

This uses Chrome or Edge installed on your computer, saves the homepage captures directly into `src/assets/project-previews`, and converts them to optimized WebP images. No third-party screenshot service is used at runtime.

## Important notes

- Do not delete `dist/project-previews` until the first `npm run dev` or `npm run build` has prepared the local source assets.
- After the first successful run, the screenshots are bundled from `src/assets/project-previews` and do not need to be fetched over the network.
- The Breath of Kings preview filename is `breathofkings.webp` and is mapped to the correct project card.
- The profile image is `public/kingsley-obot.webp`.
- Project case studies retain technical caveats where a source archive did not evidence production activation or a complete implementation.

## Professional profile links

- LinkedIn: https://www.linkedin.com/in/kingsley-obot-akanimoh/
- Linktree: https://linktr.ee/Kingsleyakanimohobot
