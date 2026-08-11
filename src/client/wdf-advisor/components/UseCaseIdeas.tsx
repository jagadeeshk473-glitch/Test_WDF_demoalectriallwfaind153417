import React, { useState, useEffect } from "react";
import { fetchUseCaseIdeas } from "../services/api";
import { navigate } from "../app";

const v = (f: any) => f?.display_value || f?.value || f || "";

const TIER_COLORS: Record<string, string> = { LAND: "#10B981", EXPAND: "#3B82F6", TRANSFORM: "#F59E0B" };

function deployColor(est: string): string {
  if (/1\s*day/i.test(est) && !/2/.test(est)) return "#10B981";
  if (/2.*day/i.test(est)) return "#3B82F6";
  if (/1.*week|2.*week|3.*week/i.test(est) && !/4/i.test(est)) return "#F59E0B";
  return "#EF4444";
}

export function UseCaseIdeas() {
  const [ideas, setIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUseCaseIdeas().then(setIdeas).finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={s.loading}>Loading use case ideas…</p>;
  if (!ideas.length) return <p style={s.loading}>No use case ideas found.</p>;

  // Group by industry
  const grouped: Record<string, any[]> = {};
  ideas.forEach((uc) => {
    const industry = v(uc.industry) || "General";
    if (!grouped[industry]) grouped[industry] = [];
    grouped[industry].push(uc);
  });

  return (
    <div>
      {Object.entries(grouped).map(([industry, items]) => (
        <div key={industry} style={s.group}>
          <h3 style={s.groupTitle}>{industry}</h3>
          <div style={s.grid}>
            {items.map((uc) => {
              const id = uc.sys_id?.value || uc.sys_id;
              const tier = v(uc.tier);
              const deployTime = v(uc.deploy_time_estimate);
              const linkedDemo = uc.linked_demo?.value || "";
              return (
                <div key={id} style={s.card}>
                  <div style={s.badges}>
                    {tier && <span style={{ ...s.pill, background: TIER_COLORS[tier] || "#999", color: "#fff" }}>{tier}</span>}
                    {deployTime && <span style={{ ...s.pill, background: deployColor(deployTime), color: "#fff" }}>{deployTime}</span>}
                  </div>
                  <div style={s.title}>{v(uc.title)}</div>
                  <div style={s.desc}>{v(uc.description)}</div>
                  {v(uc.connector) && <div style={s.connBadge}>🔌 {v(uc.connector)}</div>}
                  {v(uc.sources) && (
                    <div style={s.srcRow}>
                      {v(uc.sources).split(",").map((src: string) => (
                        <span key={src.trim()} style={s.srcPill}>{src.trim()}</span>
                      ))}
                    </div>
                  )}
                  <div style={s.actions}>
                    {linkedDemo && (
                      <button style={s.demoBtn} onClick={() => navigate({ view: "demo", id: linkedDemo })}>▶ Demo</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  loading: { color: "#5A6677", fontSize: 14, textAlign: "center" },
  group: { marginBottom: 28 },
  groupTitle: { margin: "0 0 12px", fontSize: 15, fontWeight: 700, color: "#0B2D4E", borderBottom: "1px solid #E0E5EC", paddingBottom: 8 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 },
  card: { background: "#fff", border: "1px solid #E0E5EC", borderRadius: 8, padding: 16 },
  badges: { display: "flex", gap: 6, marginBottom: 8 },
  pill: { fontSize: 10, padding: "2px 8px", borderRadius: 10, fontWeight: 600 },
  title: { fontWeight: 600, fontSize: 14, color: "#1A1A1A", marginBottom: 4 },
  desc: { fontSize: 12, color: "#5A6677", marginBottom: 8, lineHeight: 1.4 },
  connBadge: { fontSize: 11, color: "#3B82F6", marginBottom: 6 },
  srcRow: { display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 },
  srcPill: { background: "#F4F6F9", color: "#5A6677", fontSize: 11, padding: "2px 8px", borderRadius: 4 },
  actions: { display: "flex", gap: 8 },
  demoBtn: {
    padding: "5px 12px", background: "#00C6A2", color: "#fff",
    border: "none", borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 600
  },
};
