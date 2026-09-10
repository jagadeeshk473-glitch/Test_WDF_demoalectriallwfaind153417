import React, { useState, useEffect } from "react";
import {
  getCachedAssessment,
  getOrRunInstanceAssessment,
  setGlobalAssessmentContext,
  clearAssessmentCache,
  getAssessmentAge,
} from "../services/api";
import { CustomerScenario } from "./CustomerScenario";

export interface ChatContextType {
  assessment: any;
  pluginsScanned: number;
  tablesScanned: number;
  assessmentFindings: any[];
  criticalFindingsCount: number;
  userPersona?: 'business' | 'technical' | 'admin';
  personaAccess?: {
    show_protocol_detail: boolean;
    show_compliance: boolean;
    show_lab_exercises: boolean;
    show_admin_checklists: boolean;
  };
}

function buildContext(assessment: any): ChatContextType {
  // The API returns: { scan_stats: { plugins_scanned, tables_scanned, ... }, findings: [...] }
  const scanStats = assessment?.scan_stats || {};
  const pluginCount = scanStats.plugins_scanned ?? 0;
  const tableCount = scanStats.tables_scanned ?? 0;
  const findings = assessment?.findings || assessment?.recommendations || [];
  const critical = findings.filter(
    (f: any) => (f.severity || "").toLowerCase() === "critical" || (f.priority || "").toLowerCase() === "critical"
  );

  return {
    assessment,
    pluginsScanned: Number(pluginCount) || 0,
    tablesScanned: Number(tableCount) || 0,
    assessmentFindings: findings,
    criticalFindingsCount: critical.length,
  };
}

export default function ChatWithContext() {
  const [context, setContext] = useState<ChatContextType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userPersona, setUserPersona] = useState<'business' | 'technical' | 'admin'>('business');
  const [personaAccess, setPersonaAccess] = useState<{
    show_protocol_detail: boolean;
    show_compliance: boolean;
    show_lab_exercises: boolean;
    show_admin_checklists: boolean;
  }>({
    show_protocol_detail: false,
    show_compliance: false,
    show_lab_exercises: false,
    show_admin_checklists: false,
  });

  useEffect(() => {
    let cancelled = false;

    async function _detectUserPersona() {
      try {
        const personaKey: 'business' | 'technical' | 'admin' =
          (window as any).persona || 'business';

        if (!cancelled) {
          setUserPersona(personaKey);
          setPersonaAccess({
            show_protocol_detail: personaKey === 'technical' || personaKey === 'admin',
            show_compliance: personaKey === 'admin',
            show_lab_exercises: personaKey === 'admin',
            show_admin_checklists: personaKey === 'admin',
          });
        }
      } catch (e) {
        console.warn('[ChatWithContext] Could not detect persona:', e);
      }
    }

    async function loadAssessment() {
      setLoading(true);
      setError(false);

      // Check cache first
      const cached = getCachedAssessment();
      if (cached) {
        const ctx = buildContext(cached);
        if (!cancelled) {
          setContext(ctx);
          setGlobalAssessmentContext(cached);
          setLoading(false);
        }
        return;
      }

      try {
        const result = await getOrRunInstanceAssessment();
        if (!cancelled && result) {
          const ctx = buildContext(result);
          setContext(ctx);
          setGlobalAssessmentContext(result);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    _detectUserPersona();
    loadAssessment();
    return () => { cancelled = true; };
  }, []);

  const handleRefresh = async () => {
    clearAssessmentCache();
    setLoading(true);
    setError(false);
    setContext(null);
    try {
      const result = await getOrRunInstanceAssessment();
      if (result) {
        const ctx = buildContext(result);
        setContext(ctx);
        setGlobalAssessmentContext(result);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const isReady = !loading && !error && context !== null;

  return (
    <div>
      {/* Status bar */}
      {loading && (
        <div style={statusStyles.bar}>
          <span style={statusStyles.icon}>⏳</span>
          <span style={statusStyles.text}>Loading instance assessment context…</span>
        </div>
      )}
      {error && (
        <div style={{ ...statusStyles.bar, background: "#FEF3C7", borderLeftColor: "#F59E0B" }}>
          <span style={statusStyles.icon}>⚠️</span>
          <span style={{ ...statusStyles.text, color: "#92400E" }}>
            Assessment unavailable — chat will work without context.
          </span>
          <button style={statusStyles.refreshBtn} onClick={handleRefresh}>
            Retry
          </button>
        </div>
      )}
      {isReady && context && (
        <div style={statusStyles.bar}>
          <span style={statusStyles.icon}>✅</span>
          <span style={statusStyles.text}>
            Context loaded — {context.pluginsScanned} plugins, {context.tablesScanned} tables,{" "}
            {context.assessmentFindings.length} findings
            {context.criticalFindingsCount > 0 && (
              <span style={{ color: "#DC2626", fontWeight: 600 }}>
                {" "}({context.criticalFindingsCount} critical)
              </span>
            )}
          </span>
          <button style={statusStyles.refreshBtn} onClick={handleRefresh}>
            ↻ Refresh
          </button>
        </div>
      )}
      {isReady && context && getAssessmentAge()?.isStale && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 14px",
          marginBottom: 12,
          background: "#FEF3C7",
          borderLeft: "3px solid #F59E0B",
          borderRadius: 6,
          fontSize: 13,
          color: "#92400E",
        }}>
          <span style={{ flexShrink: 0, fontSize: 14 }}>⚠️</span>
          <span style={{ flex: 1 }}>
            Assessment is over 24 hours old ({getAssessmentAge()?.hours}h). Consider refreshing for latest data.
          </span>
          <button style={statusStyles.refreshBtn} onClick={handleRefresh}>
            ↻ Refresh
          </button>
        </div>
      )}

      {/* Chat component with context and persona */}
      <CustomerScenario
        assessmentContext={context ?? undefined}
        isContextReady={isReady}
        userPersona={userPersona}
        personaAccess={personaAccess}
      />
    </div>
  );
}

const statusStyles: Record<string, React.CSSProperties> = {
  bar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 14px",
    marginBottom: 12,
    background: "#E8FFF5",
    borderLeft: "3px solid #00C6A2",
    borderRadius: 6,
    fontSize: 13,
  },
  icon: {
    flexShrink: 0,
    fontSize: 14,
  },
  text: {
    flex: 1,
    color: "#0B2D4E",
  },
  refreshBtn: {
    padding: "4px 12px",
    background: "#00C6A2",
    color: "#FFFFFF",
    border: "none",
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    flexShrink: 0,
  },
};
