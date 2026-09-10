import React, { useState, useEffect } from "react";
import { fetchArchPatterns } from "../services/api";
import { navigate } from "../app";

/* ── helpers ───────────────────────────────────────────────────────────── */

const v = (f: any): string => {
  if (f == null) return "";
  if (typeof f === "string") return f;
  const val = f.display_value || f.value || "";
  return typeof val === "string" ? val : "";
};

const ACCENT = "#00C6A2";

const PATTERN_ORDER: Record<string, number> = {
  "Insight to Action": 0,
  "Real-Time Data Enrichment": 1,
  "Real-Time Event Response": 2,
  "Agentic Multi-Connector Loop": 3,
  "Automate Across Systems": 4,
};

// Connector tags per pattern (hardcoded because glide_list reference field
// cannot reliably store display names via Fluent)
const PATTERN_CONNECTORS: Record<string, string[]> = {
  "Insight to Action": ["Zero Copy", "ZCC ERP", "Integ. Hub"],
  "Real-Time Data Enrichment": ["Zero Copy", "ZCC ERP"],
  "Real-Time Event Response": ["Stream", "Zero Copy", "Integ. Hub"],
  "Agentic Multi-Connector Loop": ["Stream", "MCP Client", "Zero Copy"],
  "Automate Across Systems": ["Integ. Hub", "MCP Server", "MCP Client"],
};

function parseSteps(raw: string): { num: number; text: string }[] {
  return raw
    .split("\n")
    .filter(Boolean)
    .map((line, i) => {
      const match = line.match(/^\d+\.\s*(.*)/);
      return { num: i + 1, text: match ? match[1] : line };
    });
}

/* ── component ─────────────────────────────────────────────────────────── */

export function ArchPatterns() {
  const [patterns, setPatterns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchArchPatterns().then((data: any[]) => {
      const sorted = [...data].sort((a, b) => {
        const nameA = v(a.name);
        const nameB = v(b.name);
        return (PATTERN_ORDER[nameA] ?? 99) - (PATTERN_ORDER[nameB] ?? 99);
      });
      setPatterns(sorted);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={s.loading}>Loading architecture patterns…</p>;
  if (!patterns.length) return <p style={s.loading}>No architecture patterns found.</p>;

  return (
    <div style={s.container}>
      <p style={s.header}>
        Five proven patterns for connecting ServiceNow to enterprise data.{" "}
        <span style={s.headerHint}>Click any pattern to expand.</span>
      </p>

      <div style={s.list}>
        {patterns.map((pat, idx) => {
          const id = pat.sys_id?.value || pat.sys_id;
          const name = v(pat.name);
          const tagline = v(pat.tagline);
          const flowSteps = v(pat.data_flow_steps);
          const linkedDemo = pat.linked_demo?.value || "";
          const color = ACCENT;
          const isExpanded = expandedId === id;

          let examples: { industry: string; example: string }[] = [];
          try {
            const raw = v(pat.industry_examples);
            if (raw) examples = JSON.parse(raw);
          } catch { /* ignore */ }

          const connList = PATTERN_CONNECTORS[name] || [];

          const steps = flowSteps ? parseSteps(flowSteps) : [];

          return (
            <div key={id} style={s.card}>
              {/* ── collapsed header (always visible) ── */}
              <div
                style={s.cardHeader}
                onClick={() => setExpandedId(isExpanded ? null : id)}
              >
                <div style={{ ...s.badge, backgroundColor: color }}>
                  {idx + 1}
                </div>

                <div style={s.titleArea}>
                  <span style={s.patName}>{name}</span>
                  {tagline && <span style={s.patTagline}>{tagline}</span>}
                </div>

                <div style={s.rightArea}>
                  <div style={s.pillRow}>
                    {connList.map((c: string) => (
                      <span key={c} style={s.pillSmall}>{c}</span>
                    ))}
                  </div>
                  <span style={s.arrow}>
                    {isExpanded ? "▾" : "▸"}
                  </span>
                </div>
              </div>

              {/* ── expanded body ── */}
              {isExpanded && (
                <div style={s.expandedBody}>
                  <div style={s.columns}>
                    {/* left column: HOW IT WORKS */}
                    <div style={s.colLeft}>
                      <div style={s.sectionTitle}>HOW IT WORKS</div>
                      <div style={s.stepsList}>
                        {steps.map((step) => (
                          <div key={step.num} style={s.stepRow}>
                            <div style={{ ...s.stepBadge, backgroundColor: color }}>
                              {step.num}
                            </div>
                            <span style={s.stepText}>{step.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* right column: INDUSTRY EXAMPLES */}
                    {examples.length > 0 && (
                      <div style={s.colRight}>
                        <div style={s.sectionTitle}>INDUSTRY EXAMPLES</div>
                        <div style={s.examplesList}>
                          {examples.map((ex, i) => (
                            <div key={i} style={s.exampleItem}>
                              <div style={s.exIndustry}>{ex.industry}</div>
                              <div style={s.exText}>{ex.example}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* bottom: connectors + demo link */}
                  <div style={s.bottomRow}>
                    {connList.length > 0 && (
                      <div style={s.connSection}>
                        <span style={s.sectionTitleInline}>CONNECTORS IN THIS PATTERN</span>
                        <div style={s.pillRow}>
                          {connList.map((c: string) => (
                            <span key={c} style={s.pill}>{c}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {linkedDemo && (
                      <span
                        style={s.demoLink}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate({ view: "demo", id: linkedDemo });
                        }}
                      >
                        See demo →
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── styles ─────────────────────────────────────────────────────────────── */

const s: Record<string, React.CSSProperties> = {
  loading: { color: "#5A6677", fontSize: 14, textAlign: "center", padding: 32 },

  container: { maxWidth: 960, margin: "0 auto" },

  header: {
    fontSize: 15,
    color: "#1A1A1A",
    lineHeight: 1.6,
    margin: "0 0 20px",
  },
  headerHint: { color: "#8899AA", fontWeight: 400 },

  list: { display: "flex", flexDirection: "column", gap: 12 },

  /* ── card shell ── */
  card: {
    background: "#fff",
    border: "1px solid #E0E5EC",
    borderRadius: 10,
    overflow: "hidden",
  },

  /* ── collapsed header ── */
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "16px 20px",
    cursor: "pointer",
    userSelect: "none",
  },

  badge: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    color: "#fff",
    fontSize: 14,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  titleArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 2,
    minWidth: 0,
  },
  patName: { fontSize: 15, fontWeight: 700, lineHeight: 1.3, color: "#0B2D4E" },
  patTagline: { fontSize: 12.5, color: "#6B7A8D", lineHeight: 1.4 },

  rightArea: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexShrink: 0,
  },
  arrow: { fontSize: 16, fontWeight: 600, color: "#5A6677" },

  /* ── pills (small in header, regular in expanded) ── */
  pillRow: { display: "flex", gap: 5, flexWrap: "wrap" },
  pillSmall: {
    border: "1px solid #E0E5EC",
    borderRadius: 12,
    padding: "2px 8px",
    fontSize: 10.5,
    color: "#5A6677",
    whiteSpace: "nowrap",
    lineHeight: 1.5,
  },
  pill: {
    border: "1px solid #E0E5EC",
    borderRadius: 12,
    padding: "3px 10px",
    fontSize: 11,
    color: "#5A6677",
    whiteSpace: "nowrap",
    lineHeight: 1.5,
    background: "#fff",
  },

  /* ── expanded body ── */
  expandedBody: {
    background: "#F8FAFE",
    padding: "20px 24px 18px",
    borderTop: "1px solid #E8ECF1",
  },

  columns: {
    display: "flex",
    gap: 32,
    marginBottom: 20,
  },
  colLeft: { flex: 1, minWidth: 0 },
  colRight: { flex: 1, minWidth: 0 },

  /* ── section titles ── */
  sectionTitle: {
    fontSize: 10.5,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#5A6677",
    marginBottom: 12,
  },
  sectionTitleInline: {
    fontSize: 10.5,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#5A6677",
    marginRight: 10,
    whiteSpace: "nowrap",
  },

  /* ── steps ── */
  stepsList: { display: "flex", flexDirection: "column", gap: 8 },
  stepRow: { display: "flex", alignItems: "flex-start", gap: 10 },
  stepBadge: {
    width: 22,
    height: 22,
    borderRadius: "50%",
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  stepText: { fontSize: 12.5, color: "#1A1A1A", lineHeight: 1.5 },

  /* ── examples ── */
  examplesList: { display: "flex", flexDirection: "column", gap: 14 },
  exampleItem: {},
  exIndustry: { fontSize: 12, fontWeight: 700, marginBottom: 3, lineHeight: 1.3, color: "#0B2D4E" },
  exText: { fontSize: 12.5, color: "#444", lineHeight: 1.5 },

  /* ── bottom row ── */
  bottomRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
    borderTop: "1px solid #E8ECF1",
    paddingTop: 14,
  },
  connSection: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  demoLink: {
    color: "#00C6A2",
    fontWeight: 600,
    fontSize: 12.5,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
};
