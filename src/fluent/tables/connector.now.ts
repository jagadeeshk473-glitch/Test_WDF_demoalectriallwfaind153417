import '@servicenow/sdk/global'
import { Table, StringColumn, BooleanColumn, ChoiceColumn, Record } from '@servicenow/sdk/core'

export const x_snc_wdf_advisory_connector = Table({
    name: 'x_snc_wdf_advisory_connector',
    label: 'WDF Connector',
    display: 'name',
    allowWebServiceAccess: true,
    extensible: true,
    schema: {
        name: StringColumn({
            label: 'Name',
            mandatory: true,
        }),
        short_name: StringColumn({
            label: 'Short Name',
            maxLength: 40,
        }),
        tagline: StringColumn({
            label: 'Tagline',
            maxLength: 200,
        }),
        detail: StringColumn({
            label: 'Detail',
            maxLength: 4000,
        }),
        best_for: StringColumn({
            label: 'Best For',
            maxLength: 1000,
        }),
        not_for: StringColumn({
            label: 'Not For',
            maxLength: 1000,
        }),
        protocol: StringColumn({
            label: 'Protocol',
            maxLength: 100,
        }),
        auth_method: StringColumn({
            label: 'Auth Method',
            maxLength: 100,
        }),
        mid_server_requirement: StringColumn({
            label: 'MID Server Requirement',
            maxLength: 200,
        }),
        latency: StringColumn({
            label: 'Latency',
            maxLength: 100,
        }),
        supports_write_back: BooleanColumn({
            label: 'Supports Write-Back',
            default: false,
        }),
        write_back_note: StringColumn({
            label: 'Write-Back Note',
            maxLength: 500,
        }),
        status: ChoiceColumn({
            label: 'Status',
            choices: {
                ga: {
                    label: 'GA',
                    sequence: 1,
                },
                in_development: {
                    label: 'In Development',
                    sequence: 2,
                },
                planning: {
                    label: 'Planning',
                    sequence: 3,
                },
                poc: {
                    label: 'POC',
                    sequence: 4,
                },
                community: {
                    label: 'Community',
                    sequence: 5,
                },
                in_backlog: {
                    label: 'In Backlog',
                    sequence: 6,
                },
                not_on_roadmap: {
                    label: 'Not on Roadmap',
                    sequence: 7,
                },
                blocked_regulated: {
                    label: 'Blocked - Regulated Market',
                    sequence: 8,
                },
            },
        }),
        keywords: StringColumn({
            label: 'Keywords',
            maxLength: 1000,
        }),
        q2_roadmap: StringColumn({
            label: 'Q2 Roadmap',
            maxLength: 2000,
        }),
        q4_roadmap: StringColumn({
            label: 'Q4 Roadmap',
            maxLength: 2000,
        }),
    },
})

export const connZcc = Record({
    $id: Now.ID['connector-zcc'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_connector',
    data: {
        name: 'Zero Copy Connectors',
        short_name: 'ZCC',
        tagline: 'Query external databases in-place without ETL or replication',
        detail: 'Zero Copy Connectors let ServiceNow query external relational databases (SQL Server, PostgreSQL, Oracle, MySQL, Snowflake, Databricks) directly via a MID Server without copying data into the platform. Ideal for large-volume read patterns where data freshness and sovereignty matter.',
        best_for:
            'Large-volume reads, regulated data that must stay in-place, real-time dashboards, cross-system reporting',
        not_for: 'High-frequency writes, sub-second latency requirements, non-relational sources',
        protocol: 'JDBC via MID Server',
        auth_method: 'Database credentials (stored in ServiceNow credential store)',
        mid_server_requirement: 'Required - MID Server must have network access to the target database',
        latency: 'Seconds (depends on query complexity and network)',
        supports_write_back: false,
        write_back_note: 'Read-only by design; write-back not supported',
        status: 'ga',
        keywords: 'zero copy, ZCC, SQL, database, read-only, no ETL, in-place query, federated, JDBC',
        q2_roadmap: 'Snowflake GA, Databricks GA, Query performance improvements',
        q4_roadmap: 'MongoDB connector preview, Enhanced caching layer',
    },
})

export const connZccErp = Record({
    $id: Now.ID['connector-zcc-erp'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_connector',
    data: {
        name: 'ZCC for ERP',
        short_name: 'ZCC-ERP',
        tagline: 'Pre-built ERP connectors with business-object mapping',
        detail: 'ZCC for ERP extends Zero Copy Connectors with pre-built business object mappings for SAP, Oracle EBS, and Workday. Provides a semantic layer that maps ERP entities (Purchase Orders, Vendors, Cost Centers) to ServiceNow-friendly tables without replication.',
        best_for: 'ERP integration, finance workflows, procurement visibility, master data access',
        not_for: 'Non-ERP databases, custom schemas without business object mapping',
        protocol: 'JDBC + Business Object Mapping Layer',
        auth_method: 'ERP service account credentials',
        mid_server_requirement: 'Required - MID Server with ERP connectivity',
        latency: 'Seconds (cached metadata, live data queries)',
        supports_write_back: false,
        write_back_note: 'Read-only; transactional writes should go through ERP native APIs',
        status: 'ga',
        keywords: 'ERP, SAP, Oracle EBS, Workday, finance, procurement, business objects, ZCC',
        q2_roadmap: 'SAP S/4HANA object library expansion, Workday Financial Management',
        q4_roadmap: 'Oracle Fusion Cloud, Write-back exploration for non-transactional fields',
    },
})

export const connIntegrationHub = Record({
    $id: Now.ID['connector-integration-hub'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_connector',
    data: {
        name: 'Integration Hub',
        short_name: 'IH',
        tagline: 'No-code/low-code integration with 200+ spokes and flow actions',
        detail: 'Integration Hub is the primary ServiceNow integration automation platform. It provides a library of pre-built spokes (Slack, Jira, Azure, AWS, Salesforce, etc.) and a Flow Designer interface for building custom integrations without code. Supports REST, SOAP, JDBC, and event-driven patterns.',
        best_for:
            'Workflow automation, bi-directional integrations, event-driven triggers, citizen integrator use cases',
        not_for: 'High-volume bulk data movement, sub-second streaming, read-only federated queries',
        protocol: 'REST, SOAP, JDBC, Messaging (via spokes)',
        auth_method: 'OAuth 2.0, Basic Auth, API Key, Mutual TLS (per spoke)',
        mid_server_requirement: 'Optional - required only for on-premise targets',
        latency: 'Milliseconds to seconds (depends on spoke and target)',
        supports_write_back: true,
        write_back_note: 'Full bi-directional; spokes support create/update/delete on external systems',
        status: 'ga',
        keywords: 'Integration Hub, IH, spokes, Flow Designer, REST, automation, bi-directional, no-code',
        q2_roadmap: 'AI-assisted spoke generation, Enhanced error handling framework',
        q4_roadmap: 'Event mesh integration, Streaming spoke pattern',
    },
})

export const connStreamConnect = Record({
    $id: Now.ID['connector-stream-connect'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_connector',
    data: {
        name: 'Stream Connect',
        short_name: 'SC',
        tagline: 'Real-time event streaming via Kafka for high-throughput data flows',
        detail: 'Stream Connect enables real-time, event-driven integration between ServiceNow and external systems using Apache Kafka. Designed for high-throughput scenarios where data must flow continuously (IoT telemetry, security events, transaction streams). Supports both inbound and outbound streaming.',
        best_for: 'Real-time event processing, IoT data ingestion, security event streams, high-throughput CDC',
        not_for: 'Simple request-response integrations, low-volume batch jobs, ad-hoc queries',
        protocol: 'Apache Kafka (managed)',
        auth_method: 'mTLS, SASL/SCRAM',
        mid_server_requirement: 'Not required - cloud-native managed service',
        latency: 'Sub-second (event-driven)',
        supports_write_back: true,
        write_back_note: 'Supports outbound streaming to external Kafka topics',
        status: 'ga',
        keywords: 'Stream Connect, Kafka, streaming, real-time, events, CDC, IoT, high-throughput',
        q2_roadmap: 'Schema registry integration, Dead letter queue management UI',
        q4_roadmap: 'Multi-region streaming, Enhanced monitoring dashboard',
    },
})

export const connMcpClient = Record({
    $id: Now.ID['connector-mcp-client'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_connector',
    data: {
        name: 'MCP Client',
        short_name: 'MCP-C',
        tagline: 'Connect ServiceNow AI agents to external tools via Model Context Protocol',
        detail: 'MCP Client enables ServiceNow AI agents (Now Assist, custom agents) to invoke external tools and data sources using the Model Context Protocol standard. Allows agents to call external APIs, query databases, and access file systems through a standardized interface.',
        best_for: 'AI agent tool use, LLM-powered automation, connecting agents to external capabilities',
        not_for: 'Traditional API integrations without AI, bulk data transfers, human-driven workflows',
        protocol: 'MCP (Model Context Protocol) over HTTP/SSE',
        auth_method: 'OAuth 2.0, API Key',
        mid_server_requirement: 'Optional - depends on target tool location',
        latency: 'Milliseconds (per tool invocation)',
        supports_write_back: true,
        write_back_note: 'Tools can perform write operations on external systems',
        status: 'ga',
        keywords: 'MCP, Model Context Protocol, AI agents, tools, LLM, Now Assist, agentic',
        q2_roadmap: 'Tool discovery catalog, Enhanced tool governance',
        q4_roadmap: 'Marketplace for MCP tool packages, Multi-agent orchestration',
    },
})

export const connMcpServer = Record({
    $id: Now.ID['connector-mcp-server'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_connector',
    data: {
        name: 'MCP Server',
        short_name: 'MCP-S',
        tagline: 'Expose ServiceNow capabilities as tools for external AI agents',
        detail: 'MCP Server exposes ServiceNow platform capabilities (CMDB queries, incident creation, knowledge search, approval workflows) as standardized tools that external AI agents can discover and invoke via the Model Context Protocol.',
        best_for: 'Exposing ServiceNow to external AI systems, multi-agent architectures, enterprise AI orchestration',
        not_for: 'Internal-only AI workflows (use MCP Client instead), non-AI integrations',
        protocol: 'MCP (Model Context Protocol) over HTTP/SSE',
        auth_method: 'OAuth 2.0, Service Account tokens',
        mid_server_requirement: 'Not required - cloud-hosted endpoint',
        latency: 'Milliseconds (per tool call)',
        supports_write_back: true,
        write_back_note: 'External agents can invoke write operations (create incidents, approve requests, etc.)',
        status: 'ga',
        keywords: 'MCP, Model Context Protocol, AI server, tools, expose, external agents, agentic',
        q2_roadmap: 'Expanded tool catalog, Security sandbox model',
        q4_roadmap: 'Rate limiting and governance, Multi-tenant isolation',
    },
})

export const connExternalContent = Record({
    $id: Now.ID['connector-external-content'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_connector',
    data: {
        name: 'External Content Connectors',
        short_name: 'ECC',
        tagline: 'Index and search external content repositories from within ServiceNow',
        detail: 'External Content Connectors crawl and index content from external systems (SharePoint, Confluence, Google Drive, Box) making it searchable within ServiceNow Search and accessible to Now Assist. Content remains in the source system; only metadata and searchable text are indexed.',
        best_for: 'Enterprise search, knowledge unification, AI-powered answers from external docs, content governance',
        not_for: 'Structured data integration, real-time data access, transactional workflows',
        protocol: 'REST APIs (per source), crawl-based indexing',
        auth_method: 'OAuth 2.0, Service Principal (per source)',
        mid_server_requirement: 'Optional - required for on-premise content repositories',
        latency: 'Minutes (crawl schedule based; not real-time)',
        supports_write_back: false,
        write_back_note: 'Read-only indexing; content is not modified in source systems',
        status: 'ga',
        keywords: 'external content, search, SharePoint, Confluence, Google Drive, indexing, knowledge, ECC',
        q2_roadmap: 'Google Drive connector GA, Enhanced relevancy tuning',
        q4_roadmap: 'Box connector, Incremental crawl improvements, AI summary generation',
    },
})

export const connLiveConnect = Record({
    $id: Now.ID['connector-live-connect'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_connector',
    data: {
        name: 'Live Connect',
        short_name: 'LC',
        tagline: 'Real-time CMDB enrichment from cloud providers and monitoring tools',
        detail: 'Live Connect provides real-time visibility into cloud infrastructure by connecting ServiceNow CMDB to cloud providers (AWS, Azure, GCP) and monitoring tools. When a CI is viewed, Live Connect fetches current state directly from the source without stale snapshots.',
        best_for: 'CMDB accuracy, cloud visibility, real-time CI attributes, incident context enrichment',
        not_for: 'Non-CMDB use cases, bulk data ingestion, custom application integration',
        protocol: 'Cloud provider APIs (REST)',
        auth_method: 'Cloud IAM roles, Service Principal, API Keys',
        mid_server_requirement: 'Not required for public cloud; required for on-premise monitoring tools',
        latency: 'Seconds (on-demand fetch when CI is accessed)',
        supports_write_back: false,
        write_back_note: 'Read-only enrichment; changes flow from source to CMDB',
        status: 'ga',
        keywords: 'Live Connect, CMDB, cloud, AWS, Azure, GCP, real-time, monitoring, CI enrichment',
        q2_roadmap: 'GCP expanded resource types, Kubernetes cluster visibility',
        q4_roadmap: 'Multi-cloud topology mapping, Historical state tracking',
    },
})

export const connRaptorDbPro = Record({
    $id: Now.ID['connector-raptordb-pro'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_connector',
    data: {
        name: 'RaptorDB Pro',
        short_name: 'RDB',
        tagline: 'HTAP engine with medallion architecture for analytics alongside operational workloads',
        detail: 'RaptorDB Pro is the next-generation database engine for ServiceNow. It separates analytical queries from operational transactions using a medallion architecture (Bronze → Silver → Gold). Enables complex analytics, reporting, and ML pipelines without impacting platform performance. Includes HTAP engine, Live Archive for long-term retention, and columnar storage for analytics.',
        best_for: 'Analytics, reporting, dashboarding, ML data pipelines, performance isolation, historical analysis',
        not_for: 'Simple CRUD operations, small instances with no analytics needs',
        protocol: 'ServiceNow platform-native engine',
        auth_method: 'ServiceNow platform authentication',
        mid_server_requirement: 'Not required — platform-native service',
        latency: 'Milliseconds for operational, seconds for complex analytics',
        supports_write_back: false,
        write_back_note: 'Read-only analytics layer; operational writes go through standard platform',
        status: 'ga',
        keywords: 'RaptorDB, HTAP, medallion, analytics, columnar, performance, reporting, ML, archive, 4C, contextualize pillar',
        q2_roadmap: 'Gold-layer custom table support, Enhanced ML feature store',
        q4_roadmap: 'Cross-instance analytics federation, Real-time materialized views',
    },
})

export const connDataCatalog = Record({
    $id: Now.ID['connector-data-catalog'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_connector',
    data: {
        name: 'Data Catalog',
        short_name: 'DC',
        tagline: 'Central registry of all data assets with metadata, lineage, and business glossary',
        detail: 'Data Catalog provides a unified registry for all data assets across the enterprise. Register data sources, tables, and fields with business context. Track data lineage from source to consumption. Maintain a business glossary that maps technical fields to business terms. Essential for data discovery and impact analysis.',
        best_for: 'Data discovery, metadata management, business glossary, lineage tracking, impact analysis',
        not_for: 'Data movement or transformation, real-time streaming, operational queries',
        protocol: 'REST API, Metadata extraction',
        auth_method: 'ServiceNow platform authentication',
        mid_server_requirement: 'Not required — platform-native service',
        latency: 'N/A — metadata registry, not data pipeline',
        supports_write_back: true,
        write_back_note: 'Create/update catalog entries, tags, and glossary terms',
        status: 'ga',
        keywords: 'data catalog, metadata, lineage, glossary, data discovery, business terms, impact analysis, registry, 4C, control pillar',
        q2_roadmap: 'Auto-discovery of data assets from connectors',
        q4_roadmap: 'AI-powered metadata enrichment and classification',
    },
})

export const connDataGovernance = Record({
    $id: Now.ID['connector-data-governance'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_connector',
    data: {
        name: 'Data Governance',
        short_name: 'DG',
        tagline: 'Enforce data quality, compliance, access control, and retention policies',
        detail: 'Data Governance enforces policies across all data assets. Define and monitor data quality rules (completeness, accuracy, consistency). Apply data classification (PII, Confidential, Internal). Manage row-level security and field masking. Set retention policies per compliance framework (SOX, GDPR, HIPAA, PCI-DSS). Full audit trail for all data access.',
        best_for: 'Compliance management, data quality monitoring, PII protection, access control, retention policies, audit trails',
        not_for: 'Data movement, real-time streaming, operational automation',
        protocol: 'Policy engine, Rule-based enforcement',
        auth_method: 'ServiceNow platform authentication',
        mid_server_requirement: 'Not required — platform-native service',
        latency: 'N/A — policy enforcement layer',
        supports_write_back: true,
        write_back_note: 'Create/update governance policies, quality rules, and access controls',
        status: 'ga',
        keywords: 'data governance, compliance, quality, PII, masking, retention, access control, SOX, GDPR, HIPAA, audit, 4C, control pillar',
        q2_roadmap: 'Automated compliance reporting dashboards',
        q4_roadmap: 'AI-driven data quality remediation',
    },
})

export const connAutomationEngine = Record({
    $id: Now.ID['connector-automation-engine'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_connector',
    data: {
        name: 'Automation Engine',
        short_name: 'AE',
        tagline: 'Event-driven automation rules that trigger actions based on data patterns and thresholds',
        detail: 'Automation Engine enables event-driven automation that triggers actions based on data patterns, thresholds, and business rules. Define rules like "when inventory drops below 5, create a purchase order" or "when fraud score exceeds 0.8, escalate to security team." Works with all Connect-pillar products to automate responses to data events.',
        best_for: 'Threshold-based triggers, pattern detection automation, event-driven workflows, operational alerting',
        not_for: 'Data movement, reporting, manual processes',
        protocol: 'Event-driven rules engine',
        auth_method: 'ServiceNow platform authentication',
        mid_server_requirement: 'Not required — platform-native service',
        latency: 'Sub-second for rule evaluation',
        supports_write_back: true,
        write_back_note: 'Creates records, triggers workflows, sends notifications, calls external APIs',
        status: 'ga',
        keywords: 'automation, rules engine, event-driven, triggers, thresholds, alerts, workflows, orchestration, 4C, converge pillar',
        q2_roadmap: 'AI-powered rule suggestions based on data patterns',
        q4_roadmap: 'Complex event processing with multi-condition rules',
    },
})
