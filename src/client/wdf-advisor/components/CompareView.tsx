import React, { useState, useEffect } from "react";
import { fetchConnector } from "../services/api";

interface Props {
  connectorA: string;
  connectorB: string;
  onBack: () => void;
}

const v = (f: any) => f?.display_value || f?.value || f || "";

function cellColor(text: string): React.CSSProperties {
  const t = text.toLowerCase();
  if (/^(yes|✅|full|sub-second|milliseconds)/.test(t))
    return { background: "rgba(16,185,129,0.1)" };
  if (/^(no –|optional|cloud|seconds)/.test(t))
    return { background: "rgba(245,158,11,0.1)" };
  if (/^(❌|not supported|not required)/.test(t))
    return { background: "rgba(239,68,68,0.1)" };
  return {};
}

function deriveRows(d: any) {
  const wb = v(d.supports_write_back) === "true" || v(d.supports_write_back) === "1";
  const mid = v(d.mid_server_requirement);
  let onPrem = mid;
  if (/required/i.test(mid)) onPrem = "✅ Yes via MID Server";
  else if (/not required/i.test(mid)) onPrem = "Cloud-only";

  return [
    { label: "Best for", value: v(d.best_for) || "—" },
    { label: "Not for", value: v(d.not_for) || "—" },
    { label: "Data stays in source", value: wb ? "No – supports write-back" : "Yes – read-only" },
    { label: "Write-back capability", value: wb ? `✅ Yes${v(d.write_back_note) ? " – " + v(d.write_back_note) : ""}` : "❌ No" },
    { label: "On-premises support", value: onPrem || "—" },
    { label: "Latency / speed", value: v(d.latency) || "—" },
    { label: "Next-quarter roadmap", value: v(d.q4_roadmap) || "—" },
  ];
}

export function CompareView({ connectorA, connectorB, onBack }: Props) {
  const [a, setA] = useState<any>(null);
  const [b, setB] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchConnector(connectorA), fetchConnector(connectorB)])
      .then(([ra, rb]) => { setA(ra); setB(rb); })
      .finally(() => setLoading(false));
  }, [connectorA, connectorB]);

  if (loading) return <div style={s.loading}>Loading comparison...</div>;
  if (!a || !b) return <div style={s.loading}>Could not load connectors.</div>;

  const rowsA = deriveRows(a);
  const rowsB = deriveRows(b);

  return (
    <div style={s.container}>
      <a style={s.back} onClick={onBack}>← Back to advisor</a>
      <h1 style={s.title}>Connector Comparison</h1>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}></th>
            <th style={s.thName}>{v(a.name)}</th>
            <th style={s.thName}>{v(b.name)}</th>
          </tr>
        </thead>
        <tbody>
          {rowsA.map((row, i) => (
            <tr key={i}>
              <td style={s.label}>{row.label}</td>
              <td style={{ ...s.cell, ...cellColor(row.value) }}>{row.value}</td>
              <td style={{ ...s.cell, ...cellColor(rowsB[i].value) }}>{rowsB[i].value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  container: { padding: "24px 32px", maxWidth: 960 },
  loading: { textAlign: "center", color: "#5A6677", padding: "60px 0" },
  back: { color: "#00C6A2", cursor: "pointer", fontSize: 13, display: "inline-block", marginBottom: 12 },
  title: { color: "#0B2D4E", fontSize: 20, fontWeight: 700, margin: "8px 0 16px" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 13 },
  th: { padding: "10px 12px", borderBottom: "2px solid #E0E5EC", textAlign: "left" },
  thName: { padding: "10px 12px", borderBottom: "2px solid #E0E5EC", color: "#00C6A2", fontWeight: 700, textAlign: "left" },
  label: { padding: "10px 12px", fontWeight: 600, color: "#0B2D4E", borderBottom: "1px solid #E0E5EC", width: "22%" },
  cell: { padding: "10px 12px", borderBottom: "1px solid #E0E5EC", color: "#1A1A1A", borderRadius: 4 },
};
