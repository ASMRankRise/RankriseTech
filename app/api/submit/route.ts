import { NextResponse } from "next/server";

export const runtime = "nodejs";

const allowed = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "image/png",
  "image/jpeg",
]);

function escapeHtml(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      }[c] || c)
  );
}

export async function POST(req: Request) {
  try {
    const fd = await req.formData();
    const file = fd.get("file");
    if (file instanceof File && file.size > 4 * 1024 * 1024) {
      return NextResponse.json({ error: "File must be 4 MB or smaller." }, { status: 400 });
    }
    if (file instanceof File && file.size && !allowed.has(file.type)) {
      return NextResponse.json({ error: "Unsupported file type." }, { status: 400 });
    }
    const data: Record<string, string> = {};
    for (const [k, v] of fd.entries()) {
      if (!(v instanceof File)) data[k] = String(v).slice(0, 5000);
    }
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json({ error: "Name, email and phone are required." }, { status: 400 });
    }

    const payload = { ...data, submittedAt: new Date().toISOString(), source: "rankrisetech.in" };
    const webhook = process.env.FORM_WEBHOOK_URL;
    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    const key = process.env.RESEND_API_KEY;
    const to =
      data.region === "Global"
        ? process.env.GLOBAL_LEADS_TO_EMAIL || process.env.LEADS_TO_EMAIL
        : process.env.LEADS_TO_EMAIL;
    if (key && to) {
      const attachments = [] as Array<{ filename: string; content: string }>;
      if (file instanceof File && file.size) {
        attachments.push({
          filename: file.name,
          content: Buffer.from(await file.arrayBuffer()).toString("base64"),
        });
      }
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || "website@rankrisetech.in",
          to: [to],
          subject: `RankRise website: ${data.formType || "enquiry"} — ${data.name}`,
          html: `<h2>New RankRise website submission</h2><pre style="white-space:pre-wrap;font-family:Arial">${escapeHtml(
            JSON.stringify(payload, null, 2)
          )}</pre>`,
          attachments,
        }),
      });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Unable to process the form right now." }, { status: 500 });
  }
}
