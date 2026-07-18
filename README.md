# Neverway Guide

An unofficial, evidence-led English guide for Neverway, ready for static hosting on GitHub Pages.

## SEO build and audit

Run `node scripts/build-seo-pages.mjs` to regenerate the first evidence-led page set and sitemap. Run `node scripts/seo-audit.mjs` to find thin pages, duplicate metadata, missing H1/canonical tags, weak internal linking, invalid JSON-LD, and placeholder language. See `SEO-ROADMAP.md` for the controlled path to 2,000 quality URLs.

Phase 2 adds official Prologue patch/fix coverage and restores verified core hubs. See `SEO-PHASE-2-REPORT.md` for counts, validation, and the next expansion batch.

Phase 3 restores confirmed island-system hubs and adds precise Patch 3/4 troubleshooting pages. See `SEO-PHASE-3-REPORT.md`.

## What is included

- `index.html` - the full guide landing page and content hub
- `styles.css` - responsive styling
- `script.js` - search and filter interactions
- `assets/neverway-hero.png` - local hero image asset
- `.nojekyll` - keeps GitHub Pages from applying Jekyll processing
- `sitemap.xml` and `robots.txt` - Google Search Console discovery files for `https://neverway.wiki/`

## SEO URL structure

The package includes dedicated static URLs for high-intent Neverway searches:

- `/release-date/`
- `/guides/`
- `/prologue/`
- `/platforms/`
- `/demo/`
- `/controls/`
- `/beginner-guide/`
- `/walkthrough/`
- `/quests/`
- `/montgomery-island/`
- `/neverway-realm/`
- `/characters/`
- `/romance/`
- `/gifts/`
- `/resources/`
- `/farming/`
- `/fishing/`
- `/cooking/`
- `/crafting/`
- `/building/`
- `/sellmart/`
- `/mortgage/`
- `/combat/`
- `/bosses/`
- `/map/`
- `/debt-to-death/`
- `/achievements/`
- `/endings/`
- `/settings/`
- `/updates/`
- `/faq/`

## Deploy to GitHub Pages

1. Create a new GitHub repository.
2. Upload all files from this folder to the repository root.
3. In GitHub, open `Settings` -> `Pages`.
4. Set `Source` to `Deploy from a branch`.
5. Select the `main` branch and `/root`.
6. Save and wait for GitHub Pages to publish the site.

## Notes

This is an unofficial fan guide prototype. Pre-release facts should be checked against official Neverway announcements and the final launch build before publication.
