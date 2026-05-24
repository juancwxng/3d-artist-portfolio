"use client";

import dynamic from "next/dynamic";

const PremiumEffects = dynamic(() => import("@/components/ui/PremiumEffects"), {
  ssr: false,
});

export default function PremiumEffectsWrapper() {
  return <PremiumEffects />;
}
