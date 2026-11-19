# Jeia — scrapbook portfolio (sketch-over-photo edition)

The homepage now shows ONE main framed photograph with an unframed self-portrait doodle overlapping its corner. The separate framed self-portrait/photo split has been removed. The About Me introduction stays at the top.

## Install

1. Back up your working portfolio.
2. Copy `src/App.js` and `src/App.css` into your project's `src/` folder.
3. Copy `public/sketches/self-portrait-placeholder.svg` into `public/sketches/`, overwriting the old placeholder.
4. Keep your original `public/JeiaSo_Headshot.jpg` and other images, and keep the remaining project files.
5. Preview using `npm.cmd start` from PowerShell.

## Replace the self-portrait

Export a line drawing with a transparent background as `public/sketches/self-portrait.png`, and replace the image source `/sketches/self-portrait-placeholder.svg` in `src/App.js` with `/sketches/self-portrait.png`. Transparent backgrounds give the floating doodle effect.

Other sections, your original descriptions and links, and the shared sketch wall remain unchanged. The sketch wall needs Supabase configured for persistent public pins. This package is not live-deployed or production-build tested.
