import '@servicenow/sdk/global'
import { Table, StringColumn, Record } from '@servicenow/sdk/core'

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
    },
})

// ═══════════════════════════════════════════════
// SEED DATA — 7 Customer Use Cases
// ═══════════════════════════════════════════════

export const ucShipmentAnomaly = Record({
    $id: Now.ID['uc-shipment-anomaly'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Shipment anomaly detection',
        industry: 'Logistics',
        products: 'Workflow Data Fabric, Zero Copy Connectors for SQL',
        external_systems: 'Databricks',
        business_problem: 'A global logistics company noticed that each week, several thousand shipments were being handled but unbilled. These weekly unbilled shipments were accruing to hundreds of thousands of dollars in work being done but not billed/not invoiced, which represents cost without revenue recuperation. Left unchecked this could balloon to millions of dollars lost on recurring basis.\n\nIn the customer\'s database (data warehouse), all they see are unbilled shipments piling up. Shipments can be unbilled for any number of reasons and it is a manual, labor-intensive effort that requires teams to suss through hundreds of thousands of shipment records to ascertain why a given shipment is unbilled and how to remediate',
        solution: 'All necessary upstream systems of record were centralized in Databricks data warehouse, the two key information sources being Shipments and Invoices. Between the two of these tables were several hundred thousands of records. Each unbilled shipment record can be thought of as a case: using Zero Copy for SQL, customer issued a ZCC query into Databricks to retrieve all unbilled shipments for a given week. From here, cases were created within ServiceNow to be examined by human and AI agents. Working together, shipments the root cause behind why a given case (shipment) was unbilled could quickly be determined, and the corresponding workflow kicked off to remediate.',
        outcome: 'By avoiding ETL/data duplication/import of hundreds of millions of case records into ServiceNow, ServiceNow could serve as the system of action, getting a realtime view of current unbilled shipments, applying AI and traditonal heuristrics to understand why each shipment is unbilled, then either resolve on the spot or kick off a workflow for further remediation. All this happens in a single experience within ServiceNow, acting as the overall orchestrator, reasoning engine, and point of action.',
    },
})

export const ucProductIssueRepo = Record({
    $id: Now.ID['uc-product-issue-repo'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Central product issue repository and tracking',
        industry: 'Food & Beverage',
        products: 'Workflow Data Fabric, Zero Copy Connectors for SQL',
        external_systems: 'Databricks',
        business_problem: 'Customer required a central application to handle customer issues/complaints\nSolution must be comprehensive allowing customer to specify all details surrounding their purchase\nUp to 10 years of customer communications history must be retained and accessed on demand',
        solution: 'Centralized all disparate sources of information in Databricks from customer complaint history to product information\nChief value in reducing swivel-chair among disparate source systems: ZCC can query a single, centralized system to get at exactly the data needed\nCited significant infra savings in not having to ingest the data into customer\'s ServiceNow instance',
        outcome: 'Customer has a single access point across the company for all product related issues including a full history, powered by ServiceNow and WDF. All data made available remotely via customer\'s data warehouse',
    },
})

export const ucSalesOrderMgmt = Record({
    $id: Now.ID['uc-sales-order-mgmt'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Sales Order Management for SAP using ZCC for ERP',
        line_of_business: 'Sales',
        industry: 'IT Services',
        products: 'WDF, ZCC for ERP, App Engine',
        external_systems: 'SAP S/4HANA',
        business_problem: '- Wanted to leverage ServiceNow Sales Order Management together with SAP S/4HANA\n- Needed seamless integration to manage sales orders across both platforms\n- Required real-time data exchange to unlock full value of both systems',
        solution: '- ZCC for ERP to integrate ServiceNow Sales Order Management with SAP S/4HANA\n- Bi-directional sync of sales orders, pricing, and availability data\n- End-to-end order lifecycle managed from ServiceNow with SAP as system of record',
        outcome: '- Streamlined sales order workflow eliminating manual re-entry\n- Real-time order status visibility for users without SAP access\n- Faster order-to-fulfillment cycle with reduced errors',
    },
})

export const ucThreeSapWorkflows = Record({
    $id: Now.ID['uc-three-sap-workflows'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Three SAP Workflows, Live in 17 Days with Virtual Agents',
        line_of_business: 'CFO',
        industry: 'Services',
        products: 'WDF, App Engine, ZCC for ERP, NOW Assist',
        external_systems: 'SAP ECC',
        business_problem: '- Manual case handling for order inquiries consuming SAP data\n- Sales reps and mobile users unable to create orders without SAP access\n- Finance business user\'s needed direct SAP access for invoice troubleshooting',
        solution: '- 3 ZCC for ERP workflows: order status inquiry, order creation, invoice troubleshooting\n- Virtual agent and workspace integrations leveraging SAP ERP data\n- Detached custom code from SAP to ServiceNow for better SDLC governance',
        outcome: '- 3 use cases deployed and tested in just 2.5 weeks\n- Faster response to business needs for non-ERP users\n- Improved SDLC governance by moving custom logic to ServiceNow',
    },
})

export const ucVendorOnboarding = Record({
    $id: Now.ID['uc-vendor-onboarding'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Six Weeks to Transform Vendor Onboarding Without Touching SAP',
        line_of_business: 'IT Director, Procurement',
        industry: 'Agribusiness',
        products: 'WDF, App Engine for ERP, ZCC for ERP',
        external_systems: 'SAP S/4HANA',
        business_problem: '- Costly and time-consuming vendor master data management workflow\n- Manual processes slowing down vendor onboarding and data quality\n- Needed faster, more efficient approach without replacing SAP S/4HANA',
        solution: '- ServiceNow ZCC for ERP to connect with SAP S/4HANA master data\n- Automated vendor management workflows built on ServiceNow App Engine\n- Rapid implementation in just 6 weeks, championed by IT Director',
        outcome: '- Better and cheaper vendor master data management workflow\n- Easier and faster workflow creation compared to SAP S/4HANA-native development\n- Next step: Material master data management workflow, with Agentic AI to support both vendor and material master data process',
    },
})

export const ucProductIssueTracking = Record({
    $id: Now.ID['uc-product-issue-tracking'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'Central product issue tracking system',
        line_of_business: 'Core automotive OEMs',
        industry: 'Automotive/Manufacturing',
        products: 'Workflow Data Fabric, Zero Copy Connectors (SQL)',
        external_systems: 'Snowflake',
        business_problem: 'Customer required a central application built in ServiceNow to track and manage product issues across their entire product line (fleet of automobiles)\n\n• 30,000 internal and external users require a 360-view of a unified dataset containing more than 150 Million records on parts, components, module versions, and fleet information.\n• Full text search and fast data visualization must query remote data at user-interactive speed from a user experience built in ServiceNow\n• Real-time insight plus the ability to act immediately on defects linked to parts spanning the entire product fleet. Users can view, manage, and remediate product issues holistically with all key data residing off-instance\n• Source data fragmented across multiple core systems; going to each directly requires custom integration, access control, and inconsistent performance. Impractical to import into ServiceNow',
        solution: '• Source data unified into Snowflake data warehouse. Zero Copy eliminated integration complexity, allowing customer to use ServiceNow to query hundreds of millions of Snowflake records "in place"\n• Workflow Data Fabric Tables standardized the data model coming from a multitude of disparate source systems',
        outcome: '• One platform for 30,000+ users including customer\'s external network of dealerships\n• Removed integration complexity and the need to duplicate/import data into ServiceNow, which would have been impractical at this scale',
        links: JSON.stringify([{ label: 'Newsletter feature', url: 'https://servicenow.sharepoint.com/:w:/s/DAAdoptionStudio/IQDnS76Qi_NiT5GWG6dgtQAGAQudLYQVIgRxstQY22AjV7c?e=nNVhbv' }]),
    },
})

export const ucManufacturingBottleneck = Record({
    $id: Now.ID['uc-manufacturing-bottleneck'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_use_case',
    data: {
        title: 'One Workflow Ended the Bottleneck That Held an Entire Manufacturing Network Hostage',
        line_of_business: 'Warehousing, Director of IT',
        industry: 'Pharma',
        products: 'WDF Pro, ZCC for ERP, App Engine',
        external_systems: 'SAP',
        business_problem: '- Wanted to leverage ServiceNow Sales Order Management together with SAP S/4HANA\n- Needed seamless integration to manage sales orders across both platforms\n- Required real-time data exchange to unlock full value of both systems',
        solution: '- ZCC for ERP to integrate ServiceNow Sales Order Management with SAP S/4HANA\n- Bi-directional sync of sales orders, pricing, and availability data\n- End-to-end order lifecycle managed from ServiceNow with SAP as system of record',
        outcome: '- Streamlined sales order workflow eliminating manual re-entry\n- Real-time order status visibility for users without SAP access\n- Faster order-to-fulfillment cycle with reduced errors',
    },
})
