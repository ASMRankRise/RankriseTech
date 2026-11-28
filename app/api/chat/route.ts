import { NextResponse } from "next/server";
import { answerLocally, assistantContext } from "@/lib/assistant";

export const runtime = "nodejs";
type ChatMessage = { role: "user" | "assistant"; text: string };

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 3000) : "";
  const history: ChatMessage[] = Array.isArray(body.history)
    ? body.history
        .slice(-8)
        .filter(
          (m: ChatMessage) =>
            m && (m.role === "user" || m.role === "assistant") && typeof m.text === "string"
        )
    : [];
  if (!message) return NextResponse.json(answerLocally("services"));

  const key = process.env.OPENAI_API_KEY;
  if (!key) return NextResponse.json(answerLocally(message));

  try {
    const transcript = [...history, { role: "user" as const, text: message }]
      .map((m) => `${m.role.toUpperCase()}: ${m.text}`)
      .join("\n");
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
        instructions: `You are the official website assistant for RankRise Technologies. Answer questions about the company and help visitors identify relevant services. Use only the supplied website context for company-specific facts. Be concise, practical and conversational. Never invent prices, timelines, certifications, clients, case-study results, legal promises or technical feasibility. If a requirement needs discovery, say that clearly and recommend the Discuss Your Project form. When useful, mention the exact service name.\n\nWEBSITE CONTEXT:\n${assistantContext()}`,
        input: transcript,
        max_output_tokens: 450,
        store: false,
      }),
    });
    if (!response.ok) {
      console.error("OpenAI response", response.status, await response.text());
      return NextResponse.json(answerLocally(message));
    }
    const d = await response.json();
    const text =
      d.output_text ||
      d.output
        ?.flatMap((o: { content?: Array<{ text?: string }> }) => o.content || [])
        .map((c: { text?: string }) => c.text || "")
        .join(" ");
    if (!text) return NextResponse.json(answerLocally(message));
    return NextResponse.json({
      reply: String(text).trim(),
      links: [{ label: "Discuss your project", href: "/contact" }],
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(answerLocally(message));
  }
}
