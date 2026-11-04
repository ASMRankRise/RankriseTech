# RankRise Technologies — local website preview

**COMPLETED — requested local homepage + 52 shared construction routes with actual navigation and a 53-route catalog.** The working 14-section homepage at `/` is preserved. Supplied final local tests, route responses and bounded browser smoke passed; evidence is reused below. **This is not a public launch:** unfinished marketing content remains intentionally unready, with no CMS, database, inquiry delivery, analytics or tracking integration.

## Local setup

Use Node **22.22.2+ on the Node 22 line** (or supported Node 24.15+ / 26+) and npm 10+. The prepared environment uses Node 22.23.4. Dependencies are pinned and the lockfile is included.

```sh
npm ci
NEXT_TELEMETRY_DISABLED=1 npm run dev -- --hostname 127.0.0.1 --port 3000
```

Open the URL advertised by Next.js, normally `http://127.0.0.1:3000`. Choose another unused port if needed. The environment variable disables Next.js tool telemetry for the local process; it does not configure website analytics.

### Focused checks

```sh
npm test -- tests/homepage.test.tsx
```

The tester owns only `tests/homepage.test.tsx`. Its final supplied result is **exit 0, 17/17 passed**, covering the **51 catch-all + 1 static = 52** construction split and encoded wrapper. Do not rerun this successful result for another timestamp or after interruption. This evidence-only update performs no tests, investigation, HTTP/browser checks or server actions. `npm run typecheck`, `npm run build` and `npm start` remain available only for explicitly assigned workflows, not deployment.

### Final local scaffold verification — reused

- **`npm test -- tests/homepage.test.tsx`: exit 0, 17/17 passed.** Tester reported four routing-test attempts total and one encoded-fix attempt; earlier Team 404 / harness failures are historical. The successful result was not rerun after interruption.
- **All 52 construction URLs returned 200**, with correct route-specific heading, construction status and `noindex, nofollow`, including **`/meet%20the%20team`**. Homepage returned **200 with the exact 14-section order**.
- A genuinely unknown URL, **`/meet%2520the%2520team`** and **`/meet-the-team/`** all returned **404, not construction content**.
- **One bounded Orca embedded-browser smoke:** keyboard Products → actual TriMarkity construction → Back to homepage; footer encoded Team link → honest Team construction → Home. At **1440×1000 desktop** and **390×844 mobile**, horizontal overflow was **0**, headings/CTAs fit and mobile-menu hrefs were correct. One console check found **0 errors**; the homepage was left open.
- Preview **`http://127.0.0.1:3000/`** remains running in **`term_9d59f6c8-d56f-4dff-b0b0-31ea7b6a411e`**. No new typecheck, build, lint, full suite, integrity check, commit, push, deployment or service action was performed. Production decoded lookup differs and remains an **unverified prelaunch gate**, not a guarantee.

Full current evidence and scope limits: [implementation-plan.md](implementation-plan.md#current-local-scaffold-verification-reused). The local scaffold is completed; content/approval/legal/inquiry gates remain future public-launch requirements.

### Historical homepage evidence — before the new routing scaffold, 4 November 2026

These supplied results describe the original homepage/temporary bridges only. They are **not current routing verification** and were not rerun here.

- `npm install --no-audit --no-fund`: exit **0**, **136 packages added in 46s**.
- `npm run typecheck` (`tsc --noEmit`): first attempt exited **1**, identifying only `vitest.config.ts(8,14) TS2769` because the current Vite JSX transform uses Oxc, not the old `esbuild.jsx` configuration.
- After that single configuration correction, `npm run typecheck`: exit **0**, **no diagnostics**. This result predates the small footer/navigation source-alignment changes; the successful check was not rerun.
- Those earlier source-alignment changes preserved Custom Software, AI/ML, Web, Mobile, Cloud and SaaS in the Services footer; CRM opened a potential-solution brief rather than implying a SalesApp feature; header Solutions opened the enterprise brief. The new scaffold replaces those page-navigation bridges with real routes while preserving the categories and fourteen-section story.
- **Historical tester evidence:** only `tests/homepage.test.tsx` was added, with no production changes. `npm test -- tests/homepage.test.tsx` finished with exit **0**, **12/12 passed in 2.79 seconds**, covering the original joined homepage implementation. Three test-harness attempts were reported: a CSS-path collection error; **10/12** after the harness fix; then **12/12** after correcting two test queries.
- That original regression coverage included all fourteen ordered sections, key copy, four products, navigation, the six Services/five Solutions footer categories, evidence gates, the old anchors/dialogs and explicitly local-only project-brief behavior. Navigation assertions now require tester updates.
- **Bounded Orca embedded-browser smoke:** `http://127.0.0.1:3000/` at **1440×1000**, **768×1024** and **390×844**. All fourteen sections were present, measured horizontal overflow was **0**, and hero/product bounds fit. Four-product keyboard disclosure, mobile product selection/menu closing, the hero anchor, inquiry-dialog Escape/focus restoration and blocked background focus were verified. The console had **0 errors**; only DevTools/HMR messages were reported.
- **Visual limitation:** the mobile capture was inspected. Desktop captures showed tiling artifacts despite correct measured DOM geometry, so desktop visual sign-off remains limited. This is not comprehensive or fully approved responsive/visual QA. Captures remain outside the checkout in `/tmp/orca-browser-screenshots/`: `e37b64fc-d0ca-496c-bcce-5497b9b02b18-screenshot.png`, `17846f65-ecc4-40ca-9ae7-20d9fd81e65a-screenshot.png` and `34346d4d-539c-49d6-ab96-8b2c947118bf-screenshot.png`.
- A nonblocking Vite configuration warning was reported; it was not identified as a production defect. The supplied final report leaves the desktop preview open and the dev server running at `http://127.0.0.1:3000/`, terminal `term_9d59f6c8-d56f-4dff-b0b0-31ea7b6a411e`.
- No lint, production build or full test suite was run. No push, deployment or public launch occurred. This README update reuses supplied evidence only; it performs no new checks or server actions. See the [final source/archive integrity record](implementation-plan.md) for the separate documentation worker's results, not frontend or launch validation.

## Architecture

- `app/layout.tsx`: English document, skip link, self-hosted fonts, text-only metadata and intentional `noindex, nofollow` preview policy.
- `app/page.tsx`: the unchanged working homepage route.
- `app/[...slug]/page.tsx`: finite static params for 51 construction routes, excluding the explicit team route; `dynamicParams = false`, exact decoded-segment lookup, unknown 404s and truthful per-page `noindex, nofollow` metadata.
- `app/meet%20the%20team/page.tsx`: registered and tested local static wrapper. Encoded folder spelling aligns with Next dev's exact request-path lookup; raw catalog `/meet the team` and its href `/meet%20the%20team` remain unchanged. Exports default `Page` and `generateMetadata`, reuses the same construction screen, and derives truthful `noindex, nofollow` metadata from the raw catalog/shared copy. The filename spelling is not a new public URL, team rename or permission to encode the catalog twice.
- `app/globals.css`: all nine brand colors, Tailwind v4 theme bridge, responsive layouts and reduced-motion/focus styles.
- `components/homepage.tsx`: fourteen sections in the required order, reusing the header/footer; actual About, capability, product, AI and industry detail links.
- `components/site-navigation.tsx`: shared responsive navigation and keyboard-operable Products disclosure.
- `components/site-footer.tsx`: shared four-column Company/Services/Solutions/Products footer with actual page/legal links.
- `components/under-construction.tsx`: one spacious branded preparation screen with a route-specific H1, original decorative line motif and working `/` / `/#capabilities` links; no form, fake progress or launch promise.
- `components/engineering-visual.tsx`: original abstract engineering illustrations, not product UI or a brand logo.
- `components/preview-dialog.tsx`: native accessible dialog retained for intentional memory-only homepage project-draft actions, not navigation to unfinished pages.
- `lib/site-content.ts`: report-derived copy, product/capability/industry/footer hrefs, construction copy and exported `HOME_SECTION_ORDER` for regression assertions.
- `lib/routes.ts`: typed `SITE_ROUTES` (53), `UNDER_CONSTRUCTION_ROUTES` (52), `STATIC_CONSTRUCTION_ROUTES` (1 literal team route), `CATCH_ALL_CONSTRUCTION_ROUTES` (51), explicit status/readiness and unchanged href/lookup helpers. Compatibility `FUTURE_ROUTES`/`PROPOSED_ROUTES` retain the 22 source / 7 previous-proposal subsets; 24 additional selected slugs remain distinct from report literals.
- `tests/homepage.test.tsx`: tester-owned affected regression file; final local result is **17/17 passed**, reused above. Original homepage-only evidence remains separately historical.
- `vitest.config.ts`: jsdom, automatic JSX, `@/` alias, Testing Library matchers and the focused test script. jsdom tests should supply native `HTMLDialogElement.showModal`/`close` polyfills if their runtime does not implement them; production uses the browser's native modal behavior.

Manrope headings and Inter body text are loaded locally from the pinned `@fontsource-variable` packages through `next/font/local`. No font CDN or network font fetch is used during builds. Their OFL-1.1 licenses are retained at `node_modules/@fontsource-variable/{manrope,inter}/LICENSE` by the packages.

Full group/count/path/status inventory and transition guidance: [website-structure.md](website-structure.md#local-preview-route-inventory). Add a specific App Router page when approved content is ready (replace the existing wrapper for the team route) and explicitly set its catalog entry to `live` / `contentReady: true`; ready entries are excluded from construction selectors/static params. Arbitrary category children and future case/article/job patterns do not create placeholder routes.

## Source and guidance

Source precedence is the unchanged DOCX → complete report extraction → derived guidance. Read [`docs/source/report.md`](docs/source/report.md), with the preserved original DOCX and provenance in the [source directory](docs/source/), first. Then read [`brand.md`](brand.md), [`design.md`](design.md), [`personas.md`](personas.md), [`website-structure.md`](website-structure.md), [`content-governance.md`](content-governance.md) and [`implementation-plan.md`](implementation-plan.md). [`AGENTS.md`](AGENTS.md) is the sole repository agent entry point. These documents are maintained separately from the app.

## Preview boundaries

- Header/footer and section page-detail destinations use actual finite catalog routes. The hero **Explore Our Capabilities** remains `#capabilities`; explicit project actions retain honest memory-only dialogs. Unknown paths 404 rather than displaying blanket construction content.
- The source literal `/meet the team` is preserved without a trailing slash. Its href `/meet%20the%20team` is URL encoding, not approval of a `/meet-the-team/` rename or alias.
- TriMarkity, 1SocialSnap, SalesApp and HRMS are presented with source positioning and the endorsement **“A RankRise Technologies Product.”** Their local product pages are construction screens; live features, genuine screenshots and demo/product-access destinations still require approval. No speculative modules or simulated interfaces are shown.
- AI and industry copy describes potential use-case exploration, not confirmed delivery, certifications or roadmap promises. Technology categories are pending verification. Next.js, React, TypeScript and Tailwind CSS identify **this website's** actual stack only.
- There are no supplied approved client projects, metrics, testimonials, team profiles, editorial resources, legal texts, contact details or official logo. The wordmark is provisional text; evidence-gated sections and notices intentionally remain honest.
- Contact, Privacy Policy, Terms & Conditions and Cookie Policy routes do not pretend inquiries or approved legal content are available. Construction pages collect no personal data and make no launch-date or feature promises.
- Project CTAs prepare a draft in page memory. **Nothing is sent or persisted.** Copying a draft only copies it locally; closing the dialog clears it. No email, phone, location, success receipt, network submission or personal-data storage has been invented.
- Before any public launch, approve the domain, canonical URLs, robots policy, sitemap, route normalization, legal material, contact/delivery flow and all evidence-dependent content. No canonical/domain/address/organization JSON-LD or fabricated social URLs are configured.
