import '@servicenow/sdk/global'
import { Table, StringColumn, IntegerColumn, BooleanColumn, ChoiceColumn, ReferenceColumn, JsonColumn, Record } from '@servicenow/sdk/core'
import { connZcc, connZccErp, connIntegrationHub, connStreamConnect, connExternalContent } from './connector.now'

export const x_snc_wdf_advisory_scn_demo = Table({
    name: 'x_snc_wdf_advisory_scn_demo',
    label: 'WDF Scenario Demo',
    display: 'title',
    allowWebServiceAccess: true,
    extensible: true,
    schema: {
        title: StringColumn({
            label: 'Title',
            mandatory: true,
        }),
        query_text: StringColumn({
            label: 'Query Text',
            maxLength: 500,
        }),
        tags: StringColumn({
            label: 'Tags',
            maxLength: 500,
        }),
        connector: ReferenceColumn({
            label: 'Connector',
            referenceTable: 'x_snc_wdf_advisory_connector',
        }),
    },
})

export const x_snc_wdf_advisory_demo_step = Table({
    name: 'x_snc_wdf_advisory_demo_step',
    label: 'WDF Demo Step',
    display: 'title',
    allowWebServiceAccess: true,
    schema: {
        step_number: IntegerColumn({
            label: 'Step Number',
            mandatory: true,
        }),
        tag_label: StringColumn({
            label: 'Tag Label',
            maxLength: 100,
        }),
        title: StringColumn({
            label: 'Title',
            mandatory: true,
        }),
        description: StringColumn({
            label: 'Description',
            maxLength: 2000,
        }),
        panel_type: ChoiceColumn({
            label: 'Panel Type',
            choices: {
                rows: 'Rows',
                pairs: 'Pairs',
                connectors: 'Connectors',
                sources: 'Sources',
            },
        }),
        panel_data: JsonColumn({
            label: 'Panel Data',
        }),
        is_final_step: BooleanColumn({
            label: 'Is Final Step',
            default: false,
        }),
        resilience_note: StringColumn({
            label: 'Resilience Note',
            maxLength: 1000,
        }),
        scenario: ReferenceColumn({
            label: 'Scenario',
            mandatory: true,
            referenceTable: 'x_snc_wdf_advisory_scn_demo',
        }),
    },
})

export const demoHrsdPay = Record({
    $id: Now.ID['demo-hrsd-pay'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_scn_demo',
    data: {
        title: 'HRSD Payroll Integration',
        query_text: 'Show me how to surface payroll data from Workday in HR Service Delivery without copying sensitive compensation data',
        tags: 'HRSD,Payroll,Workday,ZCC,Regulated',
        connector: connZccErp,
    },
})

export const demoZccSql = Record({
    $id: Now.ID['demo-zcc-sql'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_scn_demo',
    data: {
        title: 'ZCC SQL Database Query',
        query_text: 'I need to query our on-prem SQL Server for asset data without replicating it into ServiceNow',
        tags: 'ZCC,SQL Server,Assets,On-Prem,Read-Only',
        connector: connZcc,
    },
})

export const demoStream = Record({
    $id: Now.ID['demo-stream'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_scn_demo',
    data: {
        title: 'Real-Time Event Streaming',
        query_text: 'We need to ingest security events from our SIEM into ServiceNow in real-time for automated incident creation',
        tags: 'Stream Connect,Security,SIEM,Real-Time,Events',
        connector: connStreamConnect,
    },
})

export const demoIh = Record({
    $id: Now.ID['demo-ih'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_scn_demo',
    data: {
        title: 'Integration Hub Workflow',
        query_text: 'I want to automatically create a Jira ticket when a P1 incident is opened and sync status updates bi-directionally',
        tags: 'Integration Hub,Jira,Bi-directional,Automation,ITSM',
        connector: connIntegrationHub,
    },
})

export const demoAr = Record({
    $id: Now.ID['demo-ar'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_scn_demo',
    data: {
        title: 'Accounts Receivable Visibility',
        query_text: 'Finance needs to see AR aging data from SAP in their ServiceNow workspace without data duplication',
        tags: 'Finance,SAP,Accounts Receivable,ZCC-ERP,Reporting',
        connector: connZccErp,
    },
})

export const demoSox = Record({
    $id: Now.ID['demo-sox'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_scn_demo',
    data: {
        title: 'SOX Compliance Audit Trail',
        query_text: 'We need to pull audit logs from multiple systems into ServiceNow GRC for SOX compliance without storing regulated financial data',
        tags: 'SOX,Compliance,GRC,Audit,Regulated,Multi-Source',
        connector: connExternalContent,
    },
})

export const demoFraud = Record({
    $id: Now.ID['demo-fraud'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_scn_demo',
    data: {
        title: 'Fraud Detection Pipeline',
        query_text: 'We want to stream transaction anomalies from our fraud detection engine into ServiceNow for case management',
        tags: 'Fraud,Streaming,Security,Case Management,Real-Time',
        connector: connStreamConnect,
    },
})

// ─── Demo Steps: ZCC SQL Database Query ───────────────────────────────────────

export const stepZccSql1 = Record({
    $id: Now.ID['step-zcc-sql-1'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_demo_step',
    data: {
        step_number: 1,
        tag_label: 'Setup',
        title: 'Configure JDBC connection profile',
        description: 'Create a ZCC connection profile pointing to the on-prem SQL Server instance. Specify the JDBC URL, authentication credentials, and network route through the MID Server.',
        panel_type: 'pairs',
        panel_data: JSON.stringify({ pairs: [{ label: 'JDBC URL', value: 'jdbc:sqlserver://erp-db-01:1433;databaseName=Assets' }, { label: 'Auth Method', value: 'Windows Integrated (Kerberos)' }, { label: 'MID Server', value: 'mid-corp-datacenter-01' }] }),
        is_final_step: false,
        resilience_note: 'Verify MID Server connectivity before proceeding — a failed heartbeat blocks all subsequent queries.',
        scenario: demoZccSql,
    },
})

export const stepZccSql2 = Record({
    $id: Now.ID['step-zcc-sql-2'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_demo_step',
    data: {
        step_number: 2,
        tag_label: 'Define',
        title: 'Author the SQL query template',
        description: 'Write a parameterized SELECT statement targeting the asset inventory table. Use bind variables for department and location filters to prevent SQL injection.',
        panel_type: 'rows',
        panel_data: JSON.stringify({ rows: [{ text: 'SELECT asset_tag, model, location, last_scan FROM dbo.HW_Assets WHERE department = :dept AND site_code = :site ORDER BY last_scan DESC' }] }),
        is_final_step: false,
        resilience_note: '',
        scenario: demoZccSql,
    },
})

export const stepZccSql3 = Record({
    $id: Now.ID['step-zcc-sql-3'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_demo_step',
    data: {
        step_number: 3,
        tag_label: 'Map',
        title: 'Map columns to virtual table fields',
        description: 'Define the ZCC virtual table schema by mapping each SQL column to a ServiceNow field type. Configure display values and reference qualifiers for downstream consumption.',
        panel_type: 'connectors',
        panel_data: JSON.stringify({ connectors: [{ source: 'asset_tag → String (display)', target: 'cmdb_ci.asset_tag' }, { source: 'model → String', target: 'cmdb_model.name' }, { source: 'location → Reference', target: 'cmn_location.name' }, { source: 'last_scan → GlideDateTime', target: 'Computed' }] }),
        is_final_step: false,
        resilience_note: 'Set a 30-second query timeout to prevent long-running queries from impacting the source database.',
        scenario: demoZccSql,
    },
})

export const stepZccSql4 = Record({
    $id: Now.ID['step-zcc-sql-4'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_demo_step',
    data: {
        step_number: 4,
        tag_label: 'Validate',
        title: 'Test query and verify results',
        description: 'Execute the virtual table query from the ServiceNow platform and confirm row counts match the source. Validate that no sensitive PII columns are exposed through the mapping.',
        panel_type: 'sources',
        panel_data: JSON.stringify({ sources: [{ name: 'Row count match', status: 'pass', detail: '2,847 rows returned — matches source' }, { name: 'PII scan', status: 'pass', detail: 'No SSN, DOB, or salary columns exposed' }, { name: 'Latency', status: 'pass', detail: 'Avg 220ms per page (25 rows)' }] }),
        is_final_step: true,
        resilience_note: '',
        scenario: demoZccSql,
    },
})

// ─── Demo Steps: Real-Time Event Streaming ────────────────────────────────────

export const stepStream1 = Record({
    $id: Now.ID['step-stream-1'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_demo_step',
    data: {
        step_number: 1,
        tag_label: 'Connect',
        title: 'Establish Kafka topic subscription',
        description: 'Configure Stream Connect to subscribe to the SIEM Kafka topic. Specify consumer group, offset strategy, and the TLS certificates for broker authentication.',
        panel_type: 'pairs',
        panel_data: JSON.stringify({ pairs: [{ label: 'Broker', value: 'kafka-sec-01.corp:9093' }, { label: 'Topic', value: 'siem.security.alerts' }, { label: 'Consumer Group', value: 'sn-incident-creator' }, { label: 'Offset', value: 'latest' }] }),
        is_final_step: false,
        resilience_note: 'Enable auto-commit with a 5-second interval to prevent duplicate event processing after consumer restarts.',
        scenario: demoStream,
    },
})

export const stepStream2 = Record({
    $id: Now.ID['step-stream-2'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_demo_step',
    data: {
        step_number: 2,
        tag_label: 'Transform',
        title: 'Define event schema mapping',
        description: 'Map incoming JSON event fields to ServiceNow incident fields. Configure severity-to-priority translation and enrichment lookups for CI identification.',
        panel_type: 'connectors',
        panel_data: JSON.stringify({ connectors: [{ source: 'event.severity (1-5)', target: 'incident.priority' }, { source: 'event.source_ip', target: 'incident.cmdb_ci (lookup)' }, { source: 'event.description', target: 'incident.short_description' }, { source: 'event.timestamp', target: 'incident.sys_created_on' }] }),
        is_final_step: false,
        resilience_note: '',
        scenario: demoStream,
    },
})

export const stepStream3 = Record({
    $id: Now.ID['step-stream-3'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_demo_step',
    data: {
        step_number: 3,
        tag_label: 'Filter',
        title: 'Configure deduplication and throttling',
        description: 'Set up event deduplication using a composite key of source IP and alert rule ID. Apply throttling to cap incident creation at 50 per minute to prevent flood scenarios.',
        panel_type: 'rows',
        panel_data: JSON.stringify({ rows: [{ text: 'Dedup key: ${source_ip}::${rule_id} — window: 5 minutes' }, { text: 'Throttle: max 50 incidents/min — excess queued to DLQ' }, { text: 'DLQ retention: 72 hours with alert on depth > 500' }] }),
        is_final_step: false,
        resilience_note: 'Monitor the dead-letter queue depth — sustained growth indicates the throttle threshold needs tuning.',
        scenario: demoStream,
    },
})

export const stepStream4 = Record({
    $id: Now.ID['step-stream-4'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_demo_step',
    data: {
        step_number: 4,
        tag_label: 'Verify',
        title: 'End-to-end streaming validation',
        description: 'Publish synthetic test events to the Kafka topic and confirm incidents are created within the SLA window. Validate deduplication prevents duplicate incidents for repeated alerts.',
        panel_type: 'sources',
        panel_data: JSON.stringify({ sources: [{ name: 'Latency', status: 'pass', detail: 'Event-to-incident: 1.2s avg (SLA: <5s)' }, { name: 'Deduplication', status: 'pass', detail: '10 duplicate events → 1 incident created' }, { name: 'Throttle test', status: 'pass', detail: '200 events/min → 50 incidents + 150 queued to DLQ' }] }),
        is_final_step: true,
        resilience_note: '',
        scenario: demoStream,
    },
})

// ─── Demo Steps: Integration Hub Workflow ─────────────────────────────────────

export const stepIh1 = Record({
    $id: Now.ID['step-ih-1'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_demo_step',
    data: {
        step_number: 1,
        tag_label: 'Auth',
        title: 'Configure Jira OAuth credentials',
        description: 'Set up the Integration Hub connection alias with Jira Cloud OAuth 2.0 credentials. Register the ServiceNow callback URL in the Jira developer console and store the client secret securely.',
        panel_type: 'pairs',
        panel_data: JSON.stringify({ pairs: [{ label: 'Provider', value: 'Jira Cloud (OAuth 2.0)' }, { label: 'Base URL', value: 'https://acme.atlassian.net' }, { label: 'Scope', value: 'read:jira-work write:jira-work' }, { label: 'Token Refresh', value: 'Automatic (7-day expiry)' }] }),
        is_final_step: false,
        resilience_note: 'Store refresh tokens in an encrypted credential record — never in system properties.',
        scenario: demoIh,
    },
})

export const stepIh2 = Record({
    $id: Now.ID['step-ih-2'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_demo_step',
    data: {
        step_number: 2,
        tag_label: 'Outbound',
        title: 'Build incident-to-Jira creation flow',
        description: 'Create a Flow Designer flow triggered by P1 incident creation. Map incident fields to Jira issue fields including priority, description, and assignment group as a custom label.',
        panel_type: 'connectors',
        panel_data: JSON.stringify({ connectors: [{ source: 'incident.short_description', target: 'jira.summary' }, { source: 'incident.priority', target: 'jira.priority (mapped)' }, { source: 'incident.description', target: 'jira.description (ADF)' }, { source: 'incident.assignment_group', target: 'jira.labels[]' }] }),
        is_final_step: false,
        resilience_note: '',
        scenario: demoIh,
    },
})

export const stepIh3 = Record({
    $id: Now.ID['step-ih-3'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_demo_step',
    data: {
        step_number: 3,
        tag_label: 'Inbound',
        title: 'Configure bi-directional status sync',
        description: 'Register a Jira webhook to notify ServiceNow on issue transitions. Map Jira statuses (To Do, In Progress, Done) back to incident states (New, In Progress, Resolved) via a transform action.',
        panel_type: 'rows',
        panel_data: JSON.stringify({ rows: [{ text: 'Jira "To Do" → Incident state: New (1)' }, { text: 'Jira "In Progress" → Incident state: In Progress (2)' }, { text: 'Jira "Done" → Incident state: Resolved (6)' }, { text: 'Conflict rule: most-recent-update wins (timestamp comparison)' }] }),
        is_final_step: false,
        resilience_note: 'Implement idempotency checks using correlation_id to prevent infinite update loops between systems.',
        scenario: demoIh,
    },
})

export const stepIh4 = Record({
    $id: Now.ID['step-ih-4'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_demo_step',
    data: {
        step_number: 4,
        tag_label: 'Test',
        title: 'Validate round-trip synchronization',
        description: 'Create a test P1 incident and confirm a Jira issue is created within 10 seconds. Transition the Jira issue to Done and verify the incident resolves automatically with correct close notes.',
        panel_type: 'sources',
        panel_data: JSON.stringify({ sources: [{ name: 'Outbound sync', status: 'pass', detail: 'Incident → Jira issue in 3.4s' }, { name: 'Inbound sync', status: 'pass', detail: 'Jira Done → Incident Resolved in 2.1s' }, { name: 'Loop prevention', status: 'pass', detail: 'No infinite update cycle detected over 10 transitions' }] }),
        is_final_step: true,
        resilience_note: '',
        scenario: demoIh,
    },
})
