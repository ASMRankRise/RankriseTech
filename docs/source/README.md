# Source archive

The sole design/content authority is the supplied **Website Structure & Design Strategy**, prepared **4 November 2026**. This directory is evidence, not a claim that the recommended website, products or company capabilities are live.

| Artifact | Purpose |
| --- | --- |
| [Original-byte DOCX copy](RankRise_Technologies_Website_Structure_and_Design_Report%20%281%29.docx) | Unchanged archive of `/home/atharva/Downloads/RankRise_Technologies_Website_Structure_and_Design_Report (1).docx` |
| [report.md](report.md) | Complete ordered extraction: all 510 body paragraphs, blanks and 11 readable tables; stable section/paragraph/table anchors |
| [extract_report.py](extract_report.py) | Dependency-free, deterministic `zipfile` + XML renderer; prints text or an add-file patch, never modifies the source |
| [verify_integrity.py](verify_integrity.py) | One documentation-only check: byte/hash equality, all extracted paragraph text/order, table structure, required files and local links |

SHA-256: `576038e1ca9b3c82b1014f5253aad847804c7f5e7fe003b4062885df39d61e0e` (44,394 bytes). Extraction dated **4 November 2026**. Source contains no `word/media/` files; approved logos/screenshots/photos are not supplied by this archive.

Precedence: **unchanged DOCX → complete report extraction → derived root documents**. Cite, for example, [§5](report.md#s5), [p179](report.md#p179) or [§7.5](report.md#s7-5). Empty paragraph elements are intentional. Formatting/pagination are not source-text facts.

Use [AGENTS.md](../../AGENTS.md) as the sole agent entry point. Do not replace source recommendations with invented history, live product claims or other repositories' assets. Record approvals and source discrepancies in [content-governance.md](../../content-governance.md).

Reproduce from the archived copy: `python3 docs/source/extract_report.py`. Verify once after documentation edits: `python3 docs/source/verify_integrity.py`. Root `README.md` belongs to the frontend worker; its link is reported as an integration boundary, not proof of frontend readiness.
