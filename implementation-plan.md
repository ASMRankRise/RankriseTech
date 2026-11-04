# Implementation plan and readiness gates

Authority: report [§13](docs/source/report.md#s13), [§13.1](docs/source/report.md#s13-1), [§14](docs/source/report.md#s14), [§15](docs/source/report.md#s15), [§16](docs/source/report.md#s16) and [§17](docs/source/report.md#s17). Checklist items are **requirements/recommendations, not passed checks**.

## Current progress — 4 November 2026

- **COMPLETED — requested local homepage + 52 shared construction routes with actual navigation and a 53-route catalog.** Final supplied local verification passed; the 14-section story is preserved. Phases **1–2 remain partial** because substantive content/brand/inquiry approvals are outside this completed local scaffold. Text wordmark is provisional and public-launch approvals remain blocked.
- Local stack: **Next.js App Router + React + TypeScript + Tailwind CSS**; file responsibilities in [AGENTS.md](AGENTS.md). Current scope is exactly **53 local URLs**, including the working `/` and 52 shared construction screens (**51 catch-all + 1 specific literal-team wrapper**), not public launch. Local metadata is **noindex, nofollow**. [Complete inventory](website-structure.md#local-preview-route-inventory).
- Actual catalog routes replace global-navigation/footer and section page-detail bridges. All four products remain discoverable; the hero capability anchor and explicit memory-only project actions remain intentional homepage interactions. No `href="#"`, missing anchors, fake demo URLs or links to unknown routes. Contact is under construction; inquiry delivery remains explicitly unavailable.
- Content for phases 3–6 remains future work despite local route scaffolding; phase 7 is **blocked**, not complete. CMS/database/API/hosting/analytics recommendations below are conditional future choices, **not provisioning now**.
- **Final supplied local result: `npm test -- tests/homepage.test.tsx` exit 0, 17/17 passed**, with all 52 construction responses including encoded Team, exact homepage section order, negative 404s and one bounded desktop/mobile browser smoke. Reused without reruns; detailed current evidence is below. Earlier failures/homepage-only evidence remain historical. Local success is not production/public-launch readiness; no new typecheck/build/lint/integrity evidence exists.

## 16. Exact seven implementation phases

Sequence: **Brand foundation → Core website → Product showcase → Technical authority → Market depth → Content growth → Launch readiness**. Scope and priority/exit wording follow source [§16](docs/source/report.md#s16) without adding unstated pages to its rows.

| Phase | Source scope | Source priority / exit criterion | Current state |
| --- | --- | --- | --- |
| **1 — Brand foundation** | Confirm positioning, logo, colours, typography, components and responsive design system | **Critical: approved design system and homepage direction** | Partial: report direction documented; official logo/design approval pending |
| **2 — Core website** | Homepage, About, Services overview, Contact and global navigation/footer | **Critical: complete core company presence and inquiry flow** | Partial: local `/` and route scaffolds implemented; About/Services/Contact content and reliable inquiry flow pending |
| **3 — Product showcase** | Products overview and individual TriMarkity, 1SocialSnap, SalesApp and HRMS pages | **Critical: approved product messaging and genuine screenshots** | Local route scaffolds only; product owners, actual features/UI and access pending |
| **4 — Technical authority** | AI/ML page, Technologies page and service detail pages | **High: verified capability content** | Pending engineering/proficiency and delivery evidence |
| **5 — Market depth** | Industries, portfolio and case studies | **High: approved evidence and useful industry content** | Pending actual delivery/client permissions/outcomes |
| **6 — Content growth** | Insights, Careers, resources and ongoing SEO | **Medium: CMS workflow and editorial plan** | Pending genuine editorial content/current jobs and approved workflow |
| **7 — Launch readiness** | QA, accessibility, performance, security, analytics, SEO and form testing | **Mandatory before public launch** | Blocked; no launch sign-off or required operational evidence |

**Remaining corporate content (12 pages, now local construction routes):** About Us; Services Overview; Solutions; Products Overview; AI & Emerging Technologies; Industries; Technologies; Our Work/Portfolio; Insights; Careers; Contact; Meet the Team. Also content-pending: four products; 12 report service categories; ten industries; nine source-listed solution themes; Case Studies index; three legal pages; the retained Digital Transformation capability. Genuine case/article/job detail slugs have not been approved. Full specifications/URL manifest: [website-structure.md](website-structure.md).

The report's phase table does not explicitly place **Solutions** or **Meet the Team**. Do not claim the source includes them in Phase 2. The new direct user request approves the finite local scaffold only, not completed content, substantive phase rollout or external provisioning. Full dedicated content still requires sufficient approved evidence.

## 13. Full technical architecture recommendations

| Area | Exact source recommendation / conditional decision | Initial-scope treatment |
| --- | --- | --- |
| Frontend | Next.js + React + TypeScript | Implemented local stack; App Router file responsibilities in AGENTS |
| Styling | Tailwind CSS with a documented design-token system | Exact palette/type/component values in [design.md](design.md) |
| UI components | Accessible reusable component library; Shadcn/UI may be used | Semantic reusable components; optional library is not an installation requirement |
| Animation | Framer Motion or CSS transitions, used sparingly | Restrained CSS sufficient; reduced-motion support required |
| Backend/API | FastAPI or Node.js where server-side workflows are required | Future approval/implementation; no backend provisioning now |
| Database | PostgreSQL **if structured application data is needed** | Conditional future need, not required for static homepage |
| CMS | Sanity or Strapi for articles, case studies and editable marketing content | Conditional future editorial workflow; no CMS now |
| Hosting | Vercel or AWS based on deployment, operational and compliance requirements | Decision/approval pending; local preview is not a deployment |
| Analytics | Google Analytics 4 and Search Console, with appropriate consent | Future approved configuration; no external service setup now |
| SEO | Metadata, canonical URLs, sitemap, robots rules, Open Graph and structured data | Truthful source-derived local metadata with **noindex, nofollow**; production facts/routes approval-gated |
| Forms | Server-side validation, spam protection, secure storage and CRM/email routing | Mandatory launch gate; initial inquiry delivery unavailable |

Recommendations are not proof that a service/account exists or the team supports every technology. Avoid extra dependencies, API/data layers or speculative abstractions in the initial implementation.

## 13.1. Complete functional requirements

Unchecked until appropriately scoped evidence is recorded:

- [ ] Responsive layouts for **desktop, tablet and mobile**.
- [ ] Optimized **images, fonts and page assets**.
- [ ] Accessible **keyboard navigation, labels, focus states and contrast**.
- [ ] Fast loading and good **Core Web Vitals**.
- [ ] CMS editing for **blogs, case studies and selected marketing content** when that approved phase is implemented.
- [ ] Secure **contact and demo forms** with validation and spam controls.
- [ ] Clear **success/error states and reliable inquiry delivery**.
- [ ] Analytics events for **CTA clicks and form submissions**.
- [ ] Consistent **SEO metadata and structured content**.
- [ ] **Cookie/privacy controls** where required.

### Navigation and staged route transition

Current finite local preview: header/dropdowns/mobile menu/footer and page-detail actions use real catalog routes. Products disclosure lists TriMarkity, 1SocialSnap, SalesApp and HRMS plus the actual Products overview route. The shared construction screen has route-specific naming and working homepage/capability links, not a notify form or fake progress. The homepage capability anchor and explicitly unavailable, memory-only project-brief actions remain; portfolio/insights retain honest evidence gaps. Unknown URLs 404.

Ready-content transition: approve content/destination → add its specific App Router page → explicitly update its central catalog entry to `live` / `contentReady: true` and metadata → verify the affected interaction. Specific routes override the finite catch-all; ready entries are excluded from construction static params. The existing scaffold is not proof of ready content. Product/demo access requires actual approved destinations. Future case/article/job patterns do not authorize invented detail slugs or arbitrary construction URLs.

Preserve source literal **`/meet the team`**; actual href **`/meet%20the%20team`** is encoding, not a rename. **`/meet-the-team/` is PROPOSED only**, not an alias, and needs separate approval. The 22 source literals, 7 retained previous proposals and 24 newly task-selected slugs have distinct provenance; never attribute selected slugs verbatim to §14. `/services/digital-transformation/` remains a capability, not a 13th source service category.

### Inquiry and security transition — launch gates only

No approved business email/phone/address, form endpoint, storage or inquiry recipient exists in the supplied material. Initial interaction must state delivery is unavailable, never fake success or silently discard personal data. Do not collect real personal data through an unapproved preview form.

Future public workflow requires approved recipient and response expectations; **server-side validation, spam protection, secure routing/storage, appropriate consent/privacy/security**, accessible input/errors, true backend-driven success/error/unavailable states and **verified reliable delivery to the intended destination**. Product demo requests have the same gates. These are future requirements, not instructions to set up a backend now; see [approval register](content-governance.md).

### Responsive, accessibility and asset acceptance

Preserve the 14-section order through all breakpoints; check wrapping/overflow, sticky header, mobile navigation, product dropdowns and detail dialogs. Use semantic landmarks, clear H1/H2/H3, readable measure/line-height and contrast **including muted body text**. Verify keyboard/focus/labels, focus restoration and reduced motion. Size/compress images with appropriate alt text and reserved dimensions; optimize fonts/assets without fabricated screenshots or unapproved logos. No test, visual audit or performance result is implied by this checklist.

## 14. SEO requirements and source-route policy

- Preserve the [complete verbatim §14 manifest and local inventory](website-structure.md#local-preview-route-inventory). Current scope is 53 local URLs, not 53 completed public pages. Do not emit construction/future content in a live sitemap or canonical data.
- Metadata and structured content must be truthful and source-derived. **Production origin/canonical domain, Organization facts, addresses, socials/`sameAs`, authors and OG assets are unapproved.** Do not invent them to complete SEO fields.
- Before public launch configure/review **metadata, canonical URLs, sitemap, robots rules, Open Graph/social previews and appropriate truthful structured data** for approved live pages. Local metadata is already **noindex, nofollow**; this is not production deployment/indexing sign-off or proof that `robots.txt` is configured. Public indexing needs owner approval.
- Source keyword themes: **custom software development company; AI development; machine learning development; SaaS development; enterprise software; web application development; mobile app development; generative AI; business automation**. Validate phrases, intent and geographic opportunities through approved research, not invented rank/market claims.
- Location pages need genuine market relevance and unique content. **No thin duplicate city/country-swapped pages.** Global-minded positioning does not prove an office or geographic footprint.
- Production route/canonical policy and any new unlisted slugs remain approval gates; local selected-slug approval is not public-launch approval. A hyphenated team route needs a separate normalization decision. No invented Organization/compliance facts in schema, page copy or SEO.

## 15. Full content and brand governance requirements

- [ ] Confirm official RankRise **logo, legal company name, contact details and approved brand assets**.
- [ ] Confirm each product's **exact current name, modules, live features, pricing/demo route and product URL**.
- [ ] Use **authentic screenshots**; mask customer data and credentials.
- [ ] Verify all **technology claims** against actual engineering capability.
- [ ] Obtain permission for **client logos, testimonials, case studies and team photographs**.
- [ ] Publish no invented **statistics, certifications, awards, customer counts or performance outcomes**.
- [ ] Keep product branding **distinct but visually connected to RankRise**.

Track evidence, rights, approver/date, status and limitations in [content-governance.md](content-governance.md). Report-confirmed recommendation is not proof of current company/product reality. Homepage **3–6 portfolio projects and 3 insight resources** remain honest local shells until approved; public launch needs actual material or explicit approved scope change, never fabricated filler.

## 17. Complete quality assurance and public-launch checklist

All source checklist items retained; **none marked passed without evidence**:

- [ ] All **navigation links, dropdowns and CTAs** work correctly.
- [ ] All pages render correctly on **mobile, tablet and desktop**.
- [ ] Forms **validate inputs and deliver inquiries to the intended destination**.
- [ ] Product links and **demo routes point to correct destinations**.
- [ ] Images have appropriate **dimensions, compression and alt text**.
- [ ] **Typography, colour contrast, focus states and keyboard navigation** are checked.
- [ ] **Metadata, sitemap, robots.txt, canonical URLs and social previews** are configured.
- [ ] **Analytics and consent configuration** are tested.
- [ ] No **placeholder text, broken links, console errors or unapproved claims** remain.
- [ ] **Backups, deployment rollback and monitoring** are prepared.

Security, accessibility, performance and form testing are Phase 7 requirements. Operational recovery and trustworthy legal/consent/inquiry behavior are launch gates, not optional polish. Do not expand the initial task into these services now.

## Local preview versus public launch

| Area | Honest initial local-preview treatment | Public-launch gate |
| --- | --- | --- |
| Identity/design | Source palette/copy, provisional wordmark; design approval partial | Approved official assets, legal facts and responsive design system |
| Pages/navigation | Working `/` plus 52 finite shared construction routes; actual page links, intentional homepage anchors/project actions | Completed approved pages, production route policy and working demo/access paths; any team rename needs approval |
| Products/proof | Four report identities; proposed features labelled; no fake UI, projects or articles | Approved current features/security/pricing/access, genuine screenshots and publishable portfolio/editorial evidence |
| Inquiry | Delivery-unavailable explanation; no fake success or real data collection | Validated/spam-protected secure form, approved recipient/storage/consent and reliable tested delivery |
| SEO/legal/analytics | No fabricated origin/Organization/legal/social facts; no unapproved tracking | Correct live metadata/canonicals/sitemap/robots/OG/schema, actual legal review and tested consent/analytics |
| Operations/QA | Reused final 17/17 tests, all 52 local route responses/negative 404s and bounded desktop/mobile browser smoke; earlier capture limitations remain historical | Production route verification and all §17 items, security/performance/accessibility, backups/rollback/monitoring and explicit launch approval |

**Nonlaunch blockers:** missing official logo/legal/contact/social/team/careers approvals; current product proof/access/security and technology proficiency; authorized clients/cases/outcomes and three genuine insight resources; production domain/legal/consent/analytics decisions; working secure inquiry infrastructure/delivery; completed approved page content and production route/canonical policy; complete launch QA and recovery evidence. The selected local scaffold does not clear these blockers or approve a team rename.

## Focused verification and evidence policy

- Earlier documentation verification used **`python3 docs/source/verify_integrity.py`**: original/copy SHA-256 and bytes; all 510 ordered extracted paragraph texts/anchors and 11 tables; reproducible extraction; required files and owned documentation links. Its exact result is retained below. **No integrity or other check was rerun for this evidence/progress-only patch**; source artifacts remain unchanged. Documentation integrity cannot establish frontend quality or launch readiness.
- Evidence-only ownership is recorded in [AGENTS.md](AGENTS.md); tester owns **only `tests/homepage.test.tsx`**. Supplied **`npm test -- tests/homepage.test.tsx` exit 0, 17/17 passed** is reused, including the encoded wrapper and **51 catch-all + 1 static = 52** route split. Expected double-encoded/team-renamed 404s and bounded local browser behavior passed. **No checks, code changes, investigation or server actions were performed for this completion update.**
- Never rerun provided failures before editing, a successful command on unchanged code or another worker's verification. No full suite, typecheck, lint, build, browser/HTTP checks or server actions are assigned to this implementation unit. Broader QA requires explicit assignment and appropriately scoped evidence.
- Record exact **command, scope, result and remaining risks**. Current evidence below is supplied by the lead/tester and reused, not newly investigated or executed. The homepage and finite local routing scaffold were verified with the affected test, route responses and bounded browser smoke; full production/public-launch checklist items remain unchecked.

## Literal team route repair

**COMPLETED — local encoded-wrapper repair verified.** Historical failures were **exit 1, 16 passed / 1 failed**, with only `/meet%20the%20team` returning 404, including after the literal-folder wrapper attempt. The final supplied result is now **exit 0, 17/17 passed**, including that route; prior failures are not the current status.

Historical researcher evidence identified the mismatch: Next dev preserves encoded request pathname `/meet%20the%20team`, registers literal folder strings without encoding, and only performs decoded fallback outside dev; the literal-folder wrapper was not reached/compiled. The local repair moved `app/meet the team/page.tsx` to **`app/meet%20the%20team/page.tsx`**, without duplication; this wrapper is now registered and tested locally. Default `Page` / `generateMetadata`, raw catalog lookup `/meet the team`, shared construction component and truthful noindex metadata are retained.

Encoded filename spelling is solely for the dev filesystem lookup. The raw catalog and `routeHref` must not be changed to encoded strings, which would double-encode the href. `STATIC_CONSTRUCTION_ROUTES` remains one raw literal URL; `CATCH_ALL_CONSTRUCTION_ROUTES` remains 51 without overlap. `SITE_ROUTES` remains 53 and `UNDER_CONSTRUCTION_ROUTES` remains 52; the 22 source literals, 7 previous proposals and 24 selected slugs are unchanged. Final supplied checks confirmed the intended Team URL returns 200, while `/meet%2520the%2520team` and `/meet-the-team/` return 404; no alias, rewrite, extra URL or arbitrary fallback is added. Production decoded lookup differs and remains an unverified public-launch gate; no production build or guarantee is supplied.

## Current local scaffold verification (reused)

**COMPLETED — the entire requested local scaffold, not a public launch.** The following final tester/browser evidence is supplied and reused without investigation or reruns:

- **Exact command:** `npm test -- tests/homepage.test.tsx` — **exit 0, 17/17 passed**. Tester reports **four routing-test attempts total**, including earlier Team 404 / a prior harness attempt, and **one encoded-fix attempt**. The successful result was not rerun after interruption.
- **HTTP coverage:** all **52 construction URLs returned 200** with correct route-specific heading, **Under construction** status and **noindex, nofollow**, including **`/meet%20the%20team`**. Homepage returned **200 with the exact 14-section order**. Unknown URL, **`/meet%2520the%2520team`** and **`/meet-the-team/`** returned **404, not construction content**.
- **One bounded Orca embedded-browser smoke:** keyboard Products → actual TriMarkity construction → Back to homepage; footer encoded Team link → honest Team construction → Home. At **1440×1000 desktop** and **390×844 mobile**, horizontal overflow was **0**, headings/CTAs fit and mobile-menu hrefs were correct. One console check reported **0 errors**. Homepage was left open.
- **Existing preview state:** `http://127.0.0.1:3000/` remains running in **`term_9d59f6c8-d56f-4dff-b0b0-31ea7b6a411e`**. No server action was taken for this evidence update.
- **No new** typecheck, build, lint, full suite, documentation integrity check, commit, push, deployment or service provisioning. Earlier evidence below remains historical and unchanged. No application/library/component/test/source/configuration files were changed for this completion record.

The **53-route catalog / 51 catch-all + 1 static construction split** is complete. All 52 unfinished marketing pages intentionally retain `under-construction` / `contentReady: false`; only Home is content ready. Production route verification, substantive content, approved assets/legal/contact/inquiry infrastructure and all public-launch gates remain pending **outside the completed local task**. Bounded local success does not mark the source's comprehensive public QA checkboxes passed.

## Final verification evidence (reused)

Original homepage evidence handoff dated **4 November 2026**, before the new routing request. No successful check was rerun for this update; results describe their original scopes and timing and **do not verify the new scaffold**.

| Scope | Exact command | Supplied result / limitation |
| --- | --- | --- |
| Documentation integrity, before this evidence update | `python3 docs/source/verify_integrity.py` | **Exit 0**; original/copy SHA-256 and bytes match; **510 ordered paragraphs, 11 tables, 113 rows, 258 cells, 12 required files, 155 local links/anchors**; reproducible extraction. This is earlier evidence, not a fresh link check after this patch. |
| Frontend dependencies | `npm install --no-audit --no-fund` | **Exit 0; 136 packages**. |
| Typecheck | `npm run typecheck` | Initial **exit 1**, only Vitest Oxc configuration; fixed **exit 0, no diagnostics**. The successful run **predates the footer/Solutions corrections and final test-file creation**; not rerun afterward. |
| Original homepage test file, before routing scaffold | `npm test -- tests/homepage.test.tsx` | Original final **exit 0; 12/12 passed in 2.79s**, after frontend corrections. Three harness attempts: CSS-path collection error → 10/12 with test-query issues → 12/12. Tester wrote only `tests/homepage.test.tsx`; no production changes or other check reruns. Old bridge assertions now need updates; not evidence of new route behavior. |

Retained original/archive SHA-256: `576038e1ca9b3c82b1014f5253aad847804c7f5e7fe003b4062885df39d61e0e`.

**Historical lead-inspected frontend corrections:** Services footer used the six source categories **Custom Software, AI/ML, Web, Mobile, Cloud, SaaS**; the six homepage core capabilities were unchanged. Solutions footer used **Enterprise, Automation, CRM, HRMS, industry solutions**. CRM/SaaS/enterprise detail dialogs and the header Solutions action were corrected after successful typecheck; original homepage tests and bounded browser evidence followed. The new routing unit preserves those categories but replaces page-navigation/detail bridges with actual routes; its verification is pending.

### Bounded local browser evidence — before routing scaffold

Orca embedded browser inspected **`http://127.0.0.1:3000/`** at **1440×1000, 768×1024 and 390×844**:

- All **14 sections** present at every viewport; **0 horizontal overflow**; hero/product bounds fit.
- Keyboard four-product disclosure; mobile menu and selection closure; hero anchor; native inquiry dialog Escape, focus restoration and background-focus blocking observed.
- Console: **0 errors**; HMR/DevTools informational message only.
- Mobile capture inspected. **Desktop captures show tiling artifacts despite correct DOM geometry; desktop visual sign-off is LIMITED, not full approved visual QA.** These observations do not establish comprehensive accessibility, performance or public-launch QA.

Existing screenshot evidence, not regenerated or copied into the repository:

```text
/tmp/orca-browser-screenshots/e37b64fc-d0ca-496c-bcce-5497b9b02b18-screenshot.png
/tmp/orca-browser-screenshots/17846f65-ecc4-40ca-9ae7-20d9fd81e65a-screenshot.png
/tmp/orca-browser-screenshots/34346d4d-539c-49d6-ab96-8b2c947118bf-screenshot.png
```

At handoff, the browser was left at desktop; the local dev server remained running in Orca terminal **`term_9d59f6c8-d56f-4dff-b0b0-31ea7b6a411e`** (**Next Ready 298ms**). This records supplied local state, not a deployment or a new runtime check.

Execution provenance supplied by the lead: **3 unique workers**, model **`agentrouter/gpt-6.1-sol#low`**. **No build, lint, full suite, deploy, commits, pushes or service provisioning.** All public-launch approvals and broader QA gates remain open.
