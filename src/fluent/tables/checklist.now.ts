import '@servicenow/sdk/global'
import { Table, StringColumn, ChoiceColumn, Record } from '@servicenow/sdk/core'

export const x_snc_wdf_advisory_checklist = Table({
    name: 'x_snc_wdf_advisory_checklist',
    label: 'WDF Checklist Item',
    display: 'label',
    allowWebServiceAccess: true,
    schema: {
        checklist_type: ChoiceColumn({
            label: 'Checklist Type',
            mandatory: true,
            choices: {
                compliance: 'Compliance',
                infrastructure: 'Infrastructure',
            },
        }),
        section: StringColumn({
            label: 'Section',
            mandatory: true,
            maxLength: 200,
        }),
        label: StringColumn({
            label: 'Label',
            mandatory: true,
        }),
        sub_description: StringColumn({
            label: 'Sub-Description',
            maxLength: 1000,
        }),
        status: ChoiceColumn({
            label: 'Status',
            choices: {
                done: 'Done',
                warn: 'Warning',
                fail: 'Fail',
            },
        }),
        tag: ChoiceColumn({
            label: 'Tag',
            choices: {
                required: 'Required',
                recommended: 'Recommended',
                blocker: 'Blocker',
                in_progress: 'In progress',
                verified: 'Verified',
                needs_review: 'Needs review',
            },
        }),
    },
})

// ─── COMPLIANCE: Data Residency ─────────────────────────────────────────────

export const clDataClassification = Record({
    $id: Now.ID['cl-data-classification'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'compliance',
        section: 'Data Residency',
        label: 'Data classification policy defined',
        sub_description: 'All data sources classified by sensitivity (public, internal, confidential, restricted)',
        status: 'done',
        tag: 'required',
    },
})

export const clCrossBorderTransfer = Record({
    $id: Now.ID['cl-cross-border-transfer'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'compliance',
        section: 'Data Residency',
        label: 'Cross-border transfer rules documented',
        sub_description: 'GDPR Article 46 or equivalent mechanisms in place for international data flows',
        status: 'done',
        tag: 'required',
    },
})

export const clDataResidencyMapped = Record({
    $id: Now.ID['cl-data-residency-mapped'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'compliance',
        section: 'Data Residency',
        label: 'Data residency requirements mapped',
        sub_description: 'Each connector deployment verified against regional data residency mandates',
        status: 'warn',
        tag: 'required',
    },
})

// ─── COMPLIANCE: Access Control ─────────────────────────────────────────────

export const clRbacDefined = Record({
    $id: Now.ID['cl-rbac-defined'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'compliance',
        section: 'Access Control',
        label: 'Role-based access model defined',
        sub_description: 'RBAC matrix covers all connector data access paths including ZCC virtual tables',
        status: 'done',
        tag: 'required',
    },
})

export const clLeastPrivilege = Record({
    $id: Now.ID['cl-least-privilege'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'compliance',
        section: 'Access Control',
        label: 'Least privilege principle enforced',
        sub_description: 'Service accounts use minimum required permissions for each data source',
        status: 'done',
        tag: 'verified',
    },
})

export const clMfaAdmin = Record({
    $id: Now.ID['cl-mfa-admin'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'compliance',
        section: 'Access Control',
        label: 'MFA required for admin access',
        sub_description: 'All administrative accounts accessing connector configurations require multi-factor authentication',
        status: 'done',
        tag: 'required',
    },
})

export const clBreakGlass = Record({
    $id: Now.ID['cl-break-glass'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'compliance',
        section: 'Access Control',
        label: 'Break-glass procedures documented',
        sub_description: 'Emergency access procedures defined with audit trail and auto-revocation',
        status: 'warn',
        tag: 'recommended',
    },
})

// ─── COMPLIANCE: Audit & Logging ────────────────────────────────────────────

export const clAuditLogging = Record({
    $id: Now.ID['cl-audit-logging'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'compliance',
        section: 'Audit & Logging',
        label: 'Audit logging enabled for all connectors',
        sub_description: 'All data access through connectors logged with user, timestamp, query, and result count',
        status: 'done',
        tag: 'required',
    },
})

export const clLogRetention = Record({
    $id: Now.ID['cl-log-retention'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'compliance',
        section: 'Audit & Logging',
        label: 'Log retention policy meets regulatory requirements',
        sub_description: 'Retention periods aligned with SOX (7yr), HIPAA (6yr), GDPR (as defined) requirements',
        status: 'done',
        tag: 'required',
    },
})

export const clTamperEvident = Record({
    $id: Now.ID['cl-tamper-evident'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'compliance',
        section: 'Audit & Logging',
        label: 'Tamper-evident log storage',
        sub_description: 'Audit logs stored in immutable or tamper-evident storage with integrity verification',
        status: 'warn',
        tag: 'recommended',
    },
})

export const clAnomalyDetection = Record({
    $id: Now.ID['cl-anomaly-detection'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'compliance',
        section: 'Audit & Logging',
        label: 'Automated anomaly detection on access patterns',
        sub_description: 'ML-based alerting for unusual data access patterns or volume spikes',
        status: 'fail',
        tag: 'in_progress',
    },
})

// ─── COMPLIANCE: Regulatory Compliance ──────────────────────────────────────

export const clHipaaBaa = Record({
    $id: Now.ID['cl-hipaa-baa'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'compliance',
        section: 'Regulatory Compliance',
        label: 'HIPAA BAA in place for health data connectors',
        sub_description: 'Business Associate Agreement executed with all parties handling PHI through connectors',
        status: 'done',
        tag: 'required',
    },
})

export const clPciDss = Record({
    $id: Now.ID['cl-pci-dss'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'compliance',
        section: 'Regulatory Compliance',
        label: 'PCI DSS scope assessment completed',
        sub_description: 'Cardholder data environment boundaries defined; connectors validated as out-of-scope or compliant',
        status: 'warn',
        tag: 'required',
    },
})

export const clSoxControl = Record({
    $id: Now.ID['cl-sox-control'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'compliance',
        section: 'Regulatory Compliance',
        label: 'SOX control testing scheduled',
        sub_description: 'Annual control testing includes connector access paths and change management procedures',
        status: 'done',
        tag: 'verified',
    },
})

export const clGdprDpia = Record({
    $id: Now.ID['cl-gdpr-dpia'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'compliance',
        section: 'Regulatory Compliance',
        label: 'GDPR DPIA completed for EU data',
        sub_description: 'Data Protection Impact Assessment completed for all connectors accessing EU personal data',
        status: 'done',
        tag: 'required',
    },
})

export const clPrivacyByDesign = Record({
    $id: Now.ID['cl-privacy-by-design'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'compliance',
        section: 'Regulatory Compliance',
        label: 'Privacy by design principles applied',
        sub_description: 'Data minimization, purpose limitation, and storage limitation built into connector configurations',
        status: 'done',
        tag: 'verified',
    },
})

export const clIncidentResponse = Record({
    $id: Now.ID['cl-incident-response'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'compliance',
        section: 'Regulatory Compliance',
        label: 'Incident response plan includes connector breach',
        sub_description: 'Breach notification procedures include scenarios where connector credentials or data paths are compromised',
        status: 'warn',
        tag: 'recommended',
    },
})

// ─── INFRASTRUCTURE: Network Connectivity ───────────────────────────────────

export const clMidServerDeployed = Record({
    $id: Now.ID['cl-mid-server-deployed'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'infrastructure',
        section: 'Network Connectivity',
        label: 'MID Server deployed and validated',
        sub_description: 'MID Server installed in DMZ with validated connectivity to target databases and ServiceNow instance',
        status: 'done',
        tag: 'required',
    },
})

export const clFirewallRules = Record({
    $id: Now.ID['cl-firewall-rules'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'infrastructure',
        section: 'Network Connectivity',
        label: 'Firewall rules configured',
        sub_description: 'Outbound HTTPS (443) to ServiceNow; inbound JDBC ports open to target databases only from MID Server',
        status: 'done',
        tag: 'required',
    },
})

export const clDnsResolution = Record({
    $id: Now.ID['cl-dns-resolution'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'infrastructure',
        section: 'Network Connectivity',
        label: 'DNS resolution verified',
        sub_description: 'MID Server can resolve both ServiceNow instance hostname and all target database hostnames',
        status: 'done',
        tag: 'verified',
    },
})

export const clNetworkLatency = Record({
    $id: Now.ID['cl-network-latency'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'infrastructure',
        section: 'Network Connectivity',
        label: 'Network latency within thresholds',
        sub_description: 'Round-trip latency from MID Server to target databases < 50ms for optimal ZCC performance',
        status: 'warn',
        tag: 'recommended',
    },
})

// ─── INFRASTRUCTURE: Authentication & Credentials ───────────────────────────

export const clCredentialsStored = Record({
    $id: Now.ID['cl-credentials-stored'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'infrastructure',
        section: 'Authentication & Credentials',
        label: 'Service account credentials stored securely',
        sub_description: 'All database credentials stored in ServiceNow credential store with encryption at rest',
        status: 'done',
        tag: 'required',
    },
})

export const clOauthConfigured = Record({
    $id: Now.ID['cl-oauth-configured'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'infrastructure',
        section: 'Authentication & Credentials',
        label: 'OAuth 2.0 configured for cloud sources',
        sub_description: 'Cloud-based data sources use OAuth 2.0 with automatic token refresh and short-lived access tokens',
        status: 'done',
        tag: 'required',
    },
})

export const clCertManagement = Record({
    $id: Now.ID['cl-cert-management'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'infrastructure',
        section: 'Authentication & Credentials',
        label: 'Certificate management automated',
        sub_description: 'mTLS certificates for Stream Connect auto-renewed before expiry with alerting on failures',
        status: 'warn',
        tag: 'recommended',
    },
})

export const clCredentialRotation = Record({
    $id: Now.ID['cl-credential-rotation'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'infrastructure',
        section: 'Authentication & Credentials',
        label: 'Credential rotation schedule defined',
        sub_description: 'Service account passwords and API keys rotated every 90 days with zero-downtime swap procedure',
        status: 'fail',
        tag: 'blocker',
    },
})

// ─── INFRASTRUCTURE: High Availability ──────────────────────────────────────

export const clMidServerCluster = Record({
    $id: Now.ID['cl-mid-server-cluster'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'infrastructure',
        section: 'High Availability',
        label: 'MID Server cluster deployed',
        sub_description: 'Minimum 2 MID Servers in active-active configuration for ZCC query load balancing',
        status: 'done',
        tag: 'recommended',
    },
})

export const clFailoverTesting = Record({
    $id: Now.ID['cl-failover-testing'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'infrastructure',
        section: 'High Availability',
        label: 'Failover testing completed',
        sub_description: 'Automated failover tested; recovery time < 30 seconds for MID Server failure scenarios',
        status: 'warn',
        tag: 'recommended',
    },
})

export const clConsumerGroups = Record({
    $id: Now.ID['cl-consumer-groups'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'infrastructure',
        section: 'High Availability',
        label: 'Stream Connect consumer groups configured',
        sub_description: 'Kafka consumer groups with proper partition assignment for horizontal scaling',
        status: 'done',
        tag: 'required',
    },
})

export const clCircuitBreaker = Record({
    $id: Now.ID['cl-circuit-breaker'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'infrastructure',
        section: 'High Availability',
        label: 'Circuit breaker patterns implemented',
        sub_description: 'Auto-disable queries to unresponsive sources; alert after 3 consecutive failures',
        status: 'done',
        tag: 'verified',
    },
})

// ─── INFRASTRUCTURE: Performance & Monitoring ───────────────────────────────

export const clQueryBaselines = Record({
    $id: Now.ID['cl-query-baselines'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'infrastructure',
        section: 'Performance & Monitoring',
        label: 'Query performance baselines established',
        sub_description: 'P95 query response times baselined for each ZCC data source; alerts on 2x degradation',
        status: 'done',
        tag: 'required',
    },
})

export const clConnectionPooling = Record({
    $id: Now.ID['cl-connection-pooling'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'infrastructure',
        section: 'Performance & Monitoring',
        label: 'Connection pooling configured',
        sub_description: 'JDBC connection pools sized appropriately per data source with max connections and idle timeout',
        status: 'done',
        tag: 'required',
    },
})

export const clHealthDashboards = Record({
    $id: Now.ID['cl-health-dashboards'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'infrastructure',
        section: 'Performance & Monitoring',
        label: 'Health check dashboards deployed',
        sub_description: 'Real-time monitoring dashboard showing connector health, query rates, error rates, and latency',
        status: 'warn',
        tag: 'recommended',
    },
})

export const clCapacityPlanning = Record({
    $id: Now.ID['cl-capacity-planning'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'infrastructure',
        section: 'Performance & Monitoring',
        label: 'Capacity planning completed',
        sub_description: 'Growth projections for query volume documented; scaling thresholds defined for MID Server fleet',
        status: 'fail',
        tag: 'needs_review',
    },
})

export const clRateLimiting = Record({
    $id: Now.ID['cl-rate-limiting'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_checklist',
    data: {
        checklist_type: 'infrastructure',
        section: 'Performance & Monitoring',
        label: 'Rate limiting configured',
        sub_description: 'Query rate limits set per source to prevent overwhelming external databases during peak hours',
        status: 'done',
        tag: 'required',
    },
})
