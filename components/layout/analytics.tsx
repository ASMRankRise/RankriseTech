"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export function Analytics() {
  useEffect(() => {
    const start = () => {
      try {
        if (localStorage.getItem("rr-cookie-consent") !== "accepted") {
          return;
        }
      } catch {
        return;
      }

      const ga = process.env.NEXT_PUBLIC_GA_ID;
      const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;

      if (ga && !document.querySelector(`script[data-rr-ga="${ga}"]`)) {
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${ga}`;
        script.dataset.rrGa = ga;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        window.gtag = (...args: unknown[]) => {
          window.dataLayer?.push(args);
        };
        window.gtag("js", new Date());
        window.gtag("config", ga, { anonymize_ip: true });
      }

      if (pixel && !window.fbq) {
        const fbQueue = function (...args: unknown[]) {
          (fbQueue as unknown as { queue: unknown[][] }).queue.push(args);
        } as unknown as ((...args: unknown[]) => void) & {
          queue: unknown[][];
          loaded?: boolean;
          version?: string;
        };
        fbQueue.queue = [];
        fbQueue.loaded = true;
        fbQueue.version = "2.0";
        window.fbq = fbQueue;

        const script = document.createElement("script");
        script.async = true;
        script.src = "https://connect.facebook.net/en_US/fbevents.js";
        document.head.appendChild(script);
        window.fbq("init", pixel);
        window.fbq("track", "PageView");
      }
    };

    start();
    window.addEventListener("rankrise-consent", start);
    return () => {
      window.removeEventListener("rankrise-consent", start);
    };
  }, []);

  return null;
}

export default Analytics;
