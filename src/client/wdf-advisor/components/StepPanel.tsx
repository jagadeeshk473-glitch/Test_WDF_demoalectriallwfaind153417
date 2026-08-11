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
      {panelType === "rows" && <RowsPanel items={parsed.items} />}
      {panelType === "pairs" && <PairsPanel pairs={parsed.pairs} />}
      {panelType === "connectors" && <ConnectorsPanel options={parsed.options} />}
      {panelType === "sources" && <SourcesPanel sources={parsed.sources} footer={parsed.footer} />}
      {persona === "builder" && parsed.technical_flow && (
        <TechFlow from={parsed.technical_flow.from} to={parsed.technical_flow.to} />
      )}
    </div>
  );
}

function RowsPanel({ items }: { items?: string[] }) {
  if (!items?.length) return null;
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

function ConnectorsPanel({ options }: { options?: { name: string; correct: boolean; reason: string }[] }) {
  if (!options?.length) return null;
  return (
    <div style={{ fontSize: 13 }}>
      {options.map((o, i) => (
        <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
          <span style={{ color: o.correct ? "#10B981" : "#EF4444" }}>{o.correct ? "✅" : "❌"}</span>
          <span style={{ fontWeight: 600 }}>{o.name}</span>
          <span style={{ color: "#5A6677" }}>{o.reason}</span>
        </div>
      ))}
    </div>
  );
}

function SourcesPanel({ sources, footer }: { sources?: { name: string; color: string; detail: string }[]; footer?: string }) {
  if (!sources?.length) return null;
  return (
    <div style={{ fontSize: 13 }}>
      {sources.map((s, i) => (
        <div key={i} style={{ marginBottom: 8 }}>
          <span style={{ background: s.color + "26", color: s.color, padding: "2px 10px", borderRadius: 12, fontWeight: 600, fontSize: 12 }}>{s.name}</span>
          <div style={{ color: "#5A6677", marginTop: 4, paddingLeft: 4 }}>{s.detail}</div>
        </div>
      ))}
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
