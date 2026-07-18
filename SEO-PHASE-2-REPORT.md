# Neverway Wiki SEO — Phase 2 report

Updated: 2026-07-18

## Outcome

- Indexable pages: **20 → 36**
- Sitemap URLs: **20 → 36**
- Legacy thin pages held at `noindex, follow`: **29 → 22**
- Broken internal links: **0**
- Duplicate titles/canonicals: **0**
- Invalid JSON-LD and sitemap XML errors: **0**

## Completed

1. Rewrote and restored Prologue, Updates, Controls, Characters, Combat, Farming, and Romance hubs.
2. Added official Patch 3, Patch 4, patch index, and DirectX 12 workaround pages.
3. Added time-system, Fiona, Fang, simulation, and world knowledge-graph pages.
4. Added hub-to-detail internal links.
5. Kept unverified quest, gift, recipe, boss, ending, and economy pages outside the index.

## Next batch

| Priority | Cluster | Candidate URLs | Evidence needed |
| --- | --- | ---: | --- |
| Core | Remaining Patch 4 fixes | 6–8 | Official notes and reproducible behavior |
| Core | Prologue objective walkthrough | 15–25 | First-hand play, exact steps, screenshots |
| Growth | Simulation mechanics | 10–15 | First-hand Prologue verification |
| Growth | Characters and routines | 20–40 | In-game profiles and observations |
| Watch | Items, recipes, skills | 80–150 | Structured data and concrete uses |

## Deployment

1. Replace the repository root and deploy.
2. Confirm `/sitemap.xml` returns HTTP 200 with 36 URLs.
3. Resubmit the sitemap in Google Search Console.
4. Request inspection for the homepage, `/demo/`, `/demo/patches/`, `/characters/`, `/features/time-system/`, and `/world/simulation/`.
5. Wait 5–7 days before changing titles again; use GSC impressions to choose Phase 3.
