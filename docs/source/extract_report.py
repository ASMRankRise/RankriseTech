#!/usr/bin/env python3
"""Render the complete archived DOCX body; emit text or an add-file patch."""

import argparse
import hashlib
import html
import re
from pathlib import Path
from xml.etree import ElementTree as ET
from zipfile import ZipFile

SOURCE_NAME = "RankRise_Technologies_Website_Structure_and_Design_Report (1).docx"
ORIGINAL = Path("/home/atharva/Downloads") / SOURCE_NAME
W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"


def read_body(path):
    with ZipFile(path) as archive:
        return ET.fromstring(archive.read("word/document.xml")).find(W + "body")


def paragraph_text(paragraph):
    parts = []
    for node in paragraph.iter():
        if node.tag == W + "t":
            parts.append(node.text or "")
        elif node.tag == W + "tab":
            parts.append("\t")
        elif node.tag in (W + "br", W + "cr"):
            parts.append("\n")
    return "".join(parts)


def render_report(path):
    body = read_body(path)
    paragraphs = list(body.iter(W + "p"))
    numbers = {id(paragraph): number for number, paragraph in enumerate(paragraphs, 1)}
    headings = {}
    next_section = 1
    for node in body:
        if node.tag != W + "p":
            continue
        text = paragraph_text(node)
        if text.startswith(f"{next_section}. "):
            headings[id(node)] = ("h2", f"s{next_section}")
            next_section += 1
        elif re.match(r"^\d+\.\d+ ", text):
            section = text.split(" ", 1)[0].replace(".", "-")
            headings[id(node)] = ("h3", f"s{section}")
        elif text.startswith("Page ") or re.match(r"^\d{2}\. ", text):
            headings[id(node)] = ("h3", None)

    def render_paragraph(node):
        tag, section = headings.get(id(node), ("p", None))
        anchor = f'<a id="{section}"></a>\n' if section else ""
        text = html.escape(paragraph_text(node), quote=False).replace("\n", "<br>")
        return f'{anchor}<{tag} id="p{numbers[id(node)]:03d}">{text}</{tag}>'

    digest = hashlib.sha256(path.read_bytes()).hexdigest()
    encoded_name = "RankRise_Technologies_Website_Structure_and_Design_Report%20%281%29.docx"
    lines = [
        "# RankRise Technologies — complete source report",
        "",
        f"- Original: `{ORIGINAL}`.",
        f"- Archive: [unchanged DOCX]({encoded_name}).",
        "- Prepared date: **4 November 2026**, verbatim source paragraph [p005](#p005).",
        "- Extraction date: **4 November 2026**; Python standard-library `zipfile` + XML.",
        f"- SHA-256 (original and archive): `{digest}`.",
        f"- Coverage: **{len(paragraphs)} body paragraphs**, including table-cell and blank paragraphs; **11 tables**; no `word/media/` files.",
        "- Precedence: unchanged DOCX → this complete extraction → derived root documents. The report is a recommendation, not evidence of live features, company facts or delivery proficiency.",
        "- Fidelity: body order and paragraph text retained, including source punctuation, line breaks, blank paragraphs and the literal team URL. Tables retain row/cell order. DOCX styling and pagination are not reproduced.",
        "- Citations: stable `p001`–`p510` paragraph anchors; `s1`–`s18` section anchors; subsection anchors such as `s7-5`; `t01`–`t11` table anchors. Empty paragraph elements intentionally preserve source blanks.",
        "- Reproduction: `python3 docs/source/extract_report.py` prints the extraction; `--patch` emits an add-file patch. Integrity: `python3 docs/source/verify_integrity.py`.",
        "",
        "## Source section index",
        "",
    ]
    for node in body:
        heading = headings.get(id(node))
        if heading and heading[0] == "h2":
            lines.append(f"- [{paragraph_text(node)}](#{heading[1]})")
    lines += ["", "## Complete ordered body", ""]
    table_number = 0

    def render_table(table):
        nonlocal table_number
        table_number += 1
        output = [f'<table id="t{table_number:02d}">']
        for row_number, row in enumerate(table.findall(W + "tr")):
            output.append("<tr>")
            cell_tag = "th" if row_number == 0 else "td"
            for cell in row.findall(W + "tc"):
                output.append(f"<{cell_tag}>")
                for child in cell:
                    if child.tag == W + "p":
                        output.append(render_paragraph(child))
                    elif child.tag == W + "tbl":
                        output.extend(render_table(child))
                output.append(f"</{cell_tag}>")
            output.append("</tr>")
        output.append("</table>")
        return output

    for node in body:
        if node.tag == W + "p":
            lines += [render_paragraph(node), ""]
        elif node.tag == W + "tbl":
            lines += render_table(node) + [""]
    return "\n".join(lines).rstrip() + "\n"


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, default=Path(__file__).parent / SOURCE_NAME)
    parser.add_argument("--patch", action="store_true")
    args = parser.parse_args()
    report = render_report(args.source)
    if args.patch:
        print("*** Begin Patch\n*** Add File: docs/source/report.md")
        print("\n".join("+" + line for line in report.splitlines()))
        print("*** End Patch")
    else:
        print(report, end="")
