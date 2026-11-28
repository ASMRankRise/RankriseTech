import Link from "next/link";
import { routeHref } from "@/lib/routes";

export function Wordmark() {
  return (
    <Link className="wordmark" href={routeHref("/")} aria-label="RankRise Technologies home">
      <span className="wordmark-name">RankRise</span>
      <span className="wordmark-descriptor">Technologies</span>
    </Link>
  );
}
