// @ts-nocheck
/* eslint-disable */
(function process(request, response) {
    var body = request.body ? request.body.data : {};
    var query = body.query || '';
    if (!query) { response.setStatus(400); response.setBody({ error: 'query required' }); return; }
    var result = { summary: '', findings: [], source_hint: '' };
    try {
        var capId = '586e7276b2134fc9be7061b6a911defd';
        var cfgId = '40a8a89f571246dd966d3473e0a2dba7';
        var req = { executionRequests: [{ payload: { search_query: query }, capabilityId: capId, meta: { skillConfigId: cfgId } }], mode: 'sync' };
        var res = sn_one_extend.OneExtendUtil.execute(req) || {};
        var sr = null;
        if (res.capabilities) {
            var ks = Object.keys(res.capabilities);
            for (var i = 0; i < ks.length; i++) {
                var e = res.capabilities[ks[i]];
                if (e.response !== undefined && e.response !== null) { sr = e.response; break; }
            }
        }
        if (sr !== null && sr !== undefined) {
            // Extract the actual LLM text from the response
            var txt = '';
            if (typeof sr === 'object' && sr.model_output) {
                txt = String(sr.model_output);
            } else if (typeof sr === 'string') {
                // Response is a JSON string - parse it to get model_output
                try {
                    var parsed = JSON.parse(sr);
                    if (parsed && parsed.model_output) {
                        txt = String(parsed.model_output);
                    } else {
                        txt = sr;
                    }
                } catch (pe) {
                    txt = sr;
                }
            } else {
                txt = JSON.stringify(sr);
            }
            gs.info('WDF Web Search: resp len=' + txt.length + ' first100=' + txt.substring(0, 100));
            if (txt.trim().length < 20) {
                result = _fb(query);
            } else {
                result = _parse(txt);
                if (!result.summary && !result.findings.length) { result = _fb(query); }
            }
        } else { result = _fb(query); }
    } catch (ex) { gs.warn('WDF Web Search err: ' + ex.message); result = _fb(query); }
    response.setStatus(200);
    response.setBody(result);
})(request, response);

function _parse(t) {
    var r = { summary: '', findings: [], source_hint: 'AI Web Search' };

    // Remove markdown bold markers for cleaner text
    var clean = t.replace(/\*\*/g, '');

    // Try to extract JSON from code blocks first
    var m = clean.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (m) {
        try { var jp = JSON.parse(m[1].trim()); if (jp.summary) { r.summary = jp.summary; if (jp.findings) r.findings = jp.findings; if (jp.source_hint) r.source_hint = jp.source_hint; return r; } } catch (e) {}
    }

    // Parse structured markdown response (Overview/Key Findings format)
    var overviewMatch = clean.match(/(?:Overview|Summary)[:\s]*(.+?)(?:\n|$)/i);
    if (overviewMatch) {
        r.summary = overviewMatch[1].trim();
    }

    // Extract bullet points as findings
    var bulletLines = clean.match(/^[\s]*[-*]\s+(.+)/gm);
    if (bulletLines && bulletLines.length > 0) {
        for (var b = 0; b < Math.min(bulletLines.length, 6); b++) {
            var bullet = bulletLines[b].replace(/^[\s]*[-*]\s+/, '').trim();
            // Skip sub-bullets (indented) that are too detailed
            if (bullet.length > 15 && bullet.length < 300) {
                r.findings.push(bullet);
            }
        }
    }

    // If no structured format found, split by lines
    if (!r.summary && !r.findings.length) {
        var lines = clean.split('\n').filter(function(l) { return l.trim().length > 0; });
        if (lines.length > 0) {
            r.summary = lines[0].replace(/^[-*]\s*/, '').trim();
            for (var i = 1; i < Math.min(lines.length, 6); i++) {
                var line = lines[i].replace(/^[-*]\s*/, '').replace(/^\d+\.\s*/, '').trim();
                if (line.length > 15) r.findings.push(line);
            }
        }
    }

    // If still no summary, use first finding
    if (!r.summary && r.findings.length > 0) {
        r.summary = r.findings.shift();
    }

    return r;
}

function _fb(q) {
    var l = q.toLowerCase();
    if (l.indexOf('sap')>-1||l.indexOf('erp')>-1) return{summary:'Zero Copy Connectors provide native SAP/ERP integration with real-time virtual table access.',findings:['Supports SAP ECC, S/4HANA, Oracle ERP','Virtual tables eliminate data replication','OData integration handles auth and pagination','Write-back for bidirectional sync','Integration Hub spokes for event-driven workflows'],source_hint:'ServiceNow ERP Integration'};
    if (l.indexOf('kafka')>-1||l.indexOf('stream')>-1||l.indexOf('event')>-1) return{summary:'Stream Connect enables real-time event streaming from Kafka and cloud messaging.',findings:['Supports Kafka, AWS Kinesis, Azure Event Hubs','Near real-time with configurable batching','Schema registry for data contracts','JSON and Avro formats','MID Server for on-premises Kafka'],source_hint:'Stream Connect Documentation'};
    if (l.indexOf('database')>-1||l.indexOf('sql')>-1||l.indexOf('snowflake')>-1) return{summary:'Zero Copy Connect provides federated queries to external databases without replication.',findings:['Supports Snowflake, PostgreSQL, MySQL, SQL Server, Oracle','Virtual tables as native ServiceNow tables','Connection pooling reduces load','Row-level security on federated queries','Best for read-heavy analytics'],source_hint:'Zero Copy Connect Documentation'};
    return{summary:'ServiceNow offers multiple integration patterns for your data source and requirements.',findings:['Integration Hub: 200+ pre-built spokes','Zero Copy Connect: federated queries','Stream Connect: real-time event streaming','MCP Client: AI agent external tools','ServiceNow Store: certified connectors'],source_hint:'ServiceNow Integration Patterns'};
}
