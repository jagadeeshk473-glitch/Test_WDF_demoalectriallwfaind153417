import '@servicenow/sdk/global'
import { Table, StringColumn, Record, ChoiceColumn, ReferenceColumn } from '@servicenow/sdk/core'

export const x_snc_wdf_advisory_use_case = Table({
    name: 'x_snc_wdf_advisory_use_case',
    label: 'WDF Customer Use Case',
    display: 'title',
    allowWebServiceAccess: true,
    schema: {
        title: StringColumn({
            label: 'Title',
            mandatory: true,
            maxLength: 200,
        }),
        line_of_business: StringColumn({
            label: 'Line of Business',
            maxLength: 200,
        }),
        industry: StringColumn({
            label: 'Industry',
            maxLength: 200,
        }),
        persona: StringColumn({
            label: 'Persona',
            maxLength: 200,
        }),
        products: StringColumn({
            label: 'Products',
            mandatory: true,
            maxLength: 1000,
        }),
        external_systems: StringColumn({
            label: 'External Systems',
            maxLength: 1000,
        }),
        business_problem: StringColumn({
            label: 'Business Problem',
            mandatory: true,
            maxLength: 4000,
        }),
        solution: StringColumn({
            label: 'Solution',
            mandatory: true,
            maxLength: 4000,
        }),
        outcome: StringColumn({
            label: 'Outcome',
            mandatory: true,
            maxLength: 4000,
        }),
        links: StringColumn({
            label: 'Supporting Links',
            maxLength: 4000,
        }),
        description: StringColumn({
            label: 'Description',
            maxLength: 2000,
        }),
        keywords: StringColumn({
            label: 'Keywords',
            maxLength: 1000,
        }),
        connector: ReferenceColumn({
            label: 'Connector',
            referenceTable: 'x_snc_wdf_advisory_connector',
        }),
        deploy_time_estimate: StringColumn({
            label: 'Deploy Time Estimate',
            maxLength: 100,
        }),
        sources: StringColumn({
            label: 'Sources',
            maxLength: 1000,
        }),
        build_notes: StringColumn({
            label: 'Build Notes',
            maxLength: 2000,
        }),
        tier: ChoiceColumn({
            label: 'Tier',
        }),
        linked_demo: ReferenceColumn({
            label: 'Linked Demo',
            referenceTable: 'x_snc_wdf_advisory_scn_demo',
        }),
        domain: StringColumn({
            label: 'Domain',
            maxLength: 200,
        }),
        ui_surface: StringColumn({
            label: 'UI Surface',
            maxLength: 200,
        }),
        query_complexity: StringColumn({
            label: 'Query Complexity',
            maxLength: 200,
        }),
        latency: StringColumn({
            label: 'Latency',
            maxLength: 200,
        }),
        deployment_status: StringColumn({
            label: 'Deployment Status',
            maxLength: 200,
        }),
    },
})

// ═══════════════════════════════════════════════
// SEED DATA — 34 Customer Use Cases
// ═══════════════════════════════════════════════

// ID 1 — Stellantis
export const ucProductIssueTracking = Record({
    $id: Now.ID['uc-product-issue-tracking'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Stellantis — S2irius Product Issue Tracking & Management',
        industry: 'Automotive/Manufacturing',
        domain: 'Automotive / Manufacturing',
        description:
            'Central app for 30,000 internal/external users to track & remediate product issues across 14 brands; single WDF table (150M+ records) over 3 core systems centralized in Snowflake',
        business_problem:
            'Central app for 30,000 internal/external users to track & remediate product issues across 14 brands; single WDF table (150M+ records) over 3 core systems centralized in Snowflake',
        products: 'Zero Copy Connectors, Workflow Data Fabric',
        external_systems: 'Snowflake',
        solution:
            'Source data unified into Snowflake data warehouse. Zero Copy Connectors eliminate integration complexity, allowing ServiceNow to query 150M+ Snowflake records in place. Workflow Data Fabric Tables standardize the data model across disparate source systems.',
        outcome:
            'One platform for 30,000+ users including external dealership network. Removed integration complexity and eliminated the need to duplicate or import data into ServiceNow at this scale.',
        ui_surface: 'Workspace',
        query_complexity: 'Simple select',
        latency: '2-5s',
        deployment_status: 'Live',
        keywords: 'Customer ZCC, automotive, manufacturing, Snowflake, product issue tracking, workspace',
        tier: 'Customer ZCC',
    },
})

// ID 2 — Banco Davivienda
export const ucBancoDavivienda = Record({
    $id: Now.ID['uc-scenario-02'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Banco Davivienda — Fraud Detection & Core Data Enrichment',
        industry: 'Financial Services',
        domain: 'Financial Services (Banking)',
        description:
            'Real-time query of transactional & customer-behavior data surfaced into SN workflows for fraud + real-time customer ID/validation; replaces point-to-point APIs that hit rate limits',
        business_problem:
            'Real-time query of transactional & customer-behavior data surfaced into SN workflows for fraud + real-time customer ID/validation; replaces point-to-point APIs that hit rate limits',
        products: 'Zero Copy Connectors',
        external_systems: 'Snowflake, BigQuery',
        solution:
            'Zero Copy Connectors query transactional and customer-behavior data from Snowflake and BigQuery in real time, surfacing fraud signals and customer validation data directly into ServiceNow workflows without point-to-point API integrations.',
        outcome:
            'Eliminated rate-limit bottlenecks from point-to-point APIs. Real-time fraud detection and customer ID validation integrated seamlessly into ServiceNow workflows.',
        ui_surface: 'Workflow',
        query_complexity: 'Simple select',
        latency: '2-3s avg',
        deployment_status: 'Live',
        keywords: 'Customer ZCC, financial services, banking, fraud detection, Snowflake, BigQuery, workflow',
        tier: 'Customer ZCC',
    },
})

// ID 3 — AB InBev
export const ucProductIssueRepo = Record({
    $id: Now.ID['uc-product-issue-repo'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Anheuser-Busch InBev — Centralized Product Issue Repository',
        industry: 'Consumer Goods',
        domain: 'Consumer Goods / Manufacturing',
        description:
            'Central app for customer issues/complaints with up to 10 years of communications history accessed on demand; all sources centralized in Databricks',
        business_problem:
            'Central app for customer issues/complaints with up to 10 years of communications history accessed on demand; all sources centralized in Databricks',
        products: 'Zero Copy Connectors, Workflow Data Fabric',
        external_systems: 'Databricks',
        solution:
            'Centralized all disparate sources of information in Databricks. Zero Copy Connectors query a single centralized system to access exactly the data needed, eliminating swivel-chair across multiple source systems. Significant infrastructure savings from not ingesting data into ServiceNow.',
        outcome:
            'Single access point across the company for all product-related issues including full history, powered by ServiceNow and WDF. All data made available remotely via the data warehouse.',
        ui_surface: 'Workspace',
        query_complexity: 'Simple select',
        latency: '<3s',
        deployment_status: 'Live',
        keywords: 'Customer ZCC, consumer goods, food & beverage, Databricks, product issues, workspace',
        tier: 'Customer ZCC',
    },
})

// ID 4 — Sales Order Mgmt SAP
export const ucSalesOrderMgmt = Record({
    $id: Now.ID['uc-sales-order-mgmt'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Sales Order Management for SAP S/4HANA via ZCC for ERP',
        industry: 'IT Services',
        domain: 'IT Services',
        description:
            'Bi-directional sync of sales orders, pricing, and availability data between ServiceNow Sales Order Management and SAP S/4HANA via ZCC for ERP',
        business_problem:
            'Bi-directional sync of sales orders, pricing, and availability data between ServiceNow Sales Order Management and SAP S/4HANA via ZCC for ERP',
        products: 'ZCC for ERP, Workflow Data Fabric',
        external_systems: 'SAP S/4HANA',
        solution:
            'ZCC for ERP integrates ServiceNow Sales Order Management with SAP S/4HANA. Bi-directional sync of sales orders, pricing, and availability data. End-to-end order lifecycle managed from ServiceNow with SAP as system of record.',
        outcome:
            'Streamlined sales order workflow eliminating manual re-entry. Real-time order status visibility for users without SAP access. Faster order-to-fulfillment cycle with reduced errors.',
        ui_surface: 'Form view',
        query_complexity: 'ERP sync',
        latency: '2-3s avg; 10s max',
        deployment_status: 'Live',
        keywords: 'Customer ZCC for ERP, IT services, SAP, sales order management, form view, ERP sync',
        tier: 'Customer ZCC for ERP',
    },
})

// ID 5 — Three SAP ECC Workflows
export const ucThreeSapWorkflows = Record({
    $id: Now.ID['uc-three-sap-workflows'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Three SAP ECC Workflows Live in 17 Days with Virtual Agents',
        industry: 'Services',
        domain: 'Services',
        description:
            'Order status inquiry, order creation, and invoice troubleshooting workflows using ZCC for ERP + SAP ECC data; virtual agent and workspace integrations',
        business_problem:
            'Order status inquiry, order creation, and invoice troubleshooting workflows using ZCC for ERP + SAP ECC data; virtual agent and workspace integrations',
        products: 'ZCC for ERP, Now Assist, App Engine',
        external_systems: 'SAP ECC',
        solution:
            'Three ZCC for ERP workflows deployed: order status inquiry, order creation, and invoice troubleshooting. Virtual agent and workspace integrations leverage SAP ERP data. Custom code detached from SAP to ServiceNow for better SDLC governance.',
        outcome:
            'Three use cases deployed and tested in just 2.5 weeks. Faster response to business needs for non-ERP users. Improved SDLC governance by moving custom logic to ServiceNow.',
        ui_surface: 'Agentic (virtual agent)',
        query_complexity: 'ERP sync',
        latency: '2-3s avg; 10s max',
        deployment_status: 'Live',
        keywords: 'Customer ZCC for ERP, services, SAP ECC, virtual agent, agentic, Now Assist',
        tier: 'Customer ZCC for ERP',
    },
})

// ID 6 — Vendor Master Data
export const ucVendorOnboarding = Record({
    $id: Now.ID['uc-vendor-onboarding'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Vendor Master Data Onboarding via ZCC for ERP — 6-Week Implementation',
        industry: 'Agribusiness',
        domain: 'Agribusiness',
        description:
            'Automated vendor management workflows connecting to SAP S/4HANA master data via ZCC for ERP; vendor onboarding and data quality workflow deployed in 6 weeks',
        business_problem:
            'Automated vendor management workflows connecting to SAP S/4HANA master data via ZCC for ERP; vendor onboarding and data quality workflow deployed in 6 weeks',
        products: 'ZCC for ERP, App Engine',
        external_systems: 'SAP S/4HANA',
        solution:
            'ServiceNow ZCC for ERP connects with SAP S/4HANA master data. Automated vendor management workflows built on ServiceNow App Engine. Rapid implementation in just 6 weeks.',
        outcome:
            'Better and cheaper vendor master data management workflow. Easier and faster workflow creation compared to SAP-native development. Next step: material master data management with Agentic AI.',
        ui_surface: 'Workflow',
        query_complexity: 'ERP sync',
        latency: '<500ms',
        deployment_status: 'Live',
        keywords: 'Customer ZCC for ERP, agribusiness, SAP, vendor onboarding, workflow, ERP sync',
        tier: 'Customer ZCC for ERP',
    },
})

// ID 7 — Sales Order Pharma
export const ucManufacturingBottleneck = Record({
    $id: Now.ID['uc-manufacturing-bottleneck'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Sales Order Workflow That Unblocked a Manufacturing Network',
        industry: 'Pharma',
        domain: 'Pharma',
        description:
            'ZCC for ERP integrating ServiceNow Sales Order Management with SAP S/4HANA; bi-directional sync eliminating bottleneck that held entire manufacturing network',
        business_problem:
            'ZCC for ERP integrating ServiceNow Sales Order Management with SAP S/4HANA; bi-directional sync eliminating bottleneck that held entire manufacturing network',
        products: 'ZCC for ERP, App Engine',
        external_systems: 'SAP S/4HANA',
        solution:
            'ZCC for ERP integrates ServiceNow Sales Order Management with SAP S/4HANA. Bi-directional sync of sales orders, pricing, and availability data. End-to-end order lifecycle managed from ServiceNow with SAP as system of record.',
        outcome:
            'Streamlined sales order workflow eliminating manual re-entry and the bottleneck that held the entire manufacturing network. Real-time order status visibility and faster order-to-fulfillment cycle.',
        ui_surface: 'Form view',
        query_complexity: 'ERP sync',
        latency: '2-3s avg; 10s max',
        deployment_status: 'Live',
        keywords: 'Customer ZCC for ERP, pharma, SAP, sales order, manufacturing, form view, ERP sync',
        tier: 'Customer ZCC for ERP',
    },
})

// ID 8 — FedEx
export const ucShipmentAnomaly = Record({
    $id: Now.ID['uc-shipment-anomaly'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'FedEx — Unbilled Shipments PoV (Agentic AI + ZCC Cross-Table JOIN)',
        industry: 'Logistics',
        domain: 'Logistics',
        description:
            'Two-phase FedEx deployment. Phase 1 (live): single-source Databricks query detecting hundreds of thousands of weekly unbilled shipments. Phase 2 (PoV): cross-table JOIN across 13M+ row tables with full agentic automation',
        business_problem:
            'Two-phase FedEx deployment. Phase 1 (live): single-source Databricks query detecting hundreds of thousands of weekly unbilled shipments. Phase 2 (PoV): cross-table JOIN across 13M+ row tables with full agentic automation',
        products: 'Zero Copy Connectors, AI Agents',
        external_systems: 'Databricks, Oracle EBS',
        solution:
            'Phase 1: Zero Copy Connectors query Databricks to retrieve all unbilled shipments for a given week, creating cases within ServiceNow for human and AI agent review. Phase 2: cross-table JOIN across 13M+ row tables with full agentic automation for root cause determination and remediation.',
        outcome:
            'Hundreds of thousands of weekly unbilled shipments detected automatically. AI and traditional heuristics determine why each shipment is unbilled, then resolve or kick off remediation workflows.',
        ui_surface: 'Case creation (agentic)',
        query_complexity: 'Simple select; Join — same-catalog',
        latency: '<3s',
        deployment_status: 'Phase 1: Live; Phase 2: PoV',
        keywords: 'Customer ZCC, logistics, Databricks, Oracle EBS, agentic, AI agents, unbilled shipments, JOIN',
        tier: 'Customer ZCC',
    },
})

// ID 9 — AI Agents reasoning
export const ucScenario09 = Record({
    $id: Now.ID['uc-scenario-09'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'AI Agents reasoning over a constrained problem domain',
        industry: 'Cross-Industry',
        domain: 'Human Resources / Cross-industry',
        description:
            'Agent surfaces relevant insights for manager 1:1s by grounding on federated activity data via Knowledge Graph',
        business_problem:
            'Agent surfaces relevant insights for manager 1:1s by grounding on federated activity data via Knowledge Graph',
        products: 'Zero Copy Connectors, Now Assist, Knowledge Graph',
        external_systems: 'GitHub, Jira, Microsoft Teams, Gmail, Google Calendar',
        solution:
            'AI Agent grounded on federated activity data from GitHub, Jira, Teams, Gmail, and Google Calendar via Knowledge Graph. Zero Copy Connectors provide real-time access to external data sources.',
        outcome:
            'Managers receive relevant, context-rich insights for 1:1 meetings without manual data gathering across multiple tools.',
        ui_surface: 'Agentic (Now Assist)',
        query_complexity: 'Simple select',
        latency: '<1s',
        deployment_status: 'Sample / reference',
        keywords: 'Sample/Reference, agentic, Now Assist, Knowledge Graph, HR, cross-industry, GitHub, Jira',
        tier: 'Sample/Reference',
    },
})

// ID 10 — Analytics & Dashboarding
export const ucScenario10 = Record({
    $id: Now.ID['uc-scenario-10'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Analytics & Dashboarding on lakehouse data',
        industry: 'Cross-Industry',
        domain: 'Cross-industry (lakehouse)',
        description:
            'Custom workspace over 300M+ record Databricks / 500M+ BigQuery datasets; PA visualizations backed by WDF tables',
        business_problem:
            'Custom workspace over 300M+ record Databricks / 500M+ BigQuery datasets; PA visualizations backed by WDF tables',
        products: 'Zero Copy Connectors, Platform Analytics',
        external_systems: 'Databricks, BigQuery',
        solution:
            'Custom workspace built over 300M+ record Databricks and 500M+ BigQuery datasets. Platform Analytics visualizations backed by WDF tables provide rich dashboarding capabilities.',
        outcome:
            'Real-time analytics and dashboarding at scale over massive lakehouse datasets without data duplication into ServiceNow.',
        ui_surface: 'Dashboard (PA)',
        query_complexity: 'Aggregate',
        latency: '<5s at 500M+ records',
        deployment_status: 'Sample / reference',
        keywords: 'Sample/Reference, analytics, dashboard, Databricks, BigQuery, Platform Analytics, lakehouse, aggregate',
        tier: 'Sample/Reference',
    },
})

// ID 11 — Predictive AI Opps
export const ucScenario11 = Record({
    $id: Now.ID['uc-scenario-11'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Predictive AI Opps: Zero Copy Connectors for operational data',
        industry: 'Technology',
        domain: 'ITOM',
        description:
            'Log ingestion & AI analysis of Datadog/AppDynamics/cloud/IoT data',
        business_problem:
            'Log ingestion & AI analysis of Datadog/AppDynamics/cloud/IoT data',
        products: 'Zero Copy Connectors',
        external_systems: 'Datadog, AppDynamics',
        solution:
            'Zero Copy Connectors ingest log and operational data from Datadog, AppDynamics, and cloud/IoT sources for AI-driven analysis within ServiceNow ITOM.',
        outcome:
            'Predictive AI capabilities applied to operational data for proactive issue detection and resolution.',
        ui_surface: 'Dashboard',
        query_complexity: 'Not specified',
        latency: '2-3s avg; 10s max',
        deployment_status: 'Australia',
        keywords: 'Product, ITOM, Datadog, AppDynamics, predictive AI, operational data, dashboard',
        tier: 'Product',
    },
})

// ID 12 — Source to Pay PO Exception
export const ucScenario12 = Record({
    $id: Now.ID['uc-scenario-12'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Source to Pay: PO Exception Handling',
        industry: 'Financial Services',
        domain: 'FSC',
        description:
            'ZCC + ERP Canvas for Direct Procurement across multiple ERP systems',
        business_problem:
            'ZCC + ERP Canvas for Direct Procurement across multiple ERP systems',
        products: 'ZCC for ERP',
        external_systems: 'Multiple ERP systems (SAP, Oracle, Ariba, Coupa)',
        solution:
            'ZCC for ERP combined with ERP Canvas enables direct procurement workflows across multiple ERP systems including SAP, Oracle, Ariba, and Coupa.',
        outcome:
            'Unified PO exception handling across heterogeneous ERP landscape with streamlined procurement workflows.',
        ui_surface: 'Workflow (case creation)',
        query_complexity: 'Simple select',
        latency: '2-3s avg; 10s max',
        deployment_status: 'Australia',
        keywords: 'Product, FSC, financial services, procurement, SAP, Oracle, Ariba, Coupa, ERP, PO exception',
        tier: 'Product',
    },
})

// ID 13 — Talent Insights MVP
export const ucScenario13 = Record({
    $id: Now.ID['uc-scenario-13'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Talent Insights MVP — Standard Metrics Reporting',
        industry: 'Cross-Industry',
        domain: 'HRSD',
        description:
            'Talent AI Agent metrics reporting via Text2Query over Workday/Oracle/SAP',
        business_problem:
            'Talent AI Agent metrics reporting via Text2Query over Workday/Oracle/SAP',
        products: 'Zero Copy Connectors, Platform Analytics',
        external_systems: 'Workday, Oracle, SAP',
        solution:
            'Talent AI Agent provides standard metrics reporting via Text2Query capabilities over Workday, Oracle, and SAP HR data sources using Zero Copy Connectors.',
        outcome:
            'HR leaders gain real-time talent insights and metrics without manual data extraction or custom integrations.',
        ui_surface: 'Dashboard (PA)',
        query_complexity: 'Not specified',
        latency: '<1s',
        deployment_status: 'March 2026 (Store Release)',
        keywords: 'Product, HRSD, talent insights, Workday, Oracle, SAP, Text2Query, Platform Analytics',
        tier: 'Product',
    },
})

// ID 14 — Manager Hub
export const ucScenario14 = Record({
    $id: Now.ID['uc-scenario-14'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Manager Hub use case',
        industry: 'Cross-Industry',
        domain: 'HRSD',
        description:
            'ZCC for data integrations feeding Manager Hub via PA',
        business_problem:
            'ZCC for data integrations feeding Manager Hub via PA',
        products: 'Zero Copy Connectors, Platform Analytics',
        external_systems: 'Not specified',
        solution:
            'Zero Copy Connectors provide data integrations that feed into the Manager Hub experience, with Platform Analytics powering dashboards and visualizations.',
        outcome:
            'Manager Hub enriched with external data sources providing comprehensive team and organizational insights.',
        ui_surface: 'Workspace',
        query_complexity: 'Not specified',
        latency: '<1s',
        deployment_status: 'Brazil',
        keywords: 'Product, HRSD, Manager Hub, Platform Analytics, workspace',
        tier: 'Product',
    },
})

// ID 15 — Succession Planning
export const ucScenario15 = Record({
    $id: Now.ID['uc-scenario-15'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Succession Planning AIA (MVP)',
        industry: 'Cross-Industry',
        domain: 'HRSD',
        description:
            'Accelerate succession planning via Talent AI Agent over HR sources',
        business_problem:
            'Accelerate succession planning via Talent AI Agent over HR sources',
        products: 'Zero Copy Connectors, AI Agents',
        external_systems: 'Workday, SuccessFactors',
        solution:
            'Talent AI Agent accelerates succession planning by reasoning over federated HR data from Workday and SuccessFactors via Zero Copy Connectors.',
        outcome:
            'Faster, data-driven succession planning with AI-powered candidate identification and readiness assessment.',
        ui_surface: 'Workspace',
        query_complexity: 'Not specified',
        latency: '<1s',
        deployment_status: 'Brazil',
        keywords: 'Product, HRSD, succession planning, Workday, SuccessFactors, AI Agents',
        tier: 'Product',
    },
})

// ID 16 — Cloud Cost Management
export const ucScenario16 = Record({
    $id: Now.ID['uc-scenario-16'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Cloud Cost Management',
        industry: 'Technology',
        domain: 'ITAM',
        description:
            'Efficient billing job resources (batch mode) over AWS/Azure/GCP',
        business_problem:
            'Efficient billing job resources (batch mode) over AWS/Azure/GCP',
        products: 'Zero Copy Connectors',
        external_systems: 'AWS, Azure, GCP billing data',
        solution:
            'Zero Copy Connectors enable efficient batch-mode billing job resource queries over AWS, Azure, and GCP billing data for cloud cost management.',
        outcome:
            'Comprehensive cloud cost visibility across multi-cloud environments with aggregated billing insights.',
        ui_surface: 'Dashboard',
        query_complexity: 'Aggregate',
        latency: '2-3s avg',
        deployment_status: 'Australia',
        keywords: 'Product, ITAM, cloud cost, AWS, Azure, GCP, billing, aggregate, dashboard',
        tier: 'Product',
    },
})

// ID 17 — SPC Palo Alto NGFW
export const ucScenario17 = Record({
    $id: Now.ID['uc-scenario-17'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'SPC — Palo Alto NGFW firewall coverage monitoring',
        industry: 'Technology',
        domain: 'SecOps',
        description:
            'Stream Connect ingestion for mitigation control detection',
        business_problem:
            'Stream Connect ingestion for mitigation control detection',
        products: 'Stream Connect, Zero Copy Connectors',
        external_systems: 'Palo Alto NGFW',
        solution:
            'Stream Connect ingests Palo Alto NGFW firewall data for real-time mitigation control detection within ServiceNow SecOps.',
        outcome:
            'Real-time firewall coverage monitoring and mitigation control detection across the security perimeter.',
        ui_surface: 'Dashboard',
        query_complexity: 'Not specified',
        latency: '2-3s avg',
        deployment_status: 'March 2026 (Store Release)',
        keywords: 'Product, SecOps, Palo Alto, NGFW, firewall, Stream Connect, dashboard',
        tier: 'Product',
    },
})

// ID 18 — SPC Enhanced Cybersecurity Dashboard
export const ucScenario18 = Record({
    $id: Now.ID['uc-scenario-18'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'SPC — Enhanced Cybersecurity Executive Dashboard',
        industry: 'Technology',
        domain: 'SecOps',
        description:
            'ZCC over Databricks/Snowflake for exec cyber dashboard',
        business_problem:
            'ZCC over Databricks/Snowflake for exec cyber dashboard',
        products: 'Zero Copy Connectors',
        external_systems: 'Databricks, Snowflake',
        solution:
            'Zero Copy Connectors query Databricks and Snowflake to power an enhanced cybersecurity executive dashboard with real-time security posture data.',
        outcome:
            'Executive-level cybersecurity visibility with real-time data from multiple security data sources.',
        ui_surface: 'Dashboard',
        query_complexity: 'Not specified',
        latency: '2-3s avg',
        deployment_status: 'March 2026 (Store Release)',
        keywords: 'Product, SecOps, cybersecurity, Databricks, Snowflake, executive dashboard',
        tier: 'Product',
    },
})

// ID 19 — Project execution visibility
export const ucScenario19 = Record({
    $id: Now.ID['uc-scenario-19'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Project execution visibility for Portfolio Managers',
        industry: 'Technology',
        domain: 'SPM',
        description:
            'IntegrationHub across Jira/ADO/Monday/Smartsheet into SPW',
        business_problem:
            'IntegrationHub across Jira/ADO/Monday/Smartsheet into SPW',
        products: 'Integration Hub',
        external_systems: 'Jira, Azure DevOps, Monday, Smartsheet',
        solution:
            'Integration Hub connects Jira, Azure DevOps, Monday, and Smartsheet data into Strategic Portfolio Management Workspaces for unified project execution visibility.',
        outcome:
            'Portfolio managers gain consolidated project execution visibility across all external project management tools.',
        ui_surface: 'Dashboard',
        query_complexity: 'Not specified',
        latency: '2-3s avg',
        deployment_status: 'Q2 2026 (Store Release)',
        keywords: 'Product, SPM, Jira, Azure DevOps, Monday, Smartsheet, Integration Hub, portfolio',
        tier: 'Product',
    },
})

// ID 20 — Telecom Customer Lens
export const ucScenario20 = Record({
    $id: Now.ID['uc-scenario-20'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Telecom Customer Lens for Contact Center',
        industry: 'Telecommunications',
        domain: 'Telecom',
        description:
            'WDF over BigQuery for contact center with 500M records at 3-5s measured performance',
        business_problem:
            'WDF over BigQuery for contact center with 500M records at 3-5s measured performance',
        products: 'Zero Copy Connectors, Workflow Data Fabric',
        external_systems: 'BigQuery',
        solution:
            'Workflow Data Fabric over BigQuery provides contact center agents with a unified customer lens across 500M records at interactive speeds.',
        outcome:
            'Contact center agents access comprehensive customer data at 3-5s query performance over 500M records without data replication.',
        ui_surface: 'Workspace',
        query_complexity: 'Simple select',
        latency: '3-5s at 500M records',
        deployment_status: 'Australia',
        keywords: 'Product, telecom, BigQuery, contact center, workspace, Workflow Data Fabric',
        tier: 'Product',
    },
})

// ID 21 — Source to Pay Supplier 360
export const ucScenario21 = Record({
    $id: Now.ID['uc-scenario-21'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Source to Pay — Supplier 360 & performance monitoring',
        industry: 'Financial Services',
        domain: 'FSC',
        description:
            'ZCC over SAP/Oracle ERP for supplier KPIs',
        business_problem:
            'ZCC over SAP/Oracle ERP for supplier KPIs',
        products: 'ZCC for ERP',
        external_systems: 'SAP, Oracle ERP',
        solution:
            'ZCC for ERP connects to SAP and Oracle ERP systems to provide a unified Supplier 360 view with real-time performance KPIs.',
        outcome:
            'Comprehensive supplier performance monitoring with real-time KPIs from multiple ERP systems.',
        ui_surface: 'Dashboard',
        query_complexity: 'Not specified',
        latency: '2-3s avg; 10s max',
        deployment_status: 'Post Australia',
        keywords: 'Illustrative, FSC, financial services, supplier, SAP, Oracle, ERP, procurement, KPIs',
        tier: 'Illustrative',
    },
})

// ID 22 — Cloud Cost Inline Estimation
export const ucScenario22 = Record({
    $id: Now.ID['uc-scenario-22'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Cloud Cost — Integrate Cloud Pricing & Inline Cost Estimation',
        industry: 'Technology',
        domain: 'ITOM',
        description:
            'ZCC over hyperscalers/BigQuery for inline pricing',
        business_problem:
            'ZCC over hyperscalers/BigQuery for inline pricing',
        products: 'Zero Copy Connectors',
        external_systems: 'Cloud pricing data',
        solution:
            'Zero Copy Connectors query hyperscaler and BigQuery cloud pricing data to enable inline cost estimation within ServiceNow workflows.',
        outcome:
            'Real-time cloud pricing integration enables inline cost estimation for cloud resource provisioning decisions.',
        ui_surface: 'Dashboard',
        query_complexity: 'Not specified',
        latency: '2-3s avg',
        deployment_status: 'Post Australia',
        keywords: 'Illustrative, ITOM, cloud cost, hyperscaler, BigQuery, pricing, dashboard',
        tier: 'Illustrative',
    },
})

// ID 23 — SURF Manager 360
export const ucScenario23 = Record({
    $id: Now.ID['uc-scenario-23'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'SURF Manager 360 — Manager Insights',
        industry: 'Technology',
        domain: 'SNOW-DT',
        description:
            'Enrichment over Workday for internal manager insights',
        business_problem:
            'Enrichment over Workday for internal manager insights',
        products: 'Zero Copy Connectors',
        external_systems: 'Workday',
        solution:
            'Zero Copy Connectors enrich ServiceNow records with Workday data to provide comprehensive manager insights for internal SURF platform.',
        outcome:
            'Managers receive enriched 360-degree insights powered by Workday data within the ServiceNow workspace.',
        ui_surface: 'Workspace',
        query_complexity: 'Not specified',
        latency: '<1s',
        deployment_status: 'Implementation',
        keywords: 'SNOW-DT, internal, Workday, manager insights, workspace, enrichment',
        tier: 'SNOW-DT',
    },
})

// ID 24 — SURF Sales Hub
export const ucScenario24 = Record({
    $id: Now.ID['uc-scenario-24'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'SURF — Sales Hub',
        industry: 'Technology',
        domain: 'SNOW-DT',
        description:
            'Enrichment over Microsoft Dynamics for Sales',
        business_problem:
            'Enrichment over Microsoft Dynamics for Sales',
        products: 'Zero Copy Connectors',
        external_systems: 'Microsoft Dynamics',
        solution:
            'Zero Copy Connectors enrich ServiceNow Sales Hub with Microsoft Dynamics data for comprehensive sales intelligence.',
        outcome:
            'Sales teams access enriched customer and opportunity data from Microsoft Dynamics within the ServiceNow workspace.',
        ui_surface: 'Workspace',
        query_complexity: 'Not specified',
        latency: '<2s',
        deployment_status: 'Implementation',
        keywords: 'SNOW-DT, internal, Microsoft Dynamics, sales, workspace, enrichment',
        tier: 'SNOW-DT',
    },
})

// ID 25 — SURF Customer Success Platform
export const ucScenario25 = Record({
    $id: Now.ID['uc-scenario-25'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'SURF — Customer Success Platform',
        industry: 'Technology',
        domain: 'SNOW-DT',
        description:
            'Enrichment over CRM origin; data model mapping across Jira/ADO',
        business_problem:
            'Enrichment over CRM origin; data model mapping across Jira/ADO',
        products: 'Zero Copy Connectors',
        external_systems: 'CRM, Jira, Azure DevOps',
        solution:
            'Zero Copy Connectors enrich the Customer Success Platform with CRM origin data and data model mapping across Jira and Azure DevOps.',
        outcome:
            'Unified customer success view with enriched data from CRM, Jira, and Azure DevOps for comprehensive account health monitoring.',
        ui_surface: 'Workspace',
        query_complexity: 'Not specified',
        latency: '<2s',
        deployment_status: 'Implementation',
        keywords: 'SNOW-DT, internal, CRM, Jira, Azure DevOps, customer success, workspace',
        tier: 'SNOW-DT',
    },
})

// ID 26 — Compliance process
export const ucScenario26 = Record({
    $id: Now.ID['uc-scenario-26'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Compliance process referencing cloud data warehouse',
        industry: 'Cross-Industry',
        domain: 'GRC',
        description:
            'Compliance workflow referencing external DW',
        business_problem:
            'Compliance workflow referencing external DW',
        products: 'Zero Copy Connectors',
        external_systems: 'Cloud data warehouse',
        solution:
            'Zero Copy Connectors enable compliance workflows to reference external cloud data warehouse records without data replication.',
        outcome:
            'Compliance processes can reference authoritative data warehouse records in real time for audit and governance workflows.',
        ui_surface: 'Workflow',
        query_complexity: 'Not specified',
        latency: '2-3s avg',
        deployment_status: 'Post Australia',
        keywords: 'Illustrative, GRC, compliance, cloud data warehouse, workflow',
        tier: 'Illustrative',
    },
})

// ID 27 — Case management & data residency
export const ucScenario27 = Record({
    $id: Now.ID['uc-scenario-27'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Case management & data residency',
        industry: 'Cross-Industry',
        domain: 'Industry Vertical',
        description:
            'Data residency-constrained case management',
        business_problem:
            'Data residency-constrained case management',
        products: 'Zero Copy Connectors',
        external_systems: 'Not specified',
        solution:
            'Zero Copy Connectors enable case management workflows that respect data residency constraints by querying data in place rather than replicating across regions.',
        outcome:
            'Case management with full data residency compliance — data stays in its region while ServiceNow orchestrates workflows.',
        ui_surface: 'Workflow',
        query_complexity: 'Not specified',
        latency: '2-3s avg',
        deployment_status: 'Post Australia',
        keywords: 'Illustrative, industry vertical, case management, data residency, workflow',
        tier: 'Illustrative',
    },
})

// ID 28 — ServiceBridge + record enrichment
export const ucScenario28 = Record({
    $id: Now.ID['uc-scenario-28'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'ServiceBridge + record enrichment',
        industry: 'Cross-Industry',
        domain: 'Industry Vertical',
        description:
            'Record enrichment via ServiceBridge',
        business_problem:
            'Record enrichment via ServiceBridge',
        products: 'Zero Copy Connectors',
        external_systems: 'Not specified',
        solution:
            'ServiceBridge combined with Zero Copy Connectors enables real-time record enrichment from external data sources during cross-instance workflows.',
        outcome:
            'Records enriched with external data in real time via ServiceBridge without data duplication.',
        ui_surface: 'Workflow',
        query_complexity: 'Not specified',
        latency: '2-3s avg',
        deployment_status: 'Post Australia',
        keywords: 'Illustrative, industry vertical, ServiceBridge, record enrichment, workflow',
        tier: 'Illustrative',
    },
})

// ID 29 — Predictive maintenance
export const ucScenario29 = Record({
    $id: Now.ID['uc-scenario-29'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Predictive maintenance (evaluate vs OT)',
        industry: 'Technology',
        domain: 'ITAM',
        description:
            'Inventory federation / service assurance over Oracle/Neo4j at scale (billions of CIs)',
        business_problem:
            'Inventory federation / service assurance over Oracle/Neo4j at scale (billions of CIs)',
        products: 'Zero Copy Connectors',
        external_systems: 'OT systems',
        solution:
            'Zero Copy Connectors federate inventory and service assurance data from OT systems at scale, supporting billions of configuration items without local replication.',
        outcome:
            'Predictive maintenance capabilities over federated OT inventory data at billion-CI scale.',
        ui_surface: 'Dashboard',
        query_complexity: 'Not specified',
        latency: '<2s',
        deployment_status: 'Post Australia',
        keywords: 'Illustrative, ITAM, predictive maintenance, OT, inventory, service assurance, dashboard',
        tier: 'Illustrative',
    },
})

// ID 30 — Proactive Customer Operations
export const ucScenario30 = Record({
    $id: Now.ID['uc-scenario-30'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Proactive Customer Operations',
        industry: 'Technology',
        domain: 'ITOM',
        description:
            'Log/metric ingestion & AI analysis across cloud/analytics sources',
        business_problem:
            'Log/metric ingestion & AI analysis across cloud/analytics sources',
        products: 'Zero Copy Connectors',
        external_systems: 'Cloud/analytics sources',
        solution:
            'Zero Copy Connectors ingest logs and metrics from cloud and analytics sources for AI-driven proactive customer operations analysis.',
        outcome:
            'Proactive identification and resolution of customer-impacting issues through AI analysis of federated operational data.',
        ui_surface: 'Dashboard',
        query_complexity: 'Not specified',
        latency: '<1s',
        deployment_status: 'Post Australia',
        keywords: 'Illustrative, ITOM, proactive, customer operations, log ingestion, AI, dashboard',
        tier: 'Illustrative',
    },
})

// ID 31 — Data Discovery
export const ucScenario31 = Record({
    $id: Now.ID['uc-scenario-31'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Data Discovery',
        industry: 'Technology',
        domain: 'ITOM',
        description:
            'Event-based data discovery / non-persistent enrichment',
        business_problem:
            'Event-based data discovery / non-persistent enrichment',
        products: 'Zero Copy Connectors',
        external_systems: 'Not specified',
        solution:
            'Zero Copy Connectors enable event-based data discovery and non-persistent enrichment, allowing ServiceNow to discover and reference external data without persisting it locally.',
        outcome:
            'Dynamic data discovery with on-demand enrichment that keeps data fresh without storage overhead.',
        ui_surface: 'Dashboard',
        query_complexity: 'Not specified',
        latency: '2-3s avg',
        deployment_status: 'Post Australia',
        keywords: 'Illustrative, ITOM, data discovery, event-based, non-persistent enrichment, dashboard',
        tier: 'Illustrative',
    },
})

// ID 32 — Operations & Maintenance industrial
export const ucScenario32 = Record({
    $id: Now.ID['uc-scenario-32'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Operations & Maintenance workflows for industrial equipment',
        industry: 'Manufacturing',
        domain: 'OT',
        description:
            'Historical ingestion over Aveva PI/CONNECT, AspenTech IP21, GE Vernova',
        business_problem:
            'Historical ingestion over Aveva PI/CONNECT, AspenTech IP21, GE Vernova',
        products: 'Zero Copy Connectors',
        external_systems: 'Aveva Connect',
        solution:
            'Zero Copy Connectors enable historical data ingestion from industrial OT systems including Aveva PI/CONNECT, AspenTech IP21, and GE Vernova for maintenance workflows.',
        outcome:
            'Operations and maintenance workflows powered by historical industrial equipment data without complex ETL pipelines.',
        ui_surface: 'Workflow',
        query_complexity: 'Simple select',
        latency: '<1s',
        deployment_status: 'Post Australia',
        keywords: 'Illustrative, OT, manufacturing, industrial, Aveva, AspenTech, GE Vernova, workflow',
        tier: 'Illustrative',
    },
})

// ID 33 — SOC Historical analysis
export const ucScenario33 = Record({
    $id: Now.ID['uc-scenario-33'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'SOC — Historical analysis on observables',
        industry: 'Technology',
        domain: 'SecOps',
        description:
            'Historical ingestion & AI insights on observables',
        business_problem:
            'Historical ingestion & AI insights on observables',
        products: 'Zero Copy Connectors',
        external_systems: 'Security data stores',
        solution:
            'Zero Copy Connectors enable historical ingestion from security data stores for AI-driven analysis of observables in SOC workflows.',
        outcome:
            'SOC analysts gain AI-powered historical insights on security observables without replicating large security datasets.',
        ui_surface: 'Workspace',
        query_complexity: 'Not specified',
        latency: '<3s',
        deployment_status: 'Post Australia',
        keywords: 'Illustrative, SecOps, SOC, historical analysis, observables, AI insights, workspace',
        tier: 'Illustrative',
    },
})

// ID 34 — SPC Historical security tool coverage
export const ucScenario34 = Record({
    $id: Now.ID['uc-scenario-34'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'SPC — Historical security tool coverage insights',
        industry: 'Technology',
        domain: 'SecOps',
        description:
            'Historical analysis & predictive over SPC data',
        business_problem:
            'Historical analysis & predictive over SPC data',
        products: 'Zero Copy Connectors',
        external_systems: 'Security tool data',
        solution:
            'Zero Copy Connectors provide historical analysis and predictive capabilities over Security Posture Control data for comprehensive coverage insights.',
        outcome:
            'Security teams gain historical and predictive insights on tool coverage for proactive security posture management.',
        ui_surface: 'Dashboard',
        query_complexity: 'Not specified',
        latency: '<3s',
        deployment_status: 'Post Australia',
        keywords: 'Illustrative, SecOps, SPC, historical analysis, predictive, security coverage, dashboard',
        tier: 'Illustrative',
    },
})
