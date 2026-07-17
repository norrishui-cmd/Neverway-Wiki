# Neverway Wiki SEO roadmap to 2,000 quality URLs

Updated: 2026-07-17  
Release state: October 2026 window; exact day unannounced  
Current architecture: static HTML on `neverway.wiki`

## Operating principle

The 2,000-page target is a publication ceiling, not a reason to index placeholders. A URL enters the sitemap only when it answers one distinct player question with verified game data, a unique title/H1/description, useful internal links, and no speculative entity names. Before full release, use the public Prologue, official site, Steam updates, Nintendo announcements, press kit, and repeat community questions. After release, validate every structured database against the launch build.

## URL capacity plan

| Cluster | Final quality URL capacity | Publish trigger |
| --- | ---: | --- |
| Core, release, platforms, settings, accessibility, troubleshooting | 140 | Official store/FAQ or reproducible fix |
| Prologue walkthrough, objectives, choices, secrets, errors | 180 | First-hand Prologue verification |
| Characters, relationships, gifts, schedules, events | 260 | Named character and event data verified |
| Items, resources, crops, fish, recipes, crafting, shops | 520 | Concrete item stats, sources, uses, prices |
| Quests, story chapters, choices, endings | 320 | Exact triggers, steps, rewards, blockers |
| Locations, maps, routes, secrets, collectibles | 210 | Location/path evidence and useful directions |
| Combat, weapons, abilities, status effects, enemies, bosses | 250 | Tested mechanics, drops, counters, builds |
| Achievements and completion routes | 80 | Final achievement list and requirements |
| Patch/version pages | 40 | Material change with player impact |
| **Total** | **2,000** | Quality gate passed |

## Phased publication plan

### Phase 1 — foundation and current demand (now)

- Replace stale “if a demo exists” copy with the live Prologue status.
- Build direct-answer pages for release, PC requirements, input, launch failures, length, save transfer, confirmed/unconfirmed platforms, and single-player status.
- Generate canonical metadata, breadcrumbs, FAQ schema, source links, hubs, and sitemap entries consistently.
- Run automated structural and semantic checks; use the failure list to rewrite existing MVP placeholders in the next batch.

Exit target: 50–70 strong URLs, with weak legacy pages improved or removed from the sitemap.

### Phase 2 — Prologue knowledge base

- Capture a complete first-hand Prologue route, each objective, interaction, choice, secret, item, recipe, status effect, skill, bug, and performance issue.
- Publish hubs before leaves and connect each leaf to its next practical step.
- Add original screenshots only where they resolve navigation or UI ambiguity.

Exit target: 220–300 cumulative quality URLs.

### Phase 3 — pre-release database preparation

- Build structured content records for characters, items, recipes, quests, locations, enemies, abilities, and relationships.
- Keep unverified records in draft data, not as indexable pages.
- Create batch-level quality reports and manually review representative pages from every content type.

Exit target: 500–700 cumulative URLs before launch, depending on evidence available. Do not force 2,000 before the launch build exposes enough unique facts.

### Phase 4 — launch expansion

- Verify structured data against the released game, then publish controlled batches of 80–100 candidates per day maximum.
- Prioritize “where,” “how,” “stuck,” “best,” choice consequence, gift, schedule, recipe, and error queries.
- Pause any template whose pages are thin, duplicate, or poorly discovered.

Exit target: 2,000 quality-approved URLs, normally within the launch window rather than fabricated beforehand.

## Quality gate

Every indexable page must pass all of the following:

1. One search intent and a direct answer near the top.
2. Verified concrete facts; no “this page will…” placeholder text.
3. Unique title, description, H1, canonical, and body value.
4. At least four useful internal links, including its hub.
5. Breadcrumb schema; FAQ schema only for visible, non-duplicative questions.
6. No broken internal links, invented names, copied sections, or stale release language.
7. Included in sitemap only after the semantic and structural audit passes.
8. Build/audit succeeds and representative pages receive human review on mobile.

## Next three highest-leverage actions

1. Rewrite or noindex the remaining thin legacy topic pages flagged by `node scripts/seo-audit.mjs`.
2. Play and document the Prologue end to end, then publish the first 30 verified objective/fix/secret pages.
3. Add a structured content layer for items, recipes, skills, and characters, with drafts excluded until each record has a concrete answer.
