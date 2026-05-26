# AtalOS — Engineering Control Room Portfolio

A creative GitHub Pages portfolio for Atal Upadhyay, designed as a backend/AI/cloud engineering control room.

## Local setup

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

This repo includes `.github/workflows/deploy.yml`. After pushing to `main`:

1. Go to GitHub repo → Settings → Pages.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push your code to `main`.
4. Open the Actions tab and wait for the deploy job to finish.

Expected URL for this repository:

```text
https://atal98.github.io/portfolio/
```

## Important

Because this repository is named `portfolio`, `vite.config.js` uses:

```js
base: '/portfolio/'
```

If you rename the repository to `atal98.github.io`, change it to:

```js
base: '/'
```
