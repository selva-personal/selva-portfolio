# Selvakumar S — 3D Developer Portfolio

Interactive recruiter-ready portfolio for **Selvakumar S, Senior Full Stack Developer**.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run lint
npm run build
npm start
```

## Resume PDF

Place the real resume at:

`public/resume/Selvakumar-S-Resume.pdf`

The Download Resume action points at that path. This repository does not generate a substitute PDF.

## Deploy

Vercel:

```bash
npx vercel
```

Or connect the GitHub repository to Vercel / Netlify with `npm run build` and output from Next.js.

## Notes

- The 3D world is frontend-only. No database or Spring Boot server is required.
- The contact form opens a `mailto:` draft. Messages are not stored on a server.
- If WebGL is unavailable, all resume sections remain usable by scrolling.
