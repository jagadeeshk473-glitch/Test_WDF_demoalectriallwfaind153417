import React from "react";
import { navigate } from "../app";

interface Props {
  connector: any;
  persona: string;
}

const v = (f: any) => f?.display_value || f?.value || f || "";

function statusColor(status: string): string {
  const s = status.toLowerCase();
  if (s === "ga") return "#10B981";
  if (s === "poc" || s === "in development" || s === "in_development") return "#F59E0B";
  return "#94A3B8";
}

export function ConnectorCard({ connector, persona }: Props) {
  const id = v(connector.sys_id);
  const name = v(connector.name);
  const tagline = v(connector.tagline);
  const status = v(connector.status);
  const bestFor = v(connector.best_for);
  const protocol = v(connector.protocol);
  const latency = v(connector.latency);
  const writeBack = v(connector.supports_write_back);
  const midServer = v(connector.mid_server_requirement);

  const goDetail = () => navigate({ view: "connector", id });

  return (
    <div style={styles.card} onClick={goDetail}>
      {persona !== "business" && status && (
        <span style={{ ...styles.badge, background: statusColor(status) }}>{status.toUpperCase()}</span>
      )}
      <div style={styles.name} onClick={goDetail}>{name}</div>
      <div style={styles.tagline}>{tagline}</div>

      {persona === "business" && (
        <>
          {bestFor && <div style={styles.meta}>{bestFor.slice(0, 100)}{bestFor.length > 100 ? "..." : ""}</div>}
          <span style={styles.link}>Learn more →</span>
        </>
      )}

      {(persona === "builder" || persona === "admin") && (
        <>
          {protocol && <div style={styles.meta}>Protocol: {protocol}</div>}
          {latency && <div style={styles.meta}>Latency: {latency}</div>}
        </>
      )}

      {persona === "admin" && (
        <>
          <div style={styles.meta}>
            {(writeBack === "true" || writeBack === "1") ? "✅" : "❌"} Write-back
          </div>
          {midServer && <div style={styles.midNote}>MID Server: {midServer}</div>}
        </>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: "#FFFFFF", border: "1px solid #E0E5EC", borderRadius: 8,
    padding: 20, cursor: "pointer", position: "relative", transition: "box-shadow 0.15s"
  },
  badge: {
    position: "absolute", top: 12, right: 12, color: "#fff", fontSize: 11,
    padding: "2px 8px", borderRadius: 6, fontWeight: 600
  },
  name: { color: "#00C6A2", fontWeight: 600, fontSize: 15, marginBottom: 4, cursor: "pointer" },
  tagline: { color: "#5A6677", fontSize: 13, marginBottom: 10 },
  meta: { color: "#1A1A1A", fontSize: 13, marginBottom: 4 },
  midNote: { color: "#5A6677", fontSize: 12, fontStyle: "italic", marginTop: 4 },
  link: { color: "#00C6A2", fontSize: 13, fontWeight: 500, marginTop: 6, display: "inline-block" }
};
