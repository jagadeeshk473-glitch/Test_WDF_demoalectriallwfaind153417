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
                ga: 'GA',
                in_development: 'In Development',
                planning: 'Planning',
                poc: 'POC',
                community: 'Community',
                in_backlog: 'In Backlog',
                not_on_roadmap: 'Not on Roadmap',
                blocked_regulated: 'Blocked - Regulated Market',
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
        best_for: 'Large-volume reads, regulated data that must stay in-place, real-time dashboards, cross-system reporting',
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
        status: 'in_development',
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
        best_for: 'Workflow automation, bi-directional integrations, event-driven triggers, citizen integrator use cases',
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
        status: 'poc',
        keywords: 'MCP, Model Context Protocol, AI agents, tools, LLM, Now Assist, agentic',
        q2_roadmap: 'Public preview, Tool discovery catalog',
        q4_roadmap: 'GA release, Marketplace for MCP tool packages',
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
        status: 'poc',
        keywords: 'MCP, Model Context Protocol, AI server, tools, expose, external agents, agentic',
        q2_roadmap: 'Preview with limited tool set, Security sandbox model',
        q4_roadmap: 'Expanded tool catalog, Rate limiting and governance',
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
