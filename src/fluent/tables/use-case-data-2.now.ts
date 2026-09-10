import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// ═══════════════════════════════════════════════
// SEED DATA — Use Cases 35-68
// ═══════════════════════════════════════════════

// ID 35 — AI Security Coverage Monitoring
export const ucScenario35 = Record({
    $id: Now.ID['uc-scenario-35'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'AI Security Coverage Monitoring',
        industry: 'Technology',
        domain: 'SecOps',
        description:
            'Log ingestion & AI analysis over AWS/Azure/GCP',
        business_problem:
            'Log ingestion & AI analysis over AWS/Azure/GCP',
        products: 'Zero Copy Connectors',
        external_systems: 'AI security monitoring data',
        solution:
            'Using Zero Copy Connectors to query AI security monitoring data from AWS, Azure, and GCP for real-time coverage analysis and threat detection.',
        outcome:
            'Unified security coverage monitoring across multi-cloud environments with AI-driven analysis and proactive threat detection.',
        ui_surface: 'Dashboard',
        query_complexity: 'Not specified',
        latency: '<3s',
        deployment_status: 'Post Australia',
        keywords: 'SecOps, AI, security, monitoring, cloud',
    },
})

// ID 36 — Change Risk Scoring from Deployment History
export const ucScenario36 = Record({
    $id: Now.ID['uc-scenario-36'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Change Risk Scoring from Deployment History',
        industry: 'Technology',
        domain: 'Change Management',
        description:
            'Federate deployment failure history, infra topology, freeze calendars into a risk score on the Change record',
        business_problem:
            'Federate deployment failure history, infra topology, freeze calendars into a risk score on the Change record',
        products: 'Zero Copy Connectors',
        external_systems: 'Snowflake, Databricks',
        solution:
            'Using Zero Copy Connectors to federate deployment failure history, infrastructure topology, and freeze calendars from Snowflake and Databricks into a computed risk score on Change records.',
        outcome:
            'Data-driven change risk scoring that reduces failed deployments by incorporating historical failure patterns and infrastructure context.',
        ui_surface: 'Form view',
        query_complexity: 'Join — SN anchor',
        latency: '2-3s avg',
        deployment_status: 'Illustrative',
        keywords: 'ITSM, change management, risk, deployment',
    },
})

// ID 37 — Root Cause Federation from APM Telemetry
export const ucScenario37 = Record({
    $id: Now.ID['uc-scenario-37'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Root Cause Federation from APM Telemetry',
        industry: 'Technology',
        domain: 'Problem Management',
        description:
            'Join external APM telemetry with Problem records to surface correlated infra events during RCA',
        business_problem:
            'Join external APM telemetry with Problem records to surface correlated infra events during RCA',
        products: 'Zero Copy Connectors',
        external_systems: 'Dynatrace, Datadog, New Relic',
        solution:
            'Using Zero Copy Connectors to join APM telemetry from Dynatrace, Datadog, and New Relic with Problem records, surfacing correlated infrastructure events during root cause analysis.',
        outcome:
            'Accelerated root cause analysis with correlated APM telemetry directly on Problem records, reducing mean time to resolution.',
        ui_surface: 'Form view',
        query_complexity: 'Join — SN anchor',
        latency: '2-3s avg',
        deployment_status: 'Illustrative',
        keywords: 'ITSM, problem management, APM, root cause',
    },
})

// ID 38 — SLA Breach Prediction from Capacity Data
export const ucScenario38 = Record({
    $id: Now.ID['uc-scenario-38'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'SLA Breach Prediction from Capacity Data',
        industry: 'Technology',
        domain: 'Incident Management',
        description:
            'Federate infra capacity metrics with open Incident queues to flag SLAs at risk before breach',
        business_problem:
            'Federate infra capacity metrics with open Incident queues to flag SLAs at risk before breach',
        products: 'Zero Copy Connectors',
        external_systems: 'Capacity/infrastructure performance data',
        solution:
            'Using Zero Copy Connectors to federate infrastructure capacity metrics with open Incident queues, enabling predictive SLA breach flagging before violations occur.',
        outcome:
            'Proactive SLA management with early breach warnings driven by real-time capacity data, reducing SLA violations and improving service reliability.',
        ui_surface: 'List view',
        query_complexity: 'Scheduled batch',
        latency: 'N/A — Scheduled',
        deployment_status: 'Illustrative',
        keywords: 'ITSM, incident, SLA, prediction, capacity',
    },
})

// ID 39 — Cloud Spend vs. Deployed Asset Reconciliation
export const ucScenario39 = Record({
    $id: Now.ID['uc-scenario-39'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Cloud Spend vs. Deployed Asset Reconciliation',
        industry: 'Technology',
        domain: 'Hardware Asset Management',
        description:
            'Federate FinOps cloud billing with HAM discovered assets to surface shelfware/zombie instances',
        business_problem:
            'Federate FinOps cloud billing with HAM discovered assets to surface shelfware/zombie instances',
        products: 'Zero Copy Connectors',
        external_systems: 'AWS Cost Explorer, Azure Cost Mgmt',
        solution:
            'Using Zero Copy Connectors to federate FinOps cloud billing data from AWS Cost Explorer and Azure Cost Management with HAM discovered assets to identify shelfware and zombie instances.',
        outcome:
            'Reduced cloud waste through automated reconciliation of billing data against deployed assets, surfacing unused and underutilized resources.',
        ui_surface: 'List view',
        query_complexity: 'Simple select',
        latency: '<2s',
        deployment_status: 'Illustrative',
        keywords: 'ITAM, cloud, FinOps, asset reconciliation',
    },
})

// ID 40 — Contract Entitlement Federation for License Positions
export const ucScenario40 = Record({
    $id: Now.ID['uc-scenario-40'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Contract Entitlement Federation for License Positions',
        industry: 'Technology',
        domain: 'Software Asset Management',
        description:
            'Enrich SAM license positions with authoritative entitlement data from external contract platform',
        business_problem:
            'Enrich SAM license positions with authoritative entitlement data from external contract platform',
        products: 'Zero Copy Connectors',
        external_systems: 'Software license portal / SAM data warehouse',
        solution:
            'Using Zero Copy Connectors to query authoritative entitlement data from the external software license portal and SAM data warehouse, enriching SAM license positions in real time.',
        outcome:
            'Accurate license position reporting with authoritative entitlement data, reducing compliance risk and audit exposure.',
        ui_surface: 'Form view',
        query_complexity: 'Simple select',
        latency: '2-3s avg',
        deployment_status: 'Illustrative',
        keywords: 'ITAM, SAM, license, entitlement',
    },
})

// ID 41 — Threat Intelligence Enrichment at Triage
export const ucScenario41 = Record({
    $id: Now.ID['uc-scenario-41'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Threat Intelligence Enrichment at Triage',
        industry: 'Technology',
        domain: 'Security Incident Response',
        description:
            'Query external TIP for IOC matches, joined with CMDB asset context at SIR creation',
        business_problem:
            'Query external TIP for IOC matches, joined with CMDB asset context at SIR creation',
        products: 'Zero Copy Connectors',
        external_systems: 'MISP, ThreatConnect, Crowdstrike',
        solution:
            'Using Zero Copy Connectors to query MISP, ThreatConnect, and Crowdstrike for IOC matches, joined with CMDB asset context at Security Incident Response creation for enriched triage.',
        outcome:
            'Faster, more accurate triage with automated threat intelligence enrichment and asset context at incident creation.',
        ui_surface: 'Sidebar (async)',
        query_complexity: 'Join — SN anchor',
        latency: '<2s',
        deployment_status: 'Illustrative',
        keywords: 'SecOps, threat intelligence, SIR, triage, IOC',
    },
})

// ID 42 — Vulnerability Prioritization Against Asset Criticality
export const ucScenario42 = Record({
    $id: Now.ID['uc-scenario-42'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Vulnerability Prioritization Against Asset Criticality',
        industry: 'Technology',
        domain: 'Vulnerability Response',
        description:
            'Federate scanner results with CMDB business service data to produce risk-weighted remediation list',
        business_problem:
            'Federate scanner results with CMDB business service data to produce risk-weighted remediation list',
        products: 'Zero Copy Connectors',
        external_systems: 'Qualys, Tenable, Rapid7',
        solution:
            'Using Zero Copy Connectors to federate vulnerability scanner results from Qualys, Tenable, and Rapid7 with CMDB business service data, producing a risk-weighted remediation list.',
        outcome:
            'Prioritized vulnerability remediation based on business criticality, ensuring the highest-risk exposures are addressed first.',
        ui_surface: 'List view',
        query_complexity: 'Join — SN anchor',
        latency: '2-3s avg',
        deployment_status: 'Illustrative',
        keywords: 'SecOps, vulnerability, CMDB, risk prioritization',
    },
})

// ID 43 — User Behavior Anomaly Context for Investigations
export const ucScenario43 = Record({
    $id: Now.ID['uc-scenario-43'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'User Behavior Anomaly Context for Investigations',
        industry: 'Technology',
        domain: 'Security Incident Response',
        description:
            'Query UEBA behavioral baselines joined with SN user/asset records for investigation context',
        business_problem:
            'Query UEBA behavioral baselines joined with SN user/asset records for investigation context',
        products: 'Zero Copy Connectors',
        external_systems: 'Splunk, Exabeam',
        solution:
            'Using Zero Copy Connectors to query UEBA behavioral baselines from Splunk and Exabeam, joined with ServiceNow user and asset records for enriched investigation context.',
        outcome:
            'Richer investigation context with behavioral anomaly data correlated against user and asset records, accelerating threat investigations.',
        ui_surface: 'Workspace',
        query_complexity: 'Join — SN anchor',
        latency: '<2s',
        deployment_status: 'Illustrative',
        keywords: 'SecOps, UEBA, investigation, behavioral analysis',
    },
})

// ID 44 — Third-Party Risk Evidence Federation
export const ucScenario44 = Record({
    $id: Now.ID['uc-scenario-44'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Third-Party Risk Evidence Federation',
        industry: 'Cross-Industry',
        domain: 'GRC',
        description:
            'Pull vendor risk assessment evidence/scoring from external GRC platform into VRM engagement records',
        business_problem:
            'Pull vendor risk assessment evidence/scoring from external GRC platform into VRM engagement records',
        products: 'Zero Copy Connectors',
        external_systems: 'Archer, MetricStream',
        solution:
            'Using Zero Copy Connectors to federate vendor risk assessment evidence and scoring from Archer and MetricStream into VRM engagement records.',
        outcome:
            'Consolidated third-party risk view with real-time evidence from external GRC platforms, strengthening vendor risk management.',
        ui_surface: 'Form view',
        query_complexity: 'Simple select',
        latency: '2-3s avg',
        deployment_status: 'Illustrative',
        keywords: 'GRC, vendor risk, VRM, compliance',
    },
})

// ID 45 — Audit Finding Cross-Reference Across GRC Platforms
export const ucScenario45 = Record({
    $id: Now.ID['uc-scenario-45'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Audit Finding Cross-Reference Across GRC Platforms',
        industry: 'Cross-Industry',
        domain: 'GRC',
        description:
            'Federate finding DBs from two GRC tools (post-M&A) into unified Audit Management view',
        business_problem:
            'Federate finding DBs from two GRC tools (post-M&A) into unified Audit Management view',
        products: 'Zero Copy Connectors',
        external_systems: 'Archer, MetricStream',
        solution:
            'Using Zero Copy Connectors to federate audit finding databases from Archer and MetricStream (post-M&A) into a unified Audit Management view within ServiceNow.',
        outcome:
            'Unified audit visibility across merged organizations with consolidated findings from multiple GRC platforms.',
        ui_surface: 'Form view',
        query_complexity: 'Join — SN anchor',
        latency: '2-3s avg',
        deployment_status: 'Illustrative',
        keywords: 'GRC, audit, M&A, compliance',
    },
})

// ID 46 — Policy Exception Evidence Verification
export const ucScenario46 = Record({
    $id: Now.ID['uc-scenario-46'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Policy Exception Evidence Verification',
        industry: 'Cross-Industry',
        domain: 'GRC',
        description:
            'On exception submission, verify compensating controls exist/active in source via external data catalog',
        business_problem:
            'On exception submission, verify compensating controls exist/active in source via external data catalog',
        products: 'Zero Copy Connectors',
        external_systems: 'Policy/compliance management system',
        solution:
            'Using Zero Copy Connectors to query the external policy/compliance management system at exception submission, verifying that compensating controls exist and are active.',
        outcome:
            'Automated exception validation with real-time verification of compensating controls, reducing policy risk and audit findings.',
        ui_surface: 'Form view',
        query_complexity: 'Simple select',
        latency: '2-3s avg',
        deployment_status: 'Illustrative',
        keywords: 'GRC, policy, compliance, exception',
    },
})

// ID 47 — Cross-Catalog CMDB Gap Analysis
export const ucScenario47 = Record({
    $id: Now.ID['uc-scenario-47'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Cross-Catalog CMDB Gap Analysis',
        industry: 'Technology',
        domain: 'Configuration Management',
        description:
            'Join cloud asset catalog with on-prem asset DB to find CIs missing from CMDB',
        business_problem:
            'Join cloud asset catalog with on-prem asset DB to find CIs missing from CMDB',
        products: 'Zero Copy Connectors',
        external_systems: 'Network discovery tool / external asset registry',
        solution:
            'Using Zero Copy Connectors to join cloud asset catalogs with on-prem asset databases via scheduled batch, identifying configuration items missing from CMDB.',
        outcome:
            'Improved CMDB completeness through automated gap detection across cloud and on-prem asset sources.',
        ui_surface: 'List view',
        query_complexity: 'Scheduled batch',
        latency: 'N/A — Scheduled',
        deployment_status: 'Illustrative',
        keywords: 'CMDB, discovery, gap analysis, assets',
    },
})

// ID 48 — Software License Consumption Federation
export const ucScenario48 = Record({
    $id: Now.ID['uc-scenario-48'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Software License Consumption Federation',
        industry: 'Technology',
        domain: 'Software Asset Management',
        description:
            'Federate SAM metering DB with SN normalization library for accurate effective license positions',
        business_problem:
            'Federate SAM metering DB with SN normalization library for accurate effective license positions',
        products: 'Zero Copy Connectors',
        external_systems: 'Software usage tracking / SAM tool',
        solution:
            'Using Zero Copy Connectors to federate SAM metering data from the software usage tracking tool with ServiceNow normalization library for accurate effective license positions.',
        outcome:
            'Accurate license consumption visibility with normalized metering data, reducing true-up risk and optimizing software spend.',
        ui_surface: 'List view',
        query_complexity: 'Join — SN anchor',
        latency: '<2s',
        deployment_status: 'Illustrative',
        keywords: 'ITAM, SAM, license, metering',
    },
})

// ID 49 — Customer Health Score Federation
export const ucScenario49 = Record({
    $id: Now.ID['uc-scenario-49'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Customer Health Score Federation',
        industry: 'Cross-Industry',
        domain: 'Customer Service Management',
        description:
            'Surface live health scores / renewal risk from CS platform on CSM case records',
        business_problem:
            'Surface live health scores / renewal risk from CS platform on CSM case records',
        products: 'Zero Copy Connectors',
        external_systems: 'External customer data platform / CRM',
        solution:
            'Using Zero Copy Connectors to query live health scores and renewal risk data from the external customer data platform, surfacing them on CSM case records.',
        outcome:
            'Agents see real-time customer health and renewal risk during case handling, enabling proactive retention actions.',
        ui_surface: 'Sidebar (async)',
        query_complexity: 'Simple select',
        latency: '2-3s avg',
        deployment_status: 'Illustrative',
        keywords: 'CSM, customer health, renewal risk',
    },
})

// ID 50 — Support Entitlement Verification at Case Creation
export const ucScenario50 = Record({
    $id: Now.ID['uc-scenario-50'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Support Entitlement Verification at Case Creation',
        industry: 'Cross-Industry',
        domain: 'Customer Service Management',
        description:
            'Confirm support-tier eligibility from entitlement DB at case open to prevent SLA misassignment',
        business_problem:
            'Confirm support-tier eligibility from entitlement DB at case open to prevent SLA misassignment',
        products: 'Zero Copy Connectors',
        external_systems: 'External entitlement / support contract system',
        solution:
            'Using Zero Copy Connectors to query the external entitlement and support contract system at case creation, confirming support-tier eligibility to prevent SLA misassignment.',
        outcome:
            'Accurate SLA assignment at case creation with real-time entitlement verification, eliminating misrouted cases and SLA mismatches.',
        ui_surface: 'Form view',
        query_complexity: 'Simple select',
        latency: '2-3s avg',
        deployment_status: 'Illustrative',
        keywords: 'CSM, entitlement, SLA, case creation',
    },
})

// ID 51 — Parts Availability from Non-ERP Depot Systems
export const ucScenario51 = Record({
    $id: Now.ID['uc-scenario-51'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Parts Availability from Non-ERP Depot Systems',
        industry: 'Cross-Industry',
        domain: 'Field Service Management',
        description:
            'Show live parts availability from third-party depot/WMS on FSM work order',
        business_problem:
            'Show live parts availability from third-party depot/WMS on FSM work order',
        products: 'Zero Copy Connectors',
        external_systems: 'Depot inventory system / non-ERP parts database',
        solution:
            'Using Zero Copy Connectors to query live parts availability from third-party depot and warehouse management systems, surfacing inventory data on FSM work orders.',
        outcome:
            'Technicians see real-time parts availability during dispatch, reducing return visits and improving first-time fix rates.',
        ui_surface: 'Sidebar (async)',
        query_complexity: 'Simple select',
        latency: '2-3s avg',
        deployment_status: 'Illustrative',
        keywords: 'FSM, parts, inventory, dispatch',
    },
})

// ID 52 — Technician Certification Verification for Regulated Work
export const ucScenario52 = Record({
    $id: Now.ID['uc-scenario-52'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Technician Certification Verification for Regulated Work',
        industry: 'Cross-Industry',
        domain: 'Field Service Management',
        description:
            'At dispatch, verify technician certifications against external credentialing DB for regulated work',
        business_problem:
            'At dispatch, verify technician certifications against external credentialing DB for regulated work',
        products: 'Zero Copy Connectors',
        external_systems: 'HR / certification management system',
        solution:
            'Using Zero Copy Connectors to query the external HR and certification management system at dispatch, verifying technician certifications for regulated work assignments.',
        outcome:
            'Compliant dispatch with automated certification verification, preventing unqualified assignments and regulatory violations.',
        ui_surface: 'Form view',
        query_complexity: 'Simple select',
        latency: '2-3s avg',
        deployment_status: 'Illustrative',
        keywords: 'FSM, certification, regulated, dispatch',
    },
})

// ID 53 — External Reference Data Lookup in Service Catalog
export const ucScenario53 = Record({
    $id: Now.ID['uc-scenario-53'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'External Reference Data Lookup in Service Catalog',
        industry: 'Cross-Industry',
        domain: 'Now Platform',
        description:
            'Catalog items query external master data (cost/project/dept codes) at render time',
        business_problem:
            'Catalog items query external master data (cost/project/dept codes) at render time',
        products: 'Zero Copy Connectors',
        external_systems: 'Snowflake, BigQuery',
        solution:
            'Using Zero Copy Connectors to query external master data from Snowflake and BigQuery at catalog item render time, providing live cost, project, and department codes.',
        outcome:
            'Catalog items populated with authoritative reference data at render time, eliminating stale lookups and manual code entry.',
        ui_surface: 'List view',
        query_complexity: 'Simple select',
        latency: '<2s',
        deployment_status: 'Illustrative',
        keywords: 'Service Catalog, reference data, master data',
    },
})

// ID 54 — Employee 1:1 Context Aggregation for AI Agents
export const ucScenario54 = Record({
    $id: Now.ID['uc-scenario-54'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Employee 1:1 Context Aggregation for AI Agents',
        industry: 'Cross-Industry',
        domain: 'Human Resources',
        description:
            'Agent surfaces context for manager 1:1s by federating GitHub/Jira/Teams/Gmail activity into WDF tables',
        business_problem:
            'Agent surfaces context for manager 1:1s by federating GitHub/Jira/Teams/Gmail activity into WDF tables',
        products: 'Zero Copy Connectors, Now Assist',
        external_systems: 'GitHub, Jira, Microsoft Teams, Gmail, Google Calendar',
        solution:
            'Using Zero Copy Connectors and Now Assist to federate activity data from GitHub, Jira, Microsoft Teams, Gmail, and Google Calendar into WDF tables for AI-driven 1:1 context aggregation.',
        outcome:
            'Managers receive AI-curated context for 1:1 meetings, eliminating manual data gathering across collaboration tools.',
        ui_surface: 'Agentic (Now Assist)',
        query_complexity: 'Simple select',
        latency: '<1s',
        deployment_status: 'Illustrative',
        keywords: 'AI agent, HR, 1:1, context aggregation',
    },
})

// ID 55 — Supply Chain Disruption Reasoning for Procurement Agents
export const ucScenario55 = Record({
    $id: Now.ID['uc-scenario-55'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Supply Chain Disruption Reasoning for Procurement Agents',
        industry: 'Manufacturing',
        domain: 'Supply Chain',
        description:
            'Agent reasons over supplier performance, logistics logs, and commodity price indices for disruption/sourcing questions',
        business_problem:
            'Agent reasons over supplier performance, logistics logs, and commodity price indices for disruption/sourcing questions',
        products: 'Zero Copy Connectors, Now Assist',
        external_systems: 'SAP, Oracle',
        solution:
            'Using Zero Copy Connectors and Now Assist to federate supplier performance, logistics logs, and commodity price indices from SAP and Oracle for AI agent reasoning on disruption and sourcing questions.',
        outcome:
            'Procurement agents receive AI-driven supply chain insights, enabling faster disruption response and optimized sourcing decisions.',
        ui_surface: 'Agentic (Now Assist)',
        query_complexity: 'Simple select',
        latency: '2-3s avg',
        deployment_status: 'Illustrative',
        keywords: 'AI agent, supply chain, procurement, disruption',
    },
})

// ID 56 — Contract Obligation Monitoring Agent
export const ucScenario56 = Record({
    $id: Now.ID['uc-scenario-56'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Contract Obligation Monitoring Agent',
        industry: 'Cross-Industry',
        domain: 'Legal & Compliance',
        description:
            'Agent surfaces contracts at risk of breach/renewal by reasoning over contract terms, obligation milestones, counterparty data',
        business_problem:
            'Agent surfaces contracts at risk of breach/renewal by reasoning over contract terms, obligation milestones, counterparty data',
        products: 'Zero Copy Connectors, AI Agents',
        external_systems: 'Contract management system / legal data warehouse',
        solution:
            'Using Zero Copy Connectors and AI Agents to federate contract terms, obligation milestones, and counterparty data from the contract management system, enabling the agent to surface contracts at risk of breach or renewal.',
        outcome:
            'Proactive contract risk management with AI-driven identification of breach and renewal risks before deadlines.',
        ui_surface: 'Agentic',
        query_complexity: 'Simple select',
        latency: '2-3s avg',
        deployment_status: 'Illustrative',
        keywords: 'AI agent, legal, contract, compliance',
    },
})

// ID 57 — Infrastructure Incident Reasoning Agent
export const ucScenario57 = Record({
    $id: Now.ID['uc-scenario-57'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Infrastructure Incident Reasoning Agent',
        industry: 'Technology',
        domain: 'IT Operations',
        description:
            'Agent correlates APM telemetry, change history, and CMDB config to surface probable cause during incidents',
        business_problem:
            'Agent correlates APM telemetry, change history, and CMDB config to surface probable cause during incidents',
        products: 'Zero Copy Connectors, AI Agents',
        external_systems: 'Infrastructure monitoring system',
        solution:
            'Using Zero Copy Connectors and AI Agents to federate APM telemetry from the infrastructure monitoring system, correlating with change history and CMDB config to surface probable cause during incidents.',
        outcome:
            'Faster incident resolution with AI-driven probable cause identification from correlated telemetry, change, and configuration data.',
        ui_surface: 'Agentic',
        query_complexity: 'Simple select',
        latency: '<1s',
        deployment_status: 'Illustrative',
        keywords: 'AI agent, ITOM, incident, root cause',
    },
})

// ID 58 — Financial Close Exception Reasoning Agent
export const ucScenario58 = Record({
    $id: Now.ID['uc-scenario-58'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Financial Close Exception Reasoning Agent',
        industry: 'Financial Services',
        domain: 'Finance',
        description:
            'Agent triages reconciliation exceptions over GL, exception log, approval status during month-end close',
        business_problem:
            'Agent triages reconciliation exceptions over GL, exception log, approval status during month-end close',
        products: 'Zero Copy Connectors, AI Agents',
        external_systems: 'ERP / GL / close management platform',
        solution:
            'Using Zero Copy Connectors and AI Agents to federate GL data, exception logs, and approval status from the ERP and close management platform for AI-driven reconciliation exception triage during month-end close.',
        outcome:
            'Accelerated month-end close with AI-driven exception triage, reducing manual reconciliation effort and close cycle time.',
        ui_surface: 'Agentic',
        query_complexity: 'Simple select',
        latency: '2-3s avg',
        deployment_status: 'Illustrative',
        keywords: 'AI agent, finance, month-end close, reconciliation',
    },
})

// ID 59 — Production Quality Analytics on Lakehouse Data
export const ucScenario59 = Record({
    $id: Now.ID['uc-scenario-59'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Production Quality Analytics on Lakehouse Data',
        industry: 'Manufacturing',
        domain: 'Manufacturing / Industrial',
        description:
            'Interactive workspace over 3M+ production quality records; UI dropdown/free-text filters against a single Databricks catalog',
        business_problem:
            'Interactive workspace over 3M+ production quality records; UI dropdown/free-text filters against a single Databricks catalog',
        products: 'Zero Copy Connectors, Platform Analytics',
        external_systems: 'Snowflake, Databricks',
        solution:
            'Using Zero Copy Connectors and Platform Analytics to query 3M+ production quality records from Snowflake and Databricks, powering an interactive workspace with dropdown and free-text filters.',
        outcome:
            'Real-time production quality analytics at scale with interactive filtering over millions of records, enabling faster quality issue identification.',
        ui_surface: 'Dashboard / Workspace',
        query_complexity: 'Aggregate',
        latency: '<2s',
        deployment_status: 'Illustrative',
        keywords: 'manufacturing, quality, analytics, lakehouse',
    },
})

// ID 60 — Network Performance Analytics via Materialized View
export const ucScenario60 = Record({
    $id: Now.ID['uc-scenario-60'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Network Performance Analytics via Materialized View',
        industry: 'Telecommunications',
        domain: 'Telecommunications',
        description:
            'Workspace over a 5M+ record BigQuery materialized view; filter by region / 4G-5G / time window',
        business_problem:
            'Workspace over a 5M+ record BigQuery materialized view; filter by region / 4G-5G / time window',
        products: 'Zero Copy Connectors',
        external_systems: 'BigQuery',
        solution:
            'Using Zero Copy Connectors to query a 5M+ record BigQuery materialized view, powering a network performance workspace with region, 4G-5G, and time window filters.',
        outcome:
            'Interactive network performance analytics at scale over 5M+ records with sub-5s response times for telecom operations teams.',
        ui_surface: 'Dashboard',
        query_complexity: 'Aggregate',
        latency: '<5s at 5M+ records',
        deployment_status: 'Illustrative',
        keywords: 'telecom, network, analytics, BigQuery',
    },
})

// ID 61 — Customer Behavior Analytics on Apache Iceberg Open Lakehouse
export const ucScenario61 = Record({
    $id: Now.ID['uc-scenario-61'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Customer Behavior Analytics on Apache Iceberg Open Lakehouse',
        industry: 'Retail',
        domain: 'Retail / E-Commerce',
        description:
            'Workspace over an Iceberg open lakehouse; browse/purchase/return events',
        business_problem:
            'Workspace over an Iceberg open lakehouse; browse/purchase/return events',
        products: 'Zero Copy Connectors',
        external_systems: 'Apache Iceberg (Amazon S3 Tables / Microsoft OneLake)',
        solution:
            'Using Zero Copy Connectors to query an Apache Iceberg open lakehouse on Amazon S3 Tables and Microsoft OneLake, surfacing browse, purchase, and return event analytics.',
        outcome:
            'Unified customer behavior analytics across open lakehouse data, enabling data-driven retail and e-commerce decisions.',
        ui_surface: 'Dashboard / Workspace',
        query_complexity: 'Simple select',
        latency: '2-3s avg',
        deployment_status: 'Illustrative',
        keywords: 'retail, e-commerce, Iceberg, analytics',
    },
})

// ID 62 — Risk & Exposure Dashboard on Enterprise Data Warehouse
export const ucScenario62 = Record({
    $id: Now.ID['uc-scenario-62'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Risk & Exposure Dashboard on Enterprise Data Warehouse',
        industry: 'Financial Services',
        domain: 'Financial Services',
        description:
            'Live exposure/concentration data from Snowflake; filter by counterparty, asset class, geography, risk rating',
        business_problem:
            'Live exposure/concentration data from Snowflake; filter by counterparty, asset class, geography, risk rating',
        products: 'Zero Copy Connectors',
        external_systems: 'Snowflake',
        solution:
            'Using Zero Copy Connectors to query live exposure and concentration data from Snowflake, powering a risk dashboard with counterparty, asset class, geography, and risk rating filters.',
        outcome:
            'Real-time risk and exposure visibility with interactive filtering, enabling faster risk assessment and regulatory reporting.',
        ui_surface: 'Dashboard',
        query_complexity: 'Simple select',
        latency: '<2s',
        deployment_status: 'Illustrative',
        keywords: 'finance, risk, exposure, dashboard',
    },
})

// ID 63 — Clinical Operations Analytics on Regulated Data Lakehouse
export const ucScenario63 = Record({
    $id: Now.ID['uc-scenario-63'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Clinical Operations Analytics on Regulated Data Lakehouse',
        industry: 'Healthcare',
        domain: 'Healthcare',
        description:
            'Clinical ops KPIs from HIPAA-compliant lakehouse; row/column security enforced at source',
        business_problem:
            'Clinical ops KPIs from HIPAA-compliant lakehouse; row/column security enforced at source',
        products: 'Zero Copy Connectors',
        external_systems: 'FHIR / HL7 data warehouse',
        solution:
            'Using Zero Copy Connectors to query clinical ops KPIs from a HIPAA-compliant FHIR/HL7 data warehouse with row and column security enforced at the source.',
        outcome:
            'HIPAA-compliant clinical analytics with source-enforced security, enabling operational insights without compromising patient data protection.',
        ui_surface: 'Dashboard / Workspace',
        query_complexity: 'Simple select',
        latency: '<3s',
        deployment_status: 'Illustrative',
        keywords: 'healthcare, clinical, HIPAA, analytics',
    },
})

// ID 64 — Multi-Entity Financial Consolidation Reporting
export const ucScenario64 = Record({
    $id: Now.ID['uc-scenario-64'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Multi-Entity Financial Consolidation Reporting',
        industry: 'Financial Services',
        domain: 'Finance',
        description:
            'On-demand consolidation joining regional financial DBs via shared dimension table',
        business_problem:
            'On-demand consolidation joining regional financial DBs via shared dimension table',
        products: 'Zero Copy Connectors',
        external_systems: 'Oracle, SAP (multiple entities)',
        solution:
            'Using Zero Copy Connectors to federate regional financial databases from Oracle and SAP via shared dimension tables for on-demand consolidation reporting.',
        outcome:
            'Unified multi-entity financial consolidation without manual data aggregation, reducing close cycle time and reporting errors.',
        ui_surface: 'List view (scheduled report)',
        query_complexity: 'Scheduled batch',
        latency: 'N/A — Scheduled',
        deployment_status: 'Illustrative',
        keywords: 'finance, consolidation, reporting, multi-entity',
    },
})

// ID 65 — Workforce Analytics Across Fragmented HR Systems
export const ucScenario65 = Record({
    $id: Now.ID['uc-scenario-65'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Workforce Analytics Across Fragmented HR Systems',
        industry: 'Cross-Industry',
        domain: 'Human Resources',
        description:
            'Federate headcount/comp/performance across dual (post-merger) HR systems into unified reporting',
        business_problem:
            'Federate headcount/comp/performance across dual (post-merger) HR systems into unified reporting',
        products: 'Zero Copy Connectors',
        external_systems: 'Workday, SuccessFactors',
        solution:
            'Using Zero Copy Connectors to federate headcount, compensation, and performance data from Workday and SuccessFactors (post-merger) into unified workforce reporting.',
        outcome:
            'Unified workforce analytics across fragmented HR systems, enabling data-driven people decisions during post-merger integration.',
        ui_surface: 'List view (scheduled report)',
        query_complexity: 'Scheduled batch',
        latency: 'N/A — Scheduled',
        deployment_status: 'Illustrative',
        keywords: 'HR, workforce analytics, M&A, reporting',
    },
})

// ID 66 — Cross-Facility Operational KPI Reporting
export const ucScenario66 = Record({
    $id: Now.ID['uc-scenario-66'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Cross-Facility Operational KPI Reporting',
        industry: 'Cross-Industry',
        domain: 'Operations',
        description:
            'Federate KPI data across heterogeneous facility systems into a unified operations dashboard',
        business_problem:
            'Federate KPI data across heterogeneous facility systems into a unified operations dashboard',
        products: 'Zero Copy Connectors',
        external_systems: 'Operational systems (multiple facilities)',
        solution:
            'Using Zero Copy Connectors to federate KPI data from heterogeneous facility operational systems into a unified operations dashboard within ServiceNow.',
        outcome:
            'Consolidated operational KPI visibility across all facilities, enabling benchmarking and performance optimization.',
        ui_surface: 'List view (scheduled report)',
        query_complexity: 'Scheduled batch',
        latency: 'N/A — Scheduled',
        deployment_status: 'Illustrative',
        keywords: 'operations, KPI, facilities, reporting',
    },
})

// ID 67 — Real-Time Shipment Status for Customer-Facing Teams
export const ucScenario67 = Record({
    $id: Now.ID['uc-scenario-67'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Real-Time Shipment Status for Customer-Facing Teams',
        industry: 'Logistics',
        domain: 'Logistics',
        description:
            'Live shipment status from TMS/carrier DB surfaced in workspace on customer inquiry',
        business_problem:
            'Live shipment status from TMS/carrier DB surfaced in workspace on customer inquiry',
        products: 'Zero Copy Connectors',
        external_systems: 'SAP / carrier API',
        solution:
            'Using Zero Copy Connectors to query live shipment status from TMS and carrier databases, surfacing real-time tracking data in the workspace during customer inquiries.',
        outcome:
            'Customer-facing teams provide instant shipment status without switching systems, improving response time and customer satisfaction.',
        ui_surface: 'Sidebar (async)',
        query_complexity: 'Simple select',
        latency: '2-3s avg',
        deployment_status: 'Illustrative',
        keywords: 'logistics, shipment, TMS, customer service',
    },
})

// ID 68 — Live Portfolio Position Lookup for Relationship Managers
export const ucScenario68 = Record({
    $id: Now.ID['uc-scenario-68'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Live Portfolio Position Lookup for Relationship Managers',
        industry: 'Financial Services',
        domain: 'Financial Services',
        description:
            'Live portfolio positions + pricing surfaced in client workspace during meetings',
        business_problem:
            'Live portfolio positions + pricing surfaced in client workspace during meetings',
        products: 'Zero Copy Connectors',
        external_systems: 'Financial / portfolio management system',
        solution:
            'Using Zero Copy Connectors to query live portfolio positions and pricing from the financial portfolio management system, surfacing them in the client workspace during meetings.',
        outcome:
            'Relationship managers access real-time portfolio data during client meetings, enabling informed discussions and faster decision-making.',
        ui_surface: 'Sidebar (async)',
        query_complexity: 'Simple select',
        latency: '<2s',
        deployment_status: 'Illustrative',
        keywords: 'finance, portfolio, relationship manager, wealth',
    },
})
