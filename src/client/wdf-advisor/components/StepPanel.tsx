import React from "react";

interface Props {
  panelType: string;
  panelData: any;
  persona: string;
}

export function StepPanel({ panelType, panelData, persona }: Props) {
  if (!panelData) return null;
  let parsed = panelData;
  if (typeof panelData === "string") {
    try { parsed = JSON.parse(panelData); } catch { return null; }
  }

  return (
    <div style={{ marginTop: 12 }}>
      {panelType === "rows" && <RowsPanel data={parsed} />}
      {panelType === "pairs" && <PairsPanel pairs={parsed.pairs} />}
      {panelType === "connectors" && <ConnectorsPanel data={parsed} />}
      {panelType === "sources" && <SourcesPanel data={parsed} />}
      {persona === "builder" && parsed.technical_flow && (
        <TechFlow from={parsed.technical_flow.from} to={parsed.technical_flow.to} />
      )}
    </div>
  );
}

function RowsPanel({ data }: { data: any }) {
  // Support both formats: {items: string[]} and {rows: [{text: string}]}
  const items: string[] = data.items || (data.rows || []).map((r: any) => typeof r === "string" ? r : r.text || "");
  if (!items.length) return null;
  return (
    <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#1A1A1A", lineHeight: 1.8 }}>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

function PairsPanel({ pairs }: { pairs?: { label: string; value: string }[] }) {
  if (!pairs?.length) return null;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "6px 12px", fontSize: 13 }}>
      {pairs.map((p, i) => (
        <React.Fragment key={i}>
          <span style={{ fontWeight: 600, color: "#1A1A1A" }}>{p.label}</span>
          <span style={{ color: "#5A6677" }}>{p.value}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

function ConnectorsPanel({ data }: { data: any }) {
  // Support both formats: {options: [{name, correct, reason}]} and {connectors: [{source, target}]}
  const options = data.options;
  const connectors = data.connectors;

  if (connectors?.length) {
    return (
      <div style={{ fontSize: 13 }}>
        {connectors.map((c: any, i: number) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, padding: "6px 0", borderBottom: i < connectors.length - 1 ? "1px solid #F0F2F5" : "none" }}>
            <span style={{ fontWeight: 600, color: "#0B2D4E", minWidth: 180 }}>{c.source}</span>
            <span style={{ color: "#00C6A2", fontWeight: 700, fontSize: 16 }}>→</span>
            <span style={{ color: "#5A6677" }}>{c.target}</span>
          </div>
        ))}
      </div>
    );
  }

  if (options?.length) {
    return (
      <div style={{ fontSize: 13 }}>
        {options.map((o: any, i: number) => (
          <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
            <span style={{ color: o.correct ? "#10B981" : "#EF4444" }}>{o.correct ? "✅" : "❌"}</span>
            <span style={{ fontWeight: 600 }}>{o.name}</span>
            <span style={{ color: "#5A6677" }}>{o.reason}</span>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

const STATUS_COLORS: Record<string, string> = {
  pass: "#10B981",
  fail: "#EF4444",
  warn: "#F59E0B",
  info: "#3B82F6",
};

function SourcesPanel({ data }: { data: any }) {
  const sources = data.sources;
  const footer = data.footer;
  if (!sources?.length) return null;
  return (
    <div style={{ fontSize: 13 }}>
      {sources.map((s: any, i: number) => {
        const color = s.color || STATUS_COLORS[s.status] || "#5A6677";
        return (
          <div key={i} style={{ marginBottom: 10 }}>
            <span style={{ background: color + "20", color: color, padding: "3px 10px", borderRadius: 12, fontWeight: 600, fontSize: 12 }}>{s.name}</span>
            {s.status && <span style={{ marginLeft: 8, fontSize: 11, color: color, fontWeight: 600 }}>{s.status === "pass" ? "✓ PASS" : s.status === "fail" ? "✗ FAIL" : s.status.toUpperCase()}</span>}
            <div style={{ color: "#5A6677", marginTop: 4, paddingLeft: 4 }}>{s.detail}</div>
          </div>
        );
      })}
      {footer && <div style={{ color: "#5A6677", marginTop: 8, fontStyle: "italic" }}>{footer}</div>}
    </div>
  );
}

function TechFlow({ from, to }: { from: string; to: string }) {
  const box: React.CSSProperties = {
    background: "#0B2D4E", color: "#fff", padding: "8px 14px",
    borderRadius: 8, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap"
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16 }}>
      <div style={box}>{from}</div>
      <span style={{ color: "#5A6677", fontSize: 16 }}>──→</span>
      <div style={box}>{to}</div>
    </div>
  );
}
