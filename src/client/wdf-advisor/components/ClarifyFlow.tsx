import React, { useState } from "react";
import { Answers, Recommendation as RecType, computeRecommendation } from "../services/decisionEngine";
import { Recommendation } from "./Recommendation";
import { navigate } from "../app";

interface Props { initialQuery: string; onResultShown?: (shown: boolean) => void; }

const QUESTIONS = [
  {
    id: "systemType", question: "What type of system holds the data you need?",
    options: [
      { value: "erp", label: "SAP or Oracle ERP system" },
      { value: "database", label: "Another database or warehouse" },
      { value: "cloud_saas", label: "A cloud app or SaaS tool" },
      { value: "kafka", label: "A Kafka event stream or real-time feed" },
      { value: "documents", label: "Documents, wikis, or PDFs" },
      { value: "servicenow", label: "Data already inside ServiceNow" },
      { value: "not_sure", label: "Not sure yet" },
    ],
  },
  {
    id: "dataAction", question: "What do you need to do with the data?",
    options: [
      { value: "read_realtime", label: "Read in real time" },
      { value: "detect_changes", label: "Detect changes as they happen" },
      { value: "search_documents", label: "Search documents" },
      { value: "trigger_action", label: "Trigger an action or update a record" },
      { value: "run_analytics", label: "Run analytics on large volumes" },
      { value: "feed_ai_agent", label: "Feed an AI agent" },
    ],
  },
];

function getFollowUp(answers: Answers) {
  if (answers.systemType === "erp") return {
    id: "writeBack", question: "Do you need write-back capabilities?",
    options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }],
  };
  if (answers.systemType === "database") return {
    id: "multiJoin", question: "Do you need to join data from multiple systems in one query?",
    options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }],
  };
  if (answers.systemType === "kafka") return {
    id: "reactionSpeed", question: "What reaction speed is required?",
    options: [
      { value: "sub-second", label: "Sub-second" },
      { value: "seconds", label: "Seconds" },
      { value: "minutes", label: "Minutes" },
    ],
  };
  return null;
}

function getSecondFollowUp(answers: Answers) {
  if (answers.systemType === "kafka" && answers.reactionSpeed) return {
    id: "aiAgent", question: "Is an AI agent involved?",
    options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }],
  };
  return null;
}

export function ClarifyFlow({ initialQuery, onResultShown }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ systemType: "", dataAction: "" });
  const [result, setResult] = useState<RecType | null>(null);
  const [current, setCurrent] = useState("");

  const allSteps = [...QUESTIONS];
  const followUp = step >= 2 ? getFollowUp(answers) : null;
  if (followUp) allSteps.push(followUp as any);
  const secondFU = step >= 3 ? getSecondFollowUp(answers) : null;
  if (secondFU) allSteps.push(secondFU as any);

  const totalSteps = QUESTIONS.length + (getFollowUp(answers) ? 1 : 0) + (getSecondFollowUp(answers) ? 1 : 0);
  const activeQ = step < QUESTIONS.length ? QUESTIONS[step]
    : step === 2 && followUp ? followUp
    : secondFU ? secondFU : null;

  if (result) return (
    <div>
      <a onClick={() => navigate({ view: "home" })} style={{ color: "#5A6677", cursor: "pointer", fontSize: 13, display: "inline-block", marginBottom: 16 }}>← Back to search</a>
      <Recommendation recommendation={result} />
    </div>
  );

  const handleNext = () => {
    if (!activeQ || !current) return;
    const updated = { ...answers, [activeQ.id]: current } as Answers;
    setAnswers(updated);
    setCurrent("");
    const nextStep = step + 1;
    const hasFU = getFollowUp(updated);
    const hasSecondFU = getSecondFollowUp(updated);
    const needed = QUESTIONS.length + (hasFU ? 1 : 0) + (hasSecondFU ? 1 : 0);
    if (nextStep >= needed) {
      setResult(computeRecommendation(updated));
      onResultShown?.(true);
      return;
    }
    setStep(nextStep);
  };

  const selected = (answers as any)[activeQ?.id || ""] || current;

  return (
    <div style={{ padding: "32px", maxWidth: 560, margin: "0 auto" }}>
      <a onClick={() => navigate({ view: "home" })} style={{ color: "#5A6677", cursor: "pointer", fontSize: 13 }}>← Back to search</a>
      <p style={{ fontSize: 11, letterSpacing: 1, color: "#5A6677", margin: "16px 0 4px", textTransform: "uppercase" }}>Guided Recommendation</p>
      <p style={{ fontSize: 12, color: "#5A6677", margin: "0 0 16px" }}>Step {step + 1} of {totalSteps}</p>
      {activeQ && <>
        <p style={{ fontWeight: 700, fontSize: 16, color: "#1A1A1A", margin: "0 0 16px" }}>{activeQ.question}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {activeQ.options.map((o) => (
            <button key={o.value} onClick={() => setCurrent(o.value)} style={{
              padding: "12px 16px", borderRadius: 8, cursor: "pointer", textAlign: "left", fontSize: 14,
              background: "#fff", border: current === o.value ? "2px solid #00C6A2" : "1px solid #E0E5EC",
              color: current === o.value ? "#00C6A2" : "#1A1A1A", fontWeight: current === o.value ? 600 : 400,
            }}>{o.label}</button>
          ))}
        </div>
        <div style={{ marginTop: 20, display: "flex", gap: 16, alignItems: "center" }}>
          {step > 0 && <a onClick={() => { setCurrent(""); setStep(step - 1); }} style={{ color: "#5A6677", cursor: "pointer", fontSize: 13 }}>← Back</a>}
          <button onClick={handleNext} disabled={!current} style={{
            padding: "10px 24px", borderRadius: 6, border: "none", fontWeight: 600, fontSize: 14, cursor: current ? "pointer" : "default",
            background: current ? "#00C6A2" : "#E0E5EC", color: current ? "#fff" : "#5A6677",
          }}>Next →</button>
        </div>
      </>}
    </div>
  );
}
