import {
  Globe,
  Layers,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { routeHref } from "@/lib/routes";
import {
  FOOTER_AUTOMATE_SERVICES,
  FOOTER_BUILD_SERVICES,
  FOOTER_COMPANY,
  FOOTER_INDUSTRIES,
  FOOTER_LEGAL,
  PRODUCTS,
  SITE_IDENTITY,
} from "@/lib/site-content";

export function Footer4Col() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="site-footer rr-footer-4col"
      data-section="footer"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        RankRise Technologies footer
      </h2>

      <div className="container rr-footer-shell">
        <div className="rr-footer-grid">
          <div className="rr-footer-brand">
            <Link
              href={routeHref("/")}
              aria-label="RankRise Technologies home"
              className="rr-footer-logo-link"
            >
              <img
                src="/favicon.svg"
                alt=""
                aria-hidden="true"
                width={40}
                height={40}
                className="rr-footer-logo-img"
              />
              <span className="rr-footer-wordmark">
                <span className="rr-footer-wordmark-name">RankRise</span>
                <span className="rr-footer-wordmark-sub">Technologies</span>
              </span>
            </Link>

            <p className="rr-footer-desc">{SITE_IDENTITY.positioning}</p>

            <ul className="rr-footer-socials">
              <li>
                <a
                  href={`mailto:${SITE_IDENTITY.email}`}
                  className="rr-footer-icon-btn"
                >
                  <span className="sr-only">{SITE_IDENTITY.email}</span>
                  <Mail className="size-5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_IDENTITY.phoneHref}`}
                  className="rr-footer-icon-btn"
                >
                  <span className="sr-only">{SITE_IDENTITY.phone}</span>
                  <Phone className="size-5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_IDENTITY.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rr-footer-icon-btn"
                >
                  <span className="sr-only">WhatsApp Direct</span>
                  <MessageCircle className="size-5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <Link
                  href={routeHref("/products")}
                  className="rr-footer-icon-btn"
                >
                  <span className="sr-only">Explore Products</span>
                  <Layers className="size-5" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link
                  href={routeHref("/global-customers")}
                  className="rr-footer-icon-btn"
                >
                  <span className="sr-only">Global Customers</span>
                  <Globe className="size-5" aria-hidden="true" />
                </Link>
              </li>
            </ul>

            <div className="rr-brand-address">
              <MapPin className="rr-brand-address-icon size-4 shrink-0" aria-hidden="true" />
              <address className="footer-address rr-footer-address">
                {SITE_IDENTITY.address}
              </address>
            </div>
          </div>

          <div className="rr-footer-columns">
            <div className="rr-footer-col">
              <h3>Engineering</h3>
              <ul className="rr-footer-list">
                {FOOTER_BUILD_SERVICES.map((item) => (
                  <li key={item.name}>
                    <Link className="rr-footer-link" href={item.href}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rr-footer-col">
              <h3>AI &amp; Automation</h3>
              <ul className="rr-footer-list">
                {FOOTER_AUTOMATE_SERVICES.map((item) => (
                  <li key={item.name}>
                    <Link className="rr-footer-link" href={item.href}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rr-footer-col">
              <h3>Industries</h3>
              <ul className="rr-footer-list">
                {FOOTER_INDUSTRIES.map((item) => (
                  <li key={item.name}>
                    <Link className="rr-footer-link" href={item.href}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rr-footer-col">
              <h3>Company</h3>
              <ul className="rr-footer-list">
                {FOOTER_COMPANY.map((item) => (
                  <li key={item.name}>
                    <Link className="rr-footer-link" href={item.href}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rr-footer-col">
              <h3>Products</h3>
              <ul className="rr-footer-list footer-products-strip">
                {PRODUCTS.map((product) => (
                  <li key={product.id}>
                    <Link className="rr-footer-link" href={product.href}>
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="rr-footer-bottom">
          <div className="rr-bottom-top">
            <div className="legal-actions" aria-label="Legal information">
              {FOOTER_LEGAL.map((legal) => (
                <Link
                  key={legal.name}
                  href={legal.href}
                  className="rr-legal-link"
                >
                  {legal.name}
                </Link>
              ))}
            </div>

            <p className="rr-dev-credit">
              Developed by{" "}
              <a
                href={SITE_IDENTITY.asmRankRise}
                target="_blank"
                rel="noreferrer noopener"
                className="rr-dev-link"
              >
                ASMRankRise
              </a>
            </p>
          </div>

          <div className="rr-bottom-meta">
            <p className="footer-copyright">
              © {currentYear} {SITE_IDENTITY.legalIndia} &amp;{" "}
              {SITE_IDENTITY.legalUs}. All rights reserved.{" "}
              <span className="rr-built-in">
                Built in India with love <span aria-hidden="true">❤️</span> for
                world-class businesses.
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer4Col as SiteFooter };
export default Footer4Col;
