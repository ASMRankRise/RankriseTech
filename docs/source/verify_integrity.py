#!/usr/bin/env python3
"""One local, read-only integrity check confined to owned documentation."""

import hashlib
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

sys.dont_write_bytecode = True

from extract_report import ORIGINAL, SOURCE_NAME, W, paragraph_text, read_body, render_report

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "docs/source"
EXPECTED_HASH = "576038e1ca9b3c82b1014f5253aad847804c7f5e7fe003b4062885df39d61e0e"
OWNED = [
    "AGENTS.md", "brand.md", "design.md", "personas.md", "website-structure.md",
    "content-governance.md", "implementation-plan.md", "docs/source/README.md",
    "docs/source/report.md", "docs/source/extract_report.py", "docs/source/verify_integrity.py",
    "docs/source/" + SOURCE_NAME,
]


class ReportParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.records = []
        self.current = None
        self.parts = []
        self.tables = 0
        self.rows = 0
        self.cells = 0

    def handle_starttag(self, tag, attrs):
        anchor = dict(attrs).get("id", "")
        if re.fullmatch(r"p\d{3}", anchor):
            assert self.current is None, "Nested source paragraph"
            self.current = (anchor, tag)
            self.parts = []
        elif tag == "br" and self.current:
            self.parts.append("\n")
        if tag == "table":
            self.tables += 1
        elif tag == "tr":
            self.rows += 1
        elif tag in ("th", "td"):
            self.cells += 1

    def handle_data(self, data):
        if self.current:
            self.parts.append(data)

    def handle_endtag(self, tag):
        if self.current and tag == self.current[1]:
            self.records.append((self.current[0], "".join(self.parts)))
            self.current = None


def anchors(text):
    result = set(re.findall(r'\bid="([^"]+)"', text))
    for heading in re.findall(r"^#{1,6}\s+(.+)$", text, re.MULTILINE):
        slug = re.sub(r"[^\w\s-]", "", heading.lower()).replace(" ", "-")
        result.add(slug)
    return result


def main():
    for relative in OWNED:
        assert (ROOT / relative).is_file(), f"Missing required file: {relative}"
    archive = SOURCE / SOURCE_NAME
    original_bytes, archive_bytes = ORIGINAL.read_bytes(), archive.read_bytes()
    original_hash = hashlib.sha256(original_bytes).hexdigest()
    archive_hash = hashlib.sha256(archive_bytes).hexdigest()
    assert original_hash == archive_hash == EXPECTED_HASH, "Source/copy SHA-256 mismatch"
    assert original_bytes == archive_bytes, "Archive is not byte-for-byte identical"
    original_body, archive_body = read_body(ORIGINAL), read_body(archive)
    expected = [paragraph_text(p) for p in original_body.iter(W + "p")]
    assert len(expected) == 510, f"Expected 510 source paragraphs; got {len(expected)}"
    assert expected == [paragraph_text(p) for p in archive_body.iter(W + "p")]
    report = (SOURCE / "report.md").read_text(encoding="utf-8")
    parsed = ReportParser()
    parsed.feed(report)
    assert parsed.current is None, "Unclosed source paragraph"
    assert [anchor for anchor, _ in parsed.records] == [f"p{i:03d}" for i in range(1, 511)]
    for number, (actual, wanted) in enumerate(zip([text for _, text in parsed.records], expected), 1):
        assert actual == wanted, f"Paragraph p{number:03d} text mismatch: {actual!r} != {wanted!r}"
    tables = list(original_body.iter(W + "tbl"))
    assert parsed.tables == len(tables) == 11, "Table count mismatch"
    assert parsed.rows == len(list(original_body.iter(W + "tr"))), "Table row count mismatch"
    assert parsed.cells == len(list(original_body.iter(W + "tc"))), "Table cell count mismatch"
    assert report == render_report(archive), "Extraction differs from reproducible rendering"

    checked_links = 0
    integration_links = set()
    markdown_paths = [ROOT / relative for relative in OWNED if relative.endswith(".md")]
    owned_markdown = {path.resolve() for path in markdown_paths}
    for path in markdown_paths:
        text = path.read_text(encoding="utf-8")
        for destination in re.findall(r"(?<!!)\[[^\]\n]*\]\(([^)\n]+)\)", text):
            uri = urlsplit(destination)
            assert not uri.scheme and not uri.netloc, f"Unexpected external documentation link: {destination}"
            target = (path.parent / unquote(uri.path)).resolve() if uri.path else path.resolve()
            assert target.is_relative_to(ROOT), f"Documentation link escapes owned worktree: {destination}"
            if target not in owned_markdown and target.name == "README.md" and target.parent == ROOT:
                integration_links.add("README.md: " + ("present" if target.is_file() else "pending frontend worker"))
                continue
            assert target.is_file(), f"Broken link in {path.relative_to(ROOT)}: {destination}"
            if uri.fragment:
                assert target in owned_markdown, f"Fragment outside owned docs: {destination}"
                assert unquote(uri.fragment) in anchors(target.read_text(encoding="utf-8")), f"Missing anchor: {destination}"
            checked_links += 1
    print("PASS: original/copy SHA-256 " + EXPECTED_HASH)
    print(f"PASS: all 510 ordered paragraph anchors/text, {parsed.tables} tables, {parsed.rows} rows, {parsed.cells} cells; reproducible extraction")
    print(f"PASS: {len(OWNED)} required files and {checked_links} owned local links/anchors")
    if integration_links:
        print("Integration boundary: " + "; ".join(sorted(integration_links)))
    print("No application tests, lint, build, npm, network or launch checks run.")


if __name__ == "__main__":
    main()
