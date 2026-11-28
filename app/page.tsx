"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Homepage } from "@/components/homepage";

function HomeVariant() {
  const searchParams = useSearchParams();
  const heroVariant = searchParams.get("hero") === "default" ? "default" : "global";

  return <Homepage heroVariant={heroVariant} />;
}

export default function Home() {
  return (
    <Suspense fallback={<Homepage heroVariant="global" />}>
      <HomeVariant />
    </Suspense>
  );
}
