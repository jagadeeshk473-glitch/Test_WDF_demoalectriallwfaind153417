import React, { useState, useEffect } from "react";
import { fetchConnector } from "../services/api";
import { navigate } from "../app";
import { ConnectorPicker } from "./ConnectorPicker";

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

export function ConnectorDetail({ connectorId, persona, onBack }: Props) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    fetchConnector(connectorId).then(setData).finally(() => setLoading(false));
  }, [connectorId]);

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (!data) return <div style={styles.loading}>Connector not found.</div>;

  const name = v(data.name);
  const status = v(data.status);
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

  return (
    <div style={styles.container}>
      <a style={styles.back} onClick={onBack}>← Back to advisor</a>
      <div style={styles.header}>
        <h1 style={styles.title}>{name}</h1>
        {status && <span style={{ ...styles.badge, background: statusColor(status) }}>{status.toUpperCase()}</span>}
      </div>
      {detail && <p style={styles.detail}>{detail}</p>}

      {persona === "builder" && (
        <div style={styles.techGrid}>
          <div><strong>Protocol</strong><br />{protocol || "—"}</div>
          <div><strong>Auth Method</strong><br />{authMethod || "—"}</div>
          <div><strong>Connectivity (MID)</strong><br />{midServer || "—"}</div>
          <div><strong>Latency</strong><br />{latency || "—"}</div>
        </div>
      )}

      {persona === "admin" && (
        <div style={styles.govCard}>
          <strong>Compliance &amp; Governance</strong>
          <p style={styles.govText}>
            Write-back: {(writeBack === "true" || writeBack === "1") ? "✅ Supported" : "❌ Not supported"}.
            {writeBackNote ? ` ${writeBackNote}` : ""}
            {midServer ? ` MID Server requirement: ${midServer}.` : ""}
          </p>
        </div>
      )}

      {(bestFor || notFor) && (
        <div style={styles.twoCol}>
          <div>{bestFor && <><strong>Best For</strong><p style={styles.bodyText}>{bestFor}</p></>}</div>
          <div>{notFor && <><strong>Not For</strong><p style={styles.bodyText}>{notFor}</p></>}</div>
        </div>
      )}

      {(q2 || q4) && (
        <div style={styles.twoCol}>
          <div>{q2 && <><strong>Q2 Roadmap</strong><p style={styles.bodyText}>{q2}</p></>}</div>
          <div>{q4 && <><strong>Q4 Roadmap</strong><p style={styles.bodyText}>{q4}</p></>}</div>
        </div>
      )}

      <div style={styles.actions}>
        <button style={styles.btnPrimary} onClick={() => navigate({ view: "demo", id: connectorId })}>
          ▶ Run Demo
        </button>
        <button style={styles.btnSecondary} onClick={() => setShowPicker(true)}>Compare with...</button>
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

const styles: Record<string, React.CSSProperties> = {
  container: {},
  loading: { textAlign: "center", color: "#5A6677", padding: "60px 0" },
  back: { color: "#00C6A2", cursor: "pointer", fontSize: 13, marginBottom: 16, display: "inline-block" },
  header: { display: "flex", alignItems: "center", gap: 12, marginTop: 8 },
  title: { color: "#00C6A2", fontSize: 22, fontWeight: 700, margin: 0 },
  badge: { color: "#fff", fontSize: 11, padding: "2px 8px", borderRadius: 6, fontWeight: 600 },
  detail: { color: "#1A1A1A", fontSize: 14, lineHeight: 1.6, marginTop: 12 },
  techGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20, fontSize: 13 },
  govCard: { background: "#F4F6F9", border: "1px solid #E0E5EC", borderRadius: 8, padding: 16, marginTop: 20 },
  govText: { fontSize: 13, color: "#1A1A1A", marginTop: 8 },
  twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 20 },
  bodyText: { fontSize: 13, color: "#5A6677", marginTop: 4 },
  actions: { display: "flex", gap: 12, marginTop: 28 },
  btnPrimary: {
    background: "#00C6A2", color: "#fff", border: "none", borderRadius: 6,
    padding: "10px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer"
  },
  btnSecondary: {
    background: "#fff", color: "#00C6A2", border: "1px solid #00C6A2", borderRadius: 6,
    padding: "10px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer"
  }
};
