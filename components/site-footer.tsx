import Link from "next/link";
import {
  FOOTER_AUTOMATE_SERVICES,
  FOOTER_BUILD_SERVICES,
  FOOTER_COMPANY,
  FOOTER_INDUSTRIES,
  FOOTER_LEGAL,
  PRODUCTS,
  SITE_IDENTITY,
} from "@/lib/site-content";
import { Wordmark } from "./site-navigation";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" data-section="footer" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        RankRise Technologies footer
      </h2>
      <div className="container">
        <div className="footer-upper">
          <div className="footer-brand">
            <Wordmark />
            <p className="footer-tagline">{SITE_IDENTITY.tagline}</p>
            <p className="footer-positioning">{SITE_IDENTITY.positioning}</p>
            <div className="footer-reach-us" aria-label="Reach us">
              <h3 className="footer-reach-heading">Reach Us</h3>
              <p className="footer-contact-row">
                <span className="contact-label">Phone:</span>{" "}
                <a href={`tel:${SITE_IDENTITY.phoneHref}`} className="contact-link">
                  {SITE_IDENTITY.phone}
                </a>
              </p>
              <p className="footer-contact-row">
                <span className="contact-label">Email:</span>{" "}
                <a href={`mailto:${SITE_IDENTITY.email}`} className="contact-link">
                  {SITE_IDENTITY.email}
                </a>
              </p>
              <p className="footer-contact-row">
                <span className="contact-label">WhatsApp:</span>{" "}
                <a
                  href={SITE_IDENTITY.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="contact-link"
                >
                  Direct Message
                </a>
              </p>
              <address className="footer-address">
                {SITE_IDENTITY.address}
              </address>
            </div>
          </div>

          <div className="footer-links">
            <div>
              <h3>Engineering</h3>
              <ul>
                {FOOTER_BUILD_SERVICES.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>AI &amp; Automation</h3>
              <ul>
                {FOOTER_AUTOMATE_SERVICES.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Industries</h3>
              <ul>
                {FOOTER_INDUSTRIES.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Company</h3>
              <ul>
                {FOOTER_COMPANY.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-products-strip" aria-label="In-house products">
          <span className="products-strip-label">In-House Products:</span>
          <ul className="products-strip-list">
            {PRODUCTS.map((product) => (
              <li key={product.id}>
                <Link href={product.href} className="product-strip-link">
                  <strong>{product.name}</strong>
                  <span> — {product.category}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} {SITE_IDENTITY.legalIndia} &amp; {SITE_IDENTITY.legalUs}. All rights reserved.
          </p>
          <div className="legal-actions flex-wrap" aria-label="Legal information">
            {FOOTER_LEGAL.map((legal) => (
              <Link key={legal.name} className="text-link" href={legal.href}>
                {legal.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
