import { routeHref } from "@/lib/routes";

export function Wordmark() {
  return (
    <a className="wordmark" href={routeHref("/")} aria-label="RankRise Technologies home">
      <span className="wordmark-name">RankRise</span>
      <span className="wordmark-descriptor">Technologies</span>
    </a>
  );
}
