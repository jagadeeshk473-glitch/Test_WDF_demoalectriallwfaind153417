import React, { useState, useEffect } from "react";
import { fetchConnector } from "../services/api";
import { navigate } from "../app";

interface Props {
  connectorA: string;
  connectorB: string;
  onBack: () => void;
}

const v = (f: any) => f?.display_value || f?.value || f || "";

type CellType = "positive" | "negative" | "neutral" | "info";

function classifyCell(text: string): CellType {
  const t = text.toLowerCase();
  if (/^(yes|✅|full|sub-second|milliseconds|supported)/.test(t)) return "positive";
  if (/^(❌|not supported|not required|no$|none)/.test(t)) return "negative";
  if (/^(no –|optional|cloud|seconds|partial)/.test(t)) return "neutral";
  return "info";
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

function StatusBadge({ status }: { status: string }) {
  const s = (status || "").toLowerCase();
  let bg = "#EEF2FF";
  let color = "#4338CA";
  let label = status || "Unknown";

  if (s.indexOf("ga") > -1 || s === "generally available") {
    bg = "#D1FAE5"; color = "#065F46"; label = "GA";
  } else if (s.indexOf("beta") > -1 || s.indexOf("preview") > -1) {
    bg = "#FEF3C7"; color = "#92400E"; label = "Preview";
  } else if (s.indexOf("roadmap") > -1 || s.indexOf("planned") > -1) {
    bg = "#E0E7FF"; color = "#3730A3"; label = "Roadmap";
  }

  return (
    <span style={{
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: 12,
      fontSize: 11,
      fontWeight: 600,
      background: bg,
      color: color,
      marginLeft: 8,
      verticalAlign: "middle"
    }}>
      {label}
    </span>
  );
}

function DiffSummary({ rowsA, rowsB, nameA, nameB }: { rowsA: any[]; rowsB: any[]; nameA: string; nameB: string }) {
  const diffs: string[] = [];

  for (let i = 0; i < rowsA.length; i++) {
    const typeA = classifyCell(rowsA[i].value);
    const typeB = classifyCell(rowsB[i].value);
    if (typeA !== typeB) {
      if (typeA === "positive" && typeB === "negative") {
        diffs.push(`${nameA} supports ${rowsA[i].label.toLowerCase()} while ${nameB} does not`);
      } else if (typeB === "positive" && typeA === "negative") {
        diffs.push(`${nameB} supports ${rowsB[i].label.toLowerCase()} while ${nameA} does not`);
      }
    }
  }

  if (diffs.length === 0) return null;

  return (
    <div style={styles.summaryCard}>
      <div style={styles.summaryTitle}>⚡ Key Differences</div>
      <ul style={styles.summaryList}>
        {diffs.map((d, i) => <li key={i} style={styles.summaryItem}>{d}</li>)}
      </ul>
    </div>
  );
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

  if (loading) return <div style={styles.loadingWrap}><div style={styles.spinner} /><span style={styles.loadingText}>Loading comparison...</span></div>;
  if (!a || !b) return <div style={styles.loadingWrap}><span style={styles.loadingText}>Could not load connectors.</span></div>;

  const rowsA = deriveRows(a);
  const rowsB = deriveRows(b);
  const nameA = v(a.name);
  const nameB = v(b.name);

  return (
    <div style={styles.container}>
      {/* Back link */}
      <a style={styles.back} onClick={onBack}>← Back to advisor</a>

      {/* Header card */}
      <div style={styles.headerCard}>
        <div style={styles.headerTop}>
          <h1 style={styles.title}>Connector Comparison</h1>
        </div>
        <div style={styles.headerConnectors}>
          <div style={styles.connectorBadge}>
            <a
              style={styles.connectorLink}
              onClick={() => navigate({ view: "connector", id: connectorA })}
            >
              {nameA}
            </a>
            <StatusBadge status={v(a.status)} />
          </div>
          <div style={styles.vsLabel}>VS</div>
          <div style={styles.connectorBadge}>
            <a
              style={styles.connectorLink}
              onClick={() => navigate({ view: "connector", id: connectorB })}
            >
              {nameB}
            </a>
            <StatusBadge status={v(b.status)} />
          </div>
        </div>
        {a.tagline && b.tagline && (
          <div style={styles.taglineRow}>
            <span style={styles.tagline}>{v(a.tagline)}</span>
            <span style={styles.tagline}>{v(b.tagline)}</span>
          </div>
        )}
      </div>

      {/* Comparison table card */}
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Capability</th>
              <th style={styles.thName}>
                <a
                  style={styles.thLink}
                  onClick={() => navigate({ view: "connector", id: connectorA })}
                >
                  {nameA}
                </a>
              </th>
              <th style={styles.thName}>
                <a
                  style={styles.thLink}
                  onClick={() => navigate({ view: "connector", id: connectorB })}
                >
                  {nameB}
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            {rowsA.map((row, i) => {
              const typeA = classifyCell(row.value);
              const typeB = classifyCell(rowsB[i].value);
              const isEven = i % 2 === 0;
              return (
                <tr key={i} style={isEven ? styles.rowEven : styles.rowOdd}>
                  <td style={styles.label}>
                    <span style={styles.labelBorder} />
                    {row.label}
                  </td>
                  <td style={{ ...styles.cell, ...cellBg(typeA) }}>{row.value}</td>
                  <td style={{ ...styles.cell, ...cellBg(typeB) }}>{rowsB[i].value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary / verdict section */}
      <DiffSummary rowsA={rowsA} rowsB={rowsB} nameA={nameA} nameB={nameB} />
    </div>
  );
}

function cellBg(type: CellType): React.CSSProperties {
  switch (type) {
    case "positive": return { background: "#D1FAE5" };
    case "negative": return { background: "#FDE8E8" };
    case "neutral": return { background: "#FEF3C7" };
    default: return { background: "#F8FAFE" };
  }
}

const styles: Record<string, React.CSSProperties> = {
  container: { padding: "24px 32px", maxWidth: 1000, margin: "0 auto" },
  loadingWrap: { textAlign: "center", padding: "80px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 },
  spinner: { width: 28, height: 28, border: "3px solid #E0E5EC", borderTop: "3px solid #00C6A2", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
  loadingText: { color: "#5A6677", fontSize: 14 },
  back: { color: "#00C6A2", cursor: "pointer", fontSize: 13, display: "inline-block", marginBottom: 16, fontWeight: 500 },

  // Header card
  headerCard: {
    background: "linear-gradient(135deg, #F8FAFE 0%, #EEF6FF 100%)",
    borderRadius: 12,
    padding: "24px 28px",
    marginBottom: 20,
    border: "1px solid #E0E5EC",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
  },
  headerTop: { marginBottom: 16 },
  title: { color: "#0B2D4E", fontSize: 22, fontWeight: 700, margin: 0 },
  headerConnectors: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    padding: "12px 0"
  },
  connectorBadge: {
    display: "flex",
    alignItems: "center",
    background: "#FFFFFF",
    border: "1px solid #E0E5EC",
    borderRadius: 8,
    padding: "10px 18px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
  },
  connectorLink: {
    color: "#006B5E",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    textDecoration: "none",
    borderBottom: "2px solid transparent",
    transition: "border-color 0.2s"
  },
  vsLabel: {
    color: "#8892A4",
    fontWeight: 700,
    fontSize: 13,
    textTransform: "uppercase" as any,
    letterSpacing: 1
  },
  taglineRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 12,
    padding: "0 4px"
  },
  tagline: {
    color: "#5A6677",
    fontSize: 12,
    fontStyle: "italic",
    maxWidth: "45%"
  },

  // Table card
  tableCard: {
    background: "#FFFFFF",
    borderRadius: 12,
    border: "1px solid #E0E5EC",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    overflow: "hidden",
    marginBottom: 20
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 13 },
  th: {
    padding: "14px 16px",
    borderBottom: "2px solid #E0E5EC",
    textAlign: "left",
    color: "#5A6677",
    fontWeight: 600,
    fontSize: 12,
    textTransform: "uppercase" as any,
    letterSpacing: 0.5,
    background: "#FAFBFD"
  },
  thName: {
    padding: "14px 16px",
    borderBottom: "2px solid #E0E5EC",
    fontWeight: 700,
    textAlign: "left",
    background: "#FAFBFD"
  },
  thLink: {
    color: "#006B5E",
    cursor: "pointer",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 700
  },
  rowEven: { background: "#FFFFFF" },
  rowOdd: { background: "#FAFBFD" },
  label: {
    padding: "12px 16px",
    fontWeight: 600,
    color: "#0B2D4E",
    borderBottom: "1px solid #F0F2F5",
    width: "24%",
    position: "relative" as any,
    paddingLeft: 22
  },
  labelBorder: {
    position: "absolute" as any,
    left: 0,
    top: 8,
    bottom: 8,
    width: 3,
    borderRadius: 2,
    background: "#00C6A2"
  },
  cell: {
    padding: "12px 16px",
    borderBottom: "1px solid #F0F2F5",
    color: "#1A1A1A",
    borderRadius: 4,
    lineHeight: 1.5
  },

  // Summary card
  summaryCard: {
    background: "#FFFFFF",
    borderRadius: 12,
    border: "1px solid #E0E5EC",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    padding: "20px 24px"
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: "#0B2D4E",
    marginBottom: 12
  },
  summaryList: {
    margin: 0,
    padding: "0 0 0 16px",
    listStyle: "none"
  },
  summaryItem: {
    position: "relative" as any,
    paddingLeft: 14,
    marginBottom: 8,
    color: "#374151",
    fontSize: 13,
    lineHeight: 1.6
  }
};
