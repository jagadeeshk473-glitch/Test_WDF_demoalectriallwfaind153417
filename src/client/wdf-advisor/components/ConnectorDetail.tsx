import React, { useState, useEffect } from "react";
import { fetchConnector } from "../services/api";
import { navigate } from "../app";
import { ConnectorPicker } from "./ConnectorPicker";
import { CONTEXT_IMPLICATIONS, getChaptersForConnector } from "../services/outboundConcept";

interface Props {
  connectorId: string;
  persona: string;
  onBack: () => void;
}

const v = (f: any) => f?.display_value || f?.value || f || "";

function statusColor(status: string): string {
  const s = status.toLowerCase();
  if (s === "ga") return "#10B981";
  if (s === "poc" || s === "in development" || s === "in_development") return "#F59E0B";
  return "#94A3B8";
}

function parseSourceCategories(detail: string): Record<string, string[]> {
  const categories: Record<string, string[]> = {};
  if (!detail) return categories;

  const categoryPatterns: Record<string, RegExp> = {
    "Databases & warehouses": /(?:database|warehouse|sql|postgres|oracle|mysql|snowflake|redshift|bigquery|jdbc|db2)/gi,
    "SaaS APIs": /(?:saas|workday|salesforce|servicenow|jira|sap|dynamics|hubspot|zendesk|api)/gi,
    "ServiceNow instances": /(?:servicenow instance|snow instance|sn instance|pdi|sub-prod)/gi,
    "REST/HTTP APIs": /(?:rest|http|webhook|graphql|soap|endpoint)/gi,
  };

  const lines = detail.split(/[.,;\n]+/).map(l => l.trim()).filter(Boolean);

  for (const [category, pattern] of Object.entries(categoryPatterns)) {
    const matches: string[] = [];
    for (const line of lines) {
      const found = line.match(pattern);
      if (found) {
        found.forEach(m => {
          const normalized = m.charAt(0).toUpperCase() + m.slice(1).toLowerCase();
          if (!matches.includes(normalized)) matches.push(normalized);
        });
      }
    }
    if (matches.length > 0) categories[category] = matches;
  }

  if (Object.keys(categories).length === 0 && detail.length > 20) {
    const words = detail.split(/[\s,;.]+/).filter(w => w.length > 3).slice(0, 5);
    if (words.length > 0) categories["Sources"] = words;
  }

  return categories;
}

function PricingCalculator() {
  const [volume, setVolume] = useState(500);
  const [queries, setQueries] = useState(1000);
  const [tab, setTab] = useState<"customer" | "your" | "pilot">("customer");

  const baseCredits = Math.round((volume / 100) * (queries / 500) * 12);
  const multiplier = tab === "pilot" ? 0.5 : tab === "your" ? 0.8 : 1;
  const credits = Math.round(baseCredits * multiplier);

  return (
    <div style={st.calcContainer}>
      <h3 style={st.sectionHeading}>💰 Pricing Calculator</h3>
      <div style={st.calcTabs}>
        {(["customer", "your", "pilot"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ ...st.calcTab, ...(tab === t ? st.calcTabActive : {}) }}>
            {t === "customer" ? "Customer view" : t === "your" ? "Your view" : "Pilot view"}
          </button>
        ))}
      </div>
      <div style={st.sliderGroup}>
        <label style={st.sliderLabel}>
          Data volume: <strong>{volume} MB</strong>
        </label>
        <input type="range" min={50} max={5000} step={50} value={volume}
          onChange={e => setVolume(Number(e.target.value))}
          style={st.slider} />
        <div style={st.sliderRange}><span>50 MB</span><span>5,000 MB</span></div>
      </div>
      <div style={st.sliderGroup}>
        <label style={st.sliderLabel}>
          Queries per month: <strong>{queries.toLocaleString()}</strong>
        </label>
        <input type="range" min={100} max={50000} step={100} value={queries}
          onChange={e => setQueries(Number(e.target.value))}
          style={st.slider} />
        <div style={st.sliderRange}><span>100</span><span>50,000</span></div>
      </div>
      <div style={st.creditsDisplay}>
        <span style={st.creditsNumber}>{credits.toLocaleString()}</span>
        <span style={st.creditsLabel}>credits / month (est.)</span>
      </div>
    </div>
  );
}

export function ConnectorDetail({ connectorId, persona, onBack }: Props) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    fetchConnector(connectorId).then(setData).finally(() => setLoading(false));
  }, [connectorId]);

  if (loading) return <div style={st.loading}>Loading...</div>;
  if (!data) return <div style={st.loading}>Connector not found.</div>;

  const name = v(data.name);
  const status = v(data.status);
  const tagline = v(data.tagline);
  const detail = v(data.detail);
  const bestFor = v(data.best_for);
  const notFor = v(data.not_for);
  const protocol = v(data.protocol);
  const authMethod = v(data.auth_method);
  const midServer = v(data.mid_server_requirement);
  const latency = v(data.latency);
  const writeBack = v(data.supports_write_back);
  const writeBackNote = v(data.write_back_note);
  const q2 = v(data.q2_roadmap);
  const q4 = v(data.q4_roadmap);

  const sourceCategories = parseSourceCategories(detail);
  const hasWriteBack = writeBack === "true" || writeBack === "1";
  const contextImplication = CONTEXT_IMPLICATIONS[name.toLowerCase()];
  const chapters = getChaptersForConnector(name);

  return (
    <div style={st.container}>
      {/* Breadcrumb */}
      <div style={st.breadcrumb}>
        <span style={st.breadLink} onClick={() => navigate({ view: "home" })}>Home</span>
        <span style={st.breadSep}> › </span>
        <span style={st.breadCurrent}>{name}</span>
      </div>

      {/* Mini Search */}
      <div style={st.miniSearch}>
        <input type="text" placeholder="Search connectors..." style={st.miniSearchInput}
          onKeyDown={(e) => { if (e.key === "Enter") navigate({ view: "home" }); }} />
      </div>

      {/* Main Card */}
      <div style={st.mainCard}>
        <div style={st.cardTop}>
          <div style={st.nameRow}>
            <h1 style={st.title}>{name}</h1>
            {status && <span style={{ ...st.badge, background: statusColor(status) }}>{status.toUpperCase()}</span>}
          </div>
          <button style={st.closeBtn} onClick={onBack}>✕</button>
        </div>

        {tagline && <p style={st.tagline}>{tagline}</p>}
        {detail && <p style={st.detail}>{detail}</p>}

        {/* Context Engine Implications */}
        {contextImplication && (
          <div style={st.contextSection}>
            <h4 style={st.sectionHeadingUpper}>🔗 CONTEXT ENGINE IMPACT</h4>
            <div style={st.contextCard}>
              <div style={st.contextRow}>
                <span style={st.contextLabel}>Feeds:</span>
                <div style={st.pillRow}>
                  {contextImplication.feeds.map(f => (
                    <span key={f} style={st.feedPill}>{f}</span>
                  ))}
                </div>
              </div>
              <div style={st.contextRow}>
                <span style={st.contextLabel}>Governance Jobs:</span>
                <div style={st.pillRow}>
                  {contextImplication.govJobs.map(g => (
                    <span key={g} style={st.govPill}>{g}</span>
                  ))}
                </div>
              </div>
              {contextImplication.note && (
                <p style={st.contextNote}>{contextImplication.note}</p>
              )}
            </div>
          </div>
        )}

        {/* Integration Patterns */}
        {chapters.length > 0 && (
          <div style={st.chaptersSection}>
            <h4 style={st.sectionHeadingUpper}>📖 INTEGRATION PATTERNS</h4>
            <div style={st.chaptersList}>
              {chapters.map(ch => (
                <div key={ch.id} style={st.chapterCard}>
                  <div style={st.chapterContent}>
                    <div style={st.chapterTitleRow}>
                      <span style={{ ...st.chapterBadge, background: ch.color }}>{ch.quadrant}</span>
                    </div>
                    <div style={st.chapterTitle}>{ch.title}</div>
                    <div style={st.chapterSummary}>{ch.summary}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Source Categories */}
        {Object.keys(sourceCategories).length > 0 && (
          <div style={st.sourcesSection}>
            <h4 style={st.sectionHeading}>📡 Source Categories</h4>
            <div style={st.categoryGrid}>
              {Object.entries(sourceCategories).map(([cat, items]) => (
                <div key={cat} style={st.categoryBlock}>
                  <div style={st.categoryLabel}>{cat}</div>
                  <div style={st.pillRow}>
                    {items.map(item => (
                      <span key={item} style={st.pill}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Best For / Not For */}
        {(bestFor || notFor) && (
          <div style={st.forRow}>
            {bestFor && (
              <div style={st.bestForBox}>
                <strong style={st.forTitle}>✅ Best for</strong>
                <p style={st.forText}>{bestFor}</p>
              </div>
            )}
            {notFor && (
              <div style={st.notForBox}>
                <strong style={st.forTitle}>⛔ Not for</strong>
                <p style={st.forText}>{notFor}</p>
              </div>
            )}
          </div>
        )}

        {/* Roadmap */}
        {(q2 || q4) && (
          <div style={st.roadmapSection}>
            <h4 style={st.sectionHeading}>🗺️ Roadmap</h4>
            <div style={st.roadmapGrid}>
              {q2 && (
                <div style={st.roadmapCol}>
                  <div style={st.roadmapLabel}>Q2 '26</div>
                  <p style={st.roadmapText}>{q2}</p>
                </div>
              )}
              {q4 && (
                <div style={st.roadmapCol}>
                  <div style={st.roadmapLabel}>Q4 '26+</div>
                  <p style={st.roadmapText}>{q4}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Readiness Check */}
      <div style={st.readinessCard}>
        <h3 style={st.sectionHeading}>🔍 Readiness Check</h3>
        <div style={st.readinessGrid}>
          <div style={st.readinessItem}>
            <span style={st.readinessLabel}>Protocol</span>
            <span style={st.readinessBadge}>{protocol || "—"}</span>
          </div>
          <div style={st.readinessItem}>
            <span style={st.readinessLabel}>Auth Method</span>
            <span style={st.readinessBadge}>{authMethod || "—"}</span>
          </div>
          <div style={st.readinessItem}>
            <span style={st.readinessLabel}>MID Server</span>
            <span style={{ ...st.readinessBadge, background: midServer?.toLowerCase().includes("required") ? "#FEF3C7" : "#E8F8F5" }}>
              {midServer || "Not required"}
            </span>
          </div>
          <div style={st.readinessItem}>
            <span style={st.readinessLabel}>Latency</span>
            <span style={st.readinessBadge}>{latency || "—"}</span>
          </div>
          <div style={st.readinessItem}>
            <span style={st.readinessLabel}>Write-back</span>
            <span style={{ ...st.readinessBadge, background: hasWriteBack ? "#E8F8F5" : "#FEE2E2" }}>
              {hasWriteBack ? "✅ Supported" : "❌ Not supported"}
            </span>
          </div>
          {writeBackNote && (
            <div style={{ ...st.readinessItem, gridColumn: "1 / -1" }}>
              <span style={st.readinessLabel}>Note</span>
              <span style={{ ...st.readinessBadge, background: "#F4F6F9" }}>{writeBackNote}</span>
            </div>
          )}
        </div>
      </div>

      {/* Pricing Calculator */}
      <PricingCalculator />

      {/* Action Buttons */}
      <div style={st.actions}>
        <button
          style={st.btnDisabled}
          disabled
          title="Coming Soon — This feature is in progress"
        >
          ▶ See {name.split(" ")[0]} Demo
        </button>
        <button style={st.btnSecondary} onClick={() => setShowPicker(true)}>
          Compare with…
        </button>
        <button style={st.btnBack} onClick={onBack}>← Back</button>
      </div>

      {showPicker && (
        <ConnectorPicker
          currentId={connectorId}
          onSelect={(id) => navigate({ view: "compare", a: connectorId, b: id })}
          onCancel={() => setShowPicker(false)}
        />
      )}
    </div>
  );
}

const st: Record<string, React.CSSProperties> = {
  container: {},
  loading: { textAlign: "center", color: "#5A6677", padding: "60px 0" },

  // Breadcrumb
  breadcrumb: { fontSize: 13, marginBottom: 16 },
  breadLink: { color: "#00C6A2", cursor: "pointer" },
  breadSep: { color: "#94A3B8", margin: "0 2px" },
  breadCurrent: { color: "#5A6677" },

  // Mini search
  miniSearch: { marginBottom: 20 },
  miniSearchInput: {
    width: "100%", padding: "10px 14px", borderRadius: 8,
    border: "1px solid #E0E5EC", fontSize: 14, background: "#fff",
    outline: "none", boxSizing: "border-box"
  },

  // Main Card
  mainCard: { background: "#fff", border: "1px solid #E0E5EC", borderRadius: 12, padding: 28, marginBottom: 20 },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  nameRow: { display: "flex", alignItems: "center", gap: 12 },
  title: { color: "#0B2D4E", fontSize: 24, fontWeight: 700, margin: 0 },
  badge: { color: "#fff", fontSize: 11, padding: "3px 10px", borderRadius: 6, fontWeight: 600 },
  closeBtn: {
    background: "none", border: "1px solid #E0E5EC", borderRadius: 6,
    width: 32, height: 32, fontSize: 16, cursor: "pointer", color: "#5A6677",
    display: "flex", alignItems: "center", justifyContent: "center"
  },
  tagline: { color: "#5A6677", fontSize: 14, marginTop: 6, marginBottom: 0 },
  detail: { color: "#1A1A1A", fontSize: 13, lineHeight: 1.7, marginTop: 12, marginBottom: 0 },

  // Source categories
  sourcesSection: { marginTop: 24 },
  sectionHeading: { fontSize: 14, fontWeight: 700, color: "#0B2D4E", margin: "0 0 12px" },
  categoryGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  categoryBlock: {},
  categoryLabel: { fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.6, color: "#5A6677", marginBottom: 6 },
  pillRow: { display: "flex", gap: 6, flexWrap: "wrap" },
  pill: { background: "#E8F8F5", color: "#0B2D4E", fontSize: 12, padding: "4px 10px", borderRadius: 14, fontWeight: 500 },

  // Best for / Not for
  forRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 24 },
  bestForBox: { background: "#ECFDF5", borderRadius: 8, padding: 16, border: "1px solid #A7F3D0" },
  notForBox: { background: "#FEF2F2", borderRadius: 8, padding: 16, border: "1px solid #FECACA" },
  forTitle: { fontSize: 13, color: "#1A1A1A", display: "block", marginBottom: 6 },
  forText: { fontSize: 13, color: "#5A6677", margin: 0, lineHeight: 1.5 },

  // Roadmap
  roadmapSection: { marginTop: 24 },
  roadmapGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  roadmapCol: { background: "#F4F6F9", borderRadius: 8, padding: 16 },
  roadmapLabel: { fontSize: 12, fontWeight: 700, color: "#00C6A2", marginBottom: 6 },
  roadmapText: { fontSize: 13, color: "#1A1A1A", margin: 0, lineHeight: 1.5 },

  // Context Engine
  sectionHeadingUpper: { fontSize: 12, fontWeight: 700, color: "#0B2D4E", textTransform: "uppercase" as const, letterSpacing: 0.8, margin: "0 0 12px" },
  contextSection: { marginTop: 24 },
  contextCard: { background: "#F8FAFC", borderRadius: 8, padding: 14 },
  contextRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" as const },
  contextLabel: { fontSize: 12, fontWeight: 600, color: "#0B2D4E" },
  feedPill: { background: "#E0F2FA", color: "#0B2D4E", fontSize: 12, padding: "3px 10px", borderRadius: 12, fontWeight: 500 },
  govPill: { background: "#F0E8FF", color: "#6B21A8", fontSize: 12, padding: "3px 10px", borderRadius: 12, fontWeight: 500 },
  contextNote: { fontSize: 13, color: "#5A6677", margin: "4px 0 0", fontStyle: "italic", lineHeight: 1.4 },

  // Integration Patterns (chapters)
  chaptersSection: { marginTop: 24 },
  chaptersList: { display: "flex", flexDirection: "column" as const, gap: 10 },
  chapterCard: { background: "#F8FAFC", borderRadius: 8, padding: 14, border: "1px solid #E0E5EC" },
  chapterBadge: { color: "#fff", fontSize: 11, padding: "2px 8px", borderRadius: 10, fontWeight: 600 },
  chapterContent: {},
  chapterTitleRow: { marginBottom: 6 },
  chapterTitle: { fontSize: 14, fontWeight: 600, color: "#0B2D4E", marginBottom: 4 },
  chapterSummary: { fontSize: 13, color: "#5A6677", lineHeight: 1.5 },

  // Readiness
  readinessCard: { background: "#fff", border: "1px solid #E0E5EC", borderRadius: 12, padding: 24, marginBottom: 20 },
  readinessGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 },
  readinessItem: { display: "flex", flexDirection: "column", gap: 4 },
  readinessLabel: { fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, color: "#5A6677" },
  readinessBadge: { fontSize: 13, padding: "6px 12px", borderRadius: 6, background: "#F4F6F9", color: "#1A1A1A", fontWeight: 500 },

  // Pricing Calculator
  calcContainer: { background: "#fff", border: "1px solid #E0E5EC", borderRadius: 12, padding: 24, marginBottom: 20 },
  calcTabs: { display: "flex", gap: 0, marginBottom: 20, borderBottom: "1px solid #E0E5EC" },
  calcTab: {
    background: "none", border: "none", borderBottom: "2px solid transparent",
    padding: "8px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#5A6677"
  },
  calcTabActive: { borderBottomColor: "#00C6A2", color: "#00C6A2", fontWeight: 600 },
  sliderGroup: { marginBottom: 20 },
  sliderLabel: { fontSize: 13, color: "#1A1A1A", display: "block", marginBottom: 8 },
  slider: { width: "100%", accentColor: "#00C6A2" },
  sliderRange: { display: "flex", justifyContent: "space-between", fontSize: 11, color: "#94A3B8", marginTop: 4 },
  creditsDisplay: {
    background: "#0B2D4E", borderRadius: 8, padding: 20,
    display: "flex", alignItems: "baseline", gap: 10, marginTop: 8
  },
  creditsNumber: { fontSize: 32, fontWeight: 700, color: "#00C6A2" },
  creditsLabel: { fontSize: 14, color: "#fff" },

  // Actions
  actions: { display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 },
  btnPrimary: {
    background: "#00C6A2", color: "#fff", border: "none", borderRadius: 8,
    padding: "12px 24px", fontWeight: 600, fontSize: 14, cursor: "pointer"
  },
  btnSecondary: {
    background: "#fff", color: "#00C6A2", border: "2px solid #00C6A2", borderRadius: 8,
    padding: "12px 24px", fontWeight: 600, fontSize: 14, cursor: "pointer"
  },
  btnDisabled: {
    background: "#D1D5DB", color: "#9CA3AF", border: "none", borderRadius: 8,
    padding: "12px 24px", fontWeight: 600, fontSize: 14, cursor: "not-allowed",
    opacity: 0.7
  },
  btnBack: {
    background: "#F4F6F9", color: "#5A6677", border: "1px solid #E0E5EC", borderRadius: 8,
    padding: "12px 24px", fontWeight: 500, fontSize: 14, cursor: "pointer"
  }
};
