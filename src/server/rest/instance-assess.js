// @ts-nocheck
/* eslint-disable */
(function process(request, response) {
    try {
    // === PLUGIN-TO-ARCHITECTURE MAPPING ===
    var PLUGIN_MAP = {
        'com.snc.incident': { node: 'incident', label: 'Incident Management', group: 'Applications', subgroup: 'ITSM' },
        'com.snc.problem': { node: 'problem', label: 'Problem Management', group: 'Applications', subgroup: 'ITSM' },
        'com.snc.change_management': { node: 'change', label: 'Change Management', group: 'Applications', subgroup: 'ITSM' },
        'com.glideapp.servicecatalog': { node: 'service_catalog', label: 'Service Catalog', group: 'Applications', subgroup: 'ITSM' },
        'com.snc.asset_management': { node: 'asset', label: 'Asset Management', group: 'Applications', subgroup: 'ITSM' },
        'com.snc.sla': { node: 'sla', label: 'SLA Management', group: 'Applications', subgroup: 'ITSM' },
        'com.sn_customerservice': { node: 'csm', label: 'CSM', group: 'Applications', subgroup: 'CSM' },
        'com.sn_case': { node: 'case_mgmt', label: 'Case Management', group: 'Applications', subgroup: 'CSM' },
        'com.sn_hr_core': { node: 'hrsd', label: 'HR Service Delivery', group: 'Applications', subgroup: 'HRSD' },
        'com.sn_hr_case_management': { node: 'hr_case', label: 'HR Case Management', group: 'Applications', subgroup: 'HRSD' },
        'com.snc.discovery': { node: 'discovery', label: 'Discovery', group: 'Applications', subgroup: 'ITOM' },
        'com.snc.service-mapping': { node: 'service_mapping', label: 'Service Mapping', group: 'Applications', subgroup: 'ITOM' },
        'com.glideapp.itom.snac': { node: 'event_mgmt', label: 'Event Management', group: 'Applications', subgroup: 'ITOM' },
        'com.snc.security_incident': { node: 'sec_incident', label: 'Security Incident Response', group: 'Applications', subgroup: 'SecOps' },
        'com.snc.vulnerability': { node: 'vuln_response', label: 'Vulnerability Response', group: 'Applications', subgroup: 'SecOps' },
        'com.sn_grc': { node: 'grc', label: 'GRC', group: 'Applications', subgroup: 'GRC' },
        'com.sn_compliance': { node: 'policy_compliance', label: 'Policy and Compliance', group: 'Applications', subgroup: 'GRC' },
        'com.sn_risk': { node: 'risk_mgmt', label: 'Risk Management', group: 'Applications', subgroup: 'GRC' },
        'com.snc.project_management': { node: 'ppm', label: 'Project Portfolio Management', group: 'Applications', subgroup: 'SPM' },
        'com.snc.financial_planning_pacing': { node: 'spm', label: 'Strategic Portfolio Management', group: 'Applications', subgroup: 'SPM' },
        'com.glide.hub.integration': { node: 'integration_hub', label: 'Integration Hub', group: 'Orchestration' },
        'com.glide.hub.flow_designer': { node: 'flow_designer', label: 'Flow Designer', group: 'Orchestration' },
        'com.glide.cs.virtual_agent': { node: 'virtual_agent', label: 'Virtual Agent', group: 'Orchestration' },
        'com.snc.cmdb': { node: 'cmdb', label: 'CMDB', group: 'Data Layer' },
        'com.glide.knowledge_management': { node: 'knowledge_base', label: 'Knowledge Base', group: 'Data Layer' },
        'com.snc.performance_analytics': { node: 'perf_analytics', label: 'Performance Analytics', group: 'Data Layer' },
        'com.glide.service-portal': { node: 'service_portal', label: 'Service Portal', group: 'User Interface' },
        'com.sn_uni.workspace': { node: 'workspace', label: 'Agent Workspace', group: 'User Interface' },
        'com.snc.employee_center': { node: 'employee_center', label: 'Employee Center', group: 'User Interface' },
        'com.snc.predictive_intelligence': { node: 'predictive_intel', label: 'Predictive Intelligence', group: 'AI/ML' },
    };

    var EDGES = [
        { from: 'incident', to: 'cmdb' },
        { from: 'incident', to: 'knowledge_base' },
        { from: 'problem', to: 'cmdb' },
        { from: 'problem', to: 'knowledge_base' },
        { from: 'change', to: 'cmdb' },
        { from: 'discovery', to: 'cmdb' },
        { from: 'service_mapping', to: 'cmdb' },
        { from: 'event_mgmt', to: 'cmdb' },
        { from: 'sec_incident', to: 'cmdb' },
        { from: 'asset', to: 'cmdb' },
        { from: 'case_mgmt', to: 'knowledge_base' },
        { from: 'case_mgmt', to: 'cmdb' },
        { from: 'hr_case', to: 'knowledge_base' },
        { from: 'virtual_agent', to: 'knowledge_base' },
        { from: 'flow_designer', to: 'integration_hub' },
        { from: 'service_portal', to: 'service_catalog' },
        { from: 'service_portal', to: 'knowledge_base' },
        { from: 'vuln_response', to: 'cmdb' },
        { from: 'grc', to: 'policy_compliance' },
        { from: 'grc', to: 'risk_mgmt' },
        { from: 'workspace', to: 'incident' },
        { from: 'employee_center', to: 'knowledge_base' },
        { from: 'predictive_intel', to: 'incident' },
        { from: 'perf_analytics', to: 'cmdb' },
    ];

    var IT4IT_RULES = {
        S2P: ['ppm', 'spm'],
        R2D: ['change', 'flow_designer'],
        R2F: ['service_catalog', 'incident', 'service_portal', 'knowledge_base'],
        D2C: ['discovery', 'event_mgmt', 'cmdb', 'service_mapping']
    };

    // === QUERY INSTANCE DATA ===
    var pluginsScanned = 0;
    var activeNodes = {};
    var activeNodeList = [];
    var tablesScanned = 0;
    var restMessages = 0;
    var flowCount = 0;
    var legacyWorkflows = 0;
    var cmdbCiCount = 0;
    var cmdbNoClass = 0;

    // 1. Active plugins
    var pluginGR = new GlideRecord('sys_plugins');
    pluginGR.addQuery('active', 'active');
    pluginGR.query();
    pluginsScanned = pluginGR.getRowCount();
    while (pluginGR.next()) {
        var pluginId = pluginGR.getValue('source') || '';
        if (PLUGIN_MAP[pluginId]) {
            var mapping = PLUGIN_MAP[pluginId];
            activeNodes[mapping.node] = mapping;
            activeNodeList.push(mapping.node);
        }
    }

    // 2. Extended tables
    var tableGR = new GlideRecord('sys_db_object');
    tableGR.addNotNullQuery('super_class');
    tableGR.query();
    tablesScanned = tableGR.getRowCount();

    // 3. REST messages
    var restGR = new GlideRecord('sys_rest_message');
    restGR.query();
    restMessages = restGR.getRowCount();

    // 4. Flow Designer flows
    var flowGR = new GlideRecord('sys_hub_flow');
    flowGR.addQuery('active', true);
    flowGR.query();
    flowCount = flowGR.getRowCount();

    // 5. Legacy workflows
    var wfGR = new GlideRecord('wf_workflow');
    wfGR.query();
    legacyWorkflows = wfGR.getRowCount();

    // 6. CMDB CIs
    var cmdbGR = new GlideRecord('cmdb_ci');
    cmdbGR.query();
    cmdbCiCount = cmdbGR.getRowCount();

    // 7. Unclassified CIs
    var cmdbNoClassGR = new GlideRecord('cmdb_ci');
    cmdbNoClassGR.addQuery('sys_class_name', 'cmdb_ci');
    cmdbNoClassGR.query();
    cmdbNoClass = cmdbNoClassGR.getRowCount();

    var activeNodeCount = activeNodeList.length;

    // === EVALUATE ASSESSMENT RULES (after stats are computed) ===
    var findings = [];
    var recommendedNodes = {};

    // Rule definitions use computed stats
    var rules = [
        { id: 'INT-001', cond: activeNodes.incident && !activeNodes.integration_hub, severity: 'high', category: 'integration_pattern', rule_name: 'Missing Integration Hub', message: 'ITSM modules active but Integration Hub not enabled. Integrations lack orchestration.', recommendation: 'Enable Integration Hub for centralized integration management and retry policies.', rec: ['integration_hub'] },
        { id: 'INT-002', cond: activeNodes.cmdb && !activeNodes.discovery, severity: 'high', category: 'integration_pattern', rule_name: 'CMDB Without Discovery', message: 'CMDB is active but Discovery is not enabled. CI data may be manually maintained.', recommendation: 'Enable Discovery to automatically populate and maintain CMDB data.', rec: ['discovery'] },
        { id: 'INT-003', cond: restMessages > 5 && !activeNodes.integration_hub, severity: 'high', category: 'integration_pattern', rule_name: 'Missing Error Handling', message: restMessages + ' REST integrations without Integration Hub for retry policies.', recommendation: 'Configure Integration Hub with retry policies for outbound REST messages.', rec: ['integration_hub'] },
        { id: 'HLT-001', cond: legacyWorkflows > flowCount, severity: 'medium', category: 'health', rule_name: 'Legacy Workflow Migration', message: legacyWorkflows + ' legacy workflows vs ' + flowCount + ' Flow Designer flows.', recommendation: 'Migrate legacy workflows to Flow Designer for improved maintainability.', rec: ['flow_designer'] },
        { id: 'HLT-002', cond: activeNodes.cmdb && cmdbCiCount > 0 && cmdbNoClass > (cmdbCiCount * 0.3), severity: 'medium', category: 'health', rule_name: 'CMDB Data Quality', message: Math.round((cmdbNoClass / Math.max(cmdbCiCount, 1)) * 100) + '% of CIs lack proper classification.', recommendation: 'Run CMDB Health audit and assign proper CI classes.', rec: [] },
        { id: 'SEC-001', cond: activeNodes.incident && !activeNodes.sec_incident, severity: 'medium', category: 'security', rule_name: 'No Security Incident Response', message: 'Incident Management active but Security Incident Response not enabled.', recommendation: 'Enable Security Incident Response for dedicated security event management.', rec: ['sec_incident'] },
        { id: 'SEC-002', cond: activeNodes.cmdb && !activeNodes.vuln_response, severity: 'medium', category: 'security', rule_name: 'No Vulnerability Response', message: 'CMDB active but Vulnerability Response not enabled for CI correlation.', recommendation: 'Enable Vulnerability Response to correlate scanner findings with CIs.', rec: ['vuln_response'] },
        { id: 'EFF-001', cond: activeNodes.incident && !activeNodes.predictive_intel, severity: 'low', category: 'efficiency', rule_name: 'No Predictive Intelligence', message: 'Incident Management active without Predictive Intelligence for auto-categorization.', recommendation: 'Enable Predictive Intelligence for automated ticket categorization and routing.', rec: ['predictive_intel'] },
        { id: 'EFF-002', cond: activeNodes.knowledge_base && !activeNodes.virtual_agent, severity: 'low', category: 'efficiency', rule_name: 'No Virtual Agent', message: 'Knowledge Base active but Virtual Agent not enabled for self-service deflection.', recommendation: 'Enable Virtual Agent to provide conversational AI leveraging your Knowledge Base.', rec: ['virtual_agent'] },
        { id: 'EFF-003', cond: (activeNodes.incident || activeNodes.csm) && !activeNodes.workspace, severity: 'low', category: 'efficiency', rule_name: 'No Agent Workspace', message: 'Case handling modules active but Agent Workspace not enabled.', recommendation: 'Enable Agent Workspace for a unified agent productivity interface.', rec: ['workspace'] },
        { id: 'ADO-001', cond: !activeNodes.perf_analytics && tablesScanned > 50, severity: 'low', category: 'adoption', rule_name: 'No Performance Analytics', message: 'Large instance (' + tablesScanned + ' tables) without Performance Analytics.', recommendation: 'Enable Performance Analytics for trend analysis and KPIs.', rec: ['perf_analytics'] },
        { id: 'ADO-002', cond: activeNodes.hrsd && !activeNodes.employee_center, severity: 'low', category: 'adoption', rule_name: 'No Employee Center', message: 'HR Service Delivery active but Employee Center not enabled.', recommendation: 'Enable Employee Center for unified employee self-service.', rec: ['employee_center'] },
    ];

    for (var i = 0; i < rules.length; i++) {
        var rule = rules[i];
        if (rule.cond) {
            findings.push({
                severity: rule.severity,
                rule_name: rule.rule_name,
                rule_code: rule.id,
                category: rule.category,
                message: rule.message,
                recommendation: rule.recommendation
            });
            for (var r = 0; r < rule.rec.length; r++) {
                if (!activeNodes[rule.rec[r]]) {
                    recommendedNodes[rule.rec[r]] = true;
                }
            }
        }
    }

    // Sort by severity
    var sevOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    findings.sort(function(a, b) { return (sevOrder[a.severity] || 4) - (sevOrder[b.severity] || 4); });

    // === IT4IT COVERAGE ===
    var it4itCoverage = {};
    for (var stream in IT4IT_RULES) {
        var nodes = IT4IT_RULES[stream];
        var covered = false;
        for (var s = 0; s < nodes.length; s++) {
            if (activeNodes[nodes[s]]) { covered = true; break; }
        }
        it4itCoverage[stream] = covered;
    }

    // === MERMAID DIAGRAMS ===
    function buildDiagram(nodeSet, highlightRec) {
        var lines = ['graph TD'];
        var groups = {};
        for (var nid in nodeSet) {
            var info = null;
            for (var pid in PLUGIN_MAP) {
                if (PLUGIN_MAP[pid].node === nid) { info = PLUGIN_MAP[pid]; break; }
            }
            if (!info) continue;
            var g = info.group;
            if (!groups[g]) groups[g] = [];
            groups[g].push(info);
        }
        for (var gn in groups) {
            lines.push('  subgraph ' + gn);
            for (var gi = 0; gi < groups[gn].length; gi++) {
                var nd = groups[gn][gi];
                lines.push('    ' + nd.node + '["' + nd.label + '"]');
            }
            lines.push('  end');
        }
        for (var ei = 0; ei < EDGES.length; ei++) {
            var edge = EDGES[ei];
            if (nodeSet[edge.from] && nodeSet[edge.to]) {
                lines.push('  ' + edge.from + ' --> ' + edge.to);
            }
        }
        if (highlightRec) {
            lines.push('  classDef recommended fill:#fef3c7,stroke:#f59e0b,stroke-width:2px');
            var recIds = [];
            for (var rn in recommendedNodes) { if (nodeSet[rn]) recIds.push(rn); }
            if (recIds.length > 0) { lines.push('  class ' + recIds.join(',') + ' recommended'); }
        }
        return lines.join('\n');
    }

    var currentSet = {};
    for (var cn in activeNodes) { currentSet[cn] = true; }
    var currentDiagram = buildDiagram(currentSet, false);

    var recSet = {};
    for (var an in activeNodes) { recSet[an] = true; }
    for (var rn2 in recommendedNodes) { recSet[rn2] = true; }
    var recommendedDiagram = buildDiagram(recSet, true);

    // === RESPONSE ===
    var result = {
        status: 'completed',
        scan_stats: {
            plugins_scanned: pluginsScanned,
            tables_scanned: tablesScanned,
            active_nodes: activeNodeCount,
            total_findings: findings.length,
            recommendations: Object.keys(recommendedNodes).length
        },
        it4it_coverage: it4itCoverage,
        findings: findings,
        architecture: {
            current: currentDiagram,
            recommended: recommendedDiagram
        }
    };

    response.setStatus(200);
    response.setBody(result);

    } catch (ex) {
        gs.error('Instance Assessment error: ' + ex.message);
        response.setStatus(200);
        response.setBody({ status: 'error', error: ex.message });
    }
})(request, response);
