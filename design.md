# Design direction and component contract

Authority: report [§2](docs/source/report.md#s2), [§5](docs/source/report.md#s5), [§13.1](docs/source/report.md#s13-1) and [§17](docs/source/report.md#s17). Palette/type/radius values below are source recommendations. Interaction acceptance details are **task-specified implementation guidance**, not additional verbatim source claims. Initial design approval remains partial.

## Visual character

Premium, modern, minimal, technology-first and enterprise-ready: a **white canvas, navy/dark text, structured blue accents**, generous whitespace, precise grids, restrained borders/shadows and subtle motion. Explain engineering and owned products, rather than dressing the site as a generic agency/SaaS template.

Inspiration is limited to **Thoughtworks/EPAM enterprise clarity, Stripe storytelling discipline and Vercel developer refinement** ([p022](docs/source/report.md#p022)). Do not copy their layouts, assets, code, brand marks or claims.

## Exact palette

| Source role | Colour | HEX | Intended use |
| --- | --- | --- | --- |
| Primary | **RankRise Blue** | **#1768D5** | Primary buttons, links, active states, icons, highlights |
| Deep primary | **Midnight Navy** | **#102B50** | Footer, dark CTA bands, strong headings, contrast panels |
| Secondary | **Sky Blue** | **#5A9CF0** | Illustration accents, charts, secondary highlights |
| Light surface | **Ice Blue** | **#EAF2FF** | Service cards, product panels, soft section backgrounds |
| Pale surface | **Cloud White** | **#F4F8FE** | Alternating content sections, subtle containers |
| Main background | **Pure White** | **#FFFFFF** | Main canvas and whitespace |
| Primary text | **Slate Ink** | **#24364B** | Body text and paragraphs |
| Muted text | **Steel Grey** | **#63758A** | Descriptions, captions, metadata, subject to contrast checks |
| Border | **Soft Blue Grey** | **#DCE6F2** | Card outlines, dividers, form borders |

Use a documented semantic token system in `app/globals.css`; do not scatter divergent HEX values. Suggested balance from [§2.3](docs/source/report.md#s2-3): **70% white/near-white, 20% light blue, 10% strong blue/navy**. This is a starting proportion, not a quota.

Accessibility governs combinations: navy/dark text on light surfaces, white on suitable dark blue, **no pale-blue important text on white**. Muted body/descriptive copy still needs readable contrast; do not assume Steel Grey passes on every tinted surface. Use Slate Ink/Navy where needed and verify contrast. Task acceptance target: normal text at least 4.5:1, large text 3:1, meaningful controls/focus boundaries 3:1; no contrast results are claimed here.

## Typography and layout

- Headings: **Manrope OR Inter**, semi-bold/bold, short and confident.
- Body: **Inter**, regular, comfortable line-height and readable measure.
- Buttons: **Inter**, medium/semi-bold, concise action labels.
- Clear single **H1**, section **H2**, compact card **H3**; no skipped hierarchy or text rendered as images.
- Generous, consistent spacing and aligned grids; use fluid containers and content-led wrapping. Preserve source section order as columns collapse across desktop, tablet and mobile.
- Avoid fixed-height text clipping, horizontal overflow, tiny captions and an oversized hero that obscures the first-screen company explanation. Font loading/fallbacks and asset sizing must be optimized; do not introduce unnecessary external dependencies.

## Components and interaction

| Component | Contract |
| --- | --- |
| Header | Compact, sticky; provisional text wordmark left, desktop navigation centre, high-contrast **Let's Talk Business** or **Start a Project** CTA right. Preserve the [header items](website-structure.md). |
| Product dropdown | All four products, labelled and understandable. Operable by keyboard/touch, not hover alone; visible focus and truthful expanded state. |
| Mobile navigation | Accessible named toggle; expanded-state semantics; predictable close behavior, keyboard access and no obstructed content/scroll. |
| Primary button | Blue fill, white text, **8–10 px radius**; clear focus/hover/disabled states, adequately spaced touch targets. |
| Secondary button/link | White button with blue border; use anchors for actual navigation and buttons for actions/dialogs. No `href="#"` or fabricated destinations. |
| Cards | **8–14 px radius**, quiet border, minimal shadow; precise alignment. No excessive floating-card effects or giant empty decorative cards. |
| Homepage sections | Semantic section labels, clear headings, responsive content grids; all 14 report sections remain in order. |
| Construction pages | One shared white/navy/blue screen for 52 finite local routes: readable **Under construction** status, route-specific H1, concise preparation notice, restrained original line motif and working homepage/capability links. No launch date, fake progress, product UI, statistics or forms. Use the same palette/fonts, responsive wrapping, focus and reduced-motion rules. |
| Homepage inquiry dialog | An intentional memory-only action, not a substitute for page navigation: accessible name, Escape/close, focus managed/restored and explicit delivery-unavailable copy until backend approval. |
| Footer | **Exactly four link columns: Company, Services, Solutions, Products**; approved social/legal/copyright material follows, not a fifth links column. |
| Icons | One consistent line-icon family. Decorative icons hidden from assistive technology; meaningful icon-only controls have names. |

These interaction behaviors operationalize the report's accessible reusable component direction; they are not proof of implementation. Optional Shadcn/UI is not a requirement to install a library.

## Visuals, assets and motion

- Initial hero: **bespoke, restrained blue architecture SVG/CSS** showing abstract relationships or engineering structure. It is an illustration, **not a fake UI/dashboard or product screenshot**. Mark decorative visuals appropriately.
- Product UI, team/project photographs and client assets must be **genuine and approved**, with customer data/credentials masked. The DOCX contains no media; absence is not permission to invent screenshots or people. Approval/register: [content-governance.md](content-governance.md).
- Images need correct dimensions, compression, meaningful alt text where informative and reserved layout space. Do not use technology logos to imply unverified team proficiency.
- Use restrained hover/reveal/product-preview transitions; respect **reduced-motion preferences**. CSS transitions are sufficient for the initial preview; Framer Motion remains optional, not a provisioning task. No content dependent on animation for visibility or understanding.
- **Prohibited:** generic agency/SaaS template styling, neon, excessive gradients, handshake stock photography, floating clutter/cards, fake dashboard metrics, parallax/looping motion and distracting animation.

## Review gates

Check semantic hierarchy, body/muted contrast, keyboard/focus, dropdown/mobile/dialog behavior, all breakpoints, asset sizing and reduced motion using the focused verification assigned by the lead. Document layout approval separately from test evidence. A local preview with provisional assets is not the approved responsive design system or public-launch sign-off.
