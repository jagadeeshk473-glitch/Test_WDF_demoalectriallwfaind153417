import '@servicenow/sdk/global'
import { Table, StringColumn, ListColumn, JsonColumn, ReferenceColumn, Record } from '@servicenow/sdk/core'
import { demoZccSql, demoStream, demoIh, demoSox } from './scenario-demo.now'

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
})

export const patFederatedQuery = Record({
    $id: Now.ID['pat-federated-query'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_arch_pat',
    data: {
        name: 'Federated Query Pattern',
        tagline: 'Query external data in-place without replication',
        data_flow_steps: '1. User or workflow requests data\n2. ServiceNow routes query to ZCC/MID Server\n3. MID Server executes JDBC query against source DB\n4. Results returned to ServiceNow in real-time\n5. Data displayed in workspace/report (never persisted)',
        industry_examples: JSON.stringify([
            { industry: 'Healthcare', example: 'Query patient system status from Epic without storing PHI' },
            { industry: 'Financial Services', example: 'Access AR aging data from SAP without replicating financial records' },
            { industry: 'Manufacturing', example: 'Query MES production data for quality dashboards' }
        ]),
        linked_demo: demoZccSql,
    },
})

export const patEventDriven = Record({
    $id: Now.ID['pat-event-driven'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_arch_pat',
    data: {
        name: 'Event-Driven Pipeline',
        tagline: 'Real-time event streaming for continuous data flow',
        data_flow_steps: '1. External system publishes event to Kafka topic\n2. Stream Connect consumes event in real-time\n3. Event transformed and validated against schema\n4. ServiceNow record created/updated automatically\n5. Downstream workflows triggered by record change',
        industry_examples: JSON.stringify([
            { industry: 'Security', example: 'SIEM alerts streamed for automated incident creation' },
            { industry: 'IoT/Manufacturing', example: 'Sensor telemetry streamed for predictive maintenance' },
            { industry: 'Financial Services', example: 'Transaction anomalies streamed for fraud case management' }
        ]),
        linked_demo: demoStream,
    },
})

export const patBiDirectionalSync = Record({
    $id: Now.ID['pat-bi-directional'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_arch_pat',
    data: {
        name: 'Bi-Directional Sync Pattern',
        tagline: 'Keep records synchronized across systems with conflict resolution',
        data_flow_steps: '1. Change detected in source system (ServiceNow or external)\n2. Integration Hub flow triggered by event/schedule\n3. Field mapping and transformation applied\n4. Conflict resolution rules evaluated\n5. Target system updated with reconciled data\n6. Sync confirmation logged for audit',
        industry_examples: JSON.stringify([
            { industry: 'Technology', example: 'Jira-ServiceNow incident/story sync for DevOps teams' },
            { industry: 'Cross-Industry', example: 'Salesforce opportunity sync for customer service visibility' },
            { industry: 'Government', example: 'Legacy case system sync for citizen portal modernization' }
        ]),
        linked_demo: demoIh,
    },
})

export const patContentIndex = Record({
    $id: Now.ID['pat-content-index'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_arch_pat',
    data: {
        name: 'Content Indexing & Search',
        tagline: 'Crawl, index, and unify enterprise knowledge without data movement',
        data_flow_steps: '1. Crawler authenticates to external content source\n2. Content metadata and text extracted on schedule\n3. Search index updated (content stays in source)\n4. Users search across all sources from ServiceNow\n5. Now Assist uses indexed content for AI-powered answers',
        industry_examples: JSON.stringify([
            { industry: 'Cross-Industry', example: 'SharePoint + Confluence unified search for support agents' },
            { industry: 'Financial Services', example: 'Audit document indexing for SOX compliance searches' },
            { industry: 'Education', example: 'Course material and policy document unification' }
        ]),
        linked_demo: demoSox,
    },
})

export const patRealTimeEnrich = Record({
    $id: Now.ID['pat-realtime-enrich'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_wdf_advisory_arch_pat',
    data: {
        name: 'Real-Time Enrichment',
        tagline: 'On-demand data fetch when a record is accessed',
        data_flow_steps: '1. User opens a CI or record in ServiceNow\n2. Live Connect detects the access event\n3. Real-time API call made to source (cloud provider/monitoring)\n4. Current attributes fetched and merged with CMDB record\n5. User sees live data without waiting for scheduled discovery',
        industry_examples: JSON.stringify([
            { industry: 'Technology', example: 'Cloud CI enrichment with live AWS/Azure resource state' },
            { industry: 'Telecom', example: 'Network element status enrichment from NMS tools' },
            { industry: 'Retail', example: 'POS system status enrichment for store IT support' }
        ]),
    },
})
