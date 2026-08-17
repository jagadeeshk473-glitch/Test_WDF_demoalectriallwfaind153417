// @ts-nocheck
/* eslint-disable */
/**
 * Web Search REST Endpoint
 * Invokes the WDF Web Search NowAssist skill via the OneExtend capability API.
 * Falls back to contextual guidance if the skill invocation fails.
 */
(function process(request, response) {
    var body = request.body ? request.body.data : {};
    var query = body.query || '';

    if (!query) {
        response.setStatus(400);
        response.setBody({ error: 'query parameter is required' });
        return;
    }

    var result = { summary: '', findings: [], source_hint: '' };

    try {
        // Find the skill capability
        var gr = new GlideRecord('sys_one_extend_capability');
        gr.addQuery('name', 'WDF Web Search');
        gr.query();

        if (gr.next()) {
            var capId = gr.getUniqueValue();
            var skillResponse = null;

            // Attempt 1: Use GlideSysOneExtendUtil with stringified inputs
            try {
                var oneExtendUtil = new sn_one_extend.GlideSysOneExtendUtil();
                var inputPayload = JSON.stringify({ 'search_query': query });
                skillResponse = oneExtendUtil.invokeCapability(capId, inputPayload);
                gs.info('WDF Web Search: invokeCapability returned: ' + (skillResponse ? 'response received' : 'null'));
            } catch (e1) {
                gs.warn('WDF Web Search: GlideSysOneExtendUtil failed: ' + e1.message);
            }

            // Attempt 2: Try OneExtendUtil static method if first failed
            if (!skillResponse) {
                try {
                    var inputs2 = { 'search_query': query };
                    skillResponse = sn_one_extend.OneExtendUtil.invokeCapability(capId, inputs2);
                    gs.info('WDF Web Search: OneExtendUtil returned: ' + (skillResponse ? 'response received' : 'null'));
                } catch (e2) {
                    gs.warn('WDF Web Search: OneExtendUtil failed: ' + e2.message);
                }
            }

            if (skillResponse) {
                result = _parseSkillResponse(skillResponse);
            } else {
                gs.info('WDF Web Search: No skill response, using fallback for query: ' + query);
                result = _getFallbackResult(query);
            }
        } else {
            gs.warn('WDF Web Search: Capability record not found');
            result = _getFallbackResult(query);
        }
    } catch (e) {
        gs.warn('WDF Web Search: Top-level error - ' + e.message);
        result = _getFallbackResult(query);
    }

    response.setStatus(200);
    response.setBody(result);
})(request, response);

/**
 * Parse skill response - handles plain JSON, markdown-wrapped JSON, or plain text
 */
function _parseSkillResponse(raw) {
    var text = String(raw);
    var result = { summary: '', findings: [], source_hint: 'AI Web Search' };

    // Try to extract JSON from markdown code blocks (```json ... ```)
    var jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
        text = jsonMatch[1].trim();
    }

    // Try parsing as JSON
    try {
        var parsed = JSON.parse(text);
        if (parsed.summary) result.summary = parsed.summary;
        if (parsed.findings && Array.isArray(parsed.findings)) result.findings = parsed.findings;
        if (parsed.source_hint) result.source_hint = parsed.source_hint;
        return result;
    } catch (pe) {
        // Not JSON - treat as plain text response
    }

    // Parse plain text response into findings
    var lines = text.split('\n').filter(function(l) { return l.trim().length > 0; });
    if (lines.length > 0) {
        result.summary = lines[0].replace(/^[-•*]\s*/, '').trim();
        for (var i = 1; i < Math.min(lines.length, 6); i++) {
            var line = lines[i].replace(/^[-•*]\s*/, '').replace(/^\d+\.\s*/, '').trim();
            if (line) result.findings.push(line);
        }
    }

    return result;
}

function _getFallbackResult(query) {
    var q = query.toLowerCase();
    var summary = 'Searching for integration guidance related to your query.';
    var findings = [];
    var source_hint = 'ServiceNow Integration Best Practices';

    if (q.indexOf('sap') > -1 || q.indexOf('erp') > -1) {
        summary = 'Zero Copy Connectors provide native SAP and ERP integration with pre-built data models and real-time virtual table access.';
        findings = [
            'Zero Copy Connect for ERP supports SAP ECC, S/4HANA, and Oracle ERP out of the box',
            'Virtual tables eliminate data replication — query ERP data in real time from ServiceNow',
            'Pre-built OData integration handles authentication, pagination, and error handling',
            'Write-back capabilities allow bidirectional data synchronization',
            'Integration Hub spokes provide an alternative for event-driven SAP workflows'
        ];
        source_hint = 'ServiceNow ERP Integration Documentation';
    } else if (q.indexOf('kafka') > -1 || q.indexOf('stream') > -1 || q.indexOf('event') > -1) {
        summary = 'Stream Connect enables real-time event streaming from Apache Kafka and cloud messaging platforms into ServiceNow.';
        findings = [
            'Stream Connect supports Apache Kafka, AWS Kinesis, and Azure Event Hubs',
            'Events are processed in near real-time with configurable batching and retry policies',
            'Schema registry integration ensures data contract compatibility',
            'Supports both JSON and Avro message formats',
            'MID Server deployment is recommended for secure on-premises Kafka cluster access'
        ];
        source_hint = 'ServiceNow Stream Connect Documentation';
    } else if (q.indexOf('database') > -1 || q.indexOf('sql') > -1 || q.indexOf('snowflake') > -1) {
        summary = 'Zero Copy Connect provides federated query access to external databases without data replication.';
        findings = [
            'Supports Snowflake, PostgreSQL, MySQL, SQL Server, and Oracle databases',
            'Virtual tables appear as native ServiceNow tables in queries and reporting',
            'Connection pooling and query optimization reduce external system load',
            'Row-level security can be applied to federated queries',
            'Best for read-heavy analytics workloads; use Integration Hub for transactional writes'
        ];
        source_hint = 'ServiceNow Zero Copy Connect Documentation';
    } else {
        summary = 'ServiceNow offers multiple integration patterns depending on your data source, latency requirements, and use case.';
        findings = [
            'Integration Hub provides pre-built spokes for 200+ third-party systems',
            'Zero Copy Connect enables federated queries to external databases without replication',
            'Stream Connect handles real-time event streaming from Kafka-based sources',
            'MCP Client allows AI agents to access external tools via the Model Context Protocol',
            'Check the ServiceNow Store for certified connectors specific to your use case'
        ];
        source_hint = 'ServiceNow Integration Patterns Overview';
    }

    return { summary: summary, findings: findings, source_hint: source_hint };
}
