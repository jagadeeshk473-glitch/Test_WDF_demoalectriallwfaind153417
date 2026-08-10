import React, { useState, useEffect } from "react";
import { fetchUseCases } from "../services/api";
import { navigate } from "../app";

const v = (f: any) => f?.display_value || f?.value || f || "";

const TIER_COLORS: Record<string, string> = { LAND: "#10B981", EXPAND: "#3B82F6", TRANSFORM: "#F59E0B" };

function deployColor(est: string): string {
  if (/1\s*day/i.test(est) && !/2/.test(est)) return "#10B981";
  if (/2.*day/i.test(est)) return "#3B82F6";
  if (/1.*week|2.*week|3.*week/i.test(est) && !/4/i.test(est)) return "#F59E0B";
  return "#EF4444";
}

interface Props { persona: string; }

export function UseCaseLibrary({ persona }: Props) {
  const [useCases, setUseCases] = useState<any[]>([]);
  const [tierFilter, setTierFilter] = useState("All");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [connectorFilter, setConnectorFilter] = useState("All");
  const [playbook, setPlaybook] = useState<any>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => { fetchUseCases().then(setUseCases); }, []);

  const industries = ["All", ...Array.from(new Set(useCases.map(u => v(u.industry)).filter(Boolean)))];
  const connectors = ["All", ...Array.from(new Set(useCases.map(u => v(u.connector)).filter(Boolean)))];

  const filtered = useCases.filter(u =>
    (tierFilter === "All" || v(u.tier) === tierFilter) &&
    (industryFilter === "All" || v(u.industry) === industryFilter) &&
    (connectorFilter === "All" || v(u.connector) === connectorFilter)
  );

  const toggleExpand = (id: string) => {
    setExpanded(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  return (
    <div>
      {/* Filter bar */}
      <div style={s.filterBar}>
        {["All", "LAND", "EXPAND", "TRANSFORM"].map(t => (
          <button key={t} onClick={() => setTierFilter(t)}
            style={{ ...s.filterBtn, ...(tierFilter === t ? s.filterActive : {}) }}>{t}</button>
        ))}
        <select value={connectorFilter} onChange={e => setConnectorFilter(e.target.value)} style={s.select}>
          {connectors.map(c => <option key={c} value={c}>{c === "All" ? "All connectors" : c}</option>)}
        </select>
        <select value={industryFilter} onChange={e => setIndustryFilter(e.target.value)} style={s.select}>
          {industries.map(i => <option key={i} value={i}>{i === "All" ? "All industries" : i}</option>)}
        </select>
      </div>

      {/* Card grid */}
      <div style={s.grid}>
        {filtered.map(uc => {
          const id = uc.sys_id?.value || uc.sys_id;
          return (
            <div key={id} style={s.card}>
              <div style={s.row}>
                <span style={{ ...s.pill, background: TIER_COLORS[v(uc.tier)] || "#999", color: "#fff" }}>{v(uc.tier)}</span>
                <span style={{ ...s.pill, background: deployColor(v(uc.deploy_time_estimate)), color: "#fff" }}>{v(uc.deploy_time_estimate)}</span>
              </div>
              <div style={s.industry}>{v(uc.industry)}</div>
              <div style={s.title}>{v(uc.title)}</div>
              <div style={s.desc}>{v(uc.description)}</div>
              {v(uc.sources) && (
                <div style={s.row}>
                  {v(uc.sources).split(",").map((src: string) => (
                    <span key={src.trim()} style={s.srcPill}>{src.trim()}</span>
                  ))}
                </div>
              )}
              {v(uc.connector) && <div style={s.connBadge}>Connector: {v(uc.connector)}</div>}
              {(persona === "builder" || persona === "admin") && v(uc.build_notes) && (
                <div style={s.buildSection}>
                  <button onClick={() => toggleExpand(id)} style={s.toggleBtn}>
                    {expanded.has(id) ? "▾ Build notes" : "▸ Build notes"}
                  </button>
                  {expanded.has(id) && <div style={s.buildNotes}>{v(uc.build_notes)}</div>}
                </div>
              )}
              <div style={s.actions}>
                <button style={s.pbBtn} onClick={() => setPlaybook(uc)}>Generate playbook</button>
                {(uc.linked_demo?.value || "") && (
                  <button style={s.demoBtn} onClick={() => navigate({ view: "demo", id: uc.linked_demo.value })}>Demo</button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p style={s.empty}>No scenarios match the current filters.</p>
      )}

      {/* Playbook modal */}
      {playbook && (
        <div style={s.overlay} onClick={() => setPlaybook(null)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <button style={s.closeBtn} onClick={() => setPlaybook(null)}>✕</button>
            <h2 style={{ margin: "0 0 16px" }}>Generated Playbook — {v(playbook.title)}</h2>
            <h4 style={{ margin: "12px 0 8px" }}>Build Steps</h4>
            <ol style={{ paddingLeft: 20, margin: 0 }}>
              {v(playbook.build_notes).split(/(?<=\.)\s+/).filter((s: string) => s.trim()).map((step: string, i: number) => (
                <li key={i} style={{ marginBottom: 6 }}>{step}</li>
              ))}
            </ol>
            <h4 style={{ margin: "16px 0 8px" }}>Connector Config Summary</h4>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li>Connector: {v(playbook.connector)}</li>
              <li>Deploy estimate: {v(playbook.deploy_time_estimate)}</li>
            </ul>
            <h4 style={{ margin: "16px 0 8px" }}>Talking Points</h4>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li>The {v(playbook.connector)} reads at query time with no data leaving the source system.</li>
              <li>The {v(playbook.tier)} tier represents the shortest path to value for this scenario.</li>
              <li>The {v(playbook.deploy_time_estimate)} estimate is realistic because no ETL pipeline needs to be built.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  filterBar: { display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap", alignItems: "center" },
  filterBtn: { padding: "6px 14px", border: "1px solid #E0E5EC", borderRadius: 6, background: "#fff", cursor: "pointer", fontSize: 13 },
  filterActive: { background: "#00C6A2", color: "#fff", borderColor: "#00C6A2" },
  select: { padding: "6px 10px", borderRadius: 6, border: "1px solid #E0E5EC", fontSize: 13 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 },
  card: { background: "#fff", border: "1px solid #E0E5EC", borderRadius: 8, padding: 20 },
  row: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 },
  pill: { fontSize: 11, padding: "2px 8px", borderRadius: 10, fontWeight: 600 },
  industry: { fontSize: 12, color: "#5A6677", marginBottom: 4 },
  title: { fontWeight: 700, fontSize: 15, marginBottom: 4 },
  desc: { fontSize: 13, color: "#444", marginBottom: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  srcPill: { background: "#E0E5EC", color: "#333", fontSize: 12, padding: "2px 8px", borderRadius: 4 },
  connBadge: { fontSize: 12, color: "#3B82F6", marginTop: 6 },
  buildSection: { marginTop: 10 },
  toggleBtn: { background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#5A6677", padding: 0 },
  buildNotes: { background: "#F3F5F7", padding: 12, borderRadius: 4, fontSize: 12, marginTop: 6, whiteSpace: "pre-wrap" },
  actions: { display: "flex", gap: 8, marginTop: 12 },
  pbBtn: { padding: "6px 12px", background: "#00C6A2", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600 },
  demoBtn: { padding: "6px 12px", background: "#3B82F6", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600 },
  empty: { textAlign: "center", color: "#5A6677", fontSize: 14, padding: "40px 0" },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 },
  modal: { background: "#fff", borderRadius: 12, padding: 32, maxWidth: 640, width: "90%", maxHeight: "80vh", overflow: "auto", position: "relative" },
  closeBtn: { position: "absolute", top: 12, right: 16, background: "none", border: "none", fontSize: 20, cursor: "pointer" },
};
