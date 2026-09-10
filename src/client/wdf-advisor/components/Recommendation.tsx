import React, { useState, useEffect } from "react";
import { Recommendation as RecType } from "../services/decisionEngine";
import { fetchAllConnectors, fetchChecklistItems } from "../services/api";
import { navigate } from "../app";
import { HeadlessAIIntegration } from "./HeadlessAIIntegration";
import { getChaptersForConnector, OutboundChapter } from "../services/outboundConcept";

interface Props {
  recommendation: RecType;
}

/* ── Connector → demo scenario mapping (mirrors QuickChips pattern) ── */
const CONNECTOR_DEMO_MAP: Record<string, string> = {
  "Integration Hub": "Integration Hub",
  "ZCC for ERP": "Accounts Receivable",
  "Stream Connect": "Event Streaming",
  "MCP Client": "Fraud Detection",
  "External Content Connectors": "HRSD Payroll",
};

/* ── Governance banner state ── */
interface GovState {
  loaded: boolean;
  denied: boolean;
  blockers: { label: string }[];
  warnings: { label: string }[];
}

export function Recommendation({ recommendation }: Props) {
  const [connectorMap, setConnectorMap] = useState<Record<string, string>>({});
  const [gov, setGov] = useState<GovState>({ loaded: false, denied: false, blockers: [], warnings: [] });

  useEffect(() => {
    fetchAllConnectors().then((list: any[]) => {
      const map: Record<string, string> = {};
      list.forEach((c) => {
        const name = c.name?.display_value || c.name?.value || c.name || "";
        map[name] = c.sys_id?.value || c.sys_id || "";
      });
      setConnectorMap(map);
    });
  }, []);

  /* ── Fetch governance checklist on mount / recommendation change ── */
  useEffect(() => {
    let cancelled = false;
    fetchChecklistItems()
      .then(({ items, denied }) => {
        if (cancelled) return;
        if (denied) {
          setGov({ loaded: true, denied: true, blockers: [], warnings: [] });
          return;
        }
        const blockers = items.filter((i: any) => {
          const status = (i.status?.display_value || i.status?.value || "").toLowerCase();
          return status === "blocker";
        });
        const warnings = items.filter((i: any) => {
          const status = (i.status?.display_value || i.status?.value || "").toLowerCase();
          return status === "warning";
        });
        setGov({
          loaded: true,
          denied: false,
          blockers: blockers.map((i: any) => ({ label: i.label?.display_value || i.label?.value || i.label || "" })),
          warnings: warnings.map((i: any) => ({ label: i.label?.display_value || i.label?.value || i.label || "" })),
        });
      })
      .catch(() => {
        /* Non-blocking: silently swallow errors */
        if (!cancelled) setGov({ loaded: true, denied: true, blockers: [], warnings: [] });
      });
    return () => { cancelled = true; };
  }, [recommendation.primary]);

  const primaryId = connectorMap[recommendation.primary] || "";
  const fallbackId = connectorMap[recommendation.fallback] || "";
  const isHigh = recommendation.confidence === "High";
  const demoId = CONNECTOR_DEMO_MAP[recommendation.primary];
  const chapters = getChaptersForConnector(recommendation.primary);

  const badgeStyle: React.CSSProperties = {
    display: "inline-block", padding: "2px 10px", borderRadius: "12px", fontSize: "12px",
    fontWeight: 600, color: "#fff", background: isHigh ? "#10B981" : "#F59E0B",
  };

  /* ── Governance banner helpers ── */
  const hasIssues = gov.blockers.length > 0 || gov.warnings.length > 0;
  const showBanner = gov.loaded && !gov.denied;

  return (
    <div style={{ padding: "32px", maxWidth: 560, margin: "0 auto" }}>

      {/* ── Governance Readiness Banner ────────────────────── */}
      {showBanner && hasIssues && (
        <div style={govStyles.warningBanner}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 18 }}>⚠️</span>
            <strong style={{ fontSize: 14, color: "#5A3E00" }}>Governance Readiness Check</strong>
          </div>
          <p style={{ margin: "0 0 8px", fontSize: 13, color: "#5A3E00" }}>
            {gov.blockers.length} blocker{gov.blockers.length !== 1 ? "s" : ""} and{" "}
            {gov.warnings.length} warning{gov.warnings.length !== 1 ? "s" : ""} found in your
            governance checklist that may affect this recommendation.
          </p>
          {gov.blockers.length > 0 && (
            <ul style={{ margin: "0 0 10px", paddingLeft: 20 }}>
              {gov.blockers.slice(0, 3).map((b, idx) => (
                <li key={idx} style={{ fontSize: 13, color: "#5A3E00", marginBottom: 2 }}>{b.label}</li>
              ))}
            </ul>
          )}
          <button
            onClick={() => navigate({ view: "home", tab: "admin" })}
            style={govStyles.reviewBtn}
          >
            Review Governance Checklist
          </button>
        </div>
      )}
      {showBanner && !hasIssues && (
        <div style={govStyles.successBanner}>
          <span style={{ fontSize: 16 }}>✓</span>
          <span style={{ fontSize: 13, color: "#006B50", fontWeight: 600 }}>
            Governance checks passed — no blockers detected
          </span>
        </div>
      )}

      <p style={{ fontSize: "14px", color: "#5A6677", margin: "0 0 8px" }}>🎯 Recommended Connector</p>
      <h2 style={{ color: "#00C6A2", margin: "0 0 12px", fontSize: "24px" }}>
        {recommendation.primary}
      </h2>
      <span style={badgeStyle}>{recommendation.confidence} confidence</span>
      {recommendation.note && (
        <p style={{ color: "#5A6677", fontStyle: "italic", margin: "12px 0 0" }}>
          {recommendation.note}
        </p>
      )}
      <div style={{ marginTop: 24, padding: "12px 16px", background: "#F4F6F9", borderRadius: 8 }}>
        <span style={{ fontSize: "13px", color: "#5A6677" }}>Also consider:&nbsp;</span>
        <strong style={{ color: "#1A1A1A" }}>{recommendation.fallback}</strong>
      </div>
      {chapters.length > 0 && (
        <div style={chapterStyles.section}>
          <p style={chapterStyles.heading}>📚 Related Integration Patterns</p>
          <div style={chapterStyles.list}>
            {chapters.map(ch => (
              <div key={ch.id} style={chapterStyles.item}>
                <span style={{ ...chapterStyles.badge, background: ch.color }}>{ch.quadrant}</span>
                <span style={chapterStyles.title}>{ch.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
        {primaryId && (
          <button
            onClick={() => navigate({ view: "connector", id: primaryId })}
            style={btnStyle("#00C6A2", "#fff")}
          >
            View Connector
          </button>
        )}
        {primaryId && fallbackId && (
          <button
            onClick={() => navigate({ view: "compare", a: primaryId, b: fallbackId })}
            style={btnStyle("#fff", "#0B2D4E")}
          >
            Compare with {recommendation.fallback}
          </button>
        )}
        {demoId && (
          <button
            onClick={() => navigate({ view: "demo", id: demoId })}
            style={btnStyle("#FF6B35", "#fff")}
          >
            See it in action →
          </button>
        )}
      </div>

      {/* ── Headless AI integration (MCP Client/Server, Stream, Live) ── */}
      <HeadlessAIIntegration connector={recommendation.primary} />
    </div>
  );
}

function btnStyle(bg: string, color: string): React.CSSProperties {
  return {
    padding: "10px 20px", borderRadius: 6, border: bg === "#fff" ? "1px solid #E0E5EC" : "none",
    background: bg, color, fontWeight: 600, fontSize: "14px", cursor: "pointer",
  };
}

/* ── Chapter styles ── */
const chapterStyles: Record<string, React.CSSProperties> = {
  section: { marginTop: 20, padding: "14px 16px", background: "#F8F0FF", borderRadius: 8, border: "1px solid #E8D5F5" },
  heading: { fontSize: 13, fontWeight: 600, color: "#6B21A8", margin: "0 0 10px" },
  list: { display: "flex", flexDirection: "column" as const, gap: 8 },
  item: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" as const },
  badge: { color: "#fff", fontSize: 11, padding: "2px 8px", borderRadius: 10, fontWeight: 600, flexShrink: 0 },
  title: { fontSize: 13, color: "#1A1A1A", fontWeight: 500 },
};

/* ── Governance banner styles ── */
const govStyles: Record<string, React.CSSProperties> = {
  warningBanner: {
    background: "#FFF3E0",
    border: "1px solid #FFB74D",
    borderRadius: 8,
    padding: "14px 16px",
    marginBottom: 16,
  },
  successBanner: {
    background: "#E8FFF5",
    border: "1px solid #00C6A2",
    borderRadius: 8,
    padding: "14px 16px",
    marginBottom: 16,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  reviewBtn: {
    padding: "8px 16px",
    borderRadius: 6,
    border: "1px solid #FFB74D",
    background: "#fff",
    color: "#5A3E00",
    fontWeight: 600,
    fontSize: 13,
    cursor: "pointer",
  },
};
