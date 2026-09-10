/* ────────────────────────────────────────────────────────────
 *  WDF Advisor – Outbound Concept Data Module
 *  Maps connectors to Outbound Concept chapters with metadata.
 *  Imported by DecisionMatrix and potentially other components.
 * ──────────────────────────────────────────────────────────── */

// ── Chapter definitions ───────────────────────────────────────

export interface OutboundChapter {
  id: string;
  number: string;
  title: string;
  quadrant: string;
  summary: string;
  keyQuestion: string;
  connectors: string[];
  color: string;
}

export const CHAPTERS: OutboundChapter[] = [
  {
    id: "ch4",
    number: "4",
    title: "Inbound Federate — Read Where It Sits",
    quadrant: "Inbound + Federate",
    summary:
      "Query external data in place without copying it into ServiceNow. Ideal when data governance requires the source to remain the system of record.",
    keyQuestion:
      "Can we read external data live without moving it into ServiceNow?",
    connectors: ["Zero Copy Connectors", "ZCC for ERP"],
    color: "#2E86AB",
  },
  {
    id: "ch5",
    number: "5",
    title: "Inbound Materialize — Bring In & Keep",
    quadrant: "Inbound + Materialize",
    summary:
      "Ingest and store external data inside ServiceNow for analytics, search, or offline availability. Best when you need ServiceNow to own a copy of the data.",
    keyQuestion:
      "Do we need to copy external data into ServiceNow for processing or search?",
    connectors: [
      "Stream Connect",
      "External Content Connectors (XCC)",
    ],
    color: "#A23B72",
  },
  {
    id: "ch6",
    number: "6",
    title: "Outbound Federate — Open Up Live",
    quadrant: "Outbound + Federate",
    summary:
      "Expose ServiceNow data to external systems via live query federation, without bulk exports. External consumers read ServiceNow data in real time.",
    keyQuestion:
      "Can external systems query ServiceNow data live without us exporting it?",
    connectors: ["Live Connect", "Live Archive"],
    color: "#F18F01",
  },
  {
    id: "ch7",
    number: "7",
    title: "Outbound Materialize — Export In Bulk",
    quadrant: "Outbound + Materialize",
    summary:
      "Push or stream ServiceNow data outward for analytics platforms, data lakes, or downstream consumers that need their own copy.",
    keyQuestion:
      "Do we need to export ServiceNow data to an external system in bulk or as a stream?",
    connectors: ["Stream Connect", "Table API"],
    color: "#C73E1D",
  },
  {
    id: "ch8a",
    number: "8a",
    title: "Action — ServiceNow Calls Out",
    quadrant: "Action (Outbound)",
    summary:
      "ServiceNow initiates an action in an external system — calling APIs, invoking tools, or triggering RPA bots. The request originates from ServiceNow.",
    keyQuestion:
      "Does ServiceNow need to trigger an action or invoke a tool in an external system?",
    connectors: ["Integration Hub", "MCP Client", "RPA Hub"],
    color: "#00C6A2",
  },
  {
    id: "ch8b",
    number: "8b",
    title: "Action — External Calls In",
    quadrant: "Action (Inbound)",
    summary:
      "An external system initiates an action inside ServiceNow — creating records, triggering flows, or pushing events. The request originates externally.",
    keyQuestion:
      "Do external systems need to trigger actions or push data into ServiceNow?",
    connectors: ["SN MCP Server", "Inbound APIs", "Stream Connect"],
    color: "#3BCEAC",
  },
];

// ── Connector → chapter mapping ──────────────────────────────

export const CONNECTOR_CHAPTER_MAP: Record<string, string[]> = {
  "zero copy connectors": ["ch4"],
  "zcc for erp": ["ch4"],
  "live connect": ["ch6"],
  "stream connect": ["ch5", "ch7", "ch8b"],
  "external content connectors (xcc)": ["ch5"],
  "live archive": ["ch6"],
  "table api": ["ch7"],
  "integration hub": ["ch8a"],
  "mcp client": ["ch8a"],
  "rpa hub": ["ch8a"],
  "sn mcp server": ["ch8b"],
  "inbound apis": ["ch8b"],
};

// ── 2×2 matrix cell definitions ──────────────────────────────

export interface MatrixCell {
  quadrant: string;
  label: string;
  chapter: string;
  description: string;
  connectors: string[];
  color: string;
}

export const MATRIX_CELLS: MatrixCell[] = [
  {
    quadrant: "inbound_federate",
    label: "Read where it sits",
    chapter: "ch4",
    description:
      "Query external data live via federation — no copy, no ETL. Source stays the system of record.",
    connectors: ["Zero Copy Connectors", "ZCC for ERP"],
    color: "#2E86AB",
  },
  {
    quadrant: "inbound_materialize",
    label: "Bring in & keep",
    chapter: "ch5",
    description:
      "Ingest external data into ServiceNow for search, analytics, or offline processing.",
    connectors: ["Stream Connect", "External Content Connectors (XCC)"],
    color: "#A23B72",
  },
  {
    quadrant: "outbound_federate",
    label: "Open up live",
    chapter: "ch6",
    description:
      "External systems query ServiceNow data in real time without batch exports.",
    connectors: ["Live Connect", "Live Archive"],
    color: "#F18F01",
  },
  {
    quadrant: "outbound_materialize",
    label: "Export in bulk",
    chapter: "ch7",
    description:
      "Push or stream ServiceNow data to data lakes, warehouses, or downstream systems.",
    connectors: ["Stream Connect", "Table API"],
    color: "#C73E1D",
  },
];

// ── Context Engine implications per connector ────────────────

export interface ContextImplication {
  connector: string;
  feeds: string[];
  govJobs: string[];
  note: string;
}

export const CONTEXT_IMPLICATIONS: Record<string, ContextImplication> = {
  "zero copy connectors": {
    connector: "zero copy connectors",
    feeds: ["CMDB", "Knowledge Graph", "Reporting"],
    govJobs: ["quality", "classification", "reconciliation"],
    note: "Federated reads enrich CMDB and Knowledge Graph without data duplication. Includes Reverse Tunnel for secure private network access without MID Server/VPN. Governance focuses on query-level access control and data quality at the source.",
  },
  "zcc for erp": {
    connector: "zcc for erp",
    feeds: ["CMDB", "Asset Management", "Financial Planning"],
    govJobs: ["quality", "enrichment", "mapping-validation"],
    note: "Pre-built ERP mappings feed certified data into CMDB and asset records. Supports Reverse Tunnel for secure private network connectivity. Governance validates field mapping accuracy and ERP schema drift.",
  },
  "live connect": {
    connector: "live connect",
    feeds: ["CMDB", "Knowledge Graph", "Cross-Instance ITSM"],
    govJobs: ["reconciliation", "ACL-alignment", "freshness"],
    note: "Federates data between ServiceNow instances. Governance ensures ACL consistency across instances and monitors data freshness.",
  },
  "stream connect": {
    connector: "stream connect",
    feeds: ["Event Management", "CMDB", "Observability"],
    govJobs: ["enrichment", "deduplication", "schema-validation"],
    note: "Real-time event ingestion feeds Event Management and can populate CMDB. Governance deduplicates events and validates message schemas.",
  },
  "integration hub": {
    connector: "integration hub",
    feeds: ["CMDB", "ITSM Workflows", "HR Service Delivery"],
    govJobs: ["orchestration", "error-handling", "audit"],
    note: "Orchestrates actions across systems, feeding results back into ServiceNow workflows. Governance covers retry policies, error handling, and execution audit trails.",
  },
  "mcp client": {
    connector: "mcp client",
    feeds: ["AI Agent Context", "Knowledge Graph"],
    govJobs: ["context-quality", "tool-authorization", "prompt-governance"],
    note: "Provides structured context to AI agents via MCP. Governance focuses on which tools agents can invoke and quality of context fed to LLMs.",
  },
  "sn mcp server": {
    connector: "sn mcp server",
    feeds: ["External AI Agents", "Partner Integrations"],
    govJobs: ["access-control", "rate-limiting", "schema-exposure"],
    note: "Exposes ServiceNow capabilities as MCP tools for external AI agents. Governance controls which tables and actions are exposed and enforces rate limits.",
  },
  "external content connectors (xcc)": {
    connector: "external content connectors (xcc)",
    feeds: ["AI Search", "Knowledge Management", "Virtual Agent"],
    govJobs: ["crawl-scheduling", "content-classification", "access-sync"],
    note: "Indexes external documents into AI Search. Governance manages crawl schedules, content classification, and syncing access permissions from source systems.",
  },
  "raptordb pro": {
    connector: "raptordb pro",
    feeds: ["Live Connect", "Live Archive", "Performance Analytics", "AI Search", "Reporting"],
    govJobs: ["data-quality", "sync-monitoring", "capacity-planning"],
    note: "HTAP database engine using medallion architecture. Powers Live Connect and Live Archive. Governance focuses on data quality in medallion layers, sync pipeline health, and capacity planning.",
  },
  "live archive": {
    connector: "live archive",
    feeds: ["Compliance Reporting", "Historical Analytics", "Audit"],
    govJobs: ["retention-policy", "archive-scheduling", "access-control"],
    note: "Extends live query reach into archived data. Governance manages retention policies and ensures archived data remains queryable with proper access controls.",
  },
  "table api": {
    connector: "table api",
    feeds: ["Data Lake", "External Analytics", "Compliance Export"],
    govJobs: ["export-scheduling", "pagination", "access-scoping"],
    note: "Paginated REST export for one-time or scheduled data extracts. Governance manages export scope, pagination handling, and API user permissions.",
  },
  "rpa hub": {
    connector: "rpa hub",
    feeds: ["Legacy System Data", "Mainframe Records", "Screen-scraped Data"],
    govJobs: ["bot-maintenance", "ui-change-detection", "credential-management"],
    note: "Automates UI interactions for systems without APIs. Governance monitors bot script health as target UIs evolve and manages bot credentials.",
  },
  "inbound apis": {
    connector: "inbound apis",
    feeds: ["External Record Creation", "Webhook Processing", "Partner Integrations"],
    govJobs: ["rate-limiting", "authentication", "payload-validation"],
    note: "Standard REST/SOAP endpoints for external record operations. Governance enforces rate limits, authentication requirements, and validates inbound payloads.",
  },
};

// ── Quick reference cheat sheet ──────────────────────────────

export interface CheatSheetEntry {
  scenario: string;
  direction: string;
  mechanism: string;
  chapter: string;
  primaryConnector: string;
  fallback: string;
}

export const CHEAT_SHEET: CheatSheetEntry[] = [
  {
    scenario:
      "\"We need to see SAP data on our CMDB form without copying it.\"",
    direction: "Inbound",
    mechanism: "Federate",
    chapter: "Ch 4",
    primaryConnector: "ZCC for ERP",
    fallback: "Zero Copy Connectors",
  },
  {
    scenario:
      "\"We want to run analytics across Snowflake and ServiceNow data together.\"",
    direction: "Inbound",
    mechanism: "Federate",
    chapter: "Ch 4",
    primaryConnector: "Zero Copy Connectors",
    fallback: "Integration Hub",
  },
  {
    scenario:
      "\"Kafka events need to create incidents in real time.\"",
    direction: "Inbound",
    mechanism: "Materialize",
    chapter: "Ch 5",
    primaryConnector: "Stream Connect",
    fallback: "Integration Hub",
  },
  {
    scenario:
      "\"Agents need to search Confluence and SharePoint from one place.\"",
    direction: "Inbound",
    mechanism: "Materialize",
    chapter: "Ch 5",
    primaryConnector: "External Content Connectors (XCC)",
    fallback: "MCP Client",
  },
  {
    scenario:
      "\"Our data lake needs to query ServiceNow CMDB live, not wait for nightly exports.\"",
    direction: "Outbound",
    mechanism: "Federate",
    chapter: "Ch 6",
    primaryConnector: "Live Connect",
    fallback: "Table API",
  },
  {
    scenario:
      "\"We need to stream change_request data to our Databricks lakehouse every night.\"",
    direction: "Outbound",
    mechanism: "Materialize",
    chapter: "Ch 7",
    primaryConnector: "Stream Connect",
    fallback: "Table API",
  },
  {
    scenario:
      "\"When a P1 incident fires, we need to page PagerDuty and create a Jira ticket.\"",
    direction: "Outbound",
    mechanism: "Action",
    chapter: "Ch 8a",
    primaryConnector: "Integration Hub",
    fallback: "MCP Client",
  },
  {
    scenario:
      "\"Our AI agent needs to look up CI details and run diagnostics across tools.\"",
    direction: "Outbound",
    mechanism: "Action",
    chapter: "Ch 8a",
    primaryConnector: "MCP Client",
    fallback: "Integration Hub",
  },
  {
    scenario:
      "\"External monitoring tools need to push alerts into ServiceNow Event Management.\"",
    direction: "Inbound",
    mechanism: "Action",
    chapter: "Ch 8b",
    primaryConnector: "Inbound APIs",
    fallback: "Stream Connect",
  },
  {
    scenario:
      "\"A partner's AI agent needs to create incidents and query our KB via MCP.\"",
    direction: "Inbound",
    mechanism: "Action",
    chapter: "Ch 8b",
    primaryConnector: "SN MCP Server",
    fallback: "Inbound APIs",
  },
];

// ── Helper: get chapters for a connector name ────────────────

export function getChaptersForConnector(
  connectorName: string
): OutboundChapter[] {
  const key = connectorName.toLowerCase();
  const chapterIds = CONNECTOR_CHAPTER_MAP[key];
  if (!chapterIds) return [];
  return CHAPTERS.filter((ch) => chapterIds.includes(ch.id));
}

// ── Helper: get chapter for ClarifyFlow answer pair ──────────
// Maps the two base wizard answers to the most relevant chapter.

const ANSWER_CHAPTER_MAP: Record<string, Record<string, string>> = {
  /* systemType → dataAction → chapterId */
  erp: {
    read_realtime: "ch4",
    detect_changes: "ch5",
    search_documents: "ch5",
    trigger_action: "ch8a",
    run_analytics: "ch4",
    feed_ai_agent: "ch8a",
  },
  database: {
    read_realtime: "ch4",
    detect_changes: "ch5",
    search_documents: "ch5",
    trigger_action: "ch8a",
    run_analytics: "ch4",
    feed_ai_agent: "ch8a",
  },
  cloud_saas: {
    read_realtime: "ch4",
    detect_changes: "ch5",
    search_documents: "ch5",
    trigger_action: "ch8a",
    run_analytics: "ch5",
    feed_ai_agent: "ch8a",
  },
  kafka: {
    read_realtime: "ch5",
    detect_changes: "ch5",
    search_documents: "ch5",
    trigger_action: "ch8b",
    run_analytics: "ch5",
    feed_ai_agent: "ch8a",
  },
  documents: {
    read_realtime: "ch5",
    detect_changes: "ch5",
    search_documents: "ch5",
    trigger_action: "ch8a",
    run_analytics: "ch5",
    feed_ai_agent: "ch8a",
  },
  servicenow: {
    read_realtime: "ch6",
    detect_changes: "ch7",
    search_documents: "ch6",
    trigger_action: "ch8a",
    run_analytics: "ch7",
    feed_ai_agent: "ch8a",
  },
  not_sure: {
    read_realtime: "ch4",
    detect_changes: "ch5",
    search_documents: "ch5",
    trigger_action: "ch8a",
    run_analytics: "ch5",
    feed_ai_agent: "ch8a",
  },
};

export function getChapterForAnswers(
  systemType: string,
  dataAction: string
): OutboundChapter | null {
  const bySystem = ANSWER_CHAPTER_MAP[systemType];
  if (!bySystem) return null;
  const chapterId = bySystem[dataAction];
  if (!chapterId) return null;
  return CHAPTERS.find((ch) => ch.id === chapterId) ?? null;
}
