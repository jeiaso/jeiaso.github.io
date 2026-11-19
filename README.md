# Jeia’s scrapbook portfolio

A cozy, annotated notebook layout that preserves **all original descriptions, dates, awards, project images and external links** from the original App.js in `src/originalContent.js`. Research and Projects remain separate.

## Install
1. Back up your current project.
2. Copy the package `src/` contents into your existing `my-portfolio/src/`, replacing files with matching names.
3. Copy `public/sketches/` to your existing `my-portfolio/public/sketches/`. Do NOT delete the original files in public (such as shell.gif, flower.gif, demo.gif, headshot, and art).
4. Run `npm.cmd start` in PowerShell to preview. When ready: `git add .`, `git commit -m "Make portfolio a cozy scrapbook"`, `git push origin main`, `npm.cmd run deploy`.

## Guestbook / shared wall
This requires a Supabase project and the environment variables shown in `.env.example`. Run `supabase-setup.sql` in Supabase's SQL editor. The public site cannot save shared drawings without a backend. Publishing remains disabled until connected. Add moderation/rate limiting before making public submissions widely available.

## Edit the design
- The notebook styling lives at the **bottom** of `src/App.css` under the `Cozy annotated notebook redesign` comment.
- Change original projects, descriptions, or links only in `src/originalContent.js`.
- The floating placeholder drawings are in `public/sketches`.
- Uses DM Sans for body text, Fraunces for headings, Caveat for small annotations. No custom font installation required; Google Fonts fallback fonts work if offline.

The redesigned website hasn't been built in your exact existing repository; test locally before deploying.
