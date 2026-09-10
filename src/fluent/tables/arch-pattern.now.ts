import '@servicenow/sdk/global'
import { Table, StringColumn, ListColumn, JsonColumn, ReferenceColumn, Record } from '@servicenow/sdk/core'
import { demoZccSql, demoStream, demoIh, demoSox } from './scenario-demo.now'
import {
    connZcc,
    connZccErp,
    connIntegrationHub,
    connStreamConnect,
    connMcpClient,
    connMcpServer,
} from './connector.now'

export const x_snc_wdf_advisory_arch_pat = Table({
    name: 'x_snc_wdf_advisory_arch_pat',
    label: 'WDF Architecture Pattern',
    display: 'name',
    allowWebServiceAccess: true,
    schema: {
        name: StringColumn({
            label: 'Name',
            mandatory: true,
        }),
        tagline: StringColumn({
            label: 'Tagline',
            maxLength: 200,
        }),
        data_flow_steps: StringColumn({
            label: 'Data Flow Steps',
            maxLength: 2000,
        }),
        connectors: ListColumn({
            label: 'Connectors',
            referenceTable: 'x_snc_wdf_advisory_connector',
        }),
        industry_examples: JsonColumn({
            label: 'Industry Examples',
        }),
        linked_demo: ReferenceColumn({
            label: 'Linked Demo',
            referenceTable: 'x_snc_wdf_advisory_scn_demo',
        }),
    },
    index: [
        {
            name: 'index',
            unique: false,
            element: 'linked_demo',
        },
    ],
})

export const patInsightToAction = Record({
    $id: Now.ID['pat-bi-directional'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_arch_pat',
    data: {
        name: 'Insight to Action',
        tagline: 'A signal from your data cloud triggers a ServiceNow workflow',
        data_flow_steps:
            '1. Signal detected in external data source (anomaly, threshold breach, new record)\n2. Zero Copy Connect or ZCC for ERP queries the source in real-time\n3. Signal evaluated against business rules in ServiceNow\n4. Workflow triggered automatically — incident, case, task, or change\n5. Assigned owner notified with full context from source system\n6. Resolution tracked end-to-end in ServiceNow',
        connectors: [connZcc, connZccErp, connIntegrationHub],
        industry_examples: JSON.stringify([
            {
                industry: 'Financial Services',
                example: 'Fraud signal from data warehouse triggers investigation case with full transaction context',
            },
            {
                industry: 'Manufacturing',
                example: 'Quality threshold breach in MES triggers corrective action workflow',
            },
            { industry: 'Healthcare', example: 'Patient readmission risk score triggers care coordination workflow' },
        ]),
        linked_demo: demoIh,
    },
})

export const patRealTimeDataEnrichment = Record({
    $id: Now.ID['pat-content-index'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_arch_pat',
    data: {
        name: 'Real-Time Data Enrichment',
        tagline: 'Live context from external systems surfaces exactly when a decision is made',
        data_flow_steps:
            '1. Agent opens a record (incident, case, CI) in ServiceNow\n2. ServiceNow detects which external context is relevant\n3. Zero Copy or ZCC for ERP fetches live data from source\n4. External data displayed inline — no copy, no stale cache\n5. Agent makes informed decision with full context\n6. Actions taken in ServiceNow, source data stays in place',
        connectors: [connZcc, connZccErp],
        industry_examples: JSON.stringify([
            {
                industry: 'Retail',
                example: 'Store support agent sees live POS system status and inventory levels alongside the incident',
            },
            {
                industry: 'Telecom',
                example: 'Network ops sees live element health from NMS while triaging a major incident',
            },
            { industry: 'Technology', example: 'Cloud CI enriched with live AWS/Azure resource state when accessed' },
        ]),
        linked_demo: demoSox,
    },
})

export const patRealTimeEventResponse = Record({
    $id: Now.ID['pat-event-driven'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_arch_pat',
    data: {
        name: 'Real-Time Event Response',
        tagline: 'Something happens continuously in an external system — ServiceNow reacts immediately',
        data_flow_steps:
            '1. External system publishes event to Kafka/streaming platform\n2. Stream Connect ingests event in real-time (sub-second)\n3. Event validated, transformed, and enriched\n4. ServiceNow record created or updated automatically\n5. Downstream workflow triggered by the record change\n6. Integration Hub orchestrates any cross-system response',
        connectors: [connStreamConnect, connZcc, connIntegrationHub],
        industry_examples: JSON.stringify([
            {
                industry: 'Security',
                example: 'SIEM alerts streamed to create security incidents with full threat context automatically',
            },
            {
                industry: 'IoT/Manufacturing',
                example: 'Sensor telemetry streamed for predictive maintenance — work orders created before failures',
            },
            {
                industry: 'Financial Services',
                example: 'Transaction anomalies streamed for real-time fraud case management',
            },
        ]),
        linked_demo: demoStream,
    },
})

export const patAgenticMultiConnector = Record({
    $id: Now.ID['pat-federated-query'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_arch_pat',
    data: {
        name: 'Agentic Multi-Connector Loop',
        tagline: 'A streaming event triggers an autonomous agent that reads, decides, and acts across 3-5 connectors',
        data_flow_steps:
            '1. Streaming event triggers an AI agent in ServiceNow\n2. Agent uses MCP Client to call external tools and gather context\n3. Zero Copy queries data warehouses for historical analysis\n4. Agent reasons over combined data and decides next action\n5. Agent executes resolution — update records, notify, escalate\n6. Full decision trail logged for audit and continuous learning',
        connectors: [connStreamConnect, connMcpClient, connZcc],
        industry_examples: JSON.stringify([
            {
                industry: 'Technology',
                example:
                    'Alert triggers agent that checks monitoring, queries CMDB, runs diagnostics, and auto-remediates',
            },
            {
                industry: 'Financial Services',
                example:
                    'Compliance event triggers agent that gathers audit data, evaluates risk, and files regulatory report',
            },
            {
                industry: 'Healthcare',
                example: 'Patient alert triggers agent that checks EHR, reviews protocols, and coordinates care team',
            },
        ]),
        linked_demo: demoZccSql,
    },
})

export const patAutomateAcrossSystems = Record({
    $id: Now.ID['pat-realtime-enrich'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_arch_pat',
    data: {
        name: 'Automate Across Systems',
        tagline: 'A ServiceNow workflow triggers actions in external apps — no manual handoffs',
        data_flow_steps:
            '1. Business event occurs in ServiceNow (approval, state change, SLA breach)\n2. Integration Hub flow triggered automatically\n3. MCP Server exposes ServiceNow actions to external AI agents\n4. MCP Client calls external system APIs to execute actions\n5. Results returned and ServiceNow records updated\n6. End-to-end workflow completed without human handoff',
        connectors: [connIntegrationHub, connMcpServer, connMcpClient],
        industry_examples: JSON.stringify([
            {
                industry: 'Cross-Industry',
                example: 'Approved change request automatically provisions infrastructure in AWS and updates CMDB',
            },
            {
                industry: 'HR',
                example: 'Employee onboarding triggers account creation in AD, Workday enrollment, and equipment order',
            },
            {
                industry: 'IT Operations',
                example: 'SLA breach triggers escalation, vendor notification, and executive summary — all automated',
            },
        ]),
        linked_demo: demoIh,
    },
})
