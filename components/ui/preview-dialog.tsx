"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SITE_IDENTITY, type PreviewDetail } from "@/lib/site-content";
import { Icon } from "./icon";
import { LeadForm } from "./lead-form";

export type DialogState =
  | { kind: "detail"; detail: PreviewDetail }
  | { kind: "inquiry"; context?: string };

function InquiryFlow({ context }: { context?: string }) {
  return (
    <div className="dialog-inquiry-flow">
      <p className="dialog-description">
        {context
          ? `Discussing: ${context}. Send your requirement below, or connect directly through our direct channels.`
          : "Tell us about your project, requirement or bottleneck. We will review and connect with you directly."}
      </p>

      <LeadForm type="project" initialContext={context} />

      <div
        className="dialog-direct-links"
        style={{
          marginTop: "20px",
          paddingTop: "16px",
          borderTop: "1px solid var(--line, #e2e8f0)",
          display: "flex",
          flexWrap: "wrap",
          gap: "14px",
          fontSize: "12px",
          color: "var(--muted, #64748b)",
        }}
      >
        <span>
          <strong>Direct Phone: </strong>
          <a href={`tel:${SITE_IDENTITY.phoneHref || "+919046734673"}`}>
            {SITE_IDENTITY.phone}
          </a>
        </span>
        <span>
          <strong>Email: </strong>
          <a href={`mailto:${SITE_IDENTITY.email}`}>{SITE_IDENTITY.email}</a>
        </span>
        <span>
          <a
            href={SITE_IDENTITY.whatsapp}
            target="_blank"
            rel="noreferrer"
            style={{ fontWeight: 600, color: "var(--brand-primary, #1768d5)" }}
          >
            WhatsApp ↗
          </a>
        </span>
        <span>
          <Link
            href="/contact"
            style={{ fontWeight: 600, textDecoration: "underline" }}
          >
            More contact &amp; callback options ↗
          </Link>
        </span>
      </div>
    </div>
  );
}

export function PreviewDialog({
  state,
  onDismiss,
  onPrepareBrief,
}: {
  state: DialogState | null;
  onDismiss: () => void;
  onPrepareBrief: (context?: string) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = state !== null;

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const originalOverflow = document.body.style.overflow;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = originalOverflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [isOpen]);

  return (
    <dialog
      id="preview-dialog"
      className="preview-dialog"
      ref={dialogRef}
      aria-labelledby="preview-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onDismiss();
      }}
      onClose={() => {
        if (state) onDismiss();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onDismiss();
      }}
    >
      {state && (
        <div className="dialog-inner">
          <div className="dialog-topline">
            <span className="eyebrow">
              {state.kind === "inquiry"
                ? "Start a Conversation"
                : "Requirement Preview"}
            </span>
            <button
              className="dialog-close"
              type="button"
              aria-label="Close dialog"
              onClick={onDismiss}
            >
              <Icon name="close" />
            </button>
          </div>

          <h2 id="preview-dialog-title">
            {state.kind === "inquiry"
              ? "Discuss Your Project"
              : state.detail.title}
          </h2>

          {state.kind === "inquiry" ? (
            <InquiryFlow context={state.context} />
          ) : (
            <>
              <p className="dialog-description">{state.detail.intro}</p>
              {state.detail.paragraphs?.map((paragraph) => (
                <p className="dialog-description" key={paragraph}>
                  {paragraph}
                </p>
              ))}
              {state.detail.prompts && (
                <div className="detail-prompts">
                  <h3>A useful starting point</h3>
                  <ul>
                    {state.detail.prompts.map((prompt) => (
                      <li key={prompt}>{prompt}</li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="dialog-notice">{state.detail.notice}</p>
              <button
                className="button button-primary"
                type="button"
                onClick={() => onPrepareBrief(state.detail.title)}
              >
                Start project discussion
                <Icon name="arrow-right" />
              </button>
            </>
          )}
        </div>
      )}
    </dialog>
  );
}

export default PreviewDialog;
