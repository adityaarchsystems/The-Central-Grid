"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function OnboardingWelcomePage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="min-h-screen bg-[#06030a]" />;

  return (
    <main className="min-h-screen bg-[#06030a] text-white flex flex-col justify-center items-center px-6 relative overflow-hidden select-none">
      {/* Dynamic Grid Background layer */}
      <div 
        id="onboarding-grid-matrix"
        className="absolute inset-0 bg-[linear-gradient(to_right,#120e1e_1px,transparent_1px),linear-gradient(to_bottom,#120e1e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] pointer-events-none opacity-30 z-0" 
      />

      <div className="max-w-[700px] w-full text-center space-y-12 relative z-10 animate-fadeIn">
        {/* Verification Status Indicator */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#22c55e]"></span>
          </div>
          <span 
            className="font-mono text-[11px] text-[#22c55e] tracking-[0.2em] uppercase font-semibold animate-pulse"
          >
            ● SECURE_INGRESS_CLEARANCE // DATA_METRICS_ACCEPTED
          </span>
        </div>

        {/* Core Headline */}
        <div className="space-y-6">
          <h1 
            className="text-[36px] md:text-[52px] font-extrabold tracking-[-0.04em] leading-[1.0] text-white uppercase"
            style={{ fontFamily: "var(--font-sans, 'Geist', 'Inter', sans-serif)" }}
          >
            UPLINK ACTIVE. <br />
            <span className="text-[#9ca3af]">WELCOME TO THE CENTRAL GRID CORE.</span>
          </h1>
          <p className="text-[13px] text-neutral-400 font-mono tracking-wide max-w-md mx-auto leading-relaxed lowercase">
            your capability signature has cleared the zero-trust vetting standard. private gateway channels have been mapped to your secure endpoint.
          </p>
        </div>

        {/* Proceed Action Button */}
        <div className="pt-6">
          <Link 
            href="/onboarding/specs"
            className="inline-block w-full max-w-sm py-4 bg-white text-black font-sans font-bold text-[13px] uppercase tracking-[0.15em] rounded-lg transition-all duration-300 hover:bg-neutral-200 active:scale-[0.99] shadow-2xl hover:shadow-[#c084fc]/5"
          >
            PROCEED TO SYSTEM BREAKDOWN
          </Link>
        </div>
      </div>
    </main>
  );
}
