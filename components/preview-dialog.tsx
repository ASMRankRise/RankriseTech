"use client";

import { useEffect, useRef, useState } from "react";
import { SITE_IDENTITY, type PreviewDetail } from "@/lib/site-content";
import { Icon } from "./icon";

export type DialogState =
  | { kind: "detail"; detail: PreviewDetail }
  | { kind: "inquiry"; context?: string };

function ProjectBrief({ context }: { context?: string }) {
  const [draft, setDraft] = useState(`${context ? `Discussion focus: ${context}\n\n` : ""}The challenge:\n\nWho this should help:\n\nWhat meaningful progress looks like:\n\nConstraints or questions:\n`);
  const [copyStatus, setCopyStatus] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  async function copyBrief() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(draft);
      setCopyStatus("Copied locally. No inquiry has been sent.");
    } catch {
      textareaRef.current?.focus();
      textareaRef.current?.select();
      setCopyStatus("Automatic copy is unavailable. Your draft is selected so you can copy it yourself. No inquiry has been sent.");
    }
  }

  return (
    <>
      <p className="dialog-notice inquiry-notice">{SITE_IDENTITY.inquiryNotice}</p>
      <p className="dialog-description">Use this checklist to clarify the conversation. No name, email or contact information is required.</p>
      <ul className="brief-checklist">
        <li>Start with the problem, not a list of features.</li>
        <li>Describe the people and workflows involved.</li>
        <li>Note the priorities, constraints and open questions.</li>
      </ul>
      <label className="brief-label" htmlFor="project-brief">Your working project brief</label>
      <textarea id="project-brief" ref={textareaRef} value={draft} onChange={(event) => {
        setDraft(event.target.value);
        setCopyStatus("");
      }} rows={7} spellCheck={false} aria-describedby="brief-storage-note" />
      <p id="brief-storage-note" className="small-note">Your draft stays in this page&apos;s memory and clears when this dialog closes. Do not include confidential or personal information.</p>
      <button className="button button-primary" type="button" onClick={copyBrief}><Icon name="copy" />Copy brief</button>
      <p className="copy-status" role="status" aria-live="polite">{copyStatus}</p>
    </>
  );
}

export function PreviewDialog({ state, onDismiss, onPrepareBrief }: {
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
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
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
    <dialog id="preview-dialog" className="preview-dialog" ref={dialogRef} aria-labelledby="preview-dialog-title" onCancel={(event) => {
      event.preventDefault();
      onDismiss();
    }} onClose={() => {
      if (state) onDismiss();
    }} onClick={(event) => {
      if (event.target === event.currentTarget) onDismiss();
    }}>
      {state && (
        <div className="dialog-inner">
          <div className="dialog-topline">
            <span className="eyebrow">{state.kind === "inquiry" ? "A local starting point" : "Preview information"}</span>
            <button className="dialog-close" type="button" aria-label="Close dialog" onClick={onDismiss}><Icon name="close" /></button>
          </div>
          <h2 id="preview-dialog-title">{state.kind === "inquiry" ? "Prepare a project brief" : state.detail.title}</h2>
          {state.kind === "inquiry" ? (
            <ProjectBrief context={state.context} />
          ) : (
            <>
              <p className="dialog-description">{state.detail.intro}</p>
              {state.detail.paragraphs?.map((paragraph) => <p className="dialog-description" key={paragraph}>{paragraph}</p>)}
              {state.detail.prompts && (
                <div className="detail-prompts">
                  <h3>A useful starting point</h3>
                  <ul>{state.detail.prompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ul>
                </div>
              )}
              <p className="dialog-notice">{state.detail.notice}</p>
              <button className="button button-primary" type="button" onClick={() => onPrepareBrief(state.detail.title)}>Prepare a local brief<Icon name="arrow-right" /></button>
            </>
          )}
        </div>
      )}
    </dialog>
  );
}
