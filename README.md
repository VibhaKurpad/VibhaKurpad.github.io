# Craft Happens

Version 2.0.0. See [CHANGELOG.md](CHANGELOG.md) for release notes.

A colorful craft planner by Vibha Kurpad. Choose crochet, knitting, or hand embroidery, your experience, 15–60 minutes per day, and one or two weeks. The planner chooses a small project, builds a supply checklist, links to tutorials and stores, and creates daily goals with rest days.

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

Each craft and skill level has its own lead tutorial, chosen to match that level's project (for example, single crochet, then granny squares, then moss stitch). Every making day in the timeline links straight to the chapters to watch that day, using the creators' own YouTube chapter times. Videos, chapters, and popularity labels were checked October 26, 2026; view counts are rounded snapshots, not live ratings. Project walkthrough links are explicitly labeled YouTube searches, not vetted individual videos. Review videos and chapter times periodically in `src/lessons.js`; the tests check that every timestamp falls inside its video.

Shopping links are non-affiliate retailer searches, not guaranteed product listings or prices. [Michaels' JOANN shopper page](https://www.michaels.com/lp/welcome-joann) explains the current store alternative.

Generated plans and checkmarks persist only in this browser through local storage. Clear them with “Clear saved plan.” Private browsing or storage restrictions may prevent saving. Print / save PDF includes all three plan sections.

Every project also shows three AI-generated visual references: just starting, halfway, and finished. They match the craft, skill level, and project scope, including single samplers versus pairs of coasters. Tap a picture to enlarge it; press Escape or the close button to return. These are illustrative examples, not exact photos from the linked tutorials. Follow the tutorials for stitch technique. The pictures appear in the printed plan too.

Nine locally hosted WebP contact sheets cover all 18 projects and 54 stage views. Each sheet is downloaded once per project and displayed through CSS framing. The app makes no image-generation API calls. The original generation prompts and asset details are in [docs/image-prompts.md](docs/image-prompts.md).

## Files

- `src/planner.js`: project library, supplies, schedule generation, and saved-state validation.
- `src/lessons.js`: tutorial videos per craft and level, tips, and the chapter timestamps for each plan step.
- `src/app.js`: accessible controls, checklists, tabs, and persistence.
- `src/project-visuals.js`: image matching, stage descriptions, and accessible image text.
- `src/styles.css`: responsive, animated colorful design and print layout. Motion is disabled for reduced-motion users.
- `assets/`: favicon, progress pictures, and self-hosted Google Sans and Pacifico fonts with their SIL Open Font License files. The hero illustration is inline SVG in `index.html`, so CSS can animate it.
- `scripts/`: dependency-free local server and build.
- `tests/`: plan coverage, validation, progress restoration, and safe shopping links.

Run `npm run check` before submitting a change. The existing repository license remains in `LICENSE`.
