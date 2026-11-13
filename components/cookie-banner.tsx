"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export type CookieConsent = "essential" | "accepted";

export function CookieBanner() {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("rr-cookie-consent");
      if (!consent) {
        setShow(true);
      }
    } catch {
      setShow(false);
    }
  }, []);

  if (!show) return null;

  function choose(value: CookieConsent) {
    try {
      localStorage.setItem("rr-cookie-consent", value);
    } catch {
      // Storage unavailable or disabled
    }
    setShow(false);
    window.dispatchEvent(
      new CustomEvent("rankrise-consent", { detail: { consent: value } })
    );
    window.dispatchEvent(new Event("rankrise-consent"));
  }

  return (
    <aside
      className="cookie-banner"
      role="region"
      aria-label="Cookie preferences"
    >
      <div className="cookie-banner-content">
        <strong className="cookie-banner-title">Cookie preferences</strong>
        <p className="cookie-banner-text">
          Essential storage keeps the site working. Analytics and marketing
          measurement run only when you accept and the relevant IDs are
          configured. Learn more in our{" "}
          <Link href="/cookie-policy" className="cookie-banner-link">
            Cookie Policy
          </Link>
          .
        </p>
      </div>
      <div className="cookie-banner-actions">
        <button
          type="button"
          className="button button-secondary cookie-banner-btn cookie-banner-btn-essential"
          onClick={() => choose("essential")}
        >
          Essential Only
        </button>
        <button
          type="button"
          className="button button-primary cookie-banner-btn cookie-banner-btn-accept"
          onClick={() => choose("accepted")}
        >
          Accept All
        </button>
      </div>
    </aside>
  );
}

export default CookieBanner;
