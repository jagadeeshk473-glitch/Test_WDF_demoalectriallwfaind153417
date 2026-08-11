import React from "react";
import { navigate } from "../app";

const CHIPS = [
  { label: "HRSD Pay Query", demoId: "HRSD Payroll", highlight: true },
  { label: "Fraud detection", demoId: "Fraud Detection", highlight: false },
  { label: "Live SAP AR", demoId: "Accounts Receivable", highlight: false },
  { label: "Inventory alert", demoId: "Event Streaming", highlight: false },
  { label: "P1 incident", demoId: "Integration Hub", highlight: false }
];

export function QuickChips() {
  return (
    <div style={styles.row}>
      {CHIPS.map((chip) => (
        <button
          key={chip.demoId}
          style={{
            ...styles.chip,
            ...(chip.highlight ? styles.highlighted : {})
          }}
          onClick={() => navigate({ view: "demo", id: chip.demoId })}
        >
          <span>📋</span>
          <span>{chip.label}</span>
        </button>
      ))}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  row: {
    display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center"
  },
  chip: {
    display: "flex", alignItems: "center", gap: 6,
    padding: "8px 14px", borderRadius: 20,
    border: "1px solid #E0E5EC", background: "#fff",
    fontSize: 13, cursor: "pointer", whiteSpace: "nowrap",
    color: "#1A1A1A", fontWeight: 500
  },
  highlighted: {
    background: "#E8F8F5", borderColor: "#00C6A2", color: "#0B2D4E"
  }
};
