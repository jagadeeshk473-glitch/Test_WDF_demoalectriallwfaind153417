import React, { useState, useEffect, useRef } from "react";
import { runInstanceAssessment } from "../services/api";

// === INTERFACES ===

interface Finding {
  severity: string;
  rule_name: string;
  rule_code: string;
  category: string;
  message: string;
  recommendation: string;
}

interface ScanStats {
  plugins_scanned: number;
  tables_scanned: number;
  active_nodes: number;
  total_findings: number;
  recommendations: number;
}

interface AssessmentResult {
  status: string;
  scan_stats: ScanStats;
  it4it_coverage: Record<string, boolean>;
  findings: Finding[];
  architecture: {
    current: string;
    recommended: string;
  };
}

// === CONSTANTS ===

const IT4IT_STREAMS: Record<string, string> = {
  S2P: "Strategy to Portfolio",
  R2D: "Requirement to Deploy",
  R2F: "Request to Fulfill",
  D2C: "Detect to Correct",
};

const SEVERITY_OPTIONS = ["All", "Critical", "High", "Medium", "Low"];
const CATEGORY_OPTIONS = ["All", "Integration", "Health", "Security", "Efficiency", "Adoption"];

const SEVERITY_ORDER: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };

// === MERMAID DIAGRAM COMPONENT ===

function MermaidDiagram({ code, id }: { code: string; id: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const [loadFailed, setLoadFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!code) return;

    let cancelled = false;

    const renderDiagram = async () => {
      setLoading(true);
      try {
        // Check if mermaid is already loaded
        if (!(window as any).mermaid) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js";
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Failed to load Mermaid"));
            document.head.appendChild(script);
          });
        }

        const mermaid = (window as any).mermaid;
        mermaid.initialize({ startOnLoad: false, theme: "default", securityLevel: "loose" });

        const { svg } = await mermaid.render(id + "-svg", code);
        if (!cancelled) {
          setSvgContent(svg);
          setLoadFailed(false);
        }
      } catch (e) {
        if (!cancelled) {
          setLoadFailed(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    renderDiagram();
    return () => { cancelled = true; };
  }, [code, id]);

  const mermaidLiveUrl = "https://mermaid.live/edit#base64=" + btoa(code || "");

  if (loading) {
    return (
      <div style={{ padding: 20, textAlign: "center", color: "#5A6677", fontSize: 13 }}>
        Loading diagram...
      </div>
    );
  }

  if (loadFailed) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <pre style={styles.codeBlock}>{code}</pre>
        <a href={mermaidLiveUrl} target="_blank" rel="noopener noreferrer" style={styles.mermaidLink}>
          Open in Mermaid Live Editor ↗
        </a>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: svgContent }}
        style={{ overflow: "auto", maxHeight: 500 }}
      />
      <a href={mermaidLiveUrl} target="_blank" rel="noopener noreferrer" style={styles.mermaidLink}>
        Open in Mermaid Live Editor ↗
      </a>
    </div>
  );
}

// === MAIN COMPONENT ===

export function InstanceAssessment() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const handleRunAssessment = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await runInstanceAssessment();
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Assessment failed");
    } finally {
      setLoading(false);
    }
  };

  const getFilteredFindings = (): Finding[] => {
    if (!result) return [];
    let filtered = [...result.findings];

    if (severityFilter !== "All") {
      filtered = filtered.filter(f => f.severity.toLowerCase() === severityFilter.toLowerCase());
    }
    if (categoryFilter !== "All") {
      const catLower = categoryFilter.toLowerCase();
      filtered = filtered.filter(f => {
        const fCat = f.category.replace(/_/g, " ").toLowerCase();
        return fCat.includes(catLower.toLowerCase());
      });
    }

    filtered.sort((a, b) => (SEVERITY_ORDER[a.severity] ?? 4) - (SEVERITY_ORDER[b.severity] ?? 4));
    return filtered;
  };

  const severityStyle = (sev: string) => {
    switch (sev.toLowerCase()) {
      case "critical": return { bg: "#FDE8E8", text: "#B91C1C" };
      case "high": return { bg: "#FEF3C7", text: "#92400E" };
      case "medium": return { bg: "#FEF3C7", text: "#92400E" };
      case "low": return { bg: "#D1FAE5", text: "#065F46" };
      default: return { bg: "#E0E5EC", text: "#5A6677" };
    }
  };

  const categoryLabel = (cat: string) => {
    return cat.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <div>
      {/* Header and action */}
      <div style={styles.headerRow}>
        <div>
          <h3 style={styles.title}>Instance Assessment</h3>
          <p style={styles.subtitle}>
            Analyze your instance architecture, integration patterns, IT4IT coverage, and generate architecture diagrams
          </p>
        </div>
        <button
          style={{
            ...styles.runBtn,
            ...(loading ? styles.runBtnDisabled : {}),
          }}
          onClick={handleRunAssessment}
          disabled={loading}
        >
          {loading ? "Scanning..." : "Run Assessment"}
        </button>
      </div>

      {error && <div style={styles.errorBox}>{error}</div>}

      {/* Empty state */}
      {!result && !loading && (
        <div style={styles.emptyState}>
          <span style={{ fontSize: 32 }}>📊</span>
          <p style={{ margin: 0, color: "#5A6677", fontSize: 14 }}>
            Click &quot;Run Assessment&quot; to scan your instance plugins, tables, and integrations
          </p>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div style={styles.loadingBox}>
          <div style={styles.progressBar}>
            <div style={styles.progressFill} />
          </div>
          <p style={{ margin: "12px 0 0", color: "#1A1A1A", fontSize: 14, fontWeight: 600 }}>
            Scanning instance...
          </p>
          <p style={{ margin: "4px 0 0", color: "#5A6677", fontSize: 12 }}>
            Querying plugins, tables, integrations, and flows
          </p>
        </div>
      )}

      {/* Results */}
      {result && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Success Banner */}
          <div style={styles.successBanner}>
            ✓ Scan Completed Successfully!
          </div>

          {/* A. Scan Stats Row */}
          <div style={styles.statsRow}>
            {[
              { value: result.scan_stats.plugins_scanned, label: "Plugins Scanned" },
              { value: result.scan_stats.tables_scanned, label: "Tables Scanned" },
              { value: result.scan_stats.active_nodes, label: "Active Nodes" },
              { value: result.scan_stats.total_findings, label: "Total Findings" },
              { value: result.scan_stats.recommendations, label: "Recommendations" },
            ].map((stat, idx) => (
              <div key={idx} style={styles.statCard}>
                <span style={styles.statValue}>{stat.value}</span>
                <span style={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>

          {/* B. IT4IT Coverage Grid */}
          <div style={styles.panel}>
            <h4 style={styles.panelTitle}>IT4IT Value Stream Coverage</h4>
            <div style={styles.coverageGrid}>
              {Object.entries(IT4IT_STREAMS).map(([key, label]) => (
                <div key={key} style={styles.coverageItem}>
                  <span style={{
                    ...styles.coverageBadge,
                    background: result.it4it_coverage[key] ? "#D1FAE5" : "#FDE8E8",
                    color: result.it4it_coverage[key] ? "#065F46" : "#B91C1C",
                  }}>
                    {result.it4it_coverage[key] ? "✓" : "✗"}
                  </span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>{key}</div>
                    <div style={{ fontSize: 11, color: "#5A6677" }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* C. Findings Table with Filters */}
          <div style={styles.panel}>
            <div style={styles.findingsHeader}>
              <h4 style={styles.panelTitle}>Findings ({getFilteredFindings().length})</h4>
              <div style={styles.filterRow}>
                <select
                  style={styles.filterSelect}
                  value={severityFilter}
                  onChange={e => setSeverityFilter(e.target.value)}
                >
                  {SEVERITY_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt === "All" ? "All Severities" : opt}</option>
                  ))}
                </select>
                <select
                  style={styles.filterSelect}
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value)}
                >
                  {CATEGORY_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt === "All" ? "All Categories" : opt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Findings table */}
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Severity</th>
                    <th style={styles.th}>Rule</th>
                    <th style={styles.th}>Category</th>
                    <th style={styles.th}>Message</th>
                    <th style={styles.th}>Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredFindings().length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ ...styles.td, textAlign: "center", color: "#5A6677" }}>
                        No findings match the selected filters
                      </td>
                    </tr>
                  ) : (
                    getFilteredFindings().map((f, i) => {
                      const sev = severityStyle(f.severity);
                      return (
                        <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#F8FAFE" }}>
                          <td style={styles.td}>
                            <span style={{
                              ...styles.severityBadge,
                              background: sev.bg,
                              color: sev.text,
                            }}>
                              {f.severity.toUpperCase()}
                            </span>
                          </td>
                          <td style={styles.td}>
                            <div style={{ fontWeight: 600, fontSize: 13, color: "#1A1A1A" }}>{f.rule_name}</div>
                            <div style={{ fontSize: 11, color: "#5A6677" }}>{f.rule_code}</div>
                          </td>
                          <td style={styles.td}>
                            <span style={styles.categoryPill}>{categoryLabel(f.category)}</span>
                          </td>
                          <td style={{ ...styles.td, maxWidth: 260 }}>{f.message}</td>
                          <td style={{ ...styles.td, color: "#0D9488", maxWidth: 280 }}>{f.recommendation}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* D. Architecture Diagrams */}
          <div style={styles.panel}>
            <h4 style={styles.panelTitle}>Architecture Diagrams</h4>
            <div style={styles.diagramRow}>
              <div style={styles.diagramPanel}>
                <h5 style={styles.diagramTitle}>Current Architecture (As-Is)</h5>
                <MermaidDiagram code={result.architecture.current} id="current-arch" />
              </div>
              <div style={styles.diagramPanel}>
                <h5 style={styles.diagramTitle}>Recommended Architecture</h5>
                <p style={styles.diagramNote}>
                  Highlighted nodes (yellow) represent recommended additions
                </p>
                <MermaidDiagram code={result.architecture.recommended} id="recommended-arch" />
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

// === STYLES ===

const styles: Record<string, React.CSSProperties> = {
  headerRow: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    marginBottom: 20,
  },
  title: {
    margin: 0, fontSize: 18, fontWeight: 700, color: "#1A1A1A",
  },
  subtitle: {
    margin: "4px 0 0", fontSize: 13, color: "#5A6677",
  },
  runBtn: {
    padding: "10px 20px", background: "#00C6A2", color: "#fff",
    border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600,
    cursor: "pointer", whiteSpace: "nowrap",
  },
  runBtnDisabled: {
    opacity: 0.6, cursor: "not-allowed",
  },
  errorBox: {
    background: "#FDE8E8", border: "1px solid #FCA5A5", borderRadius: 6,
    padding: "10px 14px", color: "#B91C1C", fontSize: 13, marginBottom: 16,
  },
  emptyState: {
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", gap: 12, padding: "60px 20px",
    background: "#F8FAFE", border: "1px solid #E0E5EC", borderRadius: 8,
  },
  loadingBox: {
    display: "flex", flexDirection: "column", gap: 4,
    padding: "48px 20px", alignItems: "center",
    background: "#F8FAFE", border: "1px solid #E0E5EC", borderRadius: 8,
  },
  progressBar: {
    width: "240px", height: 4, background: "#E0E5EC", borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%", width: "100%",
    background: "linear-gradient(90deg, #00C6A2, #0080FF, #00C6A2)",
    borderRadius: 2,
    animation: "shimmer 1.5s ease-in-out infinite",
    backgroundSize: "200% 100%",
  },
  successBanner: {
    background: "#D1FAE5", border: "1px solid #6EE7B7", borderRadius: 6,
    padding: "12px 16px", color: "#065F46", fontSize: 14, fontWeight: 600,
    textAlign: "center",
  },
  statsRow: {
    display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12,
  },
  statCard: {
    display: "flex", flexDirection: "column", alignItems: "center",
    padding: "16px 12px", background: "#F8FAFE", border: "1px solid #E0E5EC",
    borderRadius: 8,
  },
  statValue: {
    fontSize: 24, fontWeight: 700, color: "#00C6A2",
  },
  statLabel: {
    fontSize: 11, color: "#5A6677", marginTop: 4, textAlign: "center",
  },
  panel: {
    background: "#F8FAFE", border: "1px solid #E0E5EC",
    borderRadius: 8, padding: "16px 20px",
  },
  panelTitle: {
    margin: "0 0 12px", fontSize: 14, fontWeight: 600, color: "#1A1A1A",
  },
  coverageGrid: {
    display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12,
  },
  coverageItem: {
    display: "flex", alignItems: "center", gap: 10,
  },
  coverageBadge: {
    width: 28, height: 28, borderRadius: "50%", display: "flex",
    alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700,
  },
  findingsHeader: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginBottom: 12, flexWrap: "wrap", gap: 8,
  },
  filterRow: {
    display: "flex", gap: 8,
  },
  filterSelect: {
    padding: "6px 12px", border: "1px solid #E0E5EC", borderRadius: 4,
    fontSize: 12, color: "#1A1A1A", background: "#fff", cursor: "pointer",
    outline: "none",
  },
  table: {
    width: "100%", borderCollapse: "collapse", fontSize: 13,
  },
  th: {
    textAlign: "left", padding: "10px 12px", borderBottom: "2px solid #E0E5EC",
    fontSize: 11, fontWeight: 700, color: "#5A6677", textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  td: {
    padding: "10px 12px", borderBottom: "1px solid #E0E5EC",
    fontSize: 13, color: "#1A1A1A", verticalAlign: "top", lineHeight: "1.4",
  },
  severityBadge: {
    fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4,
    display: "inline-block", whiteSpace: "nowrap",
  },
  categoryPill: {
    fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 10,
    background: "#E0E5EC", color: "#5A6677", display: "inline-block",
    whiteSpace: "nowrap",
  },
  diagramRow: {
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16,
  },
  diagramPanel: {
    background: "#fff", border: "1px solid #E0E5EC", borderRadius: 8,
    padding: "16px",
  },
  diagramTitle: {
    margin: "0 0 8px", fontSize: 13, fontWeight: 600, color: "#1A1A1A",
  },
  diagramNote: {
    margin: "0 0 8px", fontSize: 11, color: "#92400E", fontStyle: "italic",
  },
  codeBlock: {
    background: "#1A1A1A", color: "#E0E5EC", padding: "12px 16px",
    borderRadius: 6, fontSize: 11, overflow: "auto", maxHeight: 300,
    whiteSpace: "pre-wrap", wordBreak: "break-word",
  },
  mermaidLink: {
    fontSize: 12, color: "#0D9488", textDecoration: "none", fontWeight: 500,
  },
};
