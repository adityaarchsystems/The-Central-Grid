"use client";

import React, { useState, useEffect, useRef } from "react";

interface AuditEntry {
  ingressId: string;
  targetVector: string;
  githubFootprintStatus: "VERIFIED" | "PENDING" | "COMPILING" | "FLAGGED";
  commitFrequency: string;
  auditStatus: "CLEAR" | "WAITING" | "ERROR";
}

export default function CapabilityAuditPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const isTerminalHovered = useRef(false);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const [entries, setEntries] = useState<AuditEntry[]>([]);

  // Initial terminal simulation strings
  const initialLogs = [
    "[AUDIT]: Starting capability verification loop...",
    "[AUDIT]: Accessing local network corridor gateways...",
    "[AUDIT]: Initializing git-footprint telemetry pipeline...",
    "[AUDIT]: Connecting to regional API endpoints... SECURE",
    "[AUDIT]: Parsing structural repo patterns... CLEAR",
  ];

  // Simulated log streamer
  useEffect(() => {
    setIsMounted(true);

    // Pull saved system profile context tokens
    let session = {
      username: "guest_builder",
      email: "guest@centralgrid.com",
      vector: "fullstack"
    };

    const stored = typeof window !== "undefined" ? sessionStorage.getItem("tcg_session_manifest") : null;
    if (stored) {
      try {
        session = JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse tcg_session_manifest:", e);
      }
    }

    const vectorLabelMap: Record<string, string> = {
      fullstack: "Full Stack Optimization",
      frontend: "UI/UX Systems & Frontend",
      ai: "AI Core & Local Inference",
      devops: "DevOps & Edge Architecture"
    };
    
    const userVectorLabel = vectorLabelMap[session.vector] || "Full Stack Optimization";

    const userRow: AuditEntry = {
      ingressId: `ING_${session.username.toUpperCase()}`,
      targetVector: userVectorLabel,
      githubFootprintStatus: "VERIFIED",
      commitFrequency: "LIVE_TIMELINE_ACTIVE",
      auditStatus: "CLEAR"
    };

    const initialEntries: AuditEntry[] = [
      userRow,
      { ingressId: "INGRESS_NODE_1204", targetVector: "UI/UX Systems & Frontend", githubFootprintStatus: "VERIFIED", commitFrequency: "912 commits/yr", auditStatus: "CLEAR" },
      { ingressId: "INGRESS_NODE_8921", targetVector: "DevOps & Edge Architecture", githubFootprintStatus: "COMPILING", commitFrequency: "320 commits/yr", auditStatus: "WAITING" },
      { ingressId: "INGRESS_NODE_0953", targetVector: "Full Stack Optimization", githubFootprintStatus: "VERIFIED", commitFrequency: "740 commits/yr", auditStatus: "CLEAR" },
      { ingressId: "INGRESS_NODE_3412", targetVector: "AI Core & Local Inference", githubFootprintStatus: "PENDING", commitFrequency: "115 commits/yr", auditStatus: "WAITING" },
      { ingressId: "INGRESS_NODE_6721", targetVector: "DevOps & Edge Architecture", githubFootprintStatus: "FLAGGED", commitFrequency: "12 commits/yr", auditStatus: "ERROR" },
    ];
    setEntries(initialEntries);

    const streamLogs = [
      `[AUDIT]: Starting capability verification loop for ${session.username}...`,
      `[AUDIT]: Accessing local network corridor gateways...`,
      `[AUDIT]: Initializing git-footprint telemetry pipeline for ${session.email}...`,
      `[AUDIT]: Connecting to regional API endpoints... SECURE`,
      `[AUDIT]: Parsing structural repo patterns for ${session.vector.toUpperCase()}... CLEAR`,
    ];
    setTerminalLogs(streamLogs);

    // Stream additions
    const streamItems = [
      `[AUDIT]: User session detected for ${session.email.toUpperCase()}...`,
      `[COMPILE_TEST]: Testing local PyTorch hardware acceleration... ACTIVE`,
      `[COMPILE_TEST]: VRAM allocation footprint checks... 16GB AVAILABLE`,
      `[AUDIT]: Evaluating Ingress ID ING_${session.username.toUpperCase()} github footprint...`,
      `[AUDIT]: Computing delta commit patterns... STABLE`,
      `[AUDIT]: Parsing structural repo patterns... CLEAR`,
      `[COMPILE_TEST]: Edge mesh latency handshake with Raipur-Hub-01... 4.8ms`,
      `[AUDIT]: Compiling node dependency matrix... ZERO VULNERABILITIES`,
      `[AUDIT]: Handshake status for ING_${session.username.toUpperCase()}... APPROVED`,
      `[AUDIT]: Waiting for next telemetry ingress sequence...`,
    ];

    let count = 0;
    const interval = setInterval(() => {
      if (count < streamItems.length) {
        setTerminalLogs((prev) => [...prev, streamItems[count]]);
        count++;
      } else {
        count = 0; // Loop logs
        setTerminalLogs(streamLogs);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom of terminal only when user is hovered on the terminal
  useEffect(() => {
    if (isTerminalHovered.current && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLogs]);


  if (!isMounted) return <div className="min-h-screen bg-[#06030a]" />;

  return (
    <div className="space-y-10 text-left animate-fadeIn">
      {/* HEADER SECTION */}
      <div className="border-b border-white/5 pb-4">
        <span className="font-mono text-[10px] text-[#c084fc] uppercase tracking-widest block block">// SUBSPACE_NODE_01 // SECURE_INTAKE</span>
        <h1 className="text-[28px] md:text-[34px] font-bold tracking-[-0.04em] text-white uppercase font-sans mt-1">
          CAPABILITY AUDIT WORKSPACE
        </h1>
        <p className="text-[14px] text-neutral-400 font-light mt-1 font-sans">
          Logs incoming validation pipelines and measures repository commit footprints across local corridor segments.
        </p>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-[11px] select-none">
        <div className="border border-white/5 rounded-lg p-6 bg-[#0b0714]/20 space-y-1">
          <span className="text-[#4b5563] block uppercase tracking-wider">TOTAL INGRESS NODES</span>
          <span className="text-white font-medium text-[16px] block">
            42_ACTIVE_NODES
          </span>
        </div>
        <div className="border border-white/5 rounded-lg p-6 bg-[#0b0714]/20 space-y-1">
          <span className="text-[#4b5563] block uppercase tracking-wider">VETTING PASS RATIO</span>
          <span className="text-[#22c55e] font-medium text-[16px] block">
            18.4%_PASS_RATIO
          </span>
        </div>
        <div className="border border-white/5 rounded-lg p-6 bg-[#0b0714]/20 space-y-1">
          <span className="text-[#4b5563] block uppercase tracking-wider">SYSTEM LOAD RATE</span>
          <span className="text-[#c084fc] font-medium text-[16px] block">
            ZERO_INGRESS_QUEUE
          </span>
        </div>
      </div>

      {/* DENSE HIGH-DENSITY LEDGER TABLE */}
      <div className="space-y-4">
        <div className="flex justify-between items-center select-none">
          <h3 className="font-mono text-[12px] uppercase tracking-wider text-neutral-400">
            // INGRESS_VALIDATION_LEDGER
          </h3>
        </div>

        <div className="border border-white/5 rounded-lg bg-[#0b0714]/25 overflow-x-auto">
          <table className="w-full text-left font-mono text-[12px] border-collapse min-w-[700px] select-text">
            <thead className="border-b border-white/5 text-neutral-500 bg-black/40">
              <tr>
                <th className="py-3 px-6 text-left font-mono text-[11px] tracking-wider uppercase font-semibold">INGRESS_ID</th>
                <th className="py-3 px-6 text-left font-mono text-[11px] tracking-wider uppercase font-semibold">TARGET_VECTOR</th>
                <th className="py-3 px-6 text-left font-mono text-[11px] tracking-wider uppercase font-semibold">GITHUB_FOOTPRINT_STATUS</th>
                <th className="py-3 px-6 text-left font-mono text-[11px] tracking-wider uppercase font-semibold">COMMIT_FREQUENCY</th>
                <th className="py-3 px-6 text-right font-mono text-[11px] tracking-wider uppercase font-semibold">AUDIT_STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-neutral-400">
              {entries.map((entry, index) => (
                <tr key={index} className="hover:bg-white/[0.02] transition-colors duration-150">
                  <td className="py-4 px-6 text-left text-white font-medium">{entry.ingressId}</td>
                  <td className="py-4 px-6 text-left">{entry.targetVector}</td>
                  <td className="py-4 px-6 text-left">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] uppercase font-mono ${
                      entry.githubFootprintStatus === "VERIFIED" 
                        ? "bg-emerald-950/20 border border-emerald-500/20 text-[#22c55e]" 
                        : entry.githubFootprintStatus === "COMPILING"
                        ? "bg-purple-950/20 border border-purple-500/20 text-[#c084fc] animate-pulse"
                        : entry.githubFootprintStatus === "FLAGGED"
                        ? "bg-red-950/20 border border-red-500/20 text-red-400"
                        : "bg-neutral-900 border border-neutral-700 text-neutral-400"
                    }`}>
                      <span className={`w-1 h-1 rounded-full ${
                        entry.githubFootprintStatus === "VERIFIED" ? "bg-[#22c55e]" : entry.githubFootprintStatus === "FLAGGED" ? "bg-red-400" : "bg-[#c084fc] animate-pulse"
                      }`} />
                      {entry.githubFootprintStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-left text-[11px] text-neutral-500">{entry.commitFrequency}</td>
                  <td className="py-4 px-6 text-right">
                    {entry.auditStatus === "CLEAR" ? (
                      <span className="text-[#22c55e] font-bold inline-flex items-center gap-1.5 justify-end">
                        <span>CLEAR</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                        <span className="text-[10px] tracking-widest text-[#22c55e] opacity-80 animate-pulse font-mono">[ OK // SECURE ]</span>
                      </span>
                    ) : entry.auditStatus === "WAITING" ? (
                      <span className="text-[#c084fc] font-bold inline-flex items-center justify-end">
                        <span>WAITING</span>
                        <span className="inline-block min-w-[12px] text-left ml-0.5">{dots}</span>
                      </span>
                    ) : (
                      <span className="text-red-400 font-bold">
                        {entry.auditStatus}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DYNAMIC COMPILATION TERMINAL WINDOW */}
      <div className="border-t border-[#120e1e] pt-6 mt-8 w-full block">
        <h3 className="font-mono text-[12px] uppercase tracking-wider text-neutral-400 flex items-center gap-2 select-none">
          <span className="w-1.5 h-1.5 bg-[#c084fc] rounded-full animate-pulse" />
          // TERMINAL_VALIDATION_COMPILER_STREAM
        </h3>
        
        <div 
          onMouseEnter={() => { isTerminalHovered.current = true; }}
          onMouseLeave={() => { isTerminalHovered.current = false; }}
          className="bg-black/80 border border-white/5 rounded-lg p-6 font-mono text-[11.5px] leading-relaxed text-neutral-300 shadow-2xl relative select-text h-[250px] overflow-y-auto flex flex-col justify-start"
        >
          <div className="absolute top-2 right-4 text-[9px] text-neutral-600 uppercase tracking-widest pointer-events-none select-none">
            STREAMING_ACTIVE // COMPILER_STALL_LEVEL_0
          </div>
          
          <div className="flex-1 space-y-1 bg-transparent pr-2">
            {terminalLogs.map((log, idx) => {
              let colorClass = "text-neutral-400";
              if (log.includes("CLEAR") || log.includes("SECURE") || log.includes("APPROVED")) {
                colorClass = "text-[#22c55e]";
              } else if (log.includes("COMPILE_TEST")) {
                colorClass = "text-neutral-300 font-medium";
              } else if (log.includes("USER_ACTION")) {
                colorClass = "text-[#c084fc] font-semibold";
              }
              return (
                <div key={idx} className={`${colorClass} whitespace-pre-wrap break-all`}>
                  {log}
                </div>
              );
            })}
            <div ref={terminalEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
