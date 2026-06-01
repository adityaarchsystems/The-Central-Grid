"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

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

  // Category taxonomy accordion expand trackers & interactive category filters
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("ALL");

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
python -m vllm.entrypoints.openai.api_server \
  --model meta-llama/Llama-3.1-8B-Instruct \
  --gpu-memory-utilization 0.90 \
  --max-model-len 8192 \
  --quantization awq \
  --port 8000 \
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

  const getHighLevelCategory = (dbCategory: string): "CORE" | "LOCAL_INFERENCE" | "NETWORKING" | "WEB_EDGE" => {
    const cat = (dbCategory || "").toUpperCase();
    if (cat.includes("FULLSTACK") || cat.includes("CORE") || cat.includes("SPEECH") || cat.includes("SYNTHESIS")) {
      return "CORE";
    }
    if (cat.includes("INFERENCE") || cat.includes("MODEL") || cat.includes("OPTIMIZATION") || cat.includes("AI")) {
      return "LOCAL_INFERENCE";
    }
    if (cat.includes("ROUTING") || cat.includes("NETWORKING") || cat.includes("WIRE") || cat.includes("MESH")) {
      return "NETWORKING";
    }
    return "WEB_EDGE";
  };

  useEffect(() => {
    setIsMounted(true);

    const stored = typeof window !== "undefined" ? sessionStorage.getItem("tcg_session_manifest") : null;
    let vector = "fullstack";

    if (stored) {
      try {
        const session = JSON.parse(stored);
        setIsAuthenticated(true);
        vector = session.vector || "fullstack";
      } catch (e) {
        console.error("Failed to parse tcg_session_manifest:", e);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }

    // Default expanded categories mapping to parsed vetted vector manifest session storage
    const affinityCategoryMap: Record<string, string> = {
      fullstack: "CORE",
      ai: "LOCAL_INFERENCE",
      devops: "NETWORKING",
      frontend: "WEB_EDGE"
    };
    const defaultCategory = affinityCategoryMap[vector] || "CORE";
    setExpandedCategories({
      [defaultCategory]: true
    });

    const fetchLookbook = async () => {
      try {
        const { data, error } = await supabase
          .from("lookbook_specs")
          .select("*")
          .order("id", { ascending: true });

        if (error) {
          console.error("Database lookbook specs query error, using base entries fallback:", error);
          setEntries(baseEntries);
          const targetId = vector === "fullstack" ? "042" : vector === "ai" ? "068" : vector === "devops" ? "115" : "042";
          setSelectedEntryId(targetId);
          return;
        }

        if (data && data.length > 0) {
          const mapped: RegistryEntry[] = data.map((row) => {
            let desc = "";
            let tData = { headers: [], rows: [] };
            try {
              const meta = typeof row.metadata_json === "string" 
                ? JSON.parse(row.metadata_json) 
                : row.metadata_json;
              desc = meta?.description || "";
              tData = meta?.tableData || { headers: [], rows: [] };
            } catch (e) {
              console.error("Failed to parse metadata JSON:", e);
            }

            return {
              id: String(row.id),
              ref: row.entry_ref || `[ENTRY_REF: #${row.id}]`,
              title: row.title || "",
              category: row.category || "",
              date: new Date(row.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short"
              }) + " // RELEASE",
              description: desc,
              tableData: tData,
              codePayload: row.payload_matrix || ""
            };
          });

          // Set entry selection to first node or affinity match
          const affinitySpec = data.find(spec => spec.vector_affinity === vector);
          if (affinitySpec) {
            setSelectedEntryId(String(affinitySpec.id));
          } else if (mapped[0]) {
            setSelectedEntryId(mapped[0].id);
          }
          setEntries(mapped);
        } else {
          setEntries(baseEntries);
          const targetId = vector === "fullstack" ? "042" : vector === "ai" ? "068" : vector === "devops" ? "115" : "042";
          setSelectedEntryId(targetId);
        }
      } catch (e) {
        console.error("Database initialization failed, using static specs:", e);
        setEntries(baseEntries);
        const targetId = vector === "fullstack" ? "042" : vector === "ai" ? "068" : vector === "devops" ? "115" : "042";
        setSelectedEntryId(targetId);
      }
    };

    fetchLookbook();
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

          {/* Interactive Category Taxonomy Filters */}
          <div className="flex flex-wrap gap-1.5 pb-2 border-b border-white/5">
            <button
              onClick={() => setSelectedCategoryFilter("ALL")}
              className={`px-2.5 py-1 font-mono text-[9.5px] border transition-all uppercase rounded ${
                selectedCategoryFilter === "ALL"
                  ? "bg-[#c084fc]/15 border-[#c084fc]/30 text-[#c084fc]"
                  : "bg-transparent border-white/5 text-neutral-500 hover:text-neutral-300 hover:border-white/10"
              }`}
            >
              [ALL]
            </button>
            {(["CORE", "LOCAL_INFERENCE", "NETWORKING", "WEB_EDGE"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`px-2.5 py-1 font-mono text-[9.5px] border transition-all uppercase rounded ${
                  selectedCategoryFilter === cat
                    ? "bg-[#c084fc]/15 border-[#c084fc]/30 text-[#c084fc]"
                    : "bg-transparent border-white/5 text-neutral-500 hover:text-neutral-300 hover:border-white/10"
                }`}
              >
                [{cat.replace("_", " ")}]
              </button>
            ))}
          </div>
          
          <div className="space-y-3 font-mono text-[12px] pr-2">
            {(["CORE", "LOCAL_INFERENCE", "NETWORKING", "WEB_EDGE"] as const)
              .filter((cat) => selectedCategoryFilter === "ALL" || selectedCategoryFilter === cat)
              .map((cat) => {
                const catEntries = entries.filter((e) => getHighLevelCategory(e.category) === cat);
                const isExpanded = !!expandedCategories[cat];
                
                return (
                  <div key={cat} className="border border-white/5 rounded-lg overflow-hidden bg-[#0b0714]/15">
                    {/* Accordion Toggle Header */}
                    <button
                      onClick={() => setExpandedCategories(prev => ({ ...prev, [cat]: !prev[cat] }))}
                      className="w-full flex justify-between items-center px-4 py-2.5 bg-black/40 hover:bg-black/60 border-b border-white/5 transition-colors font-mono text-[10px] text-neutral-300 select-none cursor-pointer"
                    >
                      <span className="font-bold tracking-wider uppercase">
                        {isExpanded ? "[-] " : "[+] "} {cat.replace("_", " ")}
                      </span>
                      <span className="text-[9px] text-[#c084fc] bg-[#c084fc]/10 px-1.5 py-0.5 rounded font-mono">
                        {catEntries.length}
                      </span>
                    </button>

                    {/* Accordion Panel Body */}
                    {isExpanded && (
                      <div className="p-2.5 space-y-2 bg-[#06030a]/40 max-h-[350px] overflow-y-auto">
                        {catEntries.length === 0 ? (
                          <div className="text-neutral-600 text-center py-4 uppercase text-[9px]">
                            No specifications archived
                          </div>
                        ) : (
                          catEntries.map((entry) => {
                            const isSelected = entry.id === selectedEntryId;
                            return (
                              <div
                                key={entry.id}
                                onClick={() => {
                                  if (isAuthenticated) {
                                    setSelectedEntryId(entry.id);
                                  }
                                }}
                                className={`w-full text-left border rounded p-3.5 transition-all duration-200 ${
                                  !isAuthenticated
                                    ? "bg-transparent border-white/5 opacity-40 cursor-not-allowed select-none"
                                    : isSelected
                                    ? "bg-[#1c122e]/40 border-[#c084fc]/50 shadow-[0_0_15px_rgba(192,132,252,0.05)] cursor-pointer animate-pulse"
                                    : "bg-transparent border-white/5 hover:border-white/20 hover:bg-white/[0.02] cursor-pointer"
                                }`}
                              >
                                <span className={`text-[9px] block mb-1 font-bold ${
                                  !isAuthenticated ? "text-neutral-600" : isSelected ? "text-[#c084fc]" : "text-[#4b5563]"
                                }`}>
                                  {entry.ref}
                                </span>
                                <h4 className={`font-bold font-sans uppercase tracking-tight text-[12.5px] leading-tight ${
                                  !isAuthenticated ? "text-neutral-500" : "text-white"
                                }`}>
                                  {entry.title}
                                </h4>
                                <div className="flex justify-between items-center mt-2.5 text-[8.5px] text-neutral-600 uppercase tracking-widest font-mono">
                                  <span>{entry.category}</span>
                                  <span>{entry.date}</span>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    )}
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
