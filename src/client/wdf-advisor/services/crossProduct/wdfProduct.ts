export type Pillar = 'Connect' | 'Control' | 'Contextualize' | 'Converge';

export interface WDFProduct {
    id: string;
    name: string;
    pillar: Pillar;
    description: string;
    governanceJobs: string[];
    complianceFrameworks: string[];
}

export const WDF_PRODUCTS: WDFProduct[] = [
    // Connect pillar
    { id: 'zero-copy-connectors', name: 'Zero Copy Connectors', pillar: 'Connect', description: 'Federated live queries to data warehouses', governanceJobs: ['row_level_security', 'query_audit'], complianceFrameworks: ['GDPR', 'HIPAA'] },
    { id: 'zcc-for-erp', name: 'ZCC for ERP', pillar: 'Connect', description: 'Pre-built ERP federation (SAP/Oracle/Workday)', governanceJobs: ['row_level_security', 'field_masking', 'access_audit'], complianceFrameworks: ['SOX', 'GDPR'] },
    { id: 'stream-connect', name: 'Stream Connect', pillar: 'Connect', description: 'Real-time Kafka event streaming', governanceJobs: ['event_schema_validation', 'data_lineage_tracking', 'monitoring'], complianceFrameworks: ['SOX', 'GDPR', 'HIPAA'] },
    { id: 'external-content-connectors', name: 'External Content Connectors (XCC)', pillar: 'Connect', description: 'Index SharePoint/Confluence/Slack for AI Search', governanceJobs: ['crawl_scheduling', 'content_classification', 'access_sync'], complianceFrameworks: ['GDPR'] },
    { id: 'integration-hub', name: 'Integration Hub', pillar: 'Connect', description: '600+ spokes for bidirectional workflow integration', governanceJobs: ['api_security', 'data_masking', 'audit'], complianceFrameworks: ['SOX', 'GDPR'] },
    { id: 'live-connect', name: 'Live Connect', pillar: 'Connect', description: 'External BI tools query SN data live', governanceJobs: ['row_level_security', 'query_audit'], complianceFrameworks: ['GDPR', 'HIPAA'] },
    { id: 'mcp-client', name: 'MCP Client', pillar: 'Connect', description: 'AI agents invoke external tools via MCP', governanceJobs: ['tool_authorization', 'audit'], complianceFrameworks: [] },
    { id: 'sn-mcp-server', name: 'SN MCP Server', pillar: 'Connect', description: 'External AI agents invoke ServiceNow', governanceJobs: ['access_control', 'rate_limiting'], complianceFrameworks: [] },
    { id: 'rpa-hub', name: 'RPA Hub', pillar: 'Connect', description: 'UI automation for legacy systems', governanceJobs: ['bot_maintenance', 'credential_management'], complianceFrameworks: [] },
    { id: 'table-api', name: 'Table API', pillar: 'Connect', description: 'Bulk REST export of SN data', governanceJobs: ['export_scheduling', 'access_scoping'], complianceFrameworks: ['GDPR'] },
    { id: 'inbound-apis', name: 'Inbound APIs', pillar: 'Connect', description: 'REST/SOAP endpoints for external record ops', governanceJobs: ['rate_limiting', 'authentication'], complianceFrameworks: [] },

    // Control pillar
    { id: 'data-catalog', name: 'Data Catalog', pillar: 'Control', description: 'Central registry of data assets with metadata and lineage', governanceJobs: ['metadata_accuracy', 'glossary_alignment', 'lineage_completeness'], complianceFrameworks: ['SOX'] },
    { id: 'data-governance', name: 'Data Governance', pillar: 'Control', description: 'Enforce quality, compliance, access control, and retention policies', governanceJobs: ['policy_definition', 'rule_validation', 'compliance_audit'], complianceFrameworks: ['SOX', 'GDPR', 'HIPAA', 'PCI-DSS'] },

    // Contextualize pillar
    { id: 'raptordb-pro', name: 'RaptorDB Pro', pillar: 'Contextualize', description: 'HTAP engine with medallion architecture for analytics', governanceJobs: ['data_quality', 'sync_monitoring', 'capacity_planning'], complianceFrameworks: ['SOX'] },
    { id: 'htap-engine', name: 'HTAP Engine', pillar: 'Contextualize', description: 'Separates analytical load from operational (requires RaptorDB Pro)', governanceJobs: ['query_audit', 'performance_monitoring'], complianceFrameworks: [] },
    { id: 'live-archive', name: 'Live Archive', pillar: 'Contextualize', description: 'Historical data retention with live query (requires RaptorDB Pro)', governanceJobs: ['retention_policy', 'archive_scheduling'], complianceFrameworks: ['SOX', 'HIPAA'] },

    // Converge pillar
    { id: 'automation-engine', name: 'Automation Engine', pillar: 'Converge', description: 'Event-driven automation rules and threshold triggers', governanceJobs: ['rule_validation', 'execution_audit'], complianceFrameworks: ['SOX'] },
];

export function getProductsByPillar(pillar: Pillar): WDFProduct[] {
    return WDF_PRODUCTS.filter(p => p.pillar === pillar);
}

export function getProduct(id: string): WDFProduct | undefined {
    return WDF_PRODUCTS.find(p => p.id === id);
}

export function getProductByName(name: string): WDFProduct | undefined {
    return WDF_PRODUCTS.find(p => p.name.toLowerCase() === name.toLowerCase());
}

export function getPillarForProduct(name: string): Pillar | null {
    const product = getProductByName(name);
    return product ? product.pillar : null;
}
