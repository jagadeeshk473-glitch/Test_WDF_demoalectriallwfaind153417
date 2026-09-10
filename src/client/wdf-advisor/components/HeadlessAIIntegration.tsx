import React, { useState } from "react";

/* ── Types ─────────────────────────────────────────────────── */
interface LoopStep { title: string; description: string }
interface MCPRole { name: string; description: string }
interface SafetyItem { label: string }

interface HeadlessAIPattern {
  loopTitle: string;
  steps: LoopStep[];
  mcpDescription: string;
  mcpRoles: MCPRole[];
  safetyChecklist: SafetyItem[];
}

interface Props { connector: string }

/* ── Pattern catalogue ─────────────────────────────────────── */
const PATTERNS: Record<string, HeadlessAIPattern> = {
  "MCP Client": {
    loopTitle: "How MCP Client Works with AI Agents",
    steps: [
      { title: "AI Agent Decision", description: "AI agent determines it needs to call an external tool" },
      { title: "MCP Client Invocation", description: "Agent invokes MCP Client connector with tool name and parameters" },
      { title: "External Tool Execution", description: "MCP Client calls external system (Salesforce, Slack, webhook, etc.)" },
      { title: "Result Return", description: "External tool returns result to MCP Client" },
      { title: "Result Processing", description: "MCP Client passes result back to AI agent for evaluation" },
      { title: "Agent Loop", description: "AI agent evaluates result and either loops (step 1) or concludes task" },
    ],
    mcpDescription:
      "The MCP (Model Context Protocol) standardises how AI agents interact with external tools. " +
      "Your AI agent requests tool capabilities, invokes them with parameters, handles results, and loops until the goal is achieved.",
    mcpRoles: [
      { name: "Client (Your AI Agent)", description: "Calls MCP server to list available tools, invokes them, handles results" },
      { name: "Server (External Tools)", description: "Lists available tools and their schemas, handles invocations, returns results" },
      { name: "Tool (External System)", description: "Performs work (query, mutation, notification) and returns structured results" },
    ],
    safetyChecklist: [
      { label: "External tool respects caller authentication" },
      { label: "Tool error messages don't expose sensitive data" },
      { label: "AI agent has timeout to prevent infinite loops" },
      { label: "All tool invocations are logged and auditable" },
      { label: "Rate limiting prevents abuse of external endpoints" },
    ],
  },

  "MCP Server": {
    loopTitle: "How MCP Server Exposes ServiceNow to External AI",
    steps: [
      { title: "External AI Request", description: "External AI agent requests to invoke a ServiceNow capability" },
      { title: "MCP Server Discovery", description: "External agent queries MCP Server to list available capabilities" },
      { title: "Capability Selection", description: "External agent selects a capability and invokes it with parameters" },
      { title: "ServiceNow Processing", description: "ServiceNow workflow / agent executes the requested work" },
      { title: "Result Return", description: "MCP Server returns result to the external agent" },
      { title: "External Loop", description: "External agent evaluates result and loops or concludes" },
    ],
    mcpDescription:
      "As an MCP Server, ServiceNow exposes its capabilities to external AI agents. " +
      "They discover available tools (workflows, decisions, queries), invoke them, and receive results through the standard MCP interface.",
    mcpRoles: [
      { name: "Client (External AI Agent)", description: "Calls your MCP Server, discovers capabilities, invokes them" },
      { name: "Server (ServiceNow MCP Server)", description: "Lists ServiceNow capabilities and schemas, handles invocations" },
      { name: "Tool (ServiceNow Workflow / Agent)", description: "Executes work and returns results via MCP interface" },
    ],
    safetyChecklist: [
      { label: "External caller identity verified before processing" },
      { label: "Rate limits prevent external agents from overwhelming ServiceNow" },
      { label: "All invocations logged with caller information" },
      { label: "Capability schemas don't expose sensitive parameter details" },
      { label: "Timeout prevents workflows from hanging indefinitely" },
    ],
  },

  "Stream Connect": {
    loopTitle: "Event-Driven AI with Stream Connect",
    steps: [
      { title: "Event Stream Ingestion", description: "Stream Connect ingests Kafka / event stream into ServiceNow" },
      { title: "Event Schema Validation", description: "Incoming events validated against registered schema" },
      { title: "Policy Application", description: "Data governance and policy jobs process the event" },
      { title: "Event Available", description: "Event is now available in Knowledge Graph / target table" },
      { title: "AI Agent Reaction", description: "AI agent triggers based on event pattern and acts" },
      { title: "Continuous Loop", description: "More events flow in — the cycle repeats continuously" },
    ],
    mcpDescription:
      "With Stream Connect, events from external systems flow continuously into ServiceNow. " +
      "AI agents subscribe to event patterns and react in real time, creating event-driven orchestration loops.",
    mcpRoles: [
      { name: "Event Source (External System)", description: "Publishes events to Kafka or compatible event stream" },
      { name: "Stream Connect (Connector)", description: "Ingests events, validates schema, applies governance" },
      { name: "AI Agent (ServiceNow)", description: "Subscribes to events and reacts in real time" },
    ],
    safetyChecklist: [
      { label: "Event schema matches governance requirements" },
      { label: "All governance jobs run before AI agent sees event" },
      { label: "Rate limiting prevents event backlog" },
      { label: "Failed events captured for replay / dead-letter handling" },
      { label: "Timeout prevents events from blocking AI agent pipelines" },
    ],
  },

  "Live Connect": {
    loopTitle: "Live Federation for External AI Agents",
    steps: [
      { title: "External Agent Query", description: "External AI agent queries ServiceNow through Live Connect" },
      { title: "Policy Enforcement", description: "Query checked against data policies and access rules" },
      { title: "RLS Applied", description: "Row-level security filters applied based on caller identity" },
      { title: "Live Data Returned", description: "Current ServiceNow data returned (not a stale copy)" },
      { title: "Agent Processing", description: "External agent processes live data for decisions" },
      { title: "Refresh Loop", description: "Agent can query again later for updated data" },
    ],
    mcpDescription:
      "Live Connect allows external AI agents to query ServiceNow data in real time with full policy enforcement. " +
      "Agents always get current data; RLS ensures they only see data they are authorised for.",
    mcpRoles: [
      { name: "External AI Agent (Client)", description: "Queries ServiceNow for current, live data" },
      { name: "Live Connect (Federation Layer)", description: "Enforces policies and RLS on every query" },
      { name: "ServiceNow Data (Source of Truth)", description: "Live data accessed by external agents" },
    ],
    safetyChecklist: [
      { label: "External agents authenticated before query execution" },
      { label: "RLS policies enforce data access correctly" },
      { label: "Query timeouts prevent long-running requests" },
      { label: "Rate limiting prevents query flooding" },
      { label: "Audit logs capture all external queries" },
    ],
  },
};

/* ── Styles (inline to match app conventions) ──────────────── */
const s: Record<string, React.CSSProperties> = {
  wrapper: {
    marginTop: 24,
    padding: 16,
    background: "#F5F0FF",
    border: "1px solid #D1C4E9",
    borderRadius: 8,
  },
  heading: { fontSize: 14, fontWeight: 700, color: "#4A148C", margin: "0 0 14px" },
  subHeading: { fontSize: 13, fontWeight: 700, color: "#4A148C", margin: "14px 0 8px" },
  loopContainer: { background: "#fff", borderRadius: 6, padding: 14 },
  step: { display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 },
  stepNum: {
    width: 22, height: 22, borderRadius: "50%", background: "#7C4DFF", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 11, fontWeight: 700, flexShrink: 0,
  },
  stepTitle: { fontSize: 13, fontWeight: 600, color: "#1A1A1A", margin: 0 },
  stepDesc: { fontSize: 12, color: "#5A6677", margin: "2px 0 0" },
  arrow: { textAlign: "center" as const, color: "#7C4DFF", fontWeight: 700, fontSize: 14, margin: "-4px 0 -2px 16px" },

  mcpBox: { background: "#fff", border: "1px solid #E0E5EC", borderRadius: 6, padding: 12, marginTop: 10 },
  mcpDesc: { fontSize: 12, color: "#5A6677", lineHeight: "1.5", margin: "0 0 10px" },
  roleGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 } as React.CSSProperties,
  roleCard: { background: "#F4F6F9", borderRadius: 4, padding: 8 },
  roleName: { fontSize: 11, fontWeight: 700, color: "#333", margin: "0 0 4px" },
  roleDesc: { fontSize: 10, color: "#5A6677", margin: 0, lineHeight: "1.4" },

  safetyBox: { background: "#FFF8E1", border: "1px solid #FFE082", borderRadius: 6, padding: 12, marginTop: 10 },
  safetyTitle: { fontSize: 12, fontWeight: 700, color: "#E65100", margin: "0 0 8px" },
  safetyItem: { display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 4, fontSize: 12, color: "#5A6677" },
  checkbox: { width: 14, height: 14, flexShrink: 0, marginTop: 1, accentColor: "#E65100" },

  toggle: { fontSize: 12, color: "#7C4DFF", background: "none", border: "none", cursor: "pointer", fontWeight: 600, padding: 0 },
};

/* ── Component ─────────────────────────────────────────────── */
export function HeadlessAIIntegration({ connector }: Props) {
  const pattern = PATTERNS[connector];
  const [expanded, setExpanded] = useState(false);
  if (!pattern) return null;

  return (
    <div style={s.wrapper}>
      <p style={s.heading}>🤖 Headless AI Integration</p>

      {/* Toggle for long content */}
      <button style={s.toggle} onClick={() => setExpanded(!expanded)}>
        {expanded ? "▾ Collapse details" : "▸ Show AI loop, MCP roles & safety checklist"}
      </button>

      {expanded && (
        <>
          {/* ── Loop diagram ── */}
          <p style={s.subHeading}>{pattern.loopTitle}</p>
          <div style={s.loopContainer}>
            {pattern.steps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div style={s.step}>
                  <div style={s.stepNum}>{idx + 1}</div>
                  <div>
                    <p style={s.stepTitle}>{step.title}</p>
                    <p style={s.stepDesc}>{step.description}</p>
                  </div>
                </div>
                {idx < pattern.steps.length - 1 && <div style={s.arrow}>↓</div>}
              </React.Fragment>
            ))}
          </div>

          {/* ── MCP roles ── */}
          <p style={s.subHeading}>MCP Roles</p>
          <div style={s.mcpBox}>
            <p style={s.mcpDesc}>{pattern.mcpDescription}</p>
            <div style={s.roleGrid}>
              {pattern.mcpRoles.map((role) => (
                <div key={role.name} style={s.roleCard}>
                  <p style={s.roleName}>{role.name}</p>
                  <p style={s.roleDesc}>{role.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Safety checklist ── */}
          <div style={s.safetyBox}>
            <p style={s.safetyTitle}>⚠️ AI Safety Checklist</p>
            {pattern.safetyChecklist.map((item) => (
              <div key={item.label} style={s.safetyItem}>
                <input type="checkbox" disabled style={s.checkbox} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
