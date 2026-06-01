"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [systemTime, setSystemTime] = useState("");

  useEffect(() => {
    setIsMounted(true);
    setSystemTime(new Date().toISOString().slice(0, 19).replace("T", " ") + " UTC");
    
    const interval = setInterval(() => {
      setSystemTime(new Date().toISOString().slice(0, 19).replace("T", " ") + " UTC");
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Navigation nodes definition
  const navItems = [
    { name: "[ 01 // AUDIT ]", path: "/dashboard/audit" },
    { name: "[ 02 // REGISTRY ]", path: "/dashboard/registry" },
    { name: "[ 03 // NETWORK ]", path: "/dashboard/network" },
  ];

  return (
    <div className="min-h-screen bg-[#06030a] text-white flex flex-col font-sans select-none relative z-20">
      {/* Dynamic Grid Background layer restricted to Dashboard */}
      <div 
        id="dashboard-grid-matrix"
        className="absolute inset-0 bg-[linear-gradient(to_right,#120e1e_1px,transparent_1px),linear-gradient(to_bottom,#120e1e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none opacity-40 z-0" 
      />

      {/* FIXED TOP STATUS NAVIGATION BANNER */}
      <header className="w-full border-b border-[#120e1e] bg-[#06030a]/90 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 relative">
        {/* Left Side: Pulse indicator */}
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-wider">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c084fc] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c084fc]"></span>
          </span>
          <span className="text-[#c084fc] font-bold">● SECURE NODE ACCELERATION UPLINK // ACTIVE</span>
        </div>

        {/* Center: Dynamic selector bar */}
        <nav className="flex items-center gap-6 font-mono text-[11px] tracking-widest">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`transition-colors duration-200 uppercase font-medium hover:text-[#c084fc] ${
                  isActive ? "text-[#c084fc]" : "text-neutral-500"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Back Link & Time */}
        <div className="flex items-center gap-4 font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
          <Link href="/" className="hover:text-white transition-colors duration-200">
            [ EXIT_TO_MAIN ]
          </Link>
          <span className="hidden md:inline text-neutral-600">|</span>
          <span className="hidden md:inline select-text">
            {isMounted ? systemTime : "LOADING..."}
          </span>
        </div>
      </header>

      {/* Dashboard Subpage Frame */}
      <main className="flex-1 relative z-10 max-w-[1200px] w-full mx-auto px-6 py-8">
        {children}
      </main>

      {/* Footer System Status Bar */}
      <footer className="w-full border-t border-[#120e1e] bg-black/40 px-6 py-4 mt-auto relative z-10 font-mono text-[10px] text-neutral-600 flex flex-col sm:flex-row justify-between items-center gap-2">
        <span>SECURITY LEVEL: GUILD_MAX // SYMMETRIC_CYPHER</span>
        <span>CORRIDOR: RAIPUR_BHILAI_DURG_MESH_INTEGRITY: 100%</span>
      </footer>
    </div>
  );
}
