import React, { useState, useEffect } from "react";
import { fetchAllConnectors } from "../services/api";

interface Props {
  currentId: string;
  onSelect: (id: string) => void;
  onCancel: () => void;
}

const v = (f: any) => f?.display_value || f?.value || f || "";

export function ConnectorPicker({ currentId, onSelect, onCancel }: Props) {
  const [connectors, setConnectors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllConnectors().then((list) => {
      setConnectors(list.filter((c: any) => v(c.sys_id) !== currentId));
    }).finally(() => setLoading(false));
  }, [currentId]);

  return (
    <div style={s.overlay} onClick={onCancel}>
      <div style={s.card} onClick={(e) => e.stopPropagation()}>
        <h3 style={s.heading}>Select a connector to compare</h3>
        {loading && <p style={s.muted}>Loading...</p>}
        <div style={s.list}>
          {connectors.map((c) => (
            <button key={v(c.sys_id)} style={s.item} onClick={() => onSelect(v(c.sys_id))}>
              <span style={s.name}>{v(c.name)}</span>
              <span style={s.tagline}>{v(c.tagline)}</span>
            </button>
          ))}
        </div>
        <button style={s.cancel} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed", inset: 0, background: "rgba(11,45,78,0.4)",
    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
  },
  card: {
    background: "#fff", borderRadius: 12, padding: "24px", width: 400,
    maxHeight: "70vh", display: "flex", flexDirection: "column", boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
  },
  heading: { margin: "0 0 12px", fontSize: 16, fontWeight: 700, color: "#0B2D4E" },
  muted: { color: "#5A6677", fontSize: 13 },
  list: { flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 },
  item: {
    display: "flex", flexDirection: "column", gap: 2, padding: "10px 12px",
    border: "1px solid #E0E5EC", borderRadius: 8, background: "#F4F6F9",
    cursor: "pointer", textAlign: "left",
  },
  name: { fontWeight: 600, fontSize: 14, color: "#0B2D4E" },
  tagline: { fontSize: 12, color: "#5A6677" },
  cancel: {
    marginTop: 12, padding: "8px 16px", border: "1px solid #E0E5EC",
    borderRadius: 6, background: "#fff", cursor: "pointer", fontSize: 13,
  },
};
