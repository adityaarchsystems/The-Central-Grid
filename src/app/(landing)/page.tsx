"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CentralGridLandingFloor() {
  const router = useRouter();

  // Hydration & Mount State
  const [isMounted, setIsMounted] = useState(false);

  // Hero Form States
  const [email, setEmail] = useState("");
  const [vector, setVector] = useState("fullstack");
  const [github, setGithub] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; github?: string }>({});

  // Custom Dropdown Open States
  const [vectorOpen, setVectorOpen] = useState(false);

  // Magazine Form States
  const [magEmail, setMagEmail] = useState("");
  const [magSubmitted, setMagSubmitted] = useState(false);
  const [magError, setMagError] = useState("");

  // Live Telemetry States
  const [systemTime, setSystemTime] = useState("2026-06-01 07:55:02 UTC");
  const [llamaSpeed, setLlamaSpeed] = useState(74.9);

  // GlareCard 3D reflection tracking state
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const vectorOptions = [
    { value: "fullstack", label: "Full Stack Optimization" },
    { value: "frontend", label: "UI/UX Systems & Frontend" },
    { value: "ai", label: "AI Core & Local Inference" },
    { value: "devops", label: "DevOps & Edge Architecture" }
  ];

  const selectedVectorLabel = vectorOptions.find(v => v.value === vector)?.label || "";

  // Client Mount Handshake & Telemetry Simulation
  useEffect(() => {
    setIsMounted(true);
    
    // Set ticking system time safely on mount
    setSystemTime(new Date().toISOString().slice(0, 19).replace("T", " ") + " UTC");
    
    const clockInterval = setInterval(() => {
      setSystemTime(new Date().toISOString().slice(0, 19).replace("T", " ") + " UTC");
    }, 1000);

    // Stagger variations randomly by +/-2.5% every 12 seconds
    const telemetryInterval = setInterval(() => {
      setLlamaSpeed((prev) => {
        const percentage = (Math.random() * 5 - 2.5) / 100; // -2.5% to +2.5%
        const nextSpeed = prev * (1 + percentage);
        return parseFloat(nextSpeed.toFixed(1));
      });
    }, 12000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(telemetryInterval);
    };
  }, []);

  useEffect(() => {
    const handleClickAway = () => {
      setVectorOpen(false);
    };
    window.addEventListener("click", handleClickAway);
    return () => window.removeEventListener("click", handleClickAway);
  }, []);

  const validateEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const validateUrl = (input: string) => {
    try {
      const url = new URL(input);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleManifestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isParsing) return;
    const newErrors: { email?: string; github?: string } = {};

    if (!validateEmail(email)) {
      newErrors.email = "INVALID EMAIL STRUCTURE";
    }

    if (!validateUrl(github) || !github.includes("github.com")) {
      newErrors.github = "URL MUST CONFORM TO SECURE GITHUB SCHEMA";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsParsing(true);

    try {
      const response = await fetch("/api/ingress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          engineeringVector: vector,
          githubUrl: github,
          emailEndpoint: email,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const userProfile = {
          email,
          githubUrl: github,
          engineeringVector: vector,
          complexityScore: data.complexityScore,
          ingressToken: data.ingressToken,
        };
        localStorage.setItem("cg_user_profile", JSON.stringify(userProfile));
        router.push("/onboarding/welcome");
      } else {
        setErrors({
          github: data.error || "[LINT_FAIL]: INSUFFICIENT_COMMIT_VELOCITY_FOR_INGRESS",
        });
        setIsParsing(false);
      }
    } catch {
      setErrors({
        github: "[LINT_FAIL]: SYSTEM_PARSING_COMPILER_EXCEPTION",
      });
      setIsParsing(false);
    }
  };

  const handleMagazineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(magEmail)) {
      setMagError("INVALID SECURE ENDPOINT");
      return;
    }
    setMagError("");
    setMagSubmitted(true);
  };

  const toggleVector = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVectorOpen(!vectorOpen);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePos({ x, y });
  };

  // Eradicate server pre-render flashes by halting element mounting until client is active
  if (!isMounted) return <div className="min-h-screen bg-[#06030a]" />;

  return (
    <main className="min-h-screen bg-[#06030a] text-white font-sans antialiased relative overflow-x-hidden selection:bg-[#c084fc]/30 pb-24">
      
      {/* 1. ACETERNITY ACCENT MATRIX: 64px Linear Grid with Radial Masking */}
      <div 
        id="aceternity-grid-matrix"
        className="absolute inset-0 bg-[linear-gradient(to_right,#120e1e_1px,transparent_1px),linear-gradient(to_bottom,#120e1e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-60 z-0" 
      />

      {/* 2. BKLIT UI TOP NAVIGATION BAR: Blurred Glass Backplate */}
      <nav 
        id="bklit-nav-bar"
        className="w-full border-b border-[#120e1e] bg-[#06030a]/80 backdrop-blur-md sticky top-0 z-50 px-8 py-4 flex justify-between items-center font-mono text-[11px] tracking-widest text-neutral-500 select-none"
      >
        <div className="flex items-center gap-2 font-mono text-white">
          <span className="text-[#c084fc] font-bold animate-pulse text-xs">●</span> THE CENTRAL GRID
        </div>
        <div className="hidden md:flex gap-6 uppercase font-mono text-[#4b5563]">
          <span className="font-mono text-[10px] text-[#4b5563] tracking-widest uppercase">[ SYSTEM_CORE: GLOBAL_NODE_UPLINK ]</span>
        </div>
      </nav>

      {/* 3. CORE VIEWPORT ENVELOPE */}
      <div className="max-w-[1200px] mx-auto px-6 relative z-10 space-y-24">
        
        {/* ==================== TIER 1: HERO VIEWPORT ASSEMBLY ==================== */}
        <div 
          id="tier-1-hero"
          className="pt-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
        >
          {/* LEFT COLUMN: System Manifesto Frame (7 Columns) */}
          <section id="manifesto-core-panel" className="lg:col-span-7 space-y-8 text-left">
            <div 
              id="protocol-status-tag"
              className="inline-flex items-center gap-2 px-3 py-1 rounded bg-purple-950/30 border border-purple-500/20 text-[#c084fc] font-mono text-[11px] tracking-widest uppercase select-none"
            >
              <span className="text-[#c084fc] font-bold animate-pulse">●</span> PRIVATE INTAKE PROTOCOL ACTIVE
            </div>
            
            <h1 
              id="main-architectural-headline"
              className="text-[48px] md:text-[64px] font-bold tracking-[-0.04em] leading-[0.95] text-white uppercase font-sans select-text"
            >
              THE SANCTUARY FOR <br />
              <span className="text-[#9ca3af]">HARDCORE BUILDERS.</span>
            </h1>

            <p 
              id="manifesto-body-narrative"
              className="text-[15px] leading-relaxed text-neutral-400 font-light max-w-xl select-text"
            >
              The Central Grid is a hyper-selective, physical guild spanning the central corridor. We operate with an absolute zero-fluff policy. We reject high-level marketing trends to focus exclusively on local architecture loops, deep-learning models, and production-grade full-stack engineering.
            </p>

            {/* LOWER SPLIT TELEMETRY TABLE (TREMOR STYLE) */}
            <div 
              id="tremor-telemetry-table"
              className="grid grid-cols-2 gap-6 pt-6 border-t border-[#120e1e] font-mono text-[11px] select-none"
            >
              <div>
                <span className="text-[#4b5563] block uppercase tracking-wider mb-1">METROPOLITAN CORRIDOR</span>
                <span className="text-neutral-300 font-medium">RAIPUR // BHILAI // DURG</span>
              </div>
              <div>
                <span className="text-[#4b5563] block uppercase tracking-wider mb-1">MEMBERSHIP ACCESS</span>
                <span className="text-[#22c55e] font-medium uppercase flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-ping" />
                  APPLICATION REQUIRED
                </span>
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN: High-Density Intake Sandbox (5 Columns) */}
          <section id="intake-sandbox-panel" className="lg:col-span-5">
            <div className="bg-[#0b0714] border border-white/5 rounded-xl p-8 relative shadow-2xl overflow-hidden transition-all duration-300 hover:border-[#221936] hover:shadow-[0_0_20px_rgba(192,132,252,0.05)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c084fc]/5 blur-3xl pointer-events-none rounded-full" />
              
              {!submitted ? (
                <form id="intake-manifest-form" onSubmit={handleManifestSubmit} className="space-y-6 text-left relative z-10">
                  <div className="border-b border-white/5 pb-4">
                    <h2 className="font-mono text-[12px] font-semibold text-white tracking-widest uppercase flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-[#c084fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      // INTAKE_MANIFEST_V1
                    </h2>
                    <p className="text-[11px] text-neutral-500 mt-1 font-mono">PROVIDE PROOF OF CAPABILITY TO SECURE ENTRY</p>
                  </div>

                  {/* Field 01: Custom React State-Driven Vector Selection */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#4b5563]">ENGINEERING VECTOR</label>
                    <div className="relative">
                      <div 
                        onClick={toggleVector} 
                        className="w-full bg-[#110c1e] border border-white/5 rounded px-4 py-2.5 text-[13px] text-white font-mono uppercase cursor-pointer flex justify-between items-center transition-all duration-200 hover:border-[#c084fc]/30 select-none"
                      >
                        <span>{selectedVectorLabel}</span>
                        <span className={`text-neutral-600 transition-transform duration-200 ${vectorOpen ? "rotate-180 text-[#c084fc]" : ""}`}>▼</span>
                      </div>
                      
                      {vectorOpen && (
                        <div className="absolute top-[110%] left-0 w-full bg-[#110c1e] border border-white/10 rounded shadow-xl z-50 font-mono text-[12px] overflow-hidden">
                          {vectorOptions.map(option => (
                            <div 
                              key={option.value}
                              onClick={() => { setVector(option.value); setVectorOpen(false); }}
                              className={`px-4 py-2.5 text-neutral-300 hover:bg-[#221936] hover:text-white cursor-pointer uppercase transition-colors ${vector === option.value ? "bg-[#c084fc]/5 text-[#c084fc] border-l-2 border-[#c084fc]" : "text-neutral-300"}`}
                            >
                              {option.label}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Field 02: Verification Anchor */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#4b5563]">GITHUB PROFILE / PORTFOLIO LINK</label>
                    <input 
                      id="github-input"
                      type="url" 
                      required
                      placeholder="https://github.com/yourprofile"
                      value={github}
                      onChange={(e) => {
                        setGithub(e.target.value);
                        if (errors.github) setErrors((prev) => ({ ...prev, github: undefined }));
                      }}
                      className={`w-full bg-[#110c1e] border ${errors.github ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-[#c084fc]"} rounded px-4 py-2.5 text-[13px] text-white placeholder-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#c084fc]/20 font-mono transition-all`}
                    />
                    {errors.github && (
                      <span className="block font-mono text-[9px] text-red-400 tracking-wider mt-1">{errors.github}</span>
                    )}
                  </div>

                  {/* Field 03: Communication Endpoint */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#4b5563]">SECURE EMAIL ENDPOINT</label>
                    <input 
                      id="email-input"
                      type="email" 
                      required
                      placeholder="name@domain.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      className={`w-full bg-[#110c1e] border ${errors.email ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-[#c084fc]"} rounded px-4 py-2.5 text-[13px] text-white placeholder-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#c084fc]/20 font-mono transition-all`}
                    />
                    {errors.email && (
                      <span className="block font-mono text-[9px] text-red-400 tracking-wider mt-1">{errors.email}</span>
                    )}
                  </div>

                  {/* Action Button */}
                  <button 
                    id="submit-manifest-button"
                    type="submit" 
                    disabled={isParsing}
                    className="w-full py-4 bg-white text-black font-sans font-bold text-[13px] uppercase tracking-wider rounded-lg transition-all duration-300 hover:bg-neutral-200 active:scale-[0.99] block disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-4"
                  >
                    {isParsing ? "// PARSING_TELEMETRY..." : "SUBMIT SPECIFICATION MANIFEST"}
                  </button>
                </form>
              ) : (
                /* INVARIANT SUCCESS STATE LAYER */
                <div id="success-telemetry-layer" className="py-12 text-center space-y-5 font-mono relative z-10">
                  <div className="flex justify-center">
                    <div className="relative flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#22c55e]"></span>
                    </div>
                  </div>
                  <h3 className="text-[13px] uppercase tracking-widest text-white font-bold">MANIFEST QUEUED FOR REVIEW</h3>
                  <p className="text-[11px] text-neutral-500 max-w-xs mx-auto leading-relaxed select-text font-mono">
                    Our system is compiling your code profile against core capability constraints. If validation passes, a private telemetry handshake will clear your secure entry endpoint within 48 hours.
                  </p>
                  <div className="pt-4 border-t border-white/5 mt-4 text-[9px] text-[#4b5563] uppercase tracking-wider">
                    TEL_HANDSHAKE_ID: {(Math.random() * 1000000).toFixed(0)} // VECTOR: {vector}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* ==================== TIER 2: THE CORE MATRIX BLUEPRINT (Feature Split Array - RESTORED CHASSIS WITH LINKS) ==================== */}
        <section 
          id="tier-2-matrix-blueprint"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10"
        >
          {/* Card 01 */}
          <Link href="/dashboard/audit" className="relative rounded-xl p-[1px] bg-white/5 overflow-hidden group transition-all duration-300 grid-tracer-card cursor-pointer block">
            <div className="bg-[#0b0714] rounded-xl p-8 h-full relative z-10 text-left">
              <span className="text-[#c084fc] font-mono text-[11px] block mb-2 transition-transform duration-300 group-hover:translate-x-1">// 01 // VETTING</span>
              <h3 className="text-white font-bold font-sans text-[20px] uppercase tracking-tight mb-3">CAPABILITY AUDIT</h3>
              <p className="text-neutral-400 font-light text-[14px] leading-relaxed select-text font-sans">
                Applicants undergo strict version control and automated code telemetry reviews. We inspect repository commit footprints and deployment histories before provisioning secure guild access channels.
              </p>
            </div>
          </Link>

          {/* Card 02 */}
          <Link href="/dashboard/registry" className="relative rounded-xl p-[1px] bg-white/5 overflow-hidden group transition-all duration-300 grid-tracer-card cursor-pointer block">
            <div className="bg-[#0b0714] rounded-xl p-8 h-full relative z-10 text-left">
              <span className="text-[#c084fc] font-mono text-[11px] block mb-2 transition-transform duration-300 group-hover:translate-x-1">// 02 // INTENT</span>
              <h3 className="text-white font-bold font-sans text-[20px] uppercase tracking-tight mb-3">CORE BUILD REGISTRY</h3>
              <p className="text-neutral-400 font-light text-[14px] leading-relaxed select-text font-sans">
                We reject theoretical lectures and high-level marketing slides. Members gather across the local corridor for weekend live hardware deployments, recursive code teardowns, and model fine-tune reviews.
              </p>
            </div>
          </Link>

          {/* Card 03 */}
          <Link href="/dashboard/network" className="relative rounded-xl p-[1px] bg-white/5 overflow-hidden group transition-all duration-300 grid-tracer-card cursor-pointer block">
            <div className="bg-[#0b0714] rounded-xl p-8 h-full relative z-10 text-left">
              <span className="text-[#c084fc] font-mono text-[11px] block mb-2 transition-transform duration-300 group-hover:translate-x-1">// 03 // COHORT</span>
              <h3 className="text-white font-bold font-sans text-[20px] uppercase tracking-tight mb-3">LOCAL ACCELERATION</h3>
              <p className="text-neutral-400 font-light text-[14px] leading-relaxed select-text font-sans">
                Establish direct low-latency connections to regional developer clusters, shared local GPU execution time, encrypted communication channels, and offline project collaborations.
              </p>
            </div>
          </Link>
        </section>

        {/* ==================== TIER 3: THE PUBLICATION CATALOG HUB ==================== */}
        <section 
          id="tier-3-magazine-catalog"
          className="border-y border-[#120e1e] py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Side: Lookbook Framework Mockup (4 Columns) - Aceternity Custom GlareCard */}
          <div className="lg:col-span-4 flex justify-center items-center">
            <div 
              onMouseMove={handleMouseMove}
              style={{ 
                "--x": `${glarePos.x}%`, 
                "--y": `${glarePos.y}%` 
              } as React.CSSProperties}
              className="relative group overflow-hidden rounded-xl aspect-[3/4] w-full max-w-[280px] bg-[#0c0814] border border-white/10 p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.5)] hover:border-[#c084fc]/30"
            >
              
              {/* 3D Reflection Overlay Engine Logic */}
              <div className="absolute shadow-[0_0_50px_rgba(0,0,0,0.8)_inset] inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(192,132,252,0.12)_0%,transparent_50%)]" />
              
              <div className="flex justify-between items-start font-mono text-[10px] text-neutral-500">
                <span>THE CENTRAL GRID // QUARTERLY</span>
                <span>VOL_I</span>
              </div>
              <div className="text-center my-auto space-y-2">
                <span className="block font-mono text-[11px] tracking-widest text-[#c084fc] animate-pulse">// IMPRINT</span>
                <h2 className="text-white font-sans font-extrabold text-[42px] tracking-tighter leading-none">ISSUE_01</h2>
              </div>
              <div className="font-mono text-[10px] text-neutral-500 space-y-1 text-left">
                <div className="text-neutral-300">THEME: LOCAL INFRASTRUCTURE RUNTIMES</div>
                <div>SYSTEM_LOG: CG_001_INFERENCE</div>
              </div>
            </div>
          </div>

          {/* Right Side: Content Overview & Payload Access (8 Columns) */}
          <div className="lg:col-span-8 text-left space-y-6 flex flex-col justify-center">
            <div className="space-y-3">
              <span className="font-mono text-[10px] text-[#c084fc] uppercase tracking-widest block block">// GUILD_PUBLICATION_SPEC</span>
              <h2 className="text-[28px] md:text-[34px] font-bold tracking-[-0.04em] text-white uppercase font-sans leading-tight">
                THE CENTRAL GRID OPEN INFRASTRUCTURE LEDGER.
              </h2>
            </div>
            
            <p className="text-[15px] leading-relaxed text-[#9ca3af] font-light max-w-2xl font-sans select-text">
              Our inaugural engineering journal. Issue 01 delivers un-diluted technical payload documentation dissecting local VRAM footprints, zero-shot speech synthesis optimizations, and edge routing parameters across regional mesh layers.
            </p>

            {/* Aligned Access Form with explicit top margin cushion */}
            <div className="w-full max-w-lg mt-6">
              {!magSubmitted ? (
                <form onSubmit={handleMagazineSubmit} className="flex flex-col sm:flex-row items-stretch gap-3 w-full relative">
                  <div className="flex-1 relative flex flex-col">
                    <input 
                      id="mag-email-input"
                      type="email" 
                      required
                      placeholder="name@domain.com"
                      value={magEmail}
                      onChange={(e) => {
                        setMagEmail(e.target.value);
                        if (magError) setMagError("");
                      }}
                      className={`h-11 bg-[#110c1e] border ${magError ? "border-red-500/50" : "border-white/5"} rounded px-4 text-[13px] text-white placeholder-neutral-700 focus:outline-none focus:border-[#c084fc] font-mono transition-colors w-full`}
                    />
                    {magError && (
                      <span className="absolute left-1 top-full mt-1.5 font-mono text-[9px] text-red-400 tracking-wider z-20">
                        {magError}
                      </span>
                    )}
                  </div>
                  <button 
                    id="mag-submit-button"
                    type="submit" 
                    className="h-11 bg-black border border-[#120e1e] hover:border-[#c084fc]/50 hover:bg-[#120e1e] text-[#c084fc] hover:text-white font-mono font-medium px-6 rounded text-[11px] tracking-widest uppercase transition-all duration-200 cursor-pointer whitespace-nowrap"
                  >
                    DOWNLOAD PRODUCTION LEDGER // FREE
                  </button>
                </form>
              ) : (
                <div id="mag-success-layer" className="bg-[#110c1e]/50 border border-[#22c55e]/25 rounded p-4 flex items-center gap-4 text-left font-mono select-text">
                  <div className="text-[#22c55e] animate-pulse text-xs">●</div>
                  <div className="space-y-1">
                    <span className="block text-[11px] font-bold text-white uppercase tracking-widest">ACCESS TOKEN GENERATED</span>
                    <a 
                      href="https://github.com/adityaarchsystems/The-Central-Grid/archive/refs/heads/main.zip" 
                      className="block text-[10px] text-[#c084fc] underline hover:text-white uppercase tracking-wider"
                    >
                      DOWNLOAD_OPEN_INFRASTRUCTURE_LEDGER.ZIP
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        <section 
          id="tier-4-public-vetting"
          className="space-y-8 text-left font-sans select-none"
        >
          <div className="border-b border-white/5 pb-4">
            <span className="font-mono text-[10px] text-[#c084fc] uppercase tracking-widest block">// TIER 4 // PUBLIC_VETTING_PROTOCOL</span>
            <h2 className="text-[22px] font-bold text-white uppercase tracking-tight mt-1">
              AUTOMATED CODE QUALITY & INTENT ANALYSIS FILTER
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Vetting Criteria Detail */}
            <div className="lg:col-span-7 space-y-6 font-mono text-[12px] text-neutral-400">
              <div className="space-y-4">
                <div className="bg-[#0b0714] border-l-2 border-white/5 p-6 rounded-r-xl transition-all duration-300 ease-out hover:bg-purple-950/10 hover:border-[#c084fc]/40 hover:shadow-[0_0_25px_rgba(192,132,252,0.02)] cursor-pointer space-y-3">
                  <div className="flex items-center gap-2 text-white font-bold text-[13px] uppercase">
                    <span className="text-[#c084fc]">●</span> 01 / GITHUB_COMMIT_DENSITY_EVAL
                  </div>
                  <p className="font-sans font-light leading-relaxed">
                    Evaluates repository contribution velocities over a rolling 365-day block interval window. Surface-level logs, superficial formatting commits, and shallow repository forks are automatically flagged and scrubbed.
                  </p>
                  <div className="text-[11px] text-[#4b5563] uppercase tracking-wider">
                    CONSTRAINT_THRESHOLD: &gt;= 350 VALIDATED COMMIT EVENTS / YEAR
                  </div>
                </div>

                <div className="bg-[#0b0714] border-l-2 border-white/5 p-6 rounded-r-xl transition-all duration-300 ease-out hover:bg-purple-950/10 hover:border-[#c084fc]/40 hover:shadow-[0_0_25px_rgba(192,132,252,0.02)] cursor-pointer space-y-3">
                  <div className="flex items-center gap-2 text-white font-bold text-[13px] uppercase">
                    <span className="text-[#c084fc]">●</span> 02 / STRUCTURE_COMPLEXITY_METRICS
                  </div>
                  <p className="font-sans font-light leading-relaxed">
                    Runs mathematical parser audits detecting complex architectural implementations—such as localized memory fine-tune tracking layers, zero-overhead client rendering hooks, and edge deployment runtimes.
                  </p>
                  <div className="text-[11px] text-[#4b5563] uppercase tracking-wider">
                    PARSER_INTEGRITY_FLOOR: LEVEL_4 PRODUCTION COMPILE STANDARD
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Raw Lint Parser Failure Mock Terminal Block */}
            <div className="lg:col-span-5 bg-black/80 border border-white/5 rounded-lg p-5 font-mono text-[11px] leading-relaxed text-neutral-300 shadow-2xl relative select-text h-[260px] flex flex-col justify-start">
              <div className="flex justify-between items-center text-[10px] text-neutral-500 uppercase tracking-widest border-b border-white/5 pb-2 mb-3 select-none">
                <span>[ TELEMETRY_GATEKEEPER // FAIL_TRACE ]</span>
                <span className="text-[#c084fc] animate-pulse">LINT_REJECTED</span>
              </div>
              <div className="flex-1 space-y-1.5 overflow-y-auto">
                <div className="text-red-400">[ERROR] Ingress telemetry analysis initialized for peer node...</div>
                <div className="text-[#4b5563]">Evaluating repository commit depth footprint...</div>
                <div className="text-[#4b5563]">Scanning module dependency files... DONE</div>
                <div className="text-red-400">[LINT_FAIL]: Detected direct copy-paste boilerplate footprint.</div>
                <div className="text-neutral-500">  └─ File: src/components/standard-saas-card.tsx</div>
                <div className="text-neutral-500">  └─ Pattern Match: Vercel template clone v1.0.4 [98% overlap]</div>
                <div className="text-red-400">[SYSTEM_ABORT]: Software complexity score fell below minimum system floor.</div>
                <div className="text-red-400 font-bold uppercase animate-pulse">[SECURE_HANDSHAKE_SEVERED]</div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== TIER 5: // LOOKBOOK_MANIFEST_REGISTRY ==================== */}
        <section 
          id="tier-5-lookbook-registry"
          className="space-y-8 text-left select-none"
        >
          <div className="border-b border-white/5 pb-4">
            <span className="font-mono text-[10px] text-[#c084fc] uppercase tracking-widest block">// TIER 5 // LOOKBOOK_MANIFEST_REGISTRY</span>
            <h2 className="text-[22px] font-bold text-white uppercase tracking-tight mt-1">
              ARCHIVAL TECHNICAL SPECIFICATION REFERENCES
            </h2>
          </div>

          <div className="border border-white/5 rounded-lg bg-[#0b0714]/25 overflow-x-auto">
            <table className="w-full text-left font-mono text-[12px] border-collapse min-w-[700px] select-text">
              <thead className="border-b border-white/5 text-neutral-500 bg-black/40">
                <tr className="uppercase">
                  <th className="text-[#4b5563] font-mono text-[10px] uppercase tracking-widest text-left pb-3 border-b border-[#120e1e] px-6">SPEC_CODE</th>
                  <th className="text-[#4b5563] font-mono text-[10px] uppercase tracking-widest text-left pb-3 border-b border-[#120e1e] px-6">TECHNICAL_SPECIFICATION_MANIFEST</th>
                  <th className="text-[#4b5563] font-mono text-[10px] uppercase tracking-widest text-right pb-3 border-b border-[#120e1e] px-6">CORE_VECTOR_CHANNEL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-400 font-mono text-[12px]">
                <tr className="hover:bg-white/[0.01] transition-colors">
                  <td className="py-4 px-6 text-left text-white font-bold select-text">[ SPEC_01 ]</td>
                  <td className="py-4 px-6 text-left font-medium select-text">LOCAL_VRAM_FOOTPRINT_MINIMIZATION // UNDER_VOLTAGE_CONSTRICTION</td>
                  <td className="py-4 px-6 text-right text-[#c084fc] select-text">#AI_CORE_OPTIMIZATION</td>
                </tr>
                <tr className="hover:bg-white/[0.01] transition-colors">
                  <td className="py-4 px-6 text-left text-white font-bold select-text">[ SPEC_02 ]</td>
                  <td className="py-4 px-6 text-left font-medium select-text">DISTRIBUTED_INFERENCE_CONSTRAINTS // CG_METRO_CORRIDOR</td>
                  <td className="py-4 px-6 text-right text-[#c084fc] select-text">#EDGE_ROUTING</td>
                </tr>
                <tr className="hover:bg-white/[0.01] transition-colors">
                  <td className="py-4 px-6 text-left text-white font-bold select-text">[ SPEC_03 ]</td>
                  <td className="py-4 px-6 text-left font-medium select-text">ZERO-SHOT_SPEECH_SYNTHESIS_LAYERS // MLX_GRAPH_RUNTIME</td>
                  <td className="py-4 px-6 text-right text-[#c084fc] select-text">#LOCAL_INFERENCE</td>
                </tr>
                <tr className="hover:bg-white/[0.01] transition-colors">
                  <td className="py-4 px-6 text-left text-white font-bold select-text">[ SPEC_04 ]</td>
                  <td className="py-4 px-6 text-left font-medium select-text">ZERO-TRUST_PEER-TO-PEER_TUNNELING // WIREGUARD_EDGE_ROUTING</td>
                  <td className="py-4 px-6 text-right text-[#c084fc] select-text">#EDGE_ROUTING</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ==================== TIER 6: // CONSOLE_EXCEPTIONS_LEDGER ==================== */}
        <section 
          id="tier-6-exceptions-ledger"
          className="border-t border-[#120e1e] pt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 text-left pb-16"
        >
          {/* Left Column: EXCEPTION_01 */}
          <div className="space-y-4 font-mono text-[12px] select-text">
            <div className="border-b border-white/5 pb-2 select-none">
              <span className="text-[#c084fc] font-bold block uppercase tracking-widest">// CONSOLE_EXCEPTIONS_LEDGER // ERR_01</span>
              <h3 className="text-[15px] font-sans font-bold text-white uppercase mt-0.5">
                EXCEPTION_01 // PHYSICAL_CORRIDOR_LIMITATION
              </h3>
            </div>
            <div className="bg-[#0b0714]/40 border border-[#120e1e] p-5 rounded-lg space-y-3">
              <div className="text-[10px] text-red-400 font-bold uppercase tracking-wider">
                [ ERROR_TRACE_LOG // INGRESS_GEOGRAPHIC_LOCK ]
              </div>
              <p className="text-neutral-300 font-sans font-light leading-relaxed select-text">
                &quot;I am not based in the physical regional corridor (Raipur-Bhilai-Durg). Can I still secure membership?&quot;
              </p>
              <div className="text-[#4b5563] text-[11px] leading-relaxed border-t border-white/5 pt-3 font-sans font-light">
                <strong>RESPONSE:</strong> Ingress tracking parameters are unyielding. Physical network presence across verified coordinate boundaries remains a non-negotiable compilation constraint. Non-regional identities will fail token validation checks.
              </div>
            </div>
          </div>

          {/* Right Column: EXCEPTION_02 */}
          <div className="space-y-4 font-mono text-[12px] select-text">
            <div className="border-b border-white/5 pb-2 select-none">
              <span className="text-[#22c55e] font-bold block uppercase tracking-widest">// CONSOLE_EXCEPTIONS_LEDGER // ERR_02</span>
              <h3 className="text-[15px] font-sans font-bold text-white uppercase mt-0.5">
                EXCEPTION_02 // SYSTEM_THRESHOLD_SPECIFICATIONS
              </h3>
            </div>
            <div className="bg-[#0b0714]/40 border border-[#120e1e] p-5 rounded-lg space-y-3">
              <div className="text-[10px] text-red-400 font-bold uppercase tracking-wider">
                [ ERROR_TRACE_LOG // TELEMETRY_CONSTRAINT_FAIL ]
              </div>
              <p className="text-neutral-300 font-sans font-light leading-relaxed select-text">
                &quot;What is the performance score threshold, and how long does capability verification compile?&quot;
              </p>
              <div className="text-[#4b5563] text-[11px] leading-relaxed border-t border-white/5 pt-3 font-sans font-light">
                <strong>RESPONSE:</strong> The Automated Gatekeeper analyzes code complexity and 365-day commit density. Verification takes up to 48 hours to complete. If complexity drops below the Level_4 threshold or matches standard copy-paste templates, your insecure endpoints are instantly dropped, and no further handshake signals will be broadcasted to your endpoints.
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
