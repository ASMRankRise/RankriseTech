import Link from "next/link";
import { Icon } from "@/components/icon";
import { Wordmark } from "@/components/site-navigation";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--pure-white)",
      }}
    >
      <header
        style={{
          borderBottom: "1px solid var(--soft-blue-grey)",
          paddingBlock: "18px",
        }}
      >
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Wordmark />
          <Link href="/" className="button button-secondary button-small">
            Homepage
          </Link>
        </div>
      </header>

      <main
        id="main-content"
        className="container"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          paddingBlock: "100px",
        }}
      >
        <span
          className="eyebrow"
          style={{
            marginBottom: "16px",
            padding: "6px 14px",
            borderRadius: "9999px",
            backgroundColor: "var(--ice-blue)",
            border: "1px solid var(--soft-blue-grey)",
          }}
        >
          404 · Error
        </span>
        <h1
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
            color: "var(--midnight-navy)",
            fontFamily: "var(--font-manrope), sans-serif",
            fontWeight: 750,
            letterSpacing: "-1.5px",
            marginBottom: "20px",
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            maxWidth: "500px",
            fontSize: "16px",
            color: "var(--slate-ink)",
            lineHeight: 1.8,
            marginBottom: "36px",
          }}
        >
          The page you are looking for does not exist or has been moved. Explore our engineering direction and capabilities on the homepage.
        </p>
        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/" className="button button-primary">
            Back to homepage
            <Icon name="arrow-right" />
          </Link>
          <Link href="/#capabilities" className="button button-secondary">
            Explore our capabilities
            <Icon name="arrow-up-right" />
          </Link>
        </div>
      </main>

      <footer
        style={{
          borderTop: "1px solid var(--soft-blue-grey)",
          paddingBlock: "24px",
          textAlign: "center",
          color: "var(--steel-grey)",
          fontSize: "12px",
        }}
      >
        <p>© {new Date().getFullYear()} RankRise Technologies. All rights reserved.</p>
      </footer>
    </div>
  );
}
