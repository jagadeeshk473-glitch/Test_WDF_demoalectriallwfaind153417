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

// ─── Demo Steps: HRSD Payroll Integration ─────────────────────────────────────

export const stepHrsd1 = Record({
    $id: Now.ID['step-hrsd-1'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_demo_step',
    data: {
        step_number: 1,
        tag_label: 'Config',
        title: 'Define Workday connection profile',
        description: 'Set up a ZCC connection to the Workday HCM API with OAuth 2.0 credentials and specify the payroll data endpoint.',
        panel_type: 'pairs',
        panel_data: JSON.stringify({ pairs: [{ label: 'Endpoint', value: 'https://wd3-impl.workday.com/ccx/service/acme/Payroll/v38.0' }, { label: 'Auth', value: 'OAuth 2.0 (JWT Bearer)' }, { label: 'MID Server', value: 'mid-hr-secure-01' }, { label: 'Data Scope', value: 'Pay stubs, deductions, tax withholdings' }] }),
        is_final_step: false,
        resilience_note: 'Use a dedicated MID Server for HR data — never route through a shared corporate MID.',
        scenario: demoHrsdPay,
    },
})

export const stepHrsd2 = Record({
    $id: Now.ID['step-hrsd-2'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_demo_step',
    data: {
        step_number: 2,
        tag_label: 'Filter',
        title: 'Configure field-level security filters',
        description: 'Define which payroll fields are accessible vs restricted, ensuring compensation amounts are excluded while allowing pay period dates and deduction categories.',
        panel_type: 'rows',
        panel_data: JSON.stringify({ rows: [{ text: '✓ Expose: pay_period_start, pay_period_end, deduction_type, tax_jurisdiction' }, { text: '✗ Block: gross_pay, net_pay, hourly_rate, bonus_amount, SSN' }, { text: '✓ Expose: employer_contribution_type (401k, HSA, dental)' }, { text: '✗ Block: bank_account, routing_number' }] }),
        is_final_step: false,
        resilience_note: 'Field filters are enforced at the connector level — even admin users cannot bypass them via API.',
        scenario: demoHrsdPay,
    },
})

export const stepHrsd3 = Record({
    $id: Now.ID['step-hrsd-3'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_demo_step',
    data: {
        step_number: 3,
        tag_label: 'Map',
        title: 'Map payroll fields to HRSD case variables',
        description: 'Map exposed Workday payroll fields to HR Service Delivery case variables so agents can view relevant payroll context without seeing sensitive compensation data.',
        panel_type: 'connectors',
        panel_data: JSON.stringify({ connectors: [{ source: 'workday.pay_period_start', target: 'hr_case.u_pay_period' }, { source: 'workday.deduction_type', target: 'hr_case.u_deduction_category' }, { source: 'workday.tax_jurisdiction', target: 'hr_case.u_tax_state' }, { source: 'workday.employer_contrib_type', target: 'hr_case.u_benefit_type' }] }),
        is_final_step: false,
        resilience_note: '',
        scenario: demoHrsdPay,
    },
})

export const stepHrsd4 = Record({
    $id: Now.ID['step-hrsd-4'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_demo_step',
    data: {
        step_number: 4,
        tag_label: 'Verify',
        title: 'Validate data access and audit trail',
        description: 'Test the integration end-to-end, confirming agents see only permitted fields, verifying audit logs capture every data access event.',
        panel_type: 'sources',
        panel_data: JSON.stringify({ sources: [{ name: 'Field masking', status: 'pass', detail: "Compensation fields return '***RESTRICTED***' in all queries" }, { name: 'Audit logging', status: 'pass', detail: 'Every read logged with user, timestamp, and fields accessed' }, { name: 'Agent view', status: 'pass', detail: 'HR agents see deduction types but not dollar amounts' }] }),
        is_final_step: true,
        resilience_note: '',
        scenario: demoHrsdPay,
    },
})

// ─── Demo Steps: Fraud Detection Pipeline ─────────────────────────────────────

export const stepFraud1 = Record({
    $id: Now.ID['step-fraud-1'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_demo_step',
    data: {
        step_number: 1,
        tag_label: 'Ingest',
        title: 'Configure Stream Connect for fraud alerts',
        description: "Set up Stream Connect to subscribe to the fraud detection engine's event bus, specifying the topic for transaction anomaly alerts.",
        panel_type: 'pairs',
        panel_data: JSON.stringify({ pairs: [{ label: 'Source', value: 'fraud-engine.anomaly-alerts (Kafka)' }, { label: 'Broker', value: 'kafka-fraud-01.corp:9093' }, { label: 'Format', value: 'Avro (Schema Registry v2)' }, { label: 'Volume', value: '~2,000 events/hour (peak: 8,000)' }] }),
        is_final_step: false,
        resilience_note: 'Enable exactly-once semantics — duplicate fraud alerts create confusion for investigators.',
        scenario: demoFraud,
    },
})

export const stepFraud2 = Record({
    $id: Now.ID['step-fraud-2'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_demo_step',
    data: {
        step_number: 2,
        tag_label: 'Enrich',
        title: 'Correlate alerts with customer records',
        description: 'Enrich incoming fraud alerts with customer CMDB data and transaction history, looking up the account holder and attaching risk score context.',
        panel_type: 'connectors',
        panel_data: JSON.stringify({ connectors: [{ source: 'alert.account_id', target: 'customer_account.sys_id (lookup)' }, { source: 'alert.risk_score', target: 'sn_si_incident.severity' }, { source: 'alert.transaction_amount', target: 'sn_si_incident.u_disputed_amount' }, { source: 'alert.merchant_category', target: 'sn_si_incident.category' }] }),
        is_final_step: false,
        resilience_note: '',
        scenario: demoFraud,
    },
})

export const stepFraud3 = Record({
    $id: Now.ID['step-fraud-3'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_demo_step',
    data: {
        step_number: 3,
        tag_label: 'Route',
        title: 'Apply triage rules and assignment',
        description: 'Configure automated triage rules that assign fraud cases based on risk score thresholds and transaction amounts.',
        panel_type: 'rows',
        panel_data: JSON.stringify({ rows: [{ text: 'Risk score ≥ 90 → P1 Security Incident (immediate page to fraud team)' }, { text: 'Risk score 70-89 → P2 Investigation (auto-assign to fraud analyst queue)' }, { text: 'Risk score 50-69 → P3 Review (batch assignment, 4-hour SLA)' }, { text: 'Risk score < 50 → Log only (no case created, retained 30 days)' }] }),
        is_final_step: false,
        resilience_note: 'Set up a circuit breaker — if fraud alert volume spikes 10x, pause auto-creation and alert the SOC manager.',
        scenario: demoFraud,
    },
})

export const stepFraud4 = Record({
    $id: Now.ID['step-fraud-4'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_demo_step',
    data: {
        step_number: 4,
        tag_label: 'Validate',
        title: 'End-to-end fraud pipeline test',
        description: 'Inject synthetic fraud events at various risk levels and confirm correct case creation, assignment, and SLA timers.',
        panel_type: 'sources',
        panel_data: JSON.stringify({ sources: [{ name: 'P1 creation', status: 'pass', detail: 'Risk 95 alert → Security Incident in 1.8s' }, { name: 'Assignment', status: 'pass', detail: 'Fraud analyst queue received case with full context' }, { name: 'Suppression', status: 'pass', detail: 'Risk 40 alert → logged, no case created' }, { name: 'Dedup', status: 'pass', detail: 'Same transaction ID within 5min → single case' }] }),
        is_final_step: true,
        resilience_note: '',
        scenario: demoFraud,
    },
})

// ─── Demo Steps: Accounts Receivable Visibility ───────────────────────────────

export const stepAr1 = Record({
    $id: Now.ID['step-ar-1'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_demo_step',
    data: {
        step_number: 1,
        tag_label: 'Connect',
        title: 'Establish SAP ERP connection via ZCC',
        description: "Configure ZCC-ERP connector to access SAP's BAPI for accounts receivable aging data, authenticating via SAP RFC credentials through the MID Server.",
        panel_type: 'pairs',
        panel_data: JSON.stringify({ pairs: [{ label: 'SAP System', value: 'PRD (ECC 6.0 EHP8)' }, { label: 'BAPI', value: 'BAPI_AR_ACC_GETOPENITEMS' }, { label: 'Auth', value: 'RFC User (Type: Communication)' }, { label: 'MID Server', value: 'mid-erp-gateway-01' }] }),
        is_final_step: false,
        resilience_note: 'Use a dedicated RFC user with read-only authorization — never reuse a dialog user credential.',
        scenario: demoAr,
    },
})

export const stepAr2 = Record({
    $id: Now.ID['step-ar-2'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_demo_step',
    data: {
        step_number: 2,
        tag_label: 'Model',
        title: 'Define virtual table for AR aging',
        description: 'Create a ZCC virtual table that exposes AR aging buckets (current, 30, 60, 90, 120+ days) without replicating financial data into ServiceNow.',
        panel_type: 'connectors',
        panel_data: JSON.stringify({ connectors: [{ source: 'SAP.KUNNR (Customer)', target: 'ar_virtual.customer_id' }, { source: 'SAP.BUKRS (Company Code)', target: 'ar_virtual.company_code' }, { source: 'SAP.DMBTR (Amount LC)', target: 'ar_virtual.amount_local' }, { source: 'SAP.ZFBDT (Baseline Date)', target: 'ar_virtual.aging_bucket (computed)' }] }),
        is_final_step: false,
        resilience_note: '',
        scenario: demoAr,
    },
})

export const stepAr3 = Record({
    $id: Now.ID['step-ar-3'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_demo_step',
    data: {
        step_number: 3,
        tag_label: 'Display',
        title: 'Surface AR data in Finance workspace',
        description: 'Embed the virtual table as a related list on the Finance Service Management workspace, showing AR aging summaries filterable by customer and company code.',
        panel_type: 'rows',
        panel_data: JSON.stringify({ rows: [{ text: 'Widget: AR Aging Summary — grouped by customer, colored by bucket' }, { text: 'Filter: Company code, date range, amount threshold (>$10K)' }, { text: 'Drill-down: Click customer → full open items list' }, { text: 'Refresh: On-demand (no scheduled sync needed)' }] }),
        is_final_step: false,
        resilience_note: "Set query result caching to 5 minutes — AR data doesn't change frequently enough to justify real-time calls.",
        scenario: demoAr,
    },
})

export const stepAr4 = Record({
    $id: Now.ID['step-ar-4'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_demo_step',
    data: {
        step_number: 4,
        tag_label: 'Verify',
        title: 'Validate AR data accuracy',
        description: 'Compare virtual table results against SAP FBL5N report to confirm aging calculations match and no data is stored in ServiceNow.',
        panel_type: 'sources',
        panel_data: JSON.stringify({ sources: [{ name: 'Data accuracy', status: 'pass', detail: 'Virtual table totals match SAP FBL5N within $0.01' }, { name: 'No replication', status: 'pass', detail: 'Zero records in cmdb_ci or any SN table — pure virtual' }, { name: 'Performance', status: 'pass', detail: 'Full AR aging for 3,200 customers in 1.4s' }] }),
        is_final_step: true,
        resilience_note: '',
        scenario: demoAr,
    },
})
