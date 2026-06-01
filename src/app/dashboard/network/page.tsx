"use client";

import React, { useState, useEffect } from "react";

interface ComputeNode {
  identifier: string;
  hardware: string;
  engine: string;
  baseSpeed: number;
  speedUnit: string;
  rank: string;
}

export default function ComputeNetworkPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [systemTime, setSystemTime] = useState("");
  const [nodes, setNodes] = useState<ComputeNode[]>([]);
  const [ollamaStatus, setOllamaStatus] = useState<"CONNECTING" | "CONNECTED" | "OFFLINE">("CONNECTING");
  const [ollamaModels, setOllamaModels] = useState<string[]>([]);

  // Client simulated latency / speed fluctuations
  useEffect(() => {
    setIsMounted(true);
    setSystemTime(new Date().toISOString().slice(0, 19).replace("T", " ") + " UTC");

    // Pull saved system profile context tokens
    let session = {
      username: "adityaarchsystems",
      email: "guest@centralgrid.com",
      vector: "fullstack"
    };

    const stored = typeof window !== "undefined" ? sessionStorage.getItem("tcg_session_manifest") : null;
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        session = {
          username: parsed.username || "adityaarchsystems",
          email: parsed.email || "guest@centralgrid.com",
          vector: parsed.vector || "fullstack"
        };
      } catch (e) {
        console.error("Failed to parse tcg_session_manifest:", e);
      }
    }

    // Map vector rank
    const rankMap: Record<string, string> = {
      fullstack: "STAGING_T1",
      frontend: "BUILDER_T2",
      ai: "CLUSTER_CORE",
      devops: "MATRIX_ARCH"
    };
    const userRank = rankMap[session.vector] || "STAGING_T1";
    const userSpeed = 225.8;

    const userNode: ComputeNode = {
      identifier: `NODE_${session.username.toUpperCase()}`,
      hardware: "RTX 5060 Ti 16GB",
      engine: `${session.vector}_optimized // dynamic`,
      baseSpeed: userSpeed,
      speedUnit: "tok/s",
      rank: userRank
    };

    const corridorLocations = ["RAIPUR", "BHILAI", "DURG", "BILASPUR", "KORBA", "BHUBANESWAR", "HYDERABAD"];
    const rigHardwareOptions = [
      "Dual RTX 4090 Ded.",
      "Dual H100 Ded.",
      "Dual A100 80GB",
      "Apple M3 Max 128GB",
      "RTX 4080 Super 16GB",
      "RTX 5090 Ti Prototype"
    ];
    const engines = [
      "llama_3.1_70b // q4_k_m",
      "gemma_2_27b // mlx_core",
      "llama_3.1_8b // vllm",
      "llama_3.1_405b // q8_0",
      "phi_3_medium // quantized",
      "mistral_nemo_12b // edge"
    ];
    const ranks = ["MATRIX_ARCH", "BUILDER_T2", "STAGING_T1", "CLUSTER_CORE", "CORE_ROUTER"];

    const backgroundNodes = Array.from({ length: 5 }).map((_, i) => {
      const location = corridorLocations[Math.floor(Math.random() * corridorLocations.length)];
      const num = Math.floor(Math.random() * 9 + 1);
      const hardware = rigHardwareOptions[Math.floor(Math.random() * rigHardwareOptions.length)];
      const engine = engines[Math.floor(Math.random() * engines.length)];
      const rank = ranks[Math.floor(Math.random() * ranks.length)];
      const baseSpeed = parseFloat((25 + Math.random() * 150).toFixed(1));

      return {
        identifier: `NODE_${location}_0${num}`,
        hardware,
        engine,
        baseSpeed,
        speedUnit: "tok/s",
        rank
      } as ComputeNode;
    });

    const uniqueBackgroundNodes: ComputeNode[] = [];
    const usedIds = new Set<string>();
    backgroundNodes.forEach(node => {
      if (!usedIds.has(node.identifier)) {
        usedIds.add(node.identifier);
        uniqueBackgroundNodes.push(node);
      }
    });
    while (uniqueBackgroundNodes.length < 4) {
      const location = corridorLocations[Math.floor(Math.random() * corridorLocations.length)];
      const num = Math.floor(Math.random() * 9 + 1);
      const id = `NODE_${location}_0${num}`;
      if (!usedIds.has(id)) {
        usedIds.add(id);
        uniqueBackgroundNodes.push({
          identifier: id,
          hardware: rigHardwareOptions[Math.floor(Math.random() * rigHardwareOptions.length)],
          engine: engines[Math.floor(Math.random() * engines.length)],
          baseSpeed: parseFloat((25 + Math.random() * 150).toFixed(1)),
          speedUnit: "tok/s",
          rank: ranks[Math.floor(Math.random() * ranks.length)]
        });
      }
    }

    const initialNodes: ComputeNode[] = [
      { 
        identifier: "MASTER_NODE_ALPHA", 
        hardware: "8x NVIDIA H100 SXM5 80GB // AMD EPYC 9654 96-Core", 
        engine: "f5-tts_flow_match // VBR", 
        baseSpeed: 4.0, 
        speedUnit: "x ACCEL", 
        rank: "INFRA_CORE" 
      },
      userNode,
      ...uniqueBackgroundNodes
    ];

    setNodes(initialNodes);

    const clockInterval = setInterval(() => {
      setSystemTime(new Date().toISOString().slice(0, 19).replace("T", " ") + " UTC");
    }, 1000);

    const speedInterval = setInterval(() => {
      setNodes((prevNodes) => {
        if (prevNodes.length === 0) return initialNodes;
        return prevNodes.map((node) => {
          const isUserNode = node.identifier === `NODE_${session.username.toUpperCase()}`;
          if (isUserNode) {
            // Fluctuate strictly between 225.4 and 226.3
            const delta = Math.random() * 0.9 - 0.45; // -0.45 to +0.45
            let nextSpeed = 225.8 + delta;
            if (nextSpeed < 225.4) nextSpeed = 225.4;
            if (nextSpeed > 226.3) nextSpeed = 226.3;
            return {
              ...node,
              baseSpeed: parseFloat(nextSpeed.toFixed(1))
            };
          } else if (node.identifier === "MASTER_NODE_ALPHA") {
            // Keep master node acceleration speed stable
            return node;
          } else {
            const variance = (Math.random() * 5 - 2.5) / 100;
            const nextSpeed = node.baseSpeed * (1 + variance);
            return {
              ...node,
              baseSpeed: parseFloat(nextSpeed.toFixed(1)),
            };
          }
        });
      });
    }, 6000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(speedInterval);
    };
  }, []);

  // Ollama Live Local Ingress Handshake Loop
  useEffect(() => {
    if (!isMounted) return;

    const checkOllama = async () => {
      try {
        const res = await fetch("http://127.0.0.1:11434/api/tags", {
          signal: AbortSignal.timeout(2000)
        });
        if (res.ok) {
          const data = await res.json();
          const names = (data.models || []).map((m: any) => m.name);
          setOllamaModels(names);
          setOllamaStatus("CONNECTED");
          return;
        }
      } catch {
        try {
          const res2 = await fetch("http://120.0.0.1:11434/api/tags", {
            signal: AbortSignal.timeout(2000)
          });
          if (res2.ok) {
            const data2 = await res2.json();
            const names2 = (data2.models || []).map((m: any) => m.name);
            setOllamaModels(names2);
            setOllamaStatus("CONNECTED");
            return;
          }
        } catch {
          // both loops failed
        }
      }
      setOllamaStatus("OFFLINE");
    };

    checkOllama();
    const intervalId = setInterval(checkOllama, 10000);
    return () => clearInterval(intervalId);
  }, [isMounted]);

  // Update compute node engines dynamically if Ollama is connected
  useEffect(() => {
    if (nodes.length === 0) return;
    setNodes((prevNodes) =>
      prevNodes.map((node, i) => {
        if (node.identifier === "MASTER_NODE_ALPHA") return node;

        if (ollamaStatus === "CONNECTED" && ollamaModels.length > 0) {
          const modelIndex = i % ollamaModels.length;
          return {
            ...node,
            engine: `ollama: ${ollamaModels[modelIndex]} // local_handshake`
          };
        }
        return node;
      })
    );
  }, [ollamaStatus, ollamaModels]);

  if (!isMounted) return <div className="min-h-screen bg-[#06030a]" />;

  return (
    <div className="space-y-10 text-left animate-fadeIn">
      {/* HEADER SECTION */}
      <div className="border-b border-white/5 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="font-mono text-[10px] text-[#c084fc] uppercase tracking-widest block block">// SUBSPACE_NODE_03 // COMPUTING_GRID</span>
          <h1 className="text-[28px] md:text-[34px] font-bold tracking-[-0.04em] text-white uppercase font-sans mt-1">
            TELEMETRY & QUERY SANDBOX
          </h1>
          <p className="text-[14px] text-neutral-400 font-light mt-1 font-sans">
            Unified command node dashboard tracking hardware cluster metrics and secure developer handshakes.
          </p>
        </div>
        <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest bg-[#0b0714] border border-white/5 px-4 py-2 rounded" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          SYSTEM_TIME: <span className="text-white select-text uppercase">{systemTime}</span>
        </div>
      </div>

      {/* UPPER GRID COMPONENT: HIGH-DENSITY NODES TABLE (TREMOR STYLE) */}
      <div className="space-y-4">
        <h3 className="font-mono text-[12px] uppercase tracking-wider text-neutral-400 select-none">
          // COMPUTE_CLUSTER_HARDWARE_INDEX
        </h3>

        {ollamaStatus === "OFFLINE" && (
          <div className="border border-red-500/20 bg-red-950/5 rounded-lg p-5 font-mono text-[11px] text-red-400 select-text flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>LOCAL_ENGINE_OFFLINE // CONNECT TO OLLAMA PORT 11434 TO POPULATE MODULE MATRIX</span>
            </div>
            <span className="text-neutral-600 uppercase tracking-widest text-[9px] font-mono">[ POLL_FAIL // PORT_11434 ]</span>
          </div>
        )}
        
        <div className="border border-white/5 rounded-lg bg-[#0b0714]/25 overflow-x-auto select-text">
          <table className="w-full text-left font-mono text-[12px] border-collapse min-w-[700px]">
            <thead className="border-b border-white/5 text-neutral-500 bg-black/40">
              <tr>
                <th className="py-3 px-6 text-left font-mono text-[11px] tracking-wider uppercase font-semibold">NODE_IDENTIFIER</th>
                <th className="py-3 px-6 text-left font-mono text-[11px] tracking-wider uppercase font-semibold">RIG_HARDWARE</th>
                <th className="py-3 px-6 text-left font-mono text-[11px] tracking-wider uppercase font-semibold">LOCAL_INFERENCE_ENGINE</th>
                <th className="py-3 px-6 text-right font-mono text-[11px] tracking-wider uppercase font-semibold">LATENCY_STATUS</th>
                <th className="py-3 px-6 text-right font-mono text-[11px] tracking-wider uppercase font-semibold">GUILD_RANK</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-neutral-400 font-mono text-[12px]">
              {nodes.map((node, index) => {
                const isRunning = index % 3 !== 2;
                return (
                  <tr key={index} className="hover:bg-white/[0.02] transition-colors duration-150">
                    <td className="py-4 px-6 text-left text-white font-medium">{node.identifier}</td>
                    <td className="py-4 px-6 text-left">{node.hardware}</td>
                    <td className="py-4 px-6 text-left text-[11.5px] text-neutral-300">{node.engine}</td>
                    <td className="py-4 px-6 text-right">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] uppercase font-mono ${
                        isRunning 
                          ? "bg-emerald-950/20 border border-emerald-500/20 text-[#22c55e]" 
                          : "bg-purple-950/20 border border-purple-500/20 text-[#c084fc] animate-pulse"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isRunning ? "bg-[#22c55e]" : "bg-[#c084fc] animate-ping"
                        }`} />
                        {node.baseSpeed} {node.speedUnit} // {isRunning ? "RUNNING" : "ROUTING"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right text-[#4b5563] uppercase">{node.rank}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* LOWER Q&A SPLIT CONSOLE: THE QUERY SANDBOX */}
      <div 
        id="query-sandbox-split"
        className="border-t border-[#120e1e] pt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 text-left"
      >
        {/* Left Box: Unresolved user questions */}
        <section className="space-y-4 select-none">
          <div className="border-b border-white/5 pb-2">
            <h3 className="font-mono text-[12px] font-bold text-white uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc] animate-pulse" />
              UNRESOLVED SYSTEM PROMPTS
            </h3>
          </div>

          <div className="space-y-4">
            {/* Question 01 */}
            <div className="bg-[#0b0714]/40 border border-[#120e1e] p-5 rounded-lg space-y-3 font-mono text-[12px] select-text">
              <div className="flex justify-between items-center text-[10px] text-[#4b5563] uppercase tracking-wider border-b border-white/5 pb-2">
                <span>[ QUERY_REF // OPEN_HANDSHAKE #Q-18 ]</span>
                <span className="text-[#c084fc] animate-pulse">● COMPILING_ANSWERS</span>
              </div>
              <p className="text-neutral-300 font-sans leading-relaxed">
                &quot;Does anyone have a working local vllm edge routing configuration script for Llama-3.1-8B?&quot;
              </p>
              <div className="flex justify-between items-center pt-2 text-[9px] text-[#4b5563]">
                <span>NODE: DURG_DISTRICT</span>
                <span className="text-[#c084fc] font-bold uppercase">[ TELEMETRY: PENDING_SWARM ]</span>
              </div>
            </div>

            {/* Question 02 */}
            <div className="bg-[#0b0714]/40 border border-[#120e1e] p-5 rounded-lg space-y-3 font-mono text-[12px] select-text">
              <div className="flex justify-between items-center text-[10px] text-[#4b5563] uppercase tracking-wider border-b border-white/5 pb-2">
                <span>[ QUERY_REF // OPEN_HANDSHAKE #Q-19 ]</span>
                <span className="text-[#c084fc] animate-pulse">● DISPATCHING_TO_SWARM</span>
              </div>
              <p className="text-neutral-300 font-sans leading-relaxed">
                &quot;What are the recommended quantizations for running Gemma-2-27B on Apple Silicon MLX without memory page leaks?&quot;
              </p>
              <div className="flex justify-between items-center pt-2 text-[9px] text-[#4b5563]">
                <span>NODE: RAIPUR_CLUSTER</span>
                <span className="text-[#c084fc] font-bold uppercase">[ TELEMETRY: COMPILING_CONTRIBS ]</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Box: Resolved problem entries */}
        <section className="space-y-4 select-none">
          <div className="border-b border-white/5 pb-2">
            <h3 className="font-mono text-[12px] font-bold text-white uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              VERIFIED RESOLUTIONS LEDGER
            </h3>
          </div>

          <div className="space-y-4">
            {/* Resolution 01 */}
            <div className="bg-[#0b0714]/60 border border-[#120e1e] hover:border-[#22c55e]/30 transition-colors p-5 rounded-lg space-y-3 font-mono text-[12px] select-text relative">
              <div className="flex justify-between items-center text-[10px] text-[#4b5563] uppercase tracking-wider border-b border-white/5 pb-2">
                <span>[ RESOLVED // PEER_VERIFIED #Q-14 ]</span>
                <span className="text-[#22c55e] font-semibold flex items-center gap-1.5">
                  [ PAYLOAD_CLEAR ]
                </span>
              </div>
              <p className="text-neutral-300 font-sans leading-relaxed">
                &quot;The RTX 4090 memory buffer leakage during continuous batch inferences is mitigated by forcing strict PyTorch CUDA cache clearing at step boundaries.&quot;
              </p>
              <div className="flex justify-between items-center pt-2 text-[9px]">
                <div className="text-neutral-500 uppercase tracking-widest">
                  SOLVER: <span className="text-[#c084fc]">ALPHA_NODE_01</span>
                </div>
                <div className="text-[#22c55e] font-bold tracking-wider">
                  [ +150 XP ]
                </div>
              </div>
            </div>

            {/* Resolution 02 */}
            <div className="bg-[#0b0714]/60 border border-[#120e1e] hover:border-[#22c55e]/30 transition-colors p-5 rounded-lg space-y-3 font-mono text-[12px] select-text relative">
              <div className="flex justify-between items-center text-[10px] text-[#4b5563] uppercase tracking-wider border-b border-white/5 pb-2">
                <span>[ RESOLVED // PEER_VERIFIED #Q-12 ]</span>
                <span className="text-[#22c55e] font-semibold flex items-center gap-1.5">
                  [ PAYLOAD_CLEAR ]
                </span>
              </div>
              <p className="text-neutral-300 font-sans leading-relaxed">
                &quot;The WireGuard network route drop-off along the Raipur corridor fiber nodes was resolved by raising peer keepalive intervals from 10s to 25s.&quot;
              </p>
              <div className="flex justify-between items-center pt-2 text-[9px]">
                <div className="text-neutral-500 uppercase tracking-widest">
                  SOLVER: <span className="text-[#c084fc]">BUILDER_NODE_04</span>
                </div>
                <div className="text-[#22c55e] font-bold tracking-wider">
                  [ +150 XP ]
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
