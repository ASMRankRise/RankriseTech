export default function Loading() {
  return (
    <div className="container" style={{ paddingBlock: "80px", minHeight: "60vh" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        {/* Subtle branded skeleton header */}
        <div
          style={{
            height: "12px",
            width: "120px",
            borderRadius: "6px",
            backgroundColor: "var(--soft-blue-grey)",
            marginBottom: "20px",
            animation: "pulse-subtle 1.8s infinite ease-in-out",
          }}
        />
        {/* Skeleton title */}
        <div
          style={{
            height: "44px",
            width: "80%",
            borderRadius: "8px",
            backgroundColor: "var(--ice-blue)",
            marginBottom: "24px",
            animation: "pulse-subtle 1.8s infinite ease-in-out",
          }}
        />
        {/* Skeleton description lines */}
        <div
          style={{
            height: "16px",
            width: "100%",
            borderRadius: "4px",
            backgroundColor: "var(--cloud-white)",
            marginBottom: "12px",
            animation: "pulse-subtle 1.8s infinite ease-in-out",
          }}
        />
        <div
          style={{
            height: "16px",
            width: "90%",
            borderRadius: "4px",
            backgroundColor: "var(--cloud-white)",
            marginBottom: "32px",
            animation: "pulse-subtle 1.8s infinite ease-in-out",
          }}
        />
        {/* Skeleton action buttons */}
        <div style={{ display: "flex", gap: "14px" }}>
          <div
            style={{
              height: "48px",
              width: "180px",
              borderRadius: "9px",
              backgroundColor: "var(--soft-blue-grey)",
              animation: "pulse-subtle 1.8s infinite ease-in-out",
            }}
          />
          <div
            style={{
              height: "48px",
              width: "160px",
              borderRadius: "9px",
              backgroundColor: "var(--cloud-white)",
              animation: "pulse-subtle 1.8s infinite ease-in-out",
            }}
          />
        </div>
      </div>
    </div>
  );
}
