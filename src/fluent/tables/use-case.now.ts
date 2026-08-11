import '@servicenow/sdk/global'
import { Table, StringColumn, ChoiceColumn, ReferenceColumn, Record } from '@servicenow/sdk/core'
import { connZcc, connZccErp, connIntegrationHub, connStreamConnect, connMcpClient, connExternalContent, connLiveConnect } from './connector.now'
import { demoHrsdPay, demoZccSql, demoStream, demoIh, demoAr, demoSox, demoFraud } from './scenario-demo.now'

export const x_snc_wdf_advisory_use_case = Table({
    name: 'x_snc_wdf_advisory_use_case',
    label: 'WDF Use Case',
    display: 'title',
    allowWebServiceAccess: true,
    schema: {
        title: StringColumn({
            label: 'Title',
            mandatory: true,
        }),
        industry: ChoiceColumn({
            label: 'Industry',
            choices: {
                healthcare: 'Healthcare',
                financial_services: 'Financial Services',
                manufacturing: 'Manufacturing',
                retail: 'Retail',
                technology: 'Technology',
                government: 'Government',
                education: 'Education',
                energy: 'Energy',
                telecom: 'Telecommunications',
                cross_industry: 'Cross-Industry',
            },
        }),
        tier: ChoiceColumn({
            label: 'Tier',
            choices: {
                land: 'LAND',
                expand: 'EXPAND',
                transform: 'TRANSFORM',
            },
        }),
        sources: StringColumn({
            label: 'Sources',
            maxLength: 1000,
        }),
        connector: ReferenceColumn({
            label: 'Connector',
            referenceTable: 'x_snc_wdf_advisory_connector',
        }),
        description: StringColumn({
            label: 'Description',
            maxLength: 2000,
        }),
        build_notes: StringColumn({
            label: 'Build Notes',
            maxLength: 2000,
        }),
        deploy_time_estimate: StringColumn({
            label: 'Deploy Time Estimate',
            maxLength: 100,
        }),
        keywords: StringColumn({
            label: 'Keywords',
            maxLength: 1000,
        }),
        linked_demo: ReferenceColumn({
            label: 'Linked Demo',
            referenceTable: 'x_snc_wdf_advisory_scn_demo',
        }),
    },
})

export const ucPayrollVisibility = Record({
    $id: Now.ID['uc-payroll-visibility'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Payroll Data Visibility in HRSD',
        industry: 'cross_industry',
        tier: 'land',
        sources: 'Workday, ADP, SAP SuccessFactors',
        connector: connZccErp,
        description: 'Surface payroll and compensation data from HR systems directly in HRSD agent workspace without replicating sensitive data.',
        build_notes: 'Configure ZCC-ERP with Workday Financial Management spoke. Map compensation objects to virtual tables.',
        deploy_time_estimate: '2-3 weeks',
        keywords: 'payroll, compensation, HRSD, Workday, ADP, sensitive data',
        linked_demo: demoHrsdPay,
    },
})

export const ucAssetInventory = Record({
    $id: Now.ID['uc-asset-inventory'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Real-Time Asset Inventory from SQL',
        industry: 'technology',
        tier: 'land',
        sources: 'SQL Server, Oracle DB',
        connector: connZcc,
        description: 'Query on-prem asset databases in real-time for IT asset management without ETL pipelines.',
        build_notes: 'Deploy MID Server with JDBC access. Configure ZCC data source with query templates for asset tables.',
        deploy_time_estimate: '1-2 weeks',
        keywords: 'assets, ITAM, SQL Server, inventory, on-prem',
        linked_demo: demoZccSql,
    },
})

export const ucSecurityEventIngestion = Record({
    $id: Now.ID['uc-security-events'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'SIEM Event Streaming to SecOps',
        industry: 'cross_industry',
        tier: 'expand',
        sources: 'Splunk, Microsoft Sentinel, CrowdStrike',
        connector: connStreamConnect,
        description: 'Stream security alerts from SIEM tools into ServiceNow Security Operations for automated triage and incident creation.',
        build_notes: 'Configure Kafka topics per alert severity. Map SIEM event schema to security incident fields. Set up correlation rules.',
        deploy_time_estimate: '3-4 weeks',
        keywords: 'security, SIEM, streaming, SecOps, alerts, real-time, incidents',
        linked_demo: demoStream,
    },
})

export const ucJiraBiSync = Record({
    $id: Now.ID['uc-jira-bi-sync'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Jira Bi-Directional Sync',
        industry: 'technology',
        tier: 'land',
        sources: 'Jira Cloud, Jira Data Center',
        connector: connIntegrationHub,
        description: 'Automatically sync incidents and stories between ServiceNow ITSM and Jira with bi-directional status updates.',
        build_notes: 'Use Jira spoke from Integration Hub. Configure field mappings and conflict resolution rules.',
        deploy_time_estimate: '1-2 weeks',
        keywords: 'Jira, sync, bi-directional, ITSM, DevOps, agile',
        linked_demo: demoIh,
    },
})

export const ucSoxAudit = Record({
    $id: Now.ID['uc-sox-audit'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'SOX Compliance Audit Consolidation',
        industry: 'financial_services',
        tier: 'expand',
        sources: 'SAP, Oracle Financials, Internal audit systems',
        connector: connExternalContent,
        description: 'Index and search audit trails from multiple financial systems within ServiceNow GRC without storing regulated data.',
        build_notes: 'Configure content crawlers for each source. Set up access controls aligned with SOX requirements.',
        deploy_time_estimate: '4-6 weeks',
        keywords: 'SOX, compliance, audit, GRC, financial, regulated',
        linked_demo: demoSox,
    },
})

export const ucFraudDetection = Record({
    $id: Now.ID['uc-fraud-detection'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Fraud Alert Case Management',
        industry: 'financial_services',
        tier: 'expand',
        sources: 'Fraud detection engine, Transaction monitoring',
        connector: connStreamConnect,
        description: 'Stream transaction anomalies from fraud detection systems into ServiceNow for case management and investigation workflows.',
        build_notes: 'Configure streaming topic for anomaly events. Build case creation flow with auto-enrichment from customer data.',
        deploy_time_estimate: '3-5 weeks',
        keywords: 'fraud, detection, streaming, case management, financial, anomaly',
        linked_demo: demoFraud,
    },
})

export const ucArAging = Record({
    $id: Now.ID['uc-ar-aging'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Accounts Receivable Aging Dashboard',
        industry: 'financial_services',
        tier: 'land',
        sources: 'SAP FI, Oracle Financials, NetSuite',
        connector: connZccErp,
        description: 'Provide finance teams with real-time AR aging data from ERP systems directly in their ServiceNow workspace.',
        build_notes: 'Map AR business objects via ZCC-ERP. Build workspace dashboard with aging buckets visualization.',
        deploy_time_estimate: '2-3 weeks',
        keywords: 'accounts receivable, AR, aging, finance, SAP, dashboard',
        linked_demo: demoAr,
    },
})

export const ucIotTelemetry = Record({
    $id: Now.ID['uc-iot-telemetry'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'IoT Telemetry for Predictive Maintenance',
        industry: 'manufacturing',
        tier: 'transform',
        sources: 'Azure IoT Hub, AWS IoT Core, OPC-UA gateways',
        connector: connStreamConnect,
        description: 'Stream IoT sensor data from factory equipment into ServiceNow for predictive maintenance alerts and work order creation.',
        build_notes: 'Configure Kafka bridge to IoT platform. Set threshold-based alerting rules. Auto-create work orders on anomaly detection.',
        deploy_time_estimate: '6-8 weeks',
        keywords: 'IoT, telemetry, manufacturing, predictive maintenance, sensors, streaming',
    },
})

export const ucCloudCmdbEnrich = Record({
    $id: Now.ID['uc-cloud-cmdb'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Cloud CMDB Real-Time Enrichment',
        industry: 'technology',
        tier: 'land',
        sources: 'AWS, Azure, GCP',
        connector: connLiveConnect,
        description: 'Enrich CMDB configuration items with real-time cloud resource attributes when CIs are accessed.',
        build_notes: 'Configure Live Connect for each cloud provider. Map resource attributes to CI class fields.',
        deploy_time_estimate: '1-2 weeks',
        keywords: 'CMDB, cloud, AWS, Azure, GCP, real-time, enrichment, Live Connect',
    },
})

export const ucVendorRiskMgmt = Record({
    $id: Now.ID['uc-vendor-risk'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Third-Party Vendor Risk Assessment',
        industry: 'cross_industry',
        tier: 'expand',
        sources: 'BitSight, SecurityScorecard, Dun & Bradstreet',
        connector: connIntegrationHub,
        description: 'Automate vendor risk scoring by pulling security ratings and financial health data from external providers into VRM.',
        build_notes: 'Use Integration Hub REST spoke to query vendor risk APIs. Map scores to VRM risk assessment records.',
        deploy_time_estimate: '2-4 weeks',
        keywords: 'vendor risk, VRM, third-party, security ratings, risk assessment',
    },
})

export const ucPatientRecordAccess = Record({
    $id: Now.ID['uc-patient-records'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Patient Record Access for IT Support',
        industry: 'healthcare',
        tier: 'land',
        sources: 'Epic, Cerner, FHIR APIs',
        connector: connZcc,
        description: 'Give IT support agents read-only access to patient system status without replicating PHI into ServiceNow.',
        build_notes: 'Configure ZCC with FHIR-compatible queries. Ensure HIPAA-compliant access controls and audit logging.',
        deploy_time_estimate: '3-4 weeks',
        keywords: 'healthcare, patient, HIPAA, Epic, Cerner, PHI, FHIR',
    },
})

export const ucSupplyChainVisibility = Record({
    $id: Now.ID['uc-supply-chain'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Supply Chain Disruption Alerts',
        industry: 'manufacturing',
        tier: 'expand',
        sources: 'SAP SCM, Oracle Supply Chain, EDI feeds',
        connector: connStreamConnect,
        description: 'Stream supply chain events (delays, shortages, quality holds) into ServiceNow for proactive case management.',
        build_notes: 'Configure event streams per supply chain event type. Build escalation workflows for critical disruptions.',
        deploy_time_estimate: '4-6 weeks',
        keywords: 'supply chain, manufacturing, disruption, streaming, logistics',
    },
})

export const ucEmployeeOnboarding = Record({
    $id: Now.ID['uc-employee-onboard'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Cross-System Employee Onboarding',
        industry: 'cross_industry',
        tier: 'expand',
        sources: 'Workday, Active Directory, Okta, Slack',
        connector: connIntegrationHub,
        description: 'Orchestrate employee onboarding across HR, IT, and collaboration systems with automated provisioning flows.',
        build_notes: 'Build multi-step Flow Designer workflow. Configure spokes for each target system. Set up rollback handling.',
        deploy_time_estimate: '3-5 weeks',
        keywords: 'onboarding, HR, provisioning, Workday, Active Directory, automation',
    },
})

export const ucKnowledgeUnification = Record({
    $id: Now.ID['uc-knowledge-unify'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Enterprise Knowledge Unification',
        industry: 'cross_industry',
        tier: 'land',
        sources: 'SharePoint, Confluence, Google Drive, Box',
        connector: connExternalContent,
        description: 'Make external knowledge repositories searchable within ServiceNow and accessible to Now Assist for AI-powered answers.',
        build_notes: 'Deploy content connectors per source. Configure crawl schedules and relevancy tuning.',
        deploy_time_estimate: '2-3 weeks',
        keywords: 'knowledge, search, SharePoint, Confluence, AI, Now Assist',
    },
})

export const ucRegulatoryReporting = Record({
    $id: Now.ID['uc-regulatory-report'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Regulatory Reporting Data Assembly',
        industry: 'financial_services',
        tier: 'transform',
        sources: 'Core banking, Risk systems, Trading platforms',
        connector: connZccErp,
        description: 'Assemble regulatory report data from multiple financial systems without centralizing sensitive trading data.',
        build_notes: 'Configure ZCC-ERP business object mappings for each data source. Build report assembly workflow with validation checks.',
        deploy_time_estimate: '6-10 weeks',
        keywords: 'regulatory, reporting, banking, compliance, financial, data assembly',
    },
})

export const ucMcpAgentTools = Record({
    $id: Now.ID['uc-mcp-agent-tools'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'AI Agent External Tool Access',
        industry: 'technology',
        tier: 'transform',
        sources: 'GitHub, Jenkins, Terraform, Custom APIs',
        connector: connMcpClient,
        description: 'Enable Now Assist agents to invoke external DevOps tools (create PRs, trigger pipelines, provision infrastructure) via MCP.',
        build_notes: 'Register external tools as MCP endpoints. Configure authentication and rate limiting. Build agent skill definitions.',
        deploy_time_estimate: '4-6 weeks',
        keywords: 'MCP, AI agent, DevOps, tools, GitHub, automation, agentic',
    },
})

export const ucEnergyGridMonitor = Record({
    $id: Now.ID['uc-energy-grid'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Energy Grid Monitoring Integration',
        industry: 'energy',
        tier: 'transform',
        sources: 'SCADA systems, Grid sensors, Weather APIs',
        connector: connStreamConnect,
        description: 'Stream grid telemetry and weather data into ServiceNow for outage prediction and automated dispatch.',
        build_notes: 'Configure streaming bridge to SCADA. Integrate weather API for correlation. Build predictive alerting model.',
        deploy_time_estimate: '8-12 weeks',
        keywords: 'energy, grid, SCADA, telemetry, streaming, outage prediction',
    },
})

export const ucRetailInventorySync = Record({
    $id: Now.ID['uc-retail-inventory'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Retail Inventory Level Sync',
        industry: 'retail',
        tier: 'land',
        sources: 'SAP Retail, Shopify, POS systems',
        connector: connZccErp,
        description: 'Surface real-time inventory levels from retail systems in ServiceNow for customer service agents handling order inquiries.',
        build_notes: 'Map inventory objects via ZCC-ERP. Configure refresh intervals appropriate for retail cadence.',
        deploy_time_estimate: '2-3 weeks',
        keywords: 'retail, inventory, POS, Shopify, customer service',
    },
})

export const ucGovCitizenPortal = Record({
    $id: Now.ID['uc-gov-citizen'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Citizen Service Request Orchestration',
        industry: 'government',
        tier: 'expand',
        sources: 'Legacy case management, Document management, Identity systems',
        connector: connIntegrationHub,
        description: 'Orchestrate citizen service requests across legacy government systems with automated status tracking and notifications.',
        build_notes: 'Build Integration Hub flows for each backend system. Configure citizen notification templates. Set up SLA tracking.',
        deploy_time_estimate: '4-8 weeks',
        keywords: 'government, citizen services, legacy, orchestration, case management',
    },
})

export const ucTelecomNetworkEvents = Record({
    $id: Now.ID['uc-telecom-network'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Network Event Correlation',
        industry: 'telecom',
        tier: 'expand',
        sources: 'Network management systems, NOC tools, Element managers',
        connector: connStreamConnect,
        description: 'Stream network events from multiple NOC tools into ServiceNow for correlation, deduplication, and automated ticket creation.',
        build_notes: 'Configure Kafka topics per event source. Build correlation rules for event deduplication. Auto-assign to NOC teams.',
        deploy_time_estimate: '4-6 weeks',
        keywords: 'telecom, network, NOC, events, correlation, streaming',
    },
})
