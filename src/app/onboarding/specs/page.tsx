"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function OnboardingSpecsPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="min-h-screen bg-[#06030a]" />;

  return (
    <main className="min-h-screen bg-[#06030a] text-white flex flex-col justify-between px-6 py-12 md:py-16 relative overflow-hidden select-none">
      {/* Dynamic Grid Background layer */}
      <div 
        id="specs-grid-matrix"
        className="absolute inset-0 bg-[linear-gradient(to_right,#120e1e_1px,transparent_1px),linear-gradient(to_bottom,#120e1e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none opacity-20 z-0" 
      />

      <div className="max-w-[1200px] w-full mx-auto space-y-16 relative z-10 flex-1 flex flex-col justify-between">
        
        {/* HEADER SPECIFICATION */}
        <div className="border-b border-[#120e1e] pb-6 text-left animate-fadeIn">
          <span className="font-mono text-[10px] text-[#c084fc] uppercase tracking-widest block">// ONBOARDING // SYSTEM_SETUP_HANDBOOK</span>
          <h1 className="text-[28px] md:text-[38px] font-bold tracking-[-0.04em] text-white uppercase mt-2">
            CORE INDUCTION & CONFIGURATION PROTOCOLS
          </h1>
          <p className="text-[13.5px] text-neutral-400 font-light mt-1 max-w-2xl font-sans">
            follow the modular guidelines below to sync local corridors, bridge secure communication vectors, and scale builder clearance indexes.
          </p>
        </div>

        {/* 3-COLUMN METRICS MATRIX */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#120e1e] rounded-xl overflow-hidden bg-[#0b0714]/10 select-text animate-fadeIn font-mono text-[12px] leading-relaxed">
          
          {/* Column 1: Sync parameters */}
          <div className="p-8 space-y-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#120e1e] hover:bg-[#0b0714]/20 transition-all duration-300">
            <div className="space-y-4">
              <span className="text-[#c084fc] font-bold block tracking-wider">
                [ CRITERIA_01 // INFRASTRUCTURE_SYNC ]
              </span>
              <p className="text-neutral-400 font-sans font-light text-[13.5px] leading-relaxed">
                establish sync boundaries by cloning the system repository and linking your verified GitHub credentials. this registers your telemetry profile.
              </p>
            </div>
            
            <div className="bg-black/60 border border-white/5 rounded p-4 text-[11px] space-y-2 select-all">
              <div className="text-neutral-600">// SYSTEM_CLONE_COMMAND</div>
              <div className="text-white">git clone https://github.com/adityaarchsystems/The-Central-Grid.git</div>
            </div>
          </div>

          {/* Column 2: Mesh channels */}
          <div className="p-8 space-y-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#120e1e] hover:bg-[#0b0714]/20 transition-all duration-300">
            <div className="space-y-4">
              <span className="text-[#c084fc] font-bold block tracking-wider">
                [ CRITERIA_02 // SECURE_MESH_CHANNELS ]
              </span>
              <p className="text-neutral-400 font-sans font-light text-[13.5px] leading-relaxed">
                Bridge directly with our closed corridor developer hub on Telegram to coordinate live hardware configurations and collaborative deployments.
              </p>
            </div>
            
            <div className="pt-4">
              <a 
                href="https://t.me/placeholder" 
                target="_blank" 
                rel="noreferrer"
                className="w-full py-2.5 bg-[#1c122e]/60 border border-[#c084fc]/25 hover:border-[#c084fc]/50 text-white font-mono text-[11px] tracking-wider rounded-md uppercase text-center block transition-all hover:bg-[#1c122e]"
              >
                TELEGRAM CORRIDOR TRANSIT →
              </a>
            </div>
          </div>

          {/* Column 3: Sandbox scaling */}
          <div className="p-8 space-y-6 flex flex-col justify-between hover:bg-[#0b0714]/20 transition-all duration-300">
            <div className="space-y-4">
              <span className="text-[#c084fc] font-bold block tracking-wider">
                [ CRITERIA_03 // SANDBOX_RANK_SCALING ]
              </span>
              <p className="text-neutral-400 font-sans font-light text-[13.5px] leading-relaxed">
                submit pull requests and resolve system prompts to scale your rank and unlock high-level hardware cluster metrics.
              </p>
            </div>
            
            <div className="border border-[#120e1e] rounded p-4 text-[11px] bg-black/30 space-y-1.5 select-none">
              <div className="text-neutral-500">// RANKING_THRESHOLDS</div>
              <div className="flex justify-between text-neutral-400">
                <span>STAGING_T1</span>
                <span className="text-white">&gt;= 10 commits</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>BUILDER_T2</span>
                <span className="text-white">&gt;= 50 commits</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>CLUSTER_CORE</span>
                <span className="text-white">&gt;= 150 commits</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM REDIRECT ACTION BANNER */}
        <div className="pt-8 flex flex-col items-center gap-4 animate-fadeIn">
          <Link 
            href="/dashboard/audit"
            className="w-full max-w-md py-4 bg-white text-black font-sans font-bold text-[13px] uppercase tracking-[0.15em] rounded-lg transition-all duration-300 hover:bg-neutral-200 active:scale-[0.99] text-center shadow-2xl hover:shadow-[#c084fc]/5"
          >
            ENTER COMMAND WORKSPACE
          </Link>
          <span className="font-mono text-[9px] text-neutral-600 uppercase tracking-widest pointer-events-none select-none">
            induction cleared. secure gateway authorization credentials active.
          </span>
        </div>

      </div>
    </main>
  );
}
