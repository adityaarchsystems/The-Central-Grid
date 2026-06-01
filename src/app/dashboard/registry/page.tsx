"use client";

import React, { useState, useEffect } from "react";

interface RegistryEntry {
  id: string;
  ref: string;
  title: string;
  category: string;
  date: string;
  description: string;
  tableData: {
    headers: string[];
    rows: string[][];
  };
  codePayload: string;
}

export default function CoreBuildRegistryPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedEntryId, setSelectedEntryId] = useState("042");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [entries, setEntries] = useState<RegistryEntry[]>([]);

  const baseEntries: RegistryEntry[] = [
    {
      id: "042",
      ref: "[ENTRY_REF: #042] // F5-TTS VBR",
      title: "F5-TTS FLOW-MATCHING SPEECH RUNTIME",
      category: "SPEECH_SYNTHESIS",
      date: "Q2 2026 // RELEASE",
      description: "Dissects local VRAM memory optimization layouts and flow-matching algorithms for zero-shot text-to-speech inference models. Provides optimized audio synthesis under Variable Bit Rate constraints.",
      tableData: {
        headers: ["PARAMETER", "OPTIMAL VALUE", "IMPACT STATUS"],
        rows: [
          ["Batch Size", "1 (Inference Only)", "Zero page memory overflow"],
          ["Quantization Type", "mlx_core fp16", "32% VRAM consumption cut"],
          ["Flow Matching Steps", "32 Steps VBR", "2.1x real-time latency accel"],
          ["Minimum VRAM", "6.2 GB", "Fully compatible with RTX 5060 Ti"]
        ]
      },
      codePayload: `import mlx.core as mx
from f5_tts import FlowMatchTTS

# Load specialized model mapping
model = FlowMatchTTS.from_pretrained("cg-f5-tts-v1")

# Configure hardware unified buffer allocations
mx.metal.set_cache_limit(2048 * 1024 * 1024)

# Execute accelerated voice projection
out, rate = model.synthesize(
    text="Private node handshake cleared.",
    voice_profile="raipur_anchor_node",
    vbr=True,
    steps=32
)

# Out sample is stored as direct float arrays
out.eval()`
    },
    {
      id: "068",
      ref: "[ENTRY_REF: #068] // LLAMA-3.1-8B",
      title: "VLLM EDGE INFERENCE SERVER SCHEMA",
      category: "LOCAL_INFERENCE",
      date: "Q3 2026 // RELEASE",
      description: "Low-latency API parameters configured strictly for distributed Llama 3.1 8B instances running across private corridor transit endpoints. Implements dynamic paging and key-value caching.",
      tableData: {
        headers: ["ENGINE CONST", "VALUE", "RATIONALE"],
        rows: [
          ["Max Model Len", "8192 context", "Isolates memory drift on nodes"],
          ["GPU Mem Util", "0.90 max allocation", "Leaves 10% for baseline sys processes"],
          ["KV Cache Config", "Block-based paging", "Eliminates token processing delays"],
          ["Throughput Target", "115 tok/s average", "Optimized via vLLM inference engine"]
        ]
      },
      codePayload: `# Launch vLLM local instance with sandboxed limits
python -m vllm.entrypoints.openai.api_server \\
  --model meta-llama/Llama-3.1-8B-Instruct \\
  --gpu-memory-utilization 0.90 \\
  --max-model-len 8192 \\
  --quantization awq \\
  --port 8000 \\
  --host 127.0.0.1`
    },
    {
      id: "091",
      ref: "[ENTRY_REF: #091] // GEMMA-2-27B",
      title: "GEMMA 2 MLX MEMORY TUNING SUITE",
      category: "MODEL_OPTIMIZATION",
      date: "Q4 2026 // RELEASE",
      description: "Tuning script to run 27B parameter models on M3 Max unified architectures without memory leakage or thread locks. Custom quantization allocations to reduce core thermal throttle cycles.",
      tableData: {
        headers: ["ALLOCATION METRIC", "VALUE", "STABILITY RATING"],
        rows: [
          ["Unified Memory Limit", "48 GB Allocated", "99.8% Stable Runtime"],
          ["Quantization Level", "q4_k_m GGUF/MLX", "High-Fidelity Retention"],
          ["Thermal Floor", "72C limit on M3", "Prevents cycle stepping down"],
          ["Token Throughput", "42 tok/s average", "Exceeds standard edge target"]
        ]
      },
      codePayload: `import mlx.optimizers as opt
from mlx.utils import tree_flatten
from gemma_mlx import GemmaModel

# Initialize 27B model architecture in unified VRAM
model = GemmaModel.from_pretrained("google/gemma-2-27b-it")

# Run precision quantization allocation pass
quantized_weights = tree_flatten(model.weights)
print(f"Total weights allocated in memory: {len(quantized_weights)}")

# Pin execution thread to M-series performance cores
model.to_device(device="gpu")`
    },
    {
      id: "115",
      ref: "[ENTRY_REF: #115] // WG_MESH_LATENCY",
      title: "WIREGUARD MESH CRYPTO MAPPING",
      category: "EDGE_ROUTING",
      date: "Q1 2026 // SPEC",
      description: "Asymmetric WireGuard transport layer mapping secure node handshakes directly. Outlines MTU optimizations and peer route tables ensuring absolute packet delivery under transit drop conditions.",
      tableData: {
        headers: ["ROUTING PARAMETER", "VALUE", "TUNING IMPACT"],
        rows: [
          ["MTU Constraint", "1420 bytes", "Prevents IP packet fragmentation"],
          ["Persistent Keepalive", "25 seconds", "Forces open route pathways"],
          ["Cipher Suite", "ChaCha20-Poly1305", "Low overhead cryptology processing"],
          ["Mean Hop Latency", "4.8ms transit corridor", "Guarantees low-latency telemetry"]
        ]
      },
      codePayload: `# peer configuration file inside /etc/wireguard/wg0.conf
[Interface]
PrivateKey = [SECURE_NODE_PRIVATE_KEY_TOKEN]
Address = 10.0.0.2/24
MTU = 1420

[Peer]
PublicKey = [CENTRAL_GRID_GATEWAY_KEY]
Endpoint = 157.45.19.102:51820
AllowedIPs = 10.0.0.0/24
PersistentKeepalive = 25`
    }
  ];

  useEffect(() => {
    setIsMounted(true);

    const nextOptimizeSpec: RegistryEntry = {
      id: "999",
      ref: "[ENTRY_REF: #999] // NEXT-OPTIMIZE",
      title: "NEXT.JS CORE CACHE & BUNDLE ARCHITECTURE",
      category: "FULLSTACK_OPTIMIZATION",
      date: "Q2 2026 // RELEASE",
      description: "Full-stack Next.js cache clearance passes, bundle sizing controls, and static compile architecture benchmarks designed for high-density gateway node routing environments.",
      tableData: {
        headers: ["OPTIMIZATION TARGET", "METRIC VALUE", "BENCHMARK STATUS"],
        rows: [
          ["Turbopack Build", "1.5s Cold Compile", "Zero route warnings"],
          ["Next Cache Clearance", "100% Cache Evacuated", "Clean Vercel Sync"],
          ["Bundle Weight", "48 KB JS Chunk Limit", "Exceeds budgets"],
          ["Static Page Yield", "8/8 Pre-rendered", "Verified runtime"]
        ]
      },
      codePayload: `# Force-clear server cache and run production build\nRemove-Item -Path ".next" -Force -Recurse -ErrorAction SilentlyContinue\nnpm run build\nvercel deploy --prod --yes`
    };

    const allSpecs = [nextOptimizeSpec, ...baseEntries];

    const stored = typeof window !== "undefined" ? sessionStorage.getItem("tcg_session_manifest") : null;
    if (stored) {
      try {
        const session = JSON.parse(stored);
        setIsAuthenticated(true);
        const vectorPriorityMap: Record<string, string> = {
          fullstack: "999",
          ai: "091",
          devops: "115",
          frontend: "042"
        };

        const targetPriorityId = vectorPriorityMap[session.vector] || "999";
        const prioritySpec = allSpecs.find(spec => spec.id === targetPriorityId);
        const otherSpecs = allSpecs.filter(spec => spec.id !== targetPriorityId);

        // Shuffle the background protocol release components dynamically
        const shuffledOthers = [...otherSpecs].sort(() => 0.5 - Math.random());
        
        // Vary their metadata dates programmatically to prevent pre-baked look
        const dynamicOthers = shuffledOthers.map((spec) => {
          const randomMinutes = Math.floor(Math.random() * 55 + 5);
          return {
            ...spec,
            date: spec.date.replace("RELEASE", `RELEASE // CH_${randomMinutes}m_AGO`)
          };
        });

        const dynamicEntries = prioritySpec ? [prioritySpec, ...dynamicOthers] : allSpecs;
        setEntries(dynamicEntries);
        setSelectedEntryId(targetPriorityId);
      } catch (e) {
        console.error("Failed to parse tcg_session_manifest:", e);
        setIsAuthenticated(false);
        setEntries(allSpecs);
        setSelectedEntryId("");
      }
    } else {
      // If no session exists, render as is without custom sorting, prevent auto-selection, disable sidebar click
      setIsAuthenticated(false);
      setEntries(allSpecs);
      setSelectedEntryId("");
    }
  }, []);

  const activeEntry = entries.find((e) => e.id === selectedEntryId) || entries[0] || baseEntries[0];

  if (!isMounted) return <div className="min-h-screen bg-[#06030a]" />;

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      <div className="sticky top-[68px] bg-[#06030a] z-20 pt-8 pb-4 border-b border-[#120e1e] mb-6 w-full block">
        <span className="font-mono text-[10px] text-[#c084fc] uppercase tracking-widest block">// SUBSPACE_NODE_02 // SYSTEM_BUILD_REGISTRY</span>
        <h1 className="text-[28px] md:text-[34px] font-bold tracking-[-0.04em] text-white uppercase font-sans mt-1">
          SPECIFICATION LOOKBOOK & DECENTRALIZED PROTOCOL FEED
        </h1>
        <p className="text-[14px] text-neutral-400 font-light mt-1 font-sans">
          Access high-fidelity engineering document arrays and execution payloads for local inference optimizations.
        </p>
      </div>

      {/* ASYMMETRIC 12-COLUMN VIEWPORT MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[600px] pt-4 select-none">
        
        {/* LEFT COLUMN: NAVIGATION INDEX (4 COLUMNS) */}
        <section className="lg:col-span-4 space-y-4">
          <div className="border-b border-white/5 pb-2">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
              // HISTORICAL_PROTOCOL_RELEASES
            </h3>
          </div>
          
          <div className="flex flex-col gap-3 font-mono text-[12px] pr-2">
            {entries.map((entry) => {
              const isSelected = entry.id === selectedEntryId;
              return (
                <div
                  key={entry.id}
                  onClick={() => {
                    if (isAuthenticated) {
                      setSelectedEntryId(entry.id);
                    }
                  }}
                  className={`w-full text-left border rounded-lg p-5 transition-all duration-200 ${
                    !isAuthenticated
                      ? "bg-[#0b0714]/10 border-white/5 opacity-40 cursor-not-allowed select-none"
                      : isSelected
                      ? "bg-[#1c122e]/40 border-[#c084fc]/50 shadow-[0_0_15px_rgba(192,132,252,0.05)] cursor-pointer"
                      : "bg-[#0b0714]/30 border-white/5 hover:border-white/20 hover:bg-[#0b0714]/50 cursor-pointer"
                  }`}
                >
                  <span className={`text-[10px] block mb-1 font-bold ${
                    !isAuthenticated ? "text-neutral-600" : isSelected ? "text-[#c084fc]" : "text-[#4b5563]"
                  }`}>
                    {entry.ref}
                  </span>
                  <h4 className={`font-bold font-sans uppercase tracking-tight text-[14px] leading-tight ${
                    !isAuthenticated ? "text-neutral-500" : "text-white"
                  }`}>
                    {entry.title}
                  </h4>
                  <div className="flex justify-between items-center mt-3 text-[9px] text-neutral-600 uppercase tracking-widest font-mono">
                    <span>{entry.category}</span>
                    <span>{entry.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* RIGHT COLUMN: DOCUMENT CANVAS FRAME (8 COLUMNS) */}
        {!isAuthenticated ? (
          <section className="lg:col-span-8 bg-[#0b0714]/10 border border-dashed border-white/5 rounded-xl p-12 flex flex-col justify-center items-center text-center space-y-4 select-none opacity-40">
            <svg className="w-12 h-12 text-neutral-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h3 className="font-mono text-[13px] font-bold text-[#c084fc] uppercase tracking-widest animate-pulse">
              AWAITING_INGRESS_MANIFEST // CORE BLUEPRINTS LOCKED
            </h3>
            <p className="text-[12px] text-neutral-500 font-sans max-w-sm leading-relaxed">
              Vetting integrity constraints are unyielding. Complete your speculative profile at the main terminal gate to provision secure lookbook decryption keys.
            </p>
          </section>
        ) : (
          <section className="lg:col-span-8 bg-[#0b0714]/20 border border-white/5 rounded-xl px-6 pb-6 md:px-8 md:pb-8 pt-0 flex flex-col justify-between space-y-6 select-text">
            
            <div className="space-y-4 mb-6 pb-4 border-b border-white/5 pt-8">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="font-mono text-[10px] text-[#c084fc] uppercase tracking-widest">
                  // ACTIVE_SPECIFICATION_HANDSHAKE
                </span>
                <span className="font-mono text-[10px] text-neutral-500 uppercase">
                  {activeEntry.date}
                </span>
              </div>

              <h2 className="text-[20px] md:text-[24px] font-bold text-white uppercase tracking-tight font-sans mt-2">
                {activeEntry.title}
              </h2>

              <p className="text-[13.5px] leading-relaxed text-neutral-400 font-light font-sans">
                {activeEntry.description}
              </p>
            </div>

            {/* Custom Markdown Table Frame */}
            <div className="space-y-2">
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">
                // TELEMETRY_CONSTRAINT_TABLE
              </span>
              <div className="border border-white/5 rounded overflow-x-auto">
                <table className="w-full text-left font-mono text-[11px] border-collapse bg-black/40 text-neutral-300 min-w-[400px]">
                  <thead>
                    <tr className="border-b border-white/5 text-neutral-500 bg-black/70">
                      {activeEntry.tableData.headers.map((h, i) => (
                        <th key={i} className="py-2.5 px-4 font-mono text-[10px] tracking-wider uppercase font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-neutral-400">
                    {activeEntry.tableData.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-white/[0.01] transition-colors">
                        {row.map((cell, cIdx) => {
                          let textClass = "";
                          if (cIdx === 1) textClass = "text-[#c084fc] font-semibold";
                          if (cIdx === 2 && (cell.includes("Stable") || cell.includes("Zero") || cell.includes("Optimized") || cell.includes("accel"))) {
                            textClass = "text-[#22c55e]";
                          }
                          return (
                            <td key={cIdx} className={`py-2 px-4 ${textClass}`}>{cell}</td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Code block window highlighting local MLX execution lines */}
            <div className="space-y-2 select-text">
              <span className="font-mono text-[9px] text-[#c084fc] uppercase tracking-widest block">
                // CODE_PAYLOAD_EXECUTION_MATRIX
              </span>
              <div className="bg-[#0a0613]/50 border border-[#120e1e] rounded-lg p-6 pb-8 font-mono text-[12px] text-neutral-400 overflow-x-auto whitespace-pre">
                {activeEntry.codePayload}
              </div>
            </div>

          </section>
        )}

      </div>
    </div>
  );
}
