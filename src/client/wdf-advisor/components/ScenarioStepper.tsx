import React, { useState, useEffect, useRef } from "react";
import { navigate } from "../app";
import { fetchScenarioDemo, fetchDemoSteps } from "../services/api";
import { StepPanel } from "./StepPanel";

interface Props { demoId: string; persona: string; }

const v = (f: any) => f?.display_value || f?.value || f || "";

const TAG_COLORS: Record<string, string> = {
  Otto: "#7C3AED", ZCC: "#00C6A2", MCP: "#F59E0B",
  Stream: "#3B82F6", DCT: "#EF4444"
};
const tagColor = (label: string) => TAG_COLORS[label] || "#5A6677";

export function ScenarioStepper({ demoId, persona }: Props) {
  const [scenario, setScenario] = useState<any>(null);
  const [steps, setSteps] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [autoRun, setAutoRun] = useState(false);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const sc = await fetchScenarioDemo(demoId);
      setScenario(sc);
      if (sc) {
        const scenarioSysId = sc.sys_id?.value || sc.sys_id || demoId;
        const st = await fetchDemoSteps(scenarioSysId);
        setSteps(st);
      }
      setLoading(false);
    })();
  }, [demoId]);

  useEffect(() => {
    if (autoRun) {
      intervalRef.current = window.setInterval(() => {
        setCurrent(prev => {
          if (prev >= steps.length - 1) { setAutoRun(false); return prev; }
          return prev + 1;
        });
      }, 3200);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [autoRun, steps.length]);

  if (loading) return <div className="page-container"><div style={s.loading}>Loading scenario...</div></div>;
  if (!scenario || !steps.length) return <div className="page-container"><div style={s.loading}>Scenario not found.</div></div>;

  const step = steps[current];
  const total = steps.length;
  const isFinal = v(step.is_final_step) === "true" || v(step.is_final_step) === "1";
  const tagLabel = v(step.tag_label);
  const color = tagColor(tagLabel);
  const tags = v(scenario.tags).split(",").map((t: string) => t.trim()).filter(Boolean);
  const panelData = step.panel_data ? (typeof v(step.panel_data) === "string" ? v(step.panel_data) : step.panel_data) : null;

  return (
    <div>
      <a style={s.back} onClick={() => navigate({ view: "home", tab: "scenarios" })}>← Back to advisor</a>
      <div style={s.label}>SCENARIO DEMO</div>
      <h1 style={s.title}>{v(scenario.title)}</h1>
      {tags.length > 0 && (
        <div style={s.tags}>
          {tags.map((t: string) => <span key={t} style={s.tagPill}>{t}</span>)}
        </div>
      )}
      <div style={s.card}>
        <div style={s.cardHeader}>
          {tagLabel && <span style={{ ...s.stepTag, background: color + "26", color }}>{tagLabel}</span>}
          <span style={s.stepTitle}>Step {current + 1}/{total} — {v(step.title)}</span>
        </div>
        {v(step.description) && <p style={s.desc}>{v(step.description)}</p>}
        <StepPanel panelType={v(step.panel_type)} panelData={panelData} persona={persona} />
        {isFinal && v(step.resilience_note) && (
          <div style={s.resilience}>{v(step.resilience_note)}</div>
        )}
      </div>
      <div style={s.nav}>
        <button style={s.navBtn} disabled={current === 0} onClick={() => setCurrent(current - 1)}>← Back</button>
        <div style={s.dots}>
          {steps.map((_, i) => (
            <span key={i} onClick={() => setCurrent(i)}
              style={{ ...s.dot, ...(i === current ? s.dotActive : {}) }} />
          ))}
        </div>
        <button style={s.navBtn} disabled={current >= total - 1} onClick={() => setCurrent(current + 1)}>Next →</button>
        <button style={{ ...s.autoBtn, color: autoRun ? "#00C6A2" : "#5A6677" }}
          onClick={() => setAutoRun(!autoRun)}>
          <span style={{ ...s.autoDot, background: autoRun ? "#00C6A2" : "#94A3B8" }} /> Auto-run
        </button>
        {isFinal && (
          <button style={s.replayBtn} onClick={() => { setCurrent(0); setAutoRun(true); }}>↺ Replay</button>
        )}
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  loading: { textAlign: "center", color: "#5A6677", padding: "60px 0" },
  back: { color: "#00C6A2", cursor: "pointer", fontSize: 13, display: "inline-block" },
  label: { fontSize: 11, fontWeight: 700, letterSpacing: 1.2, color: "#5A6677", marginTop: 16 },
  title: { fontSize: 22, fontWeight: 700, color: "#1A1A1A", margin: "6px 0 12px" },
  tags: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 },
  tagPill: { border: "1px solid #E0E5EC", borderRadius: 12, padding: "2px 10px", fontSize: 12, color: "#5A6677" },
  card: { background: "#fff", border: "1px solid #E0E5EC", borderRadius: 8, padding: 20, marginBottom: 16 },
  cardHeader: { display: "flex", alignItems: "center", gap: 10, marginBottom: 8 },
  stepTag: { padding: "2px 10px", borderRadius: 12, fontWeight: 600, fontSize: 11 },
  stepTitle: { fontWeight: 600, fontSize: 14, color: "#1A1A1A" },
  desc: { fontSize: 13, color: "#5A6677", lineHeight: 1.6, margin: "0 0 8px" },
  resilience: { background: "#FEF3C7", borderLeft: "3px solid #F59E0B", borderRadius: 4, padding: "10px 14px", fontSize: 13, color: "#92400E", marginTop: 14 },
  nav: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" },
  navBtn: { background: "none", border: "1px solid #E0E5EC", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer", color: "#1A1A1A" },
  dots: { display: "flex", gap: 6, alignItems: "center" },
  dot: { width: 8, height: 8, borderRadius: "50%", border: "1px solid #94A3B8", background: "#fff", cursor: "pointer", display: "inline-block" },
  dotActive: { background: "#10B981", borderColor: "#10B981" },
  autoBtn: { background: "none", border: "none", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontWeight: 600 },
  autoDot: { width: 8, height: 8, borderRadius: "50%", display: "inline-block" },
  replayBtn: { background: "#00C6A2", color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }
};
