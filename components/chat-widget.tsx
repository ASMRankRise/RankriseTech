"use client";

import Link from "next/link";
import {
  type ChangeEvent,
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export interface ChatLink {
  label: string;
  href: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  links?: ChatLink[];
}

const DEFAULT_QUICK_PROMPTS: readonly string[] = [
  "What services do you offer?",
  "Can you build AI agents?",
  "What is TriMarkity?",
  "How do I start a project?",
];

const INITIAL_MESSAGES: readonly ChatMessage[] = [
  {
    role: "assistant",
    text: "Hi — I’m the RankRise assistant. Tell me what you want to build, automate or improve, or ask me about our services and products.",
  },
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([...INITIAL_MESSAGES]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const openChat = useCallback(() => {
    if (typeof document !== "undefined") {
      lastFocusedElementRef.current = document.activeElement as HTMLElement | null;
    }
    setIsOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    if (
      lastFocusedElementRef.current &&
      typeof lastFocusedElementRef.current.focus === "function"
    ) {
      lastFocusedElementRef.current.focus({ preventScroll: true });
    }
  }, []);

  // Listen to open events and data-attribute trigger clicks
  useEffect(() => {
    const handleOpenEvent = () => {
      openChat();
    };

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-open-ai-chat]")) {
        event.preventDefault();
        openChat();
      }
    };

    window.addEventListener("rankrise-ai-open", handleOpenEvent);
    document.addEventListener("click", handleDocumentClick);

    return () => {
      window.removeEventListener("rankrise-ai-open", handleOpenEvent);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [openChat]);

  // Handle Escape key to close and restore focus
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeChat();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeChat]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Scroll to bottom on new messages, loading, or open
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, isOpen]);

  async function ask(text: string) {
    const clean = text.trim();
    if (!clean || loading) return;

    const history = messages.slice(-8);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: clean }]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: clean, history }),
      });

      if (!response.ok) {
        throw new Error(`Chat request failed with status ${response.status}`);
      }

      const data: { reply?: string; links?: ChatLink[] } = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            data.reply ||
            "Please use Discuss Your Project for a detailed conversation.",
          links: data.links,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "I could not connect just now. You can still use our project form to get in touch.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(input);
  }

  if (!isOpen) return null;

  return (
    <div
      className="chat-panel chatPanel"
      role="dialog"
      aria-modal="true"
      aria-label="RankRise AI assistant"
    >
      <div className="chat-panel-head chatHead">
        <div className="chat-panel-identity">
          <span
            className="chat-panel-status assistantStatus"
            aria-label="Status: online"
          >
            <i aria-hidden="true" />
            <span>ONLINE</span>
          </span>
          <strong className="chat-panel-title">RankRise AI</strong>
          <small className="chat-panel-subtitle">Website assistant</small>
        </div>
        <button
          type="button"
          className="chat-panel-close"
          onClick={closeChat}
          aria-label="Close assistant"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div
        className="chat-panel-body chatBody"
        tabIndex={0}
        aria-label="Chat messages"
        role="log"
        aria-live="polite"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-panel-row chatRow ${
              msg.role === "user"
                ? "user chat-panel-row-user"
                : "assistant chat-panel-row-assistant"
            }`}
          >
            <div
              className={`chat-panel-msg chatMsg ${
                msg.role === "user"
                  ? "user chat-panel-msg-user"
                  : "assistant chat-panel-msg-assistant"
              }`}
            >
              <div className="chat-panel-text">{msg.text}</div>
              {msg.links && msg.links.length > 0 && (
                <div
                  className="chat-panel-links chatLinks"
                  aria-label="Related links"
                >
                  {msg.links.map((link) =>
                    link.href.startsWith("http") ? (
                      <a
                        key={link.href}
                        href={link.href}
                        className="chat-panel-link"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {link.label} <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="chat-panel-link"
                        onClick={closeChat}
                      >
                        {link.label} <span aria-hidden="true">→</span>
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div
            className="chat-panel-row chatRow assistant chat-panel-row-assistant"
            aria-label="Assistant is typing"
          >
            <div
              className="chat-panel-msg chatMsg assistant chat-panel-msg-assistant typing"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} aria-hidden="true" />
      </div>

      {messages.length < 3 && (
        <div
          className="chat-panel-prompts quickPrompts"
          role="group"
          aria-label="Quick prompt suggestions"
        >
          {DEFAULT_QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              className="chat-panel-prompt-btn"
              onClick={() => void ask(prompt)}
              disabled={loading}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="chat-panel-form chatForm">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setInput(event.target.value)
          }
          placeholder="Ask RankRise anything…"
          aria-label="Ask RankRise assistant"
          className="chat-panel-input"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Send"
          className="chat-panel-submit"
        >
          <span aria-hidden="true">↗</span>
        </button>
      </form>

      <div className="chat-panel-foot chatFoot">
        AI answers company questions. Project scope still needs human review.
      </div>
    </div>
  );
}

export default ChatWidget;
