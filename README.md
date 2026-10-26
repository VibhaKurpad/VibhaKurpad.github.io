# Craft Happens

Version 1.0.0. See [CHANGELOG.md](CHANGELOG.md) for the first release.

A pastel craft planner by Vibha Kurpad. Choose crochet, knitting, or hand embroidery, your experience, 15–60 minutes per day, and one or two weeks. The planner chooses a small project, builds a supply checklist, links to tutorials and stores, and creates daily goals with rest days.

## Local review

Requires Node.js 22 or later. Node.js 24 LTS is used in CI. No third-party packages or API keys are required.

```sh
npm ci
npm run check
npm run dev
```

Open http://localhost:4173. The server reads source files on each request; refresh after edits. It only serves public website files, and binds to loopback. Stop with Ctrl+C. To use another port, run `PORT=4174 npm run dev`.

Changes must be previewed locally and reviewed by Vibha before committing and pushing. Do not push without her explicit go-ahead.

## GitHub Pages

After the first approved push, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. The workflow deploys `dist/` to https://vibhakurpad.github.io/ on every push to `main`, after tests, build, and the dependency audit pass. Pull requests run checks without deploying. The workflow can also be run manually from Actions. Deployment settings and the first online run still need verification in GitHub.

Enable Dependabot alerts and the dependency graph in repository security settings. CodeQL runs on pushes, pull requests, and weekly. The security workflow is separate from the deployment workflow, so its findings appear in the Security tab; make its check required in a branch ruleset if it should block merges. Dependency review checks pull requests for newly introduced vulnerabilities. GitHub-hosted checks cannot be verified until the workflows are pushed and run.

## Security and dependencies

- No runtime or development package dependencies, accounts, external scripts, tracking, or secrets.
- Content Security Policy restricts scripts, styles, and assets to this origin. User input and saved state are validated; dynamic content uses text nodes, never HTML interpolation.
- Retailer and YouTube links use HTTPS and isolate new tabs.
- The build copies only the public HTML, source modules, and assets. Repository metadata and local files are excluded.
- GitHub Actions use verified commit pins, minimal job permissions, timeouts, and no persisted checkout credentials. Dependabot monitors npm and Actions weekly.
- `npm audit` checks npm packages only. The empty dependency tree produces no package advisories; Actions updates are handled by Dependabot.
- GitHub Pages cannot configure arbitrary HTTP security headers. The HTML supplies CSP and referrer policy, but frame protection requires a hosting provider with custom headers. The local preview supplies additional response headers.

## Content and scope

This is a curated, deterministic planner, not a live AI or web-search service. Unsupported crafts receive a clear message. Larger time budgets choose larger projects; skill levels change techniques and supplies. Completion times are estimates, and the schedule can be repeated or shortened. Gather materials before day 1.

Video links were researched October 26, 2026. Popularity labels are rounded snapshots, not live ratings. Starting sources include [Bella Coco's beginner lesson](https://www.youtube.com/watch?v=GcOzdAzmtNM), [Sheep & Stitch's knit lesson](https://www.youtube.com/watch?v=Egp4NRhlMDg), and [HandiWorks' stitch reference](https://www.youtube.com/watch?v=QBQ_a0WrE3Y). Project walkthrough links are explicitly labeled YouTube searches, not vetted individual videos. Review links and popularity labels periodically in `src/planner.js`.

Shopping links are non-affiliate retailer searches, not guaranteed product listings or prices. [Michaels' JOANN shopper page](https://www.michaels.com/lp/welcome-joann) explains the current store alternative.

Generated plans and checkmarks persist only in this browser through local storage. Clear them with “Clear saved plan.” Private browsing or storage restrictions may prevent saving. Print / save PDF includes all three plan sections.

Every project also shows three AI-generated visual references: just starting, halfway, and finished. They match the craft, skill level, and project scope, including single samplers versus pairs of coasters. Tap a picture to enlarge it; press Escape or the close button to return. These are illustrative examples, not exact photos from the linked tutorials. Follow the tutorials for stitch technique. The pictures appear in the printed plan too.

Nine locally hosted WebP contact sheets cover all 18 projects and 54 stage views. Each sheet is downloaded once per project and displayed through CSS framing. The app makes no image-generation API calls. The original generation prompts and asset details are in [docs/image-prompts.md](docs/image-prompts.md).

## Files

- `src/planner.js`: project library, supplies, schedule generation, and saved-state validation.
- `src/app.js`: accessible controls, checklists, tabs, and persistence.
- `src/project-visuals.js`: image matching, stage descriptions, and accessible image text.
- `src/styles.css`: responsive pastel design and print layout.
- `assets/`: original SVG craft illustrations.
- `scripts/`: dependency-free local server and build.
- `tests/`: plan coverage, validation, progress restoration, and safe shopping links.

Run `npm run check` before submitting a change. The existing repository license remains in `LICENSE`.
