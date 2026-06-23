# Rainmatter Air — Landing Page

Marketing site for the [Rainmatter Air Chrome extension](https://github.com/rainmatter/rainmatter-air-extension).
Built with Next.js 15 and Tailwind CSS, deployable to Vercel.

## Development

```bash
npm install
npm run dev      # → http://localhost:3000
```

## Deploy to Vercel

Push this folder to a GitHub repo and import it at [vercel.com/new](https://vercel.com/new) —
Next.js is auto-detected.

Or deploy directly from the CLI:

```bash
npm i -g vercel
vercel
```

## Before publishing

Open `app/page.tsx` and update `GITHUB_URL` and `CHROME_STORE_URL` at the top of the
file once the extension is live on the Chrome Web Store.
