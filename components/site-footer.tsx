import { FOOTER_SERVICES, FOOTER_SOLUTIONS, PRODUCTS, SITE_IDENTITY } from "@/lib/site-content";
import { routeHref } from "@/lib/routes";
import { Wordmark } from "./site-navigation";

export function SiteFooter() {
  return (
    <footer className="site-footer" data-section="footer" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">RankRise Technologies footer</h2>
      <div className="container">
        <div className="footer-upper">
          <div className="footer-brand">
            <Wordmark />
            <p className="footer-tagline">{SITE_IDENTITY.tagline}</p>
            <p>Intelligent software.<br />Purposeful innovation.<br />A connected digital future.</p>
          </div>
          <div className="footer-links">
            <div>
              <h3>Company</h3>
              <ul>
                <li><a href={routeHref("/about-us/")}>About</a></li>
                <li><a href={routeHref("/careers/")}>Careers</a></li>
                <li><a href={routeHref("/insights/")}>Insights</a></li>
                <li><a href={routeHref("/meet the team")}>Meet the Team</a></li>
                <li><a href={routeHref("/portfolio/")}>Our Work</a></li>
                <li><a href={routeHref("/contact/")}>Contact</a></li>
              </ul>
            </div>
            <div>
              <h3>Services</h3>
              <ul>{FOOTER_SERVICES.map((service) => <li key={service.name}><a href={service.href}>{service.name}</a></li>)}</ul>
            </div>
            <div>
              <h3>Solutions</h3>
              <ul>{FOOTER_SOLUTIONS.map((solution) => <li key={solution.name}><a href={solution.href}>{solution.name}</a></li>)}</ul>
            </div>
            <div>
              <h3>Products</h3>
              <ul>{PRODUCTS.map((product) => <li key={product.id}><a href={product.href}>{product.name}</a></li>)}</ul>
            </div>
          </div>
        </div>
        <p className="footer-preview-note">Initial local preview. Approved contact details, inquiry delivery and public-launch information are pending. No analytics or tracking is configured.</p>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} RankRise Technologies</p>
          <div className="legal-actions flex-wrap" aria-label="Legal preview information">
            <a className="text-link" href={routeHref("/privacy/")}>Privacy Policy</a>
            <a className="text-link" href={routeHref("/terms/")}>Terms &amp; Conditions</a>
            <a className="text-link" href={routeHref("/cookies/")}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
