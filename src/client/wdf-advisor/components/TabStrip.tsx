import React from "react";
import { ConnectorGrid } from "./ConnectorGrid";
import { UseCaseLibrary } from "./UseCaseLibrary";
import { ArchPatterns } from "./ArchPatterns";
import { UseCaseIdeas } from "./UseCaseIdeas";
import { AdminPanel } from "./AdminPanel";

interface Props {
  persona: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TABS = [
  { key: "connectors", label: "Connectors", badge: false },
  { key: "scenarios", label: "Scenarios", badge: true },
  { key: "patterns", label: "Arch patterns", badge: false },
  { key: "ideas", label: "Use case ideas", badge: true },
  { key: "admin", label: "Admin", badge: false, adminOnly: true }
];

export function TabStrip({ persona, activeTab, setActiveTab }: Props) {
  const visibleTabs = TABS.filter((t) => !t.adminOnly || persona === "admin");

  return (
    <div style={styles.container}>
      <div style={styles.tabRow}>
        {visibleTabs.map((tab) => (
          <button
            key={tab.key}
            style={{
              ...styles.tab,
              ...(activeTab === tab.key ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            {tab.badge && <span style={styles.badge}>New</span>}
          </button>
        ))}
      </div>
      <div style={styles.content}>
        {activeTab === "connectors" && <ConnectorGrid persona={persona} />}
        {activeTab === "scenarios" && <UseCaseLibrary persona={persona} />}
        {activeTab === "patterns" && <ArchPatterns />}
        {activeTab === "ideas" && <UseCaseIdeas />}
        {activeTab === "admin" && <AdminPanel persona={persona} />}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { width: "100%" },
  tabRow: {
    display: "flex", gap: 4, borderBottom: "1px solid #E0E5EC",
    paddingBottom: 0
  },
  tab: {
    padding: "10px 16px", border: "none", background: "none",
    cursor: "pointer", fontSize: 14, color: "#5A6677",
    borderBottom: "2px solid transparent", marginBottom: -1,
    display: "flex", alignItems: "center", gap: 6
  },
  activeTab: {
    color: "#00C6A2", borderBottomColor: "#00C6A2", fontWeight: 600
  },
  badge: {
    background: "#00C6A2", color: "#fff", fontSize: 10,
    padding: "2px 6px", borderRadius: 8, fontWeight: 700
  },
  content: {
    padding: "32px 0"
  },
};
