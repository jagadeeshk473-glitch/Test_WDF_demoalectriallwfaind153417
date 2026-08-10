import React, { useEffect, useState } from "react";
import { fetchChecklistItems } from "../services/api";

interface Props {
  persona: string;
}

type DetailView = null | "compliance" | "infrastructure";

const TAG_COLORS: Record<string, string> = {
  required: "#EF4444",
  recommended: "#3B82F6",
  blocker: "#DC2626",
  in_progress: "#F59E0B",
  verified: "#10B981",
  needs_review: "#8B5CF6",
};

const STATUS_ICONS: Record<string, { icon: string; color: string }> = {
  done: { icon: "✓", color: "#10B981" },
  warn: { icon: "⚠", color: "#F59E0B" },
  fail: { icon: "✗", color: "#EF4444" },
};

export function AdminPanel({ persona }: Props) {
  const [items, setItems] = useState<any[]>([]);
  const [denied, setDenied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [detailView, setDetailView] = useState<DetailView>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const result = await fetchChecklistItems();
      if (!cancelled) {
        setItems(result.items);
        setDenied(result.denied);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (persona !== "admin" || denied) {
    return (
      <div style={styles.deniedContainer}>
        <span style={styles.deniedIcon}>⛔</span>
        <h3 style={styles.deniedTitle}>Access Denied</h3>
        <p style={styles.deniedText}>You do not have the required admin role to view this content.</p>
      </div>
    );
  }

  if (loading) {
    return <p style={styles.loadingText}>Loading admin data…</p>;
  }

  const total = items.length;
  const doneCount = items.filter((i) => val(i.status) === "done").length;
  const warnCount = items.filter((i) => val(i.status) === "warn").length;
  const failCount = items.filter((i) => val(i.status) === "fail").length;
  const readiness = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  if (detailView) {
    return renderDetailView(detailView, items, setDetailView);
  }

  const complianceItems = items.filter((i) => val(i.checklist_type) === "compliance");
  const infraItems = items.filter((i) => val(i.checklist_type) === "infrastructure");
  const complianceDone = complianceItems.filter((i) => val(i.status) === "done").length;
  const infraDone = infraItems.filter((i) => val(i.status) === "done").length;

  return (
    <div>
      {/* Summary Tiles */}
      <div style={styles.tilesRow}>
        <Tile label="Complete" value={`${doneCount}/${total}`} />
        <Tile label="Warnings" value={String(warnCount)} />
        <Tile label="Blockers" value={String(failCount)} />
        <Tile label="Readiness" value={`${readiness}%`} />
      </div>

      {/* Progress Cards */}
      <div style={styles.cardsRow}>
        <ProgressCard
          title="Compliance Readiness"
          description="Data governance, access control, and regulatory posture"
          done={complianceDone}
          total={complianceItems.length}
          onOpen={() => setDetailView("compliance")}
        />
        <ProgressCard
          title="Infrastructure Readiness"
          description="Network, authentication, HA, and performance monitoring"
          done={infraDone}
          total={infraItems.length}
          onOpen={() => setDetailView("infrastructure")}
        />
      </div>
    </div>
  );
}

/* ─── Sub-components ─── */

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div style={styles.tile}>
      <span style={styles.tileValue}>{value}</span>
      <span style={styles.tileLabel}>{label}</span>
    </div>
  );
}

function ProgressCard({ title, description, done, total, onOpen }: {
  title: string; description: string; done: number; total: number; onOpen: () => void;
}) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div style={styles.card}>
      <h4 style={styles.cardTitle}>{title}</h4>
      <p style={styles.cardDesc}>{description}</p>
      <ProgressBar pct={pct} />
      <span style={styles.cardPct}>{done}/{total} complete ({pct}%)</span>
      <button style={styles.openBtn} onClick={onOpen}>Open checklist</button>
    </div>
  );
}

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div style={styles.progressBg}>
      <div style={{ ...styles.progressFill, width: `${pct}%` }} />
    </div>
  );
}

function renderDetailView(
  type: "compliance" | "infrastructure",
  allItems: any[],
  setDetailView: (v: DetailView) => void
) {
  const typeItems = allItems.filter((i) => val(i.checklist_type) === type);
  const complete = typeItems.filter((i) => val(i.status) === "done").length;
  const inProgress = typeItems.filter((i) => val(i.tag) === "in_progress").length;
  const blockers = typeItems.filter((i) => val(i.tag) === "blocker" || val(i.status) === "fail").length;
  const notStarted = typeItems.length - complete - inProgress - blockers;

  // Group by section
  const sections: Record<string, any[]> = {};
  typeItems.forEach((item) => {
    const sec = val(item.section) || "Uncategorized";
    if (!sections[sec]) sections[sec] = [];
    sections[sec].push(item);
  });

  const titleLabel = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div>
      <button style={styles.backBtn} onClick={() => setDetailView(null)}>← Back to overview</button>
      <h3 style={styles.detailTitle}>{titleLabel} Readiness Checklist</h3>

      {/* Count tiles */}
      <div style={styles.tilesRow}>
        <Tile label="Complete" value={String(complete)} />
        <Tile label="In progress" value={String(inProgress)} />
        <Tile label="Blockers" value={String(blockers)} />
        <Tile label="Not started" value={String(notStarted < 0 ? 0 : notStarted)} />
      </div>

      {/* Sections */}
      {Object.entries(sections).map(([secName, secItems]) => {
        const secDone = secItems.filter((i) => val(i.status) === "done").length;
        return (
          <div key={secName} style={styles.sectionBlock}>
            <h4 style={styles.sectionHeader}>{secName} — {secDone}/{secItems.length} complete</h4>
            {secItems.map((item, idx) => (
              <ChecklistRow key={idx} item={item} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function ChecklistRow({ item }: { item: any }) {
  const status = val(item.status);
  const tag = val(item.tag);
  const statusInfo = STATUS_ICONS[status] || { icon: "○", color: "#9CA3AF" };
  const borderColor = status === "done" ? "#10B981" : status === "warn" ? "#F59E0B" : status === "fail" ? "#EF4444" : "#E0E5EC";

  return (
    <div style={{ ...styles.itemRow, borderLeftColor: borderColor }}>
      <span style={{ ...styles.statusIcon, color: statusInfo.color }}>{statusInfo.icon}</span>
      <div style={styles.itemContent}>
        <span style={styles.itemLabel}>{val(item.label)}</span>
        <span style={styles.itemDesc}>{val(item.sub_description)}</span>
      </div>
      {tag && (
        <span style={{ ...styles.tagPill, backgroundColor: TAG_COLORS[tag] || "#6B7280" }}>
          {tag.replace(/_/g, " ")}
        </span>
      )}
    </div>
  );
}

/* ─── Helpers ─── */

function val(field: any): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field.value || field.display_value || "";
}

/* ─── Styles ─── */

const styles: Record<string, React.CSSProperties> = {
  deniedContainer: {
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    padding: 48, background: "#F4F6F9", borderRadius: 12, textAlign: "center",
    border: "1px solid #E0E5EC",
  },
  deniedIcon: { fontSize: 40, marginBottom: 12 },
  deniedTitle: { margin: 0, fontSize: 18, fontWeight: 600, color: "#1F2937" },
  deniedText: { margin: "8px 0 0", fontSize: 14, color: "#6B7280" },
  loadingText: { color: "#5A6677", fontSize: 14, textAlign: "center" },

  tilesRow: { display: "flex", gap: 16, marginBottom: 24 },
  tile: {
    flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
    background: "#fff", border: "1px solid #E0E5EC", borderRadius: 8, padding: 20,
  },
  tileValue: { fontSize: 28, fontWeight: 700, color: "#1F2937" },
  tileLabel: { fontSize: 12, color: "#6B7280", marginTop: 4 },

  cardsRow: { display: "flex", gap: 16, marginBottom: 24 },
  card: {
    flex: 1, background: "#fff", border: "1px solid #E0E5EC", borderRadius: 8,
    padding: 20, display: "flex", flexDirection: "column", gap: 8,
  },
  cardTitle: { margin: 0, fontSize: 16, fontWeight: 600, color: "#1F2937" },
  cardDesc: { margin: 0, fontSize: 13, color: "#6B7280" },
  cardPct: { fontSize: 12, color: "#6B7280" },
  openBtn: {
    marginTop: 8, padding: "8px 16px", border: "none", borderRadius: 6,
    background: "#00C6A2", color: "#fff", fontSize: 13, fontWeight: 600,
    cursor: "pointer", alignSelf: "flex-start",
  },

  progressBg: { width: "100%", height: 8, background: "#E5E7EB", borderRadius: 4 },
  progressFill: { height: 8, background: "#10B981", borderRadius: 4 },

  backBtn: {
    border: "none", background: "none", color: "#00C6A2", fontSize: 14,
    cursor: "pointer", padding: 0, marginBottom: 12, fontWeight: 500,
  },
  detailTitle: { margin: "0 0 16px", fontSize: 18, fontWeight: 600, color: "#1F2937" },

  sectionBlock: { marginBottom: 20 },
  sectionHeader: { margin: "0 0 8px", fontSize: 14, fontWeight: 600, color: "#374151" },

  itemRow: {
    display: "flex", alignItems: "center", gap: 10, padding: 12,
    borderLeft: "3px solid #E0E5EC", marginBottom: 6, background: "#FAFBFC", borderRadius: 4,
  },
  statusIcon: { fontSize: 16, fontWeight: 700, flexShrink: 0 },
  itemContent: { flex: 1, display: "flex", flexDirection: "column", gap: 2 },
  itemLabel: { fontSize: 14, fontWeight: 500, color: "#1F2937" },
  itemDesc: { fontSize: 12, color: "#6B7280" },
  tagPill: {
    fontSize: 11, fontWeight: 600, color: "#fff", padding: "2px 8px",
    borderRadius: 10, whiteSpace: "nowrap",
  },
};
