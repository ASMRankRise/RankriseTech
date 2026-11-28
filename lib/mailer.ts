import nodemailer from "nodemailer";

export function escapeHtml(s: string): string {
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

export function sanitizeHeader(s: string): string {
  return s.replace(/[\r\n]+/g, " ").trim();
}

export function isSmtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST);
}

export function resolveLeadRecipient(region?: string): string | undefined {
  if (region === "Global") {
    return process.env.GLOBAL_LEADS_TO_EMAIL || process.env.LEADS_TO_EMAIL;
  }
  return process.env.LEADS_TO_EMAIL;
}

export interface LeadAttachment {
  filename: string;
  content: Buffer;
  contentType?: string;
}

export async function sendLeadEmail(
  payload: Record<string, string>,
  attachment?: LeadAttachment
): Promise<{ messageId: string; previewUrl?: string }> {
  const host = process.env.SMTP_HOST;
  const to = resolveLeadRecipient(payload.region);
  if (!host || !to) {
    throw new Error("SMTP_HOST or lead recipient email is not configured.");
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user || "website@rankrisetech.in";

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    ...(user && pass ? { auth: { user, pass } } : {}),
  });

  const formType = sanitizeHeader(payload.formType || "enquiry");
  const senderName = sanitizeHeader(payload.name || "Unknown");
  const subject = `RankRise website: ${formType} — ${senderName}`;

  const rows = Object.entries(payload)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;border:1px solid #e2e8f0;font-weight:600;vertical-align:top">${escapeHtml(
          k
        )}</td><td style="padding:6px 12px;border:1px solid #e2e8f0;white-space:pre-wrap">${escapeHtml(
          v
        )}</td></tr>`
    )
    .join("");

  const html = `<h2>New RankRise website submission</h2><table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows}</table>`;
  const text = Object.entries(payload)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const info = await transporter.sendMail({
    from,
    to,
    replyTo: payload.email ? sanitizeHeader(payload.email) : undefined,
    subject,
    text,
    html,
    ...(attachment ? { attachments: [attachment] } : {}),
  });

  const previewUrl = nodemailer.getTestMessageUrl(info) || undefined;
  return { messageId: info.messageId, previewUrl };
}
