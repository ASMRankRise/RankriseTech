# RankRise Technologies — agent entry point

This uppercase root `AGENTS.md` is the **sole repository agent entry point**. Work only in `/home/atharva/orca/workspaces/RankriseTech/rankrise-homepage`; do not modify the source in Downloads, the base clone, other worktrees or global configuration. Other repositories are not sources of RankRise assets or facts.

**Status, 13 November 2026: IMPLEMENTED — Phases 1 & 2, Backend APIs, SEO & App Router Wiring with 55 live routes.** Exact 55 canonical URLs matching `SEO_ROUTE_MAP.csv` are live. Preview-only guardrails lifted: 53 routes are fully indexable (`index: true, follow: true`); only `/portfolio` and `/maintenance` retain `noindex: true`. Approved RankRise corporate identity reflected: RankRise Technologies Private Limited (India) and RankRise Corporation (US), leadership Vajeeda Abdul Mulla & Sandesh Pandit, phone `+91 90467 34673`, email `hello@rankrisetech.in`, and registered office at 410, Krystel Square, Nagala Park, Kolhapur, Maharashtra – 416003, India. All 4 products (TriMarkity, 1SocialSnap, SalesApp, HRMS) are linked and prominent.

## Source precedence and required read order

1. **Source precedence:** [unchanged report DOCX](docs/source/RankRise_Technologies_Website_Structure_and_Design_Report%20%281%29.docx) → [complete report extraction](docs/source/report.md) → derived documents. Read the report first; [source provenance](docs/source/README.md) records the prepared date, hash, all 510 paragraphs and 11 tables. The supplied report is the sole design/content authority, not proof of live delivery or product features.
2. [brand.md](brand.md) — positioning, exact messaging and claim boundaries.
3. [design.md](design.md) — palette, typography, components and responsive/accessibility direction.
4. [personas.md](personas.md) — explicitly inferred audiences, not customer research.
5. [website-structure.md](website-structure.md) — complete page patterns, homepage order and source URL manifest.
6. [content-governance.md](content-governance.md) — evidence, assets, approvals and nonlaunch blockers.
7. [implementation-plan.md](implementation-plan.md) — seven phases, current scope and readiness gates.
8. [README.md](README.md) — frontend worker's actual setup, commands and verification evidence; it does not override the report.

Use paragraph citations such as [p179](docs/source/report.md#p179) or numbered sections such as [§7.5](docs/source/report.md#s7-5). Never silently rewrite the archived source. Record approved decisions and discrepancies in content governance.

### Evidence vocabulary

- **REPORT-CONFIRMED:** named or recommended in the report; not independently confirmed company reality.
- **INFERRED:** interpretation, persona, role or journey derived from the report; not official history, mission or research.
- **PROPOSED / CANDIDATE:** implementation choice, future route, potential feature or technology needing confirmation.
- **UNVERIFIED / APPROVAL REQUIRED:** missing authoritative facts, assets, rights or operational approval.
- **IMPLEMENTED / VERIFIED:** use only with inspected code or exact supplied check evidence, including scope and result. Recommendation is not implementation evidence.

## Architecture and ownership

The local-preview architecture follows report [§13](docs/source/report.md#s13): **Next.js App Router, React, TypeScript, Tailwind CSS**. The requested finite routing scaffold is **COMPLETED and locally VERIFIED** using supplied evidence, not completed marketing pages or public-launch readiness.

| Path | Responsibility |
| --- | --- |
| `app/layout.tsx` | Shared document layout, truthful metadata, indexable defaults, font setup, analytics and interactive widgets |
| `app/page.tsx` | Initial `/` page, composing the homepage |
| `app/[...slug]/page.tsx` | Static params for all 54 non-home routes (`dynamicParams = false`), per-page metadata, JSON-LD structured data and `<InnerPage />` rendering |
| `app/api/submit/route.ts` | Form inquiry & lead ingestion endpoint with Resend and webhook support |
| `app/api/chat/route.ts` | AI website assistant endpoint with OpenAI fallback to local knowledge |
| `app/globals.css` | Global styles, documented palette/design tokens, responsive and reduced-motion rules |
| `components/homepage.tsx`, supporting `components/**` | Semantic, accessible homepage sections and interactions |
| `components/inner-page.tsx` | Unified inner page template rendering sections, FAQ, CTAs, and schema |
| `components/site-navigation.tsx`, `components/site-footer.tsx` | Shared navigation and footer using real catalog routes |
| `lib/site-content.ts` | Typed approved content for all 55 pages, company identity, products, services, industries, locations, insights |
| `lib/routes.ts` | Typed 55-route catalog matching demo2 `SEO_ROUTE_MAP.csv`, live status, href/lookup helpers; 54 routes in catch-all |
| `lib/assistant.ts` | Local conversational knowledge base covering services, products (TriMarkity, 1SocialSnap, SalesApp, HRMS), industries, contact |
| `lib/seo/*` | Centralized site-config, metadata constructor, and JSON-LD schemas (Organization, WebSite, Service, Article, SoftwareApplication, Breadcrumbs) |
| `tests/homepage.test.tsx` | Tester-owned single affected Vitest/jsdom verification target |
| `README.md` | Local setup, script usage, scope and real verification evidence |

Ownership for this evidence-only completion update: only `README.md`, `AGENTS.md`, `website-structure.md`, `implementation-plan.md`, plus correction of the current verification row in `content-governance.md`. **Tester owns only `tests/homepage.test.tsx`**. All application/library/component/test code, source artifacts, brand, configuration/package/lockfiles and unrelated work remain untouched. **One writer per path.** Do not add competing/nested agent instruction files.

No CMS, database, API, analytics account or hosting provisioning is required for the initial preview. Future recommendations are conditional and approval-gated. Do not commit, push, deploy or mutate external/global state without explicit authorization.

## Implementation invariants

- Preserve all **14 homepage sections in the exact [§5 order](docs/source/report.md#s5)**. Use the specific homepage product heading **“Innovation That We Build. Products That We Own.”**; the general §3.2 alternative belongs to Products Overview, not the homepage.
- Keep all four report-confirmed product identities prominent: **TriMarkity, 1SocialSnap, SalesApp, HRMS**, including every product in the header dropdown and Products footer column. All 4 products have active destinations: TriMarkity (`/products/trimarkity`), 1SocialSnap (`/products/1socialsnap`), SalesApp (`/products#salesapp`), and HRMS (`/products#hrms`).
- Exactly **55 canonical URLs** are in the catalog matching `SEO_ROUTE_MAP.csv` without trailing slashes. All routes have status `live` and `contentReady: true`. 53 routes are fully indexable; only `/portfolio` and `/maintenance` are marked `noindex: true`. Unknown URLs must 404. Obsolete literal `/meet the team` has been removed.
- To replace a scaffold, add its specific App Router page and explicitly change its catalog entry to `live`/`contentReady: true`; the specific route overrides the catch-all and ready entries are not generated as construction pages. New case/article/job detail slugs require approval; their future patterns do not authorize arbitrary catch-all URLs.
- Use semantic landmarks, one clear H1, logical H2/H3, readable text, visible focus, keyboard-operable dropdown/mobile navigation, labelled dialogs with focus restoration, responsive layouts and reduced motion. Decorative architecture visuals must not masquerade as product UI.
- Be source-first: no invented contacts, legal entity facts, company history/mission, team members, clients, testimonials, metrics, certifications or technology proficiency. Industry/AI themes are potential until supported by delivery evidence.
- Use safe SEO copy from the source. Do not invent a production origin/canonical URL, Organization facts, address, `sameAs`, authors or social preview assets. Do not publish future routes in a live sitemap.
- An unavailable inquiry interaction must say delivery is unavailable. Do not collect/send real personal data without approved infrastructure/policy, silently discard inquiries or display fake success. Public launch requires real validated, secure inquiry delivery.
- Use `next/link` `<Link>` for every internal route destination (`/`, `/about`, `/products#...`, etc.) across `SiteHeader`, `Wordmark`, CTA wrappers such as `LabelSlideButton`, `SiteFooter`, and `Homepage`; reserve raw `<a>` strictly for external protocols (`https:`, `tel:`, `mailto:`) and pure same-page `#id` anchors.
- Visually inspect generated `image-generator` outputs via `read_file` for placeholder strings (`Lorem ipsum`, wrong brand/domain names) before copying them into `public/images/showcases/` with matching `.jpg`/image extensions. When previewing `:3001`, ensure `npx next dev -p 3001` owns the port (no stale `next-server`), and keep `GlobalHero` synchronized with `rankrise-theme` on mount.

## Scope, approval and verification gates

Make the smallest complete change in the assigned scope. Trace content, types, callers, route behavior and tests before changing them; do not add optional refactors, services, dependencies or pages. Approval registers and the [launch checklist](implementation-plan.md) govern additions and factual claims.

- Separate documentation verification command: **`python3 docs/source/verify_integrity.py`**. It checks source/copy hash, all 510 paragraph texts/order, tables, required files and owned links; it does not verify the application or launch readiness. Earlier results remain historical; no rerun is assigned to this implementation unit.
- Frontend contract uses npm scripts `dev`, `build`, `typecheck`, `test`; the lead records actual frontend/tester results. When assigned application testing, use only **`npm test -- tests/homepage.test.tsx`** (Vitest/jsdom). No full suite; builds/typechecks are not automatic documentation checks.
- If failure evidence is supplied, diagnose and edit without a reproduction rerun. Accept valid worker evidence. Never rerun successful tests, lint or builds on unchanged code, and never duplicate another worker's verification.
- Final local routing verification is **COMPLETED**: supplied **`npm test -- tests/homepage.test.tsx` exit 0, 17/17 passed**, all 52 construction responses including encoded Team, negative 404s and bounded browser navigation. Reuse the current evidence above without reruns. The **51 catch-all + 1 static** split and raw source identity remain unchanged. Production lookup differs and is unverified; production routing, content, legal/inquiry and public-launch approvals remain prelaunch gates, not a guarantee or build assignment now.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
