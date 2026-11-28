"use client";

import { useId, useState, type FormEvent, type ChangeEvent } from "react";
import { PRODUCTS, SERVICES_LIST } from "@/lib/site-content";

export type LeadFormType =
  | "project"
  | "career"
  | "partner"
  | "callback"
  | "consultation";

export function LeadForm({
  type = "project",
  initialContext,
}: {
  type?: LeadFormType;
  initialContext?: string;
}) {
  const idPrefix = useId();
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [statusKind, setStatusKind] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 4 * 1024 * 1024) {
      setFileError("File exceeds the 4 MB limit. Please select a smaller file.");
      e.target.value = "";
    } else {
      setFileError(null);
    }
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("Sending…");
    setStatusKind("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("formType", type);

    const file = formData.get("file");
    if (file instanceof File && file.size > 4 * 1024 * 1024) {
      setStatusKind("error");
      setStatusMessage("File exceeds 4 MB limit. Please select a smaller file.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || "Unable to send inquiry. Please call or WhatsApp us.");
      }
      setStatusKind("success");
      setStatusMessage("Thank you. Your details have been received.");
      form.reset();
    } catch (err) {
      setStatusKind("error");
      setStatusMessage(
        err instanceof Error
          ? err.message
          : "Unable to submit. Please call or WhatsApp us."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const submitLabels: Record<LeadFormType, string> = {
    career: "Submit Application",
    partner: "Start Conversation",
    callback: "Request Callback",
    consultation: "Request Consultation",
    project: "Discuss Your Project",
  };

  return (
    <form
      className="lead-form leadForm"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      noValidate={false}
    >
      <div className="lead-form-grid formGrid">
        <div className="lead-form-field">
          <label htmlFor={`${idPrefix}-name`}>Name*</label>
          <input
            id={`${idPrefix}-name`}
            name="name"
            required
            placeholder="Your full name"
            disabled={isSubmitting}
          />
        </div>

        {type !== "career" && (
          <div className="lead-form-field">
            <label htmlFor={`${idPrefix}-company`}>
              {type === "partner" ? "Organisation*" : "Company Name"}
            </label>
            <input
              id={`${idPrefix}-company`}
              name={type === "partner" ? "organisation" : "company"}
              required={type === "partner"}
              placeholder={
                type === "partner"
                  ? "Your organisation or firm"
                  : "Company or startup name"
              }
              disabled={isSubmitting}
            />
          </div>
        )}

        <div className="lead-form-field">
          <label htmlFor={`${idPrefix}-phone`}>Phone Number*</label>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            required
            placeholder="+91 90467 34673"
            disabled={isSubmitting}
          />
        </div>

        <div className="lead-form-field">
          <label htmlFor={`${idPrefix}-email`}>Email*</label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            disabled={isSubmitting}
          />
        </div>

        <div className="lead-form-field">
          <label htmlFor={`${idPrefix}-city`}>City</label>
          <input
            id={`${idPrefix}-city`}
            name="city"
            placeholder="e.g. Kolhapur, Pune, Mumbai"
            disabled={isSubmitting}
          />
        </div>

        {type === "project" && (
          <>
            <div className="lead-form-field">
              <label htmlFor={`${idPrefix}-region`}>Region</label>
              <select
                id={`${idPrefix}-region`}
                name="region"
                defaultValue="India"
                disabled={isSubmitting}
              >
                <option value="India">India</option>
                <option value="Global">Global</option>
              </select>
            </div>

            <div className="lead-form-field">
              <label htmlFor={`${idPrefix}-service`}>Service Required</label>
              <select
                id={`${idPrefix}-service`}
                name="service"
                defaultValue="Not Sure / Need Consultation"
                disabled={isSubmitting}
              >
                <option value="Not Sure / Need Consultation">
                  Not Sure / Need Consultation
                </option>
                <optgroup label="In-House Products">
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={`${p.name} (Product Demo)`}>
                      {p.name} (Product Demo)
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Engineering &amp; AI Services">
                  {SERVICES_LIST.map((s) => (
                    <option key={s.slug} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="lead-form-field lead-form-span-2 span2">
              <label htmlFor={`${idPrefix}-file`}>
                Requirement Document (max 4 MB)
              </label>
              <input
                id={`${idPrefix}-file`}
                name="file"
                type="file"
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                disabled={isSubmitting}
              />
              <span className="lead-form-note">
                Accepted: PDF, DOC, DOCX, TXT, PNG, JPG (maximum 4 MB).
              </span>
              {fileError && (
                <span className="lead-form-error" role="alert">
                  {fileError}
                </span>
              )}
            </div>

            <div className="lead-form-field lead-form-span-2 span2">
              <label htmlFor={`${idPrefix}-message`}>Brief Requirement</label>
              <textarea
                id={`${idPrefix}-message`}
                name="message"
                rows={5}
                defaultValue={initialContext ? `Discussion focus: ${initialContext}\n\n` : ""}
                placeholder="Describe your project, bottleneck, or what you want to build/automate..."
                disabled={isSubmitting}
              />
            </div>
          </>
        )}

        {type === "career" && (
          <>
            <div className="lead-form-field">
              <label htmlFor={`${idPrefix}-position`}>Position Applied For*</label>
              <input
                id={`${idPrefix}-position`}
                name="position"
                required
                placeholder="e.g. Full-Stack Engineer, AI Specialist"
                disabled={isSubmitting}
              />
            </div>

            <div className="lead-form-field">
              <label htmlFor={`${idPrefix}-experience`}>Experience</label>
              <input
                id={`${idPrefix}-experience`}
                name="experience"
                placeholder="e.g. 3 years, Senior, Fresher"
                disabled={isSubmitting}
              />
            </div>

            <div className="lead-form-field lead-form-span-2 span2">
              <label htmlFor={`${idPrefix}-skills`}>Skills</label>
              <input
                id={`${idPrefix}-skills`}
                name="skills"
                placeholder="e.g. React, Next.js, Node.js, Python, TypeScript"
                disabled={isSubmitting}
              />
            </div>

            <div className="lead-form-field lead-form-span-2 span2">
              <label htmlFor={`${idPrefix}-portfolio`}>
                LinkedIn / Portfolio URL
              </label>
              <input
                id={`${idPrefix}-portfolio`}
                name="portfolio"
                type="url"
                placeholder="https://linkedin.com/in/... or portfolio link"
                disabled={isSubmitting}
              />
            </div>

            <div className="lead-form-field lead-form-span-2 span2">
              <label htmlFor={`${idPrefix}-career-file`}>Resume* (max 4 MB)</label>
              <input
                id={`${idPrefix}-career-file`}
                name="file"
                type="file"
                accept=".pdf,.doc,.docx"
                required
                onChange={handleFileChange}
                disabled={isSubmitting}
              />
              <span className="lead-form-note">
                Accepted: PDF, DOC, DOCX (maximum 4 MB).
              </span>
              {fileError && (
                <span className="lead-form-error" role="alert">
                  {fileError}
                </span>
              )}
            </div>

            <div className="lead-form-field lead-form-span-2 span2">
              <label htmlFor={`${idPrefix}-message`}>Short Message</label>
              <textarea
                id={`${idPrefix}-message`}
                name="message"
                rows={4}
                placeholder="Introduce yourself, your background, or what drives you..."
                disabled={isSubmitting}
              />
            </div>
          </>
        )}

        {type === "partner" && (
          <>
            <div className="lead-form-field">
              <label htmlFor={`${idPrefix}-role`}>Role / Title</label>
              <input
                id={`${idPrefix}-role`}
                name="role"
                placeholder="e.g. Managing Director, Founder, Tech Lead"
                disabled={isSubmitting}
              />
            </div>

            <div className="lead-form-field">
              <label htmlFor={`${idPrefix}-partnership`}>Partnership Type</label>
              <select
                id={`${idPrefix}-partnership`}
                name="partnership"
                defaultValue="Strategic Partnership"
                disabled={isSubmitting}
              >
                <option value="Strategic Partnership">Strategic Partnership</option>
                <option value="Technology Alliance">Technology Alliance</option>
                <option value="Channel Partnership">Channel Partnership</option>
                <option value="Investor Conversation">Investor Conversation</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="lead-form-field lead-form-span-2 span2">
              <label htmlFor={`${idPrefix}-message`}>Message</label>
              <textarea
                id={`${idPrefix}-message`}
                name="message"
                rows={5}
                placeholder="Describe your organisation and the collaboration you have in mind..."
                disabled={isSubmitting}
              />
            </div>
          </>
        )}

        {type === "callback" && (
          <>
            <div className="lead-form-field">
              <label htmlFor={`${idPrefix}-time`}>Preferred Calling Time</label>
              <input
                id={`${idPrefix}-time`}
                name="preferredTime"
                placeholder="e.g. Today between 3-5 PM, Tomorrow morning"
                disabled={isSubmitting}
              />
            </div>

            <div className="lead-form-field">
              <label htmlFor={`${idPrefix}-service`}>Service Required</label>
              <select
                id={`${idPrefix}-service`}
                name="service"
                defaultValue="Not Sure / Need Consultation"
                disabled={isSubmitting}
              >
                <option value="Not Sure / Need Consultation">
                  Not Sure / Need Consultation
                </option>
                <optgroup label="In-House Products">
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={`${p.name} (Product Demo)`}>
                      {p.name} (Product Demo)
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Engineering &amp; AI Services">
                  {SERVICES_LIST.map((s) => (
                    <option key={s.slug} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </>
        )}

        {type === "consultation" && (
          <>
            <div className="lead-form-field">
              <label htmlFor={`${idPrefix}-service`}>Service Required</label>
              <select
                id={`${idPrefix}-service`}
                name="service"
                defaultValue="Not Sure / Need Consultation"
                disabled={isSubmitting}
              >
                <option value="Not Sure / Need Consultation">
                  Not Sure / Need Consultation
                </option>
                <optgroup label="In-House Products">
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={`${p.name} (Product Demo)`}>
                      {p.name} (Product Demo)
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Engineering &amp; AI Services">
                  {SERVICES_LIST.map((s) => (
                    <option key={s.slug} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="lead-form-field">
              <label htmlFor={`${idPrefix}-date`}>Preferred Date</label>
              <input
                id={`${idPrefix}-date`}
                name="date"
                type="date"
                disabled={isSubmitting}
              />
            </div>

            <div className="lead-form-field">
              <label htmlFor={`${idPrefix}-pref-time`}>Preferred Time</label>
              <input
                id={`${idPrefix}-pref-time`}
                name="time"
                type="time"
                disabled={isSubmitting}
              />
            </div>

            <div className="lead-form-field lead-form-span-2 span2">
              <label htmlFor={`${idPrefix}-message`}>Brief Requirement</label>
              <textarea
                id={`${idPrefix}-message`}
                name="message"
                rows={4}
                placeholder="Tell us what you would like to consult with our engineering team on..."
                disabled={isSubmitting}
              />
            </div>
          </>
        )}
      </div>

      <button
        className="lead-form-submit button button-primary"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending…" : submitLabels[type]}
      </button>

      {statusMessage && (
        <p
          className={`lead-form-status formStatus${
            statusKind === "success"
              ? " is-success"
              : statusKind === "error"
                ? " is-error"
                : ""
          }`}
          role={statusKind === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {statusMessage}
        </p>
      )}
    </form>
  );
}

export default LeadForm;
