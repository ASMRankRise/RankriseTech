import { CONSTRUCTION_COPY } from "@/lib/site-content";
import { routeHref, type UnderConstructionRoute } from "@/lib/routes";
import { Icon } from "./icon";
import { SiteFooter } from "./site-footer";
import { SiteNavigation } from "./site-navigation";

export function UnderConstruction({ route }: { route: UnderConstructionRoute }) {
  return (
    <>
      <SiteNavigation />
      <main id="main-content" className="construction-page" aria-labelledby="construction-heading">
        <div className="container construction-layout">
          <div className="construction-copy">
            <p className="construction-status"><span aria-hidden="true" />{CONSTRUCTION_COPY.status}</p>
            <h1 id="construction-heading">{route.label}</h1>
            <p className="construction-lead">{CONSTRUCTION_COPY.description}</p>
            <p className="construction-description">{CONSTRUCTION_COPY.explanation}</p>
            <div className="construction-actions">
              <a className="button button-primary" href={routeHref("/")}>Back to homepage<Icon name="arrow-right" /></a>
              <a className="button button-secondary" href="/#capabilities">Explore our capabilities<Icon name="arrow-up-right" /></a>
            </div>
            <p className="construction-note">{CONSTRUCTION_COPY.notice}</p>
          </div>
          <div className="construction-visual" aria-hidden="true">
            <svg viewBox="0 0 420 360" fill="none" focusable="false">
              <path d="M30 90H390M30 180H390M30 270H390M120 30V330M210 30V330M300 30V330" stroke="var(--soft-blue-grey)" strokeDasharray="3 7" />
              <rect x="90" y="60" width="240" height="240" rx="12" fill="var(--cloud-white)" stroke="var(--soft-blue-grey)" />
              <path d="M120 120V90H150M270 90H300V120M300 240V270H270M150 270H120V240" stroke="currentColor" strokeWidth="2" />
              <path d="M150 210V150H210V210H270V150M150 240H270M210 120V240" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="150" cy="150" r="5" fill="var(--pure-white)" stroke="currentColor" strokeWidth="2" />
              <circle cx="210" cy="210" r="5" fill="var(--pure-white)" stroke="currentColor" strokeWidth="2" />
              <circle cx="270" cy="150" r="5" fill="var(--pure-white)" stroke="currentColor" strokeWidth="2" />
              <path d="M46 180H74M346 180H374M210 16V44M210 316V344" stroke="var(--sky-blue)" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
