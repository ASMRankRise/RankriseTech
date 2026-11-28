"use client";

import { usePathname } from "next/navigation";
import { SITE_IDENTITY } from "@/lib/site-content";

function track(name: string) {
  if (typeof window === "undefined") return;
  const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", name, { event_category: "engagement" });
}

export function FloatingActions() {
  const pathname = usePathname();
  const message = `Hello RankRise Technologies, I am visiting ${pathname || "/"} and would like to discuss a software / AI requirement.`;
  const whatsappUrl = `${SITE_IDENTITY.whatsappBase}?text=${encodeURIComponent(message)}`;

  return (
    <div
      className="floating-rail floatingRail"
      aria-label="Quick contact actions"
    >
      <a
        className="floating-action floating-action-whatsapp whatsappAction"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        onClick={() => track("whatsapp_click")}
        aria-label="Contact RankRise on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          width="21"
          height="21"
          fill="currentColor"
        >
          <path d="M20.5 3.6A10 10 0 0 0 4.7 15.7L3.2 21l5.5-1.4A10 10 0 1 0 20.5 3.6Zm-8.4 16a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.2.9.9-3.1-.2-.3a8.2 8.2 0 1 1 7 3.8Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.6.1-1.5-.7-2.6-1.4-3.6-3-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.4-.3Z" />
        </svg>
        <span>WhatsApp</span>
      </a>

      <button
        className="floating-action floating-action-ai aiAction"
        data-open-ai-chat
        aria-label="Open RankRise AI assistant"
        type="button"
        onClick={() => {
          track("ai_chat_open");
          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("rankrise-ai-open"));
          }
        }}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          width="17"
          height="17"
          fill="currentColor"
        >
          <path d="M12 2 9.8 7.3 4 8l4.4 3.8L7.1 17 12 14.2 16.9 17l-1.3-5.2L20 8l-5.8-.7L12 2Zm-7 15 1 2.4L8.5 20 6 20.6 5 23l-1-2.4L1.5 20 4 19.4 5 17Zm14-2 1.2 2.8 2.8 1.2-2.8 1.2L19 24l-1.2-2.8L15 20l2.8-1.2L19 15Z" />
        </svg>
        <span className="floating-rail-badge" aria-hidden="true" />
        <span>Ask AI</span>
      </button>
    </div>
  );
}

export default FloatingActions;
