/* ────────────────────────────────────────────────────────────
 *  WDF Advisor – Decision Engine (expanded)
 *  Produces rich, actionable recommendations from wizard answers.
 * ──────────────────────────────────────────────────────────── */

// ── Wizard answers collected by the clarify flow ──────────────
export interface Answers {
    systemType: string
    dataAction: string
    writeBack?: string
    multiJoin?: string
    reactionSpeed?: string
    aiAgent?: string
    triggerDirection?: 'sn_calls_out' | 'external_calls_in' | 'bidirectional'
    erpSystem?: string
}

// ── Supporting detail types ───────────────────────────────────
export interface GovernanceStatus {
    label: string           // e.g. "GA", "Beta", "Planned"
    since: string | null    // release name, e.g. "Xanadu" or null when unknown
    description: string
}

export interface TradeOff {
    pro: string
    con: string
}

export interface ProofPoint {
    icon: string            // emoji or icon key
    label: string
    detail: string
}

export interface NextStep {
    order: number
    title: string
    description: string
    link: string | null     // docs URL or null
}

// ── Full recommendation returned to the UI ────────────────────
export interface Recommendation {
    primary: string
    fallback: string
    confidence: 'High' | 'Medium' | 'Low'
    note?: string
    governance: GovernanceStatus | null
    tradeoffs: TradeOff[] | null
    proofPoints: ProofPoint[]
    nextSteps: NextStep[]
    alsoNeeded: string[]
    orchestrationFlow: string | null
}

// ── Public entry point ────────────────────────────────────────
export function computeRecommendation(answers: Answers): Recommendation {
    const base = _getBaseRecommendation(answers)

    return {
        ...base,
        governance: _getGovernanceStatus(base.primary),
        tradeoffs: _getTradeoffs(base.primary, answers),
        proofPoints: _getProofPoints(base.primary),
        nextSteps: _getNextSteps(base.primary, answers),
        alsoNeeded: _getAlsoNeeded(base.primary, answers),
        orchestrationFlow: _getOrchestrationFlow(base.primary, answers),
    }
}

// ── Helpers (private by convention) ───────────────────────────

/**
 * Core routing logic – maps answers to primary / fallback / confidence / note.
 * Returns a "thin" recommendation that the caller enriches with detail fields.
 */
function _getBaseRecommendation(answers: Answers): Recommendation {
    const { systemType, dataAction, multiJoin, aiAgent, triggerDirection, erpSystem } = answers

    const empty: Pick<Recommendation, 'governance' | 'tradeoffs' | 'proofPoints' | 'nextSteps' | 'alsoNeeded' | 'orchestrationFlow'> = {
        governance: null,
        tradeoffs: null,
        proofPoints: [],
        nextSteps: [],
        alsoNeeded: [],
        orchestrationFlow: null,
    }

    // Trigger action with explicit direction (from triggerDirection follow-up)
    if (dataAction === 'trigger_action' && triggerDirection) {
        if (triggerDirection === 'sn_calls_out') {
            return { ...empty, primary: 'Integration Hub', fallback: 'MCP Client', confidence: 'High' }
        }
        if (triggerDirection === 'external_calls_in') {
            return { ...empty, primary: 'SN MCP Server', fallback: 'Stream Connect', confidence: 'High' }
        }
        if (triggerDirection === 'bidirectional') {
            return {
                ...empty,
                primary: 'MCP Client',
                fallback: 'Integration Hub',
                confidence: 'Medium',
                note: 'Bidirectional pattern — you will likely need both an outbound connector (Integration Hub or MCP Client) and an inbound connector (SN MCP Server or Stream Connect).',
            }
        }
    }

    // Streaming / CDC
    if (systemType === 'kafka' || dataAction === 'detect_changes') {
        return { ...empty, primary: 'Stream Connect', fallback: 'Zero Copy Connectors', confidence: 'High' }
    }
    // Document search
    if (systemType === 'documents' || dataAction === 'search_documents') {
        return { ...empty, primary: 'External Content Connectors (XCC)', fallback: 'MCP Client', confidence: 'High' }
    }
    // ServiceNow-to-ServiceNow
    if (systemType === 'servicenow') {
        return { ...empty, primary: 'Live Connect', fallback: 'Zero Copy Connectors', confidence: 'High' }
    }
    // ERP systems — route through ERP-specific detection
    if (systemType === 'erp') {
        return _recommendERPConnector(empty, erpSystem)
    }
    // Databases
    if (systemType === 'database') {
        if (multiJoin === 'yes') {
            return {
                ...empty,
                primary: 'Zero Copy Connectors',
                fallback: 'Integration Hub',
                confidence: 'High',
                note: 'Use Trino federated join for cross-system queries',
            }
        }
        return { ...empty, primary: 'Zero Copy Connectors', fallback: 'Integration Hub', confidence: 'High' }
    }
    // Cloud / SaaS
    if (systemType === 'cloud_saas') {
        return { ...empty, primary: 'Integration Hub', fallback: 'Zero Copy Connectors', confidence: 'Medium' }
    }
    // AI agent feed
    if (dataAction === 'feed_ai_agent' || aiAgent === 'yes') {
        return { ...empty, primary: 'MCP Client', fallback: 'Integration Hub', confidence: 'High' }
    }
    // Catch-all
    return { ...empty, primary: 'Integration Hub', fallback: 'MCP Client', confidence: 'Low' }
}

/**
 * Maps each product to its current governance posture.
 */
function _getGovernanceStatus(product: string): GovernanceStatus | null {
    const statuses: Record<string, GovernanceStatus> = {
        'Stream Connect': {
            label: 'GA',
            since: 'Xanadu',
            description: 'Generally available with full support and SLA coverage.',
        },
        'Zero Copy Connectors': {
            label: 'GA',
            since: 'Washington DC',
            description: 'Generally available; supports Snowflake, Databricks, and more.',
        },
        'ZCC for ERP': {
            label: 'GA',
            since: 'Xanadu',
            description: 'Pre-built ERP connectors with certified mapping tables.',
        },
        'Live Connect': {
            label: 'GA',
            since: 'Vancouver',
            description: 'Production-ready for ServiceNow-to-ServiceNow federation.',
        },
        'Integration Hub': {
            label: 'GA',
            since: 'Orlando',
            description: 'Mature platform with 600+ spokes and enterprise SLA.',
        },
        'External Content Connectors (XCC)': {
            label: 'GA',
            since: 'Xanadu',
            description: 'Index and search external content repositories.',
        },
        'MCP Client': {
            label: 'GA',
            since: 'Xanadu',
            description: 'Model Context Protocol client for AI agent tool invocation — generally available.',
        },
        'SN MCP Server': {
            label: 'GA',
            since: 'Xanadu',
            description: 'ServiceNow as MCP server for external AI agents — generally available.',
        },
    }
    return statuses[product] ?? null
}

/**
 * Generates trade-off pairs relevant to the recommended product & answers.
 */
function _getTradeoffs(product: string, answers: Answers): TradeOff[] | null {
    const tradeoffs: TradeOff[] = []

    switch (product) {
        case 'Stream Connect':
            tradeoffs.push(
                { pro: 'Real-time event streaming with sub-second latency', con: 'Requires Kafka infrastructure and operational expertise' },
                { pro: 'Native CDC support for change detection', con: 'Higher infrastructure cost vs. batch integration' },
            )
            break
        case 'Zero Copy Connectors':
            tradeoffs.push(
                { pro: 'No data duplication — query data in place', con: 'Read-only by default; write-back requires additional config' },
                { pro: 'Federated SQL joins across sources via Trino', con: 'Query latency depends on source system performance' },
            )
            if (answers.multiJoin === 'yes') {
                tradeoffs.push(
                    { pro: 'Cross-system joins without ETL pipelines', con: 'Complex query plans may hit timeout limits on large datasets' },
                )
            }
            break
        case 'ZCC for ERP':
            tradeoffs.push(
                { pro: 'Pre-built mapping tables for SAP, Oracle, Workday', con: 'Limited to supported ERP systems and certified fields' },
                { pro: 'Zero-copy architecture avoids data sprawl', con: 'Custom ERP fields may require mapping extensions' },
            )
            break
        case 'Live Connect':
            tradeoffs.push(
                { pro: 'Native ServiceNow-to-ServiceNow real-time federation', con: 'Both instances must be on compatible releases' },
                { pro: 'No middleware required — platform-native', con: 'Cross-instance ACL alignment can be complex' },
            )
            break
        case 'Integration Hub':
            tradeoffs.push(
                { pro: 'Largest spoke ecosystem (600+) with low-code authoring', con: 'Spoke licensing costs scale with volume' },
                { pro: 'Built-in orchestration, retry, and error handling', con: 'Not optimized for high-frequency streaming patterns' },
            )
            break
        case 'External Content Connectors (XCC)':
            tradeoffs.push(
                { pro: 'Unified search across SharePoint, Confluence, Google Drive', con: 'Indexing latency means content is near-real-time, not instant' },
                { pro: 'Leverages AI Search for semantic relevance', con: 'Large repositories may require tuning crawl schedules' },
            )
            break
        case 'MCP Client':
            tradeoffs.push(
                { pro: 'Provides rich context to AI agents from any MCP server', con: 'GA since Xanadu — verify instance version compatibility' },
                { pro: 'Supports tool-use pattern for agentic workflows', con: 'Requires MCP-compatible server on the target system' },
            )
            break
        case 'SN MCP Server':
            tradeoffs.push(
                { pro: 'Exposes ServiceNow capabilities as MCP tools for external AI agents', con: 'GA since Xanadu — verify instance version compatibility' },
                { pro: 'Open standard — any MCP-compatible client can connect', con: 'Requires governance over which tables and actions are exposed' },
            )
            break
        default:
            return null
    }

    return tradeoffs.length > 0 ? tradeoffs : null
}

/**
 * Returns proof points (stats, benchmarks, customer signals) for the product.
 */
function _getProofPoints(product: string): ProofPoint[] {
    const points: Record<string, ProofPoint[]> = {
        'Stream Connect': [
            { icon: '⚡', label: 'Sub-second latency', detail: 'Events delivered to ServiceNow in < 1 s from Kafka topic' },
            { icon: '🔄', label: 'Native CDC', detail: 'Built-in change-data-capture adapters for popular databases' },
            { icon: '📈', label: 'Scalable throughput', detail: 'Handles millions of events per hour with horizontal scaling' },
        ],
        'Zero Copy Connectors': [
            { icon: '🔗', label: 'Zero duplication', detail: 'Query external data without copying it into ServiceNow' },
            { icon: '🧮', label: 'Federated joins', detail: 'Trino engine supports cross-system SQL joins' },
            { icon: '🛡️', label: 'Governance in place', detail: 'Data stays in source system — no additional compliance scope' },
        ],
        'ZCC for ERP': [
            { icon: '🏢', label: 'Certified ERP maps', detail: 'Pre-built field mappings for SAP, Oracle, and Workday' },
            { icon: '🔗', label: 'Zero-copy architecture', detail: 'Same benefits as ZCC with ERP-specific optimizations' },
            { icon: '⏱️', label: 'Faster time-to-value', detail: 'Reduces ERP integration setup from weeks to days' },
        ],
        'Live Connect': [
            { icon: '🌐', label: 'Platform native', detail: 'No middleware — direct ServiceNow-to-ServiceNow federation' },
            { icon: '🔒', label: 'Unified security model', detail: 'Leverages existing ACLs across connected instances' },
            { icon: '📡', label: 'Real-time access', detail: 'Live queries against remote instance — no stale data' },
        ],
        'Integration Hub': [
            { icon: '🔌', label: '600+ spokes', detail: 'Pre-built connectors for SaaS, cloud, and on-prem systems' },
            { icon: '🎨', label: 'Low-code authoring', detail: 'Flow Designer UI for citizen integrators' },
            { icon: '🔁', label: 'Built-in orchestration', detail: 'Retry, error handling, and parallel execution out of the box' },
        ],
        'External Content Connectors (XCC)': [
            { icon: '🔍', label: 'Unified search', detail: 'Single search pane across SharePoint, Confluence, Google Drive, and more' },
            { icon: '🤖', label: 'AI-powered relevance', detail: 'Leverages AI Search for semantic ranking of results' },
            { icon: '📂', label: 'Broad repository support', detail: 'Connects to file shares, wikis, and cloud storage' },
        ],
        'MCP Client': [
            { icon: '🧠', label: 'Agentic context', detail: 'Feeds structured context to AI agents via Model Context Protocol' },
            { icon: '🔧', label: 'Tool-use support', detail: 'AI agents can invoke tools exposed by MCP servers' },
            { icon: '🌍', label: 'Open standard', detail: 'Based on the open MCP specification — not vendor-locked' },
        ],
        'SN MCP Server': [
            { icon: '🔌', label: 'Expose ServiceNow as tools', detail: 'External AI agents invoke ServiceNow actions via MCP tool protocol' },
            { icon: '🛡️', label: 'Governed access', detail: 'Fine-grained control over which tables and actions are exposed' },
            { icon: '🌍', label: 'Open standard', detail: 'Any MCP-compatible client can connect without custom integration' },
        ],
    }
    return points[product] ?? []
}

/**
 * Ordered next steps to get started with the recommended product.
 */
function _getNextSteps(product: string, answers: Answers): NextStep[] {
    const steps: Record<string, NextStep[]> = {
        'Stream Connect': [
            { order: 1, title: 'Verify Kafka access', description: 'Ensure ServiceNow can reach your Kafka broker endpoints.', link: 'https://docs.servicenow.com/csh?topicname=stream-connect' },
            { order: 2, title: 'Create a Stream channel', description: 'Define topics and message schemas in Stream Connect config.', link: null },
            { order: 3, title: 'Map to target table', description: 'Configure message-to-record mapping for inbound events.', link: null },
        ],
        'Zero Copy Connectors': [
            { order: 1, title: 'Register data source', description: 'Add your external database or data lake as a ZCC data source.', link: 'https://docs.servicenow.com/csh?topicname=zero-copy-connect' },
            { order: 2, title: 'Define virtual tables', description: 'Create virtual table definitions that map to external schemas.', link: null },
            { order: 3, title: 'Test federated queries', description: 'Run queries in the ZCC query console to validate connectivity.', link: null },
        ],
        'ZCC for ERP': [
            { order: 1, title: 'Select ERP system', description: 'Choose SAP, Oracle, or Workday from the certified connector list.', link: 'https://docs.servicenow.com/csh?topicname=zcc-erp' },
            { order: 2, title: 'Apply field mappings', description: 'Review and customize the pre-built ERP field mapping tables.', link: null },
            { order: 3, title: 'Validate data access', description: 'Run sample queries to confirm field mapping accuracy.', link: null },
        ],
        'Live Connect': [
            { order: 1, title: 'Establish instance trust', description: 'Configure OAuth or basic auth between ServiceNow instances.', link: 'https://docs.servicenow.com/csh?topicname=live-connect' },
            { order: 2, title: 'Define remote tables', description: 'Register remote tables you want to federate.', link: null },
            { order: 3, title: 'Align ACLs', description: 'Ensure cross-instance security policies are consistent.', link: null },
        ],
        'Integration Hub': [
            { order: 1, title: 'Install required spokes', description: 'Browse the spoke catalog and install connectors for your target systems.', link: 'https://docs.servicenow.com/csh?topicname=integration-hub' },
            { order: 2, title: 'Build integration flow', description: 'Use Flow Designer to create or customize an integration flow.', link: null },
            { order: 3, title: 'Test & activate', description: 'Run the flow in test mode, review logs, then activate.', link: null },
        ],
        'External Content Connectors (XCC)': [
            { order: 1, title: 'Configure content source', description: 'Register your document repository (SharePoint, Confluence, etc.).', link: 'https://docs.servicenow.com/csh?topicname=external-content-connectors' },
            { order: 2, title: 'Set crawl schedule', description: 'Define how frequently content is indexed.', link: null },
            { order: 3, title: 'Enable AI Search', description: 'Turn on semantic search for the indexed content.', link: null },
        ],
        'MCP Client': [
            { order: 1, title: 'Deploy an MCP server', description: 'Stand up an MCP-compatible server on your target system or use an existing one.', link: 'https://docs.servicenow.com/csh?topicname=mcp-client' },
            { order: 2, title: 'Register MCP connection', description: 'Add the MCP server endpoint in ServiceNow connection settings.', link: null },
            { order: 3, title: 'Wire into AI agent', description: 'Connect the MCP client to your Now Assist or custom AI agent workflow.', link: null },
        ],
        'SN MCP Server': [
            { order: 1, title: 'Enable MCP Server plugin', description: 'Activate the MCP Server plugin on your ServiceNow instance.', link: 'https://docs.servicenow.com/csh?topicname=mcp-server' },
            { order: 2, title: 'Configure exposed tools', description: 'Define which ServiceNow tables and actions are available as MCP tools.', link: null },
            { order: 3, title: 'Share endpoint with consumers', description: 'Provide the MCP server endpoint URL and auth details to external AI agent teams.', link: null },
        ],
    }

    const result = steps[product] ?? []

    // If write-back is needed, add a step
    if (answers.writeBack === 'yes' && (product === 'Zero Copy Connectors' || product === 'ZCC for ERP')) {
        result.push({
            order: result.length + 1,
            title: 'Enable write-back',
            description: 'Configure write-back policies and map outbound fields to the source system.',
            link: null,
        })
    }

    return result
}

/**
 * Identifies complementary products that may also be needed alongside the primary.
 */
function _getAlsoNeeded(product: string, answers: Answers): string[] {
    const extras: string[] = []

    // AI agent scenarios often pair with a data connector
    if (answers.aiAgent === 'yes' && product !== 'MCP Client') {
        extras.push('MCP Client')
    }

    // Write-back on read-only connectors may need Integration Hub
    if (answers.writeBack === 'yes') {
        if (product === 'Zero Copy Connectors' || product === 'Live Connect') {
            extras.push('Integration Hub')
        }
    }

    // Real-time needs on a batch connector
    if (answers.reactionSpeed === 'realtime' && product === 'Integration Hub') {
        extras.push('Stream Connect')
    }

    // Document search alongside a data connector
    if (answers.dataAction === 'search_documents' && product !== 'External Content Connectors (XCC)') {
        extras.push('External Content Connectors (XCC)')
    }

    // Kafka/CDC scenarios: Stream Connect benefits from Integration Hub for downstream orchestration
    if (product === 'Stream Connect') {
        extras.push('Integration Hub')
    }

    // ERP scenarios: ZCC for ERP benefits from Data Products for data curation/governance
    if (product === 'ZCC for ERP') {
        extras.push('Data Products')
    }

    // Database multi-join: analytical processing via RaptorDB Pro
    if (product === 'Zero Copy Connectors' && answers.multiJoin === 'yes') {
        extras.push('RaptorDB Pro')
    }

    // AI agent with MCP Client: real-time data ingestion via Stream Connect
    if (product === 'MCP Client') {
        extras.push('Stream Connect')
    }

    return extras
}

/**
 * Suggests a high-level orchestration flow description when the scenario
 * involves multiple products or a multi-step data pipeline.
 */
function _getOrchestrationFlow(product: string, answers: Answers): string | null {
    if (answers.writeBack === 'yes' && (product === 'Zero Copy Connectors' || product === 'ZCC for ERP')) {
        return `${product} (read) → Integration Hub (write-back) — use ZCC for querying and IHub spokes for mutations.`
    }

    if (answers.aiAgent === 'yes' && product !== 'MCP Client') {
        return `${product} (data layer) → MCP Client (context feed) → AI Agent — surface data through MCP for agentic consumption.`
    }

    if (answers.reactionSpeed === 'realtime' && product === 'Integration Hub') {
        return 'Stream Connect (ingest) → Integration Hub (orchestrate) — stream events into ServiceNow, then trigger flows for downstream processing.'
    }

    if (product === 'Zero Copy Connectors' && answers.multiJoin === 'yes') {
        return 'Zero Copy Connectors (federated SQL) → Trino (join engine) → RaptorDB Pro (analytical processing) — combine data from multiple external sources, then leverage RaptorDB Pro for advanced analytical queries.'
    }

    // Stream Connect primary: ingest then orchestrate
    if (product === 'Stream Connect') {
        return 'Stream Connect (ingest) → Integration Hub (orchestrate) — stream events into ServiceNow, then trigger flows for downstream processing.'
    }

    // ZCC for ERP primary: federate then curate
    if (product === 'ZCC for ERP') {
        return 'ZCC for ERP (live federation) → Data Products (curation) — federate ERP data, then curate as governed data products.'
    }

    // MCP Client primary: agent context with real-time data
    if (product === 'MCP Client') {
        return 'MCP Client (context feed) → Stream Connect (data source) — agent accesses tools via MCP, with Stream Connect providing real-time data.'
    }

    return null
}

// ── ERP-specific recommendation logic ─────────────────────────

type EmptyFields = Pick<Recommendation, 'governance' | 'tradeoffs' | 'proofPoints' | 'nextSteps' | 'alsoNeeded' | 'orchestrationFlow'>

/**
 * Routes ERP recommendations to ZCC for ERP only for supported systems
 * (SAP, Oracle ERP, SuccessFactors OData v2, Workday).
 * Everything else falls back to Zero Copy Connectors.
 */
function _recommendERPConnector(empty: EmptyFields, erpSystem?: string): Recommendation {
    if (!erpSystem || erpSystem === 'other') {
        return {
            ...empty,
            primary: 'Zero Copy Connectors',
            fallback: 'Integration Hub',
            confidence: 'Low',
            note: 'Specify ERP type (SAP, Oracle, SuccessFactors, Workday) for ZCC for ERP eligibility.',
        }
    }

    const erp = erpSystem.toLowerCase()

    if (_isSAPSystem(erp)) {
        return {
            ...empty,
            primary: 'ZCC for ERP',
            fallback: 'Integration Hub',
            confidence: 'High',
            note: 'Q1: Query-Fed Inbound — SAP native connector (RFC/BAPI/OData)',
        }
    }

    if (_isOracleERP(erp)) {
        return {
            ...empty,
            primary: 'ZCC for ERP',
            fallback: 'Integration Hub',
            confidence: 'High',
            note: 'Q1: Query-Fed Inbound — Oracle EBS / Fusion',
        }
    }

    if (_isSuccessFactors(erp)) {
        if (erp.includes('odata')) {
            return {
                ...empty,
                primary: 'ZCC for ERP',
                fallback: 'Integration Hub',
                confidence: 'High',
                note: 'Q1: Query-Fed Inbound — SuccessFactors OData v2',
            }
        }
        return {
            ...empty,
            primary: 'Integration Hub',
            fallback: 'Zero Copy Connectors',
            confidence: 'High',
            note: 'Q1: Query-Fed Inbound — SuccessFactors REST (OData v2 required for ZCC for ERP)',
        }
    }

    if (_isWorkday(erp)) {
        return {
            ...empty,
            primary: 'ZCC for ERP',
            fallback: 'Integration Hub',
            confidence: 'High',
            note: 'Q1: Query-Fed Inbound — Workday REST API',
        }
    }

    // Unsupported ERP — fall back to generic federation
    return {
        ...empty,
        primary: 'Zero Copy Connectors',
        fallback: 'Integration Hub',
        confidence: 'Low',
        note: `'${erpSystem}' is not a supported ZCC for ERP system. Use Zero Copy for generic federation or contact support for enablement.`,
    }
}

/** Detect SAP systems */
function _isSAPSystem(erp: string): boolean {
    const keywords = ['sap', 's4hana', 's/4hana', 's4hc', 's/4hc', 'ecc', 'rise', 'bapi', 'rfc', 'idoc']
    return keywords.some(k => erp.includes(k))
}

/** Detect Oracle ERP */
function _isOracleERP(erp: string): boolean {
    const keywords = ['oracle', 'ebs', 'e-business', 'fusion', 'jd edwards', 'peoplesoft']
    return keywords.some(k => erp.includes(k))
}

/** Detect SuccessFactors */
function _isSuccessFactors(erp: string): boolean {
    const keywords = ['successfactors', 'sfsf']
    return keywords.some(k => erp.includes(k))
}

/** Detect Workday */
function _isWorkday(erp: string): boolean {
    const keywords = ['workday', 'wd']
    return keywords.some(k => erp.includes(k))
}
