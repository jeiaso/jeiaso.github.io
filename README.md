# Jeia So portfolio — original descriptions and links restored

This build preserves the minimalist editorial redesign with DM Sans / Instrument Serif, floating sketches, art sections, and the shared visitor sketch wall. It replaces the reconstructed project summaries with **exact project descriptions, dates, awards, and external links extracted from the original `App.js` you uploaded on November 19, 2026**. Whitespace in sentences is normalized, but the wording and link URLs are not rewritten.

## Installing in your existing React / Create React App project

1. **Back up** your current `src/App.js` and `src/App.css` first.
2. Copy all files in this ZIP's `src/` into your existing project's `src/` folder. This includes **`originalContent.js`**, which holds the restored descriptions and links.
3. Copy the included `public/sketches/` folder into the existing `public/sketches/`. Keep the rest of your original `public/` folder because it contains the actual project imagery.
4. Keep your existing `package.json`, `src/index.js`, and `public/index.html`.
5. Preview with `npm.cmd start`. If everything looks correct, commit/push and deploy with `npm.cmd run deploy` (assuming the existing gh-pages configuration remains intact).

## What is restored

All **10 formerly visible entries**: three research entries, plus Desk Photobooth, PetaLux, Drone, Micromouse, PCB Design: Decision Maker, CENSE: Crowd Sense, and VEX Robotics Robot: 5327SWAGon. All original award/teaching callouts, original links, and original image names are retained. The site also restores the original About text and headshot, four graphic-design images and their original tool captions, and both personal artworks with original captions. The links to Behance and the older high-school project site remain.

**ThermoSense and Productivity Points** were present in the original source but inside JSX comments, so they were not visible on the old site. They are available via the **“Previously hidden”** archive filter, clearly marked as such.

The original project links are also shown directly under each description, and the complete entry is available in a detail panel. The research/poster/documentation links have not been shortened or replaced.

## Existing files needed for media

Keep: `public/shell.gif`, `public/demo.gif`, `public/flower.gif`, `public/thermosense.png`, `public/drone.avif`, `public/mm.png`, `public/8ball.png`, `public/cense.jpg`, `public/robot.png`, `public/states.png`, `public/kapwa26.png`, `public/ewi.jpg`, `public/kapwa25.jpg`, `public/dial.jpg`, `public/jibbies.avif`, `public/youmei.avif`, and `public/JeiaSo_Headshot.jpg`.

## Shared visitor sketch wall

The visitor sketch wall is retained from the previous version. GitHub Pages cannot store submissions itself, so Supabase is still required for persistent drawings. Use the provided `supabase-setup.sql` and `.env.example` if you have not configured it already. Never commit a Supabase service-role key or your local `.env.local`. Public contributions need moderation/rate limits before a large public launch.

No handwriting font is required; the CSS uses Google Fonts with local fallbacks. This package does not include your original media files, which must remain in your `public/` folder.
