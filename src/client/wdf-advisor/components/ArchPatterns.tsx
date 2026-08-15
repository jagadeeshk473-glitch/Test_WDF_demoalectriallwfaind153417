import React, { useState, useEffect } from "react";
import { fetchArchPatterns } from "../services/api";
import { navigate } from "../app";

const v = (f: any) => {
  if (f == null) return "";
  if (typeof f === "string") return f;
  const val = f.display_value || f.value || "";
  return typeof val === "string" ? val : "";
};

export function ArchPatterns() {
  const [patterns, setPatterns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArchPatterns().then(setPatterns).finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={s.loading}>Loading architecture patterns…</p>;
  if (!patterns.length) return <p style={s.loading}>No architecture patterns found.</p>;

  return (
    <div style={s.grid}>
      {patterns.map((pat) => {
        const id = pat.sys_id?.value || pat.sys_id;
        const name = v(pat.name);
        const tagline = v(pat.tagline);
        const flowSteps = v(pat.data_flow_steps);
        const connectors = v(pat.connectors);
        const linkedDemo = pat.linked_demo?.value || "";
        let examples: { industry: string; example: string }[] = [];
        try {
          const raw = v(pat.industry_examples);
          if (raw) examples = JSON.parse(raw);
        } catch { /* ignore parse errors */ }

        return (
          <div key={id} style={s.card}>
            <h3 style={s.name}>{name}</h3>
            {tagline && <p style={s.tagline}>{tagline}</p>}

            {flowSteps && (
              <div style={s.section}>
                <div style={s.sectionTitle}>Data Flow</div>
                <div style={s.flowSteps}>
                  {flowSteps.split("\n").filter(Boolean).map((step: string, i: number) => (
                    <div key={i} style={s.flowStep}>{step}</div>
                  ))}
                </div>
              </div>
            )}

            {connectors && (
              <div style={s.section}>
                <div style={s.sectionTitle}>Connectors</div>
                <div style={s.connRow}>
                  {connectors.split(",").map((c: string) => (
                    <span key={c.trim()} style={s.connPill}>{c.trim()}</span>
                  ))}
                </div>
              </div>
            )}

            {examples.length > 0 && (
              <div style={s.section}>
                <div style={s.sectionTitle}>Industry Examples</div>
                {examples.map((ex, i) => (
                  <div key={i} style={s.exampleRow}>
                    <span style={s.exIndustry}>{ex.industry}</span>
                    <span style={s.exText}>{ex.example}</span>
                  </div>
                ))}
              </div>
            )}

            {linkedDemo && (
              <button style={s.demoBtn} onClick={() => navigate({ view: "demo", id: linkedDemo })}>
                ▶ View Demo
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  loading: { color: "#5A6677", fontSize: 14, textAlign: "center" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(420px,1fr))", gap: 20 },
  card: { background: "#fff", border: "1px solid #E0E5EC", borderRadius: 10, padding: 24 },
  name: { margin: 0, fontSize: 17, fontWeight: 700, color: "#0B2D4E" },
  tagline: { margin: "4px 0 0", fontSize: 13, color: "#5A6677" },
  section: { marginTop: 16 },
  sectionTitle: { fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: "#5A6677", marginBottom: 6 },
  flowSteps: { background: "#F4F6F9", borderRadius: 6, padding: 12 },
  flowStep: { fontSize: 12, color: "#1A1A1A", padding: "3px 0", lineHeight: 1.5 },
  connRow: { display: "flex", gap: 6, flexWrap: "wrap" },
  connPill: { background: "#E8F8F5", color: "#0B2D4E", fontSize: 12, padding: "3px 10px", borderRadius: 12, fontWeight: 500 },
  exampleRow: { display: "flex", gap: 8, alignItems: "baseline", marginBottom: 6 },
  exIndustry: { fontSize: 11, fontWeight: 600, color: "#00C6A2", whiteSpace: "nowrap", minWidth: 90 },
  exText: { fontSize: 12, color: "#444", lineHeight: 1.4 },
  demoBtn: {
    marginTop: 16, padding: "8px 16px", background: "#00C6A2", color: "#fff",
    border: "none", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600
  },
};
