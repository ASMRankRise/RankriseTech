import { NextResponse } from "next/server";
import {
  isSmtpConfigured,
  resolveLeadRecipient,
  sendLeadEmail,
  type LeadAttachment,
} from "@/lib/mailer";

export const runtime = "nodejs";

const allowed = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "image/png",
  "image/jpeg",
]);

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
    const smtpReady = isSmtpConfigured() && Boolean(resolveLeadRecipient(data.region));

    if (!smtpReady && !webhook) {
      return NextResponse.json(
        { error: "Email delivery is not configured. Please call or WhatsApp us directly." },
        { status: 503 }
      );
    }

    if (webhook) {
      const webhookRes = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!webhookRes.ok) {
        console.error(`FORM_WEBHOOK_URL returned ${webhookRes.status}`);
        if (!smtpReady) {
          return NextResponse.json(
            { error: "Unable to deliver inquiry right now. Please call or WhatsApp us." },
            { status: 502 }
          );
        }
      }
    }

    let messageId: string | undefined;
    let previewUrl: string | undefined;

    if (smtpReady) {
      let attachment: LeadAttachment | undefined;
      if (file instanceof File && file.size) {
        attachment = {
          filename: file.name,
          content: Buffer.from(await file.arrayBuffer()),
          contentType: file.type || undefined,
        };
      }
      const result = await sendLeadEmail(payload, attachment);
      messageId = result.messageId;
      previewUrl = result.previewUrl;
    }

    return NextResponse.json({
      ok: true,
      ...(messageId ? { messageId } : {}),
      ...(process.env.NODE_ENV !== "production" && previewUrl ? { previewUrl } : {}),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Unable to process the form right now." }, { status: 500 });
  }
}
