import React, { useState, useEffect } from "react";
import { Recommendation as RecType } from "../services/decisionEngine";
import { fetchAllConnectors } from "../services/api";
import { navigate } from "../app";

interface Props {
  recommendation: RecType;
}

export function Recommendation({ recommendation }: Props) {
  const [connectorMap, setConnectorMap] = useState<Record<string, string>>({});

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

  const primaryId = connectorMap[recommendation.primary] || "";
  const fallbackId = connectorMap[recommendation.fallback] || "";
  const isHigh = recommendation.confidence === "High";

  const badgeStyle: React.CSSProperties = {
    display: "inline-block", padding: "2px 10px", borderRadius: "12px", fontSize: "12px",
    fontWeight: 600, color: "#fff", background: isHigh ? "#10B981" : "#F59E0B",
  };

  return (
    <div style={{ padding: "32px", maxWidth: 560, margin: "0 auto" }}>
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
      </div>
    </div>
  );
}

function btnStyle(bg: string, color: string): React.CSSProperties {
  return {
    padding: "10px 20px", borderRadius: 6, border: bg === "#fff" ? "1px solid #E0E5EC" : "none",
    background: bg, color, fontWeight: 600, fontSize: "14px", cursor: "pointer",
  };
}
