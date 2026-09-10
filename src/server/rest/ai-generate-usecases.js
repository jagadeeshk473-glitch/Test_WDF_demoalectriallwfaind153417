// @ts-nocheck
/* eslint-disable */
(function process(request, response) {
    var body = request.body ? request.body.data : {};
    var pain = body.pain || '';
    var industry = body.industry || '';
    var systems = body.systems || '';

    var useCases = null;

    // Attempt AI generation - direct try-catch to handle missing sn_gen_ai
    try {
        var aiApi = new sn_gen_ai.GlideGenAIAPI();
        var connCtx = _connectorContext();
        var sysPrompt = 'You are a ServiceNow WDF solutions architect. Generate exactly 6 use case ideas as a JSON array. Each: {title, connectors:[], pain, connectorReasoning, servicenowEnables, businessValue:[], industryTags:[]}. Return ONLY the JSON array.';
        var userPrompt = 'Pain: ' + (pain || 'general') + '. Industry: ' + (industry || 'cross-industry') + '. Systems: ' + (systems || 'various') + '. Available connectors: ' + connCtx;
        var aiResp = aiApi.generateText(sysPrompt, userPrompt);
        if (aiResp) {
            var cleaned = aiResp.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
            var parsed = JSON.parse(cleaned);
            if (Array.isArray(parsed) && parsed.length > 0) {
                useCases = parsed.slice(0, 6);
            }
        }
    } catch (e) {
        gs.info('WDF Advisor: AI gen unavailable, using fallback. ' + e.message);
    }

    // Deterministic fallback
    if (!useCases) {
        useCases = _buildUseCases(pain, industry, systems);
    }

    response.setStatus(200);
    response.setBody({ useCases: useCases });
})(request, response);

function _connectorContext() {
    var lines = [];
    var gr = new GlideRecord('x_snc_wdf_advisory_connector');
    gr.orderBy('name');
    gr.setLimit(20);
    gr.query();
    while (gr.next()) {
        lines.push(gr.getValue('name') + ': ' + (gr.getValue('tagline') || ''));
    }
    return lines.join('; ');
}

function _buildUseCases(pain, industry, systems) {
    var p = (pain || '').toLowerCase();
    var ind = industry || 'Cross-Industry';
    var sysList = systems ? systems.split(',') : [];
    var sysJoined = sysList.join(',').toLowerCase();

    var pool = [
        { title: ind + ' ERP Data Federation', connectors: ['Zero Copy Connect', 'Integration Hub'], pain: 'Manual data replication between ERP and ServiceNow causes stale data and sync delays.', connectorReasoning: 'Zero Copy Connect provides federated read access to ERP data without replication. Integration Hub handles write-back.', servicenowEnables: 'Virtual tables surface ERP data natively. Flow Designer orchestrates bidirectional workflows.', businessValue: ['Eliminate nightly batch syncs', 'Reduce integration maintenance by 60%', 'Single pane of glass for ITSM + ERP', 'Faster incident resolution with live context'], industryTags: [ind, 'Enterprise', 'IT Operations'], score: 0 },
        { title: 'Real-Time Event-Driven Alerting', connectors: ['Stream Connect', 'Integration Hub'], pain: 'Critical events are missed or delayed due to polling-based integrations.', connectorReasoning: 'Stream Connect ingests real-time events from Kafka or cloud messaging. Integration Hub triggers responses.', servicenowEnables: 'Event Management correlates streaming events with CMDB CIs. Predictive Intelligence auto-prioritizes.', businessValue: ['Sub-second event detection', 'Automated incident creation from alerts', '80% reduction in MTTD', 'Scalable to millions of events/day'], industryTags: [ind, 'Operations', 'IoT'], score: 0 },
        { title: ind + ' Data Warehouse Intelligence', connectors: ['Zero Copy Connect'], pain: 'Analytics data is siloed in external warehouses, disconnected from workflows.', connectorReasoning: 'Zero Copy Connect federates queries directly to data warehouses without moving data.', servicenowEnables: 'Performance Analytics dashboards pull live warehouse data. Reporting without ETL.', businessValue: ['Zero data movement', 'Real-time analytics in dashboards', 'Eliminate costly ETL pipelines', 'Unified operational and analytical data'], industryTags: [ind, 'Analytics', 'Business Intelligence'], score: 0 },
        { title: 'Cross-Platform Workflow Orchestration', connectors: ['Integration Hub', 'Zero Copy Connect'], pain: 'Teams work in different tools with no unified visibility or automated handoffs.', connectorReasoning: 'Integration Hub orchestrates multi-system workflows. Zero Copy provides unified read views.', servicenowEnables: 'Flow Designer coordinates handoffs. Agent Workspace shows consolidated views.', businessValue: ['Single source of truth for cross-team work', 'Automated handoffs eliminate manual copying', '40% faster resolution', 'Full audit trail across boundaries'], industryTags: [ind, 'IT Operations', 'DevOps'], score: 0 },
        { title: 'Unified Enterprise Knowledge Search', connectors: ['External Content Connectors', 'Integration Hub'], pain: 'Knowledge scattered across SharePoint, Confluence, wikis with no unified search.', connectorReasoning: 'External Content Connectors index documents from multiple sources for AI Search.', servicenowEnables: 'AI Search provides unified results. Virtual Agent surfaces articles conversationally.', businessValue: ['One search across all sources', '50% reduction in time-to-answer', 'AI-powered relevance ranking', 'Automatic content freshness'], industryTags: [ind, 'Knowledge Management', 'Self-Service'], score: 0 },
        { title: 'AI Agent Tool Integration', connectors: ['MCP Client', 'Integration Hub'], pain: 'AI agents cannot access enterprise tools, limiting autonomous resolution.', connectorReasoning: 'MCP Client exposes enterprise tools to AI agents via Model Context Protocol.', servicenowEnables: 'Now Assist leverages MCP tools for task completion. Flow Designer handles approvals.', businessValue: ['AI agents query and act on systems', 'Controlled access with governance', '70% ticket deflection', 'Extensible to any MCP tool'], industryTags: [ind, 'AI', 'Automation'], score: 0 },
        { title: ind + ' Identity Automation', connectors: ['Integration Hub', 'Zero Copy Connect'], pain: 'User provisioning and access reviews are manual and error-prone.', connectorReasoning: 'Integration Hub orchestrates identity lifecycle. Zero Copy federates directory data.', servicenowEnables: 'Identity Governance automates certifications. SecOps correlates identity events.', businessValue: ['Provisioning in minutes vs days', 'Continuous compliance monitoring', '70% fewer identity incidents', 'Full audit trail'], industryTags: [ind, 'Security', 'Governance'], score: 0 },
        { title: ind + ' IT Cost Optimization', connectors: ['Zero Copy Connect', 'Integration Hub'], pain: 'IT spending lacks visibility - unused licenses and redundant tools undetected.', connectorReasoning: 'Zero Copy federates financial/asset data. Integration Hub orchestrates optimization.', servicenowEnables: 'SAM detects unused licenses. ITFM provides cost allocation dashboards.', businessValue: ['Identify 20-30% license waste', 'Real-time spend dashboards', 'Automated license reclamation', 'Data-driven procurement'], industryTags: [ind, 'FinOps', 'IT Asset Management'], score: 0 },
        { title: 'Intelligent Service Desk Automation', connectors: ['MCP Client', 'External Content Connectors'], pain: 'Service desk agents context-switch between systems, slowing resolution.', connectorReasoning: 'MCP Client enables AI tool-use. External Content Connectors unify knowledge.', servicenowEnables: 'Now Assist provides AI resolution suggestions. Agent Workspace consolidates context.', businessValue: ['50% faster MTTR', 'AI-powered categorization', 'Unified agent workspace', '30% increase in first-contact resolution'], industryTags: [ind, 'Service Management', 'AI'], score: 0 },
        { title: ind + ' Compliance & Risk Automation', connectors: ['Zero Copy Connect', 'Stream Connect'], pain: 'Regulatory reporting requires manual data gathering from multiple systems.', connectorReasoning: 'Zero Copy federates compliance databases. Stream Connect captures audit events.', servicenowEnables: 'GRC module automates compliance. Performance Analytics provides risk dashboards.', businessValue: ['Real-time risk visibility', 'Automated report generation', '90% less audit prep time', 'Continuous monitoring'], industryTags: [ind, 'Risk Management', 'Compliance'], score: 0 },
        { title: ind + ' Supply Chain Visibility', connectors: ['Stream Connect', 'Zero Copy Connect'], pain: 'Supply chain disruptions detected too late due to siloed monitoring.', connectorReasoning: 'Stream Connect captures IoT/sensor events. Zero Copy federates inventory databases.', servicenowEnables: 'Event Management correlates supply chain alerts. ITOM provides predictive analysis.', businessValue: ['Real-time supply chain visibility', 'Predictive disruption alerts', 'Automated escalation', '40% reduced downtime'], industryTags: [ind, 'Supply Chain', 'Manufacturing'], score: 0 },
        { title: 'Multi-Instance ServiceNow Consolidation', connectors: ['Live Connect', 'Integration Hub'], pain: 'Multiple ServiceNow instances create data silos between departments.', connectorReasoning: 'Live Connect shares data across ServiceNow instances. Integration Hub syncs workflows.', servicenowEnables: 'Cross-instance CMDB federation. Unified reporting across all instances.', businessValue: ['Single view across all instances', 'Consistent processes enterprise-wide', 'Reduced instance sprawl', 'Faster M&A integration'], industryTags: [ind, 'Enterprise', 'Platform'], score: 0 }
    ];

    // Score templates based on relevance
    for (var i = 0; i < pool.length; i++) {
        var t = pool[i];
        var titleLower = t.title.toLowerCase();
        if (p && (titleLower.indexOf(p.substring(0, 10)) > -1 || t.pain.toLowerCase().indexOf(p.substring(0, 15)) > -1)) t.score += 5;
        if (p.indexOf('erp') > -1 && i === 0) t.score += 10;
        if (p.indexOf('event') > -1 && i === 1) t.score += 10;
        if (p.indexOf('stream') > -1 && i === 1) t.score += 10;
        if (p.indexOf('warehouse') > -1 && i === 2) t.score += 10;
        if (p.indexOf('search') > -1 && i === 4) t.score += 10;
        if (p.indexOf('ai') > -1 && i === 5) t.score += 10;
        if (p.indexOf('cost') > -1 && i === 7) t.score += 10;
        if (p.indexOf('compliance') > -1 && i === 9) t.score += 10;
        for (var j = 0; j < sysList.length; j++) {
            var s = sysList[j].trim().toLowerCase();
            if (s && (t.connectorReasoning.toLowerCase().indexOf(s) > -1 || t.pain.toLowerCase().indexOf(s) > -1)) t.score += 3;
        }
        // ERP systems boost template 0
        if (i === 0 && (_containsAny(sysJoined, ['sap', 'oracle', 'workday']))) t.score += 8;
        // Streaming systems boost template 1
        if (i === 1 && (_containsAny(sysJoined, ['kafka', 'aws', 'azure']))) t.score += 8;
        // Database systems boost template 2
        if (i === 2 && (_containsAny(sysJoined, ['snowflake', 'sql', 'postgres']))) t.score += 8;
        // Knowledge systems boost template 4
        if (i === 4 && (_containsAny(sysJoined, ['sharepoint', 'confluence']))) t.score += 8;
    }

    // Sort by score descending and take top 6
    pool.sort(function(a, b) { return b.score - a.score; });
    var results = [];
    for (var k = 0; k < Math.min(6, pool.length); k++) {
        var r = pool[k];
        results.push({ title: r.title, connectors: r.connectors, pain: r.pain, connectorReasoning: r.connectorReasoning, servicenowEnables: r.servicenowEnables, businessValue: r.businessValue, industryTags: r.industryTags });
    }
    return results;
}

function _containsAny(str, terms) {
    for (var i = 0; i < terms.length; i++) {
        if (str.indexOf(terms[i]) > -1) return true;
    }
    return false;
}
