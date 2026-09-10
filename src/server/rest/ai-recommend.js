// @ts-nocheck
/* eslint-disable */
/**
 * AI-Assisted Connector Recommendation Handler
 * 
 * Called by the Scripted REST API. Attempts LLM-based recommendation first,
 * falls back to rule-based decision table if AI fails.
 * No API keys or endpoints are exposed to the client.
 */
(function process(request, response) {
    var body = request.body ? request.body.data : {};
    var query = body.query || '';
    
    if (!query) {
        response.setStatus(400);
        response.setBody({ error: 'query parameter is required' });
        return;
    }

    // 1. Fetch all connectors
    var connectors = _fetchConnectors();
    
    // 2. Try AI recommendation
    var result = _tryAIRecommendation(query, connectors);
    
    // 3. If AI failed, fall back to rule-based
    if (!result) {
        result = _ruleBasedFallback(query, connectors);
        result.path = 'rule-based-fallback';
        gs.info('WDF Advisor: AI recommendation failed, used rule-based fallback for query: ' + query);
    } else {
        result.path = 'ai-assisted';
        gs.info('WDF Advisor: AI recommendation succeeded for query: ' + query);
    }
    
    response.setStatus(200);
    response.setBody(result);
})(request, response);

function _fetchConnectors() {
    var connectors = [];
    var gr = new GlideRecord('x_snc_wdf_advisory_connector');
    gr.orderBy('name');
    gr.query();
    while (gr.next()) {
        connectors.push({
            id: gr.getUniqueValue(),
            name: gr.getValue('name'),
            tagline: gr.getValue('tagline') || '',
            best_for: gr.getValue('best_for') || '',
            not_for: gr.getValue('not_for') || ''
        });
    }
    return connectors;
}

function _tryAIRecommendation(query, connectors) {
    try {
        // Build compact connector list for context
        var connectorContext = connectors.map(function(c) {
            return c.name + ' (id:' + c.id + '): ' + c.tagline + ' | Best for: ' + c.best_for + ' | Not for: ' + c.not_for;
        }).join('\n');

        var systemPrompt = 'You are an expert ServiceNow integration architect. Given a user query about data integration needs, recommend the best connector from the available options. You MUST respond with ONLY valid JSON matching this exact schema:\n{\n  "primary_id": "sys_id of best connector",\n  "fallback_id": "sys_id of second-best connector",\n  "also_needed_id": "sys_id or null if not applicable",\n  "also_needed_reason": "reason string or null",\n  "confidence": "High" or "Medium" or "Low",\n  "reasoning": "2-3 sentences explaining the choice",\n  "alternatives_rejected": "one precise sentence on why alternatives were not chosen",\n  "next_steps": ["step1", "step2", "step3"]\n}\nDo NOT include any text outside the JSON object.';

        var userPrompt = 'User query: "' + query + '"\n\nAvailable connectors:\n' + connectorContext + '\n\nRespond with ONLY the JSON recommendation.';

        // Use ServiceNow's built-in Gen AI API (sn_gen_ai)
        var aiApi = new sn_gen_ai.GlideGenAIAPI();
        var aiResponse = aiApi.generateText(systemPrompt, userPrompt);
        
        if (!aiResponse) {
            gs.warn('WDF Advisor: AI returned empty response');
            return null;
        }

        // Parse and validate the JSON response
        var parsed = JSON.parse(aiResponse);
        
        // Validate required fields
        if (!parsed.primary_id || !parsed.fallback_id || !parsed.confidence || !parsed.reasoning) {
            gs.warn('WDF Advisor: AI response missing required fields');
            return null;
        }

        // Resolve connector names from IDs
        parsed.primary_name = _resolveConnectorName(parsed.primary_id, connectors);
        parsed.fallback_name = _resolveConnectorName(parsed.fallback_id, connectors);
        if (parsed.also_needed_id) {
            parsed.also_needed_name = _resolveConnectorName(parsed.also_needed_id, connectors);
        }

        return parsed;
    } catch (e) {
        gs.warn('WDF Advisor: AI recommendation error: ' + e.message);
        return null;
    }
}

function _resolveConnectorName(id, connectors) {
    for (var i = 0; i < connectors.length; i++) {
        if (connectors[i].id === id) return connectors[i].name;
    }
    return 'Unknown';
}

function _ruleBasedFallback(query, connectors) {
    // Simple keyword-based rule matching (mirrors the client-side decision engine)
    var q = query.toLowerCase();
    var primary = 'Integration Hub';
    var fallback = 'MCP Client';
    var confidence = 'Low';
    var reasoning = '';

    if (q.indexOf('kafka') > -1 || q.indexOf('stream') > -1 || q.indexOf('event') > -1 || q.indexOf('real-time') > -1 || q.indexOf('realtime') > -1 || q.indexOf('cdc') > -1) {
        primary = 'Stream Connect'; fallback = 'Zero Copy Connect'; confidence = 'High';
        reasoning = 'Query mentions streaming/event-driven patterns which are best served by Stream Connect for real-time data ingestion.';
    } else if (q.indexOf('document') > -1 || q.indexOf('search') > -1 || q.indexOf('sharepoint') > -1 || q.indexOf('confluence') > -1 || q.indexOf('content') > -1) {
        primary = 'External Content Connectors'; fallback = 'MCP Client'; confidence = 'High';
        reasoning = 'Query references document/content search scenarios best handled by External Content Connectors.';
    } else if (q.indexOf('servicenow') > -1 || q.indexOf('live') > -1 || q.indexOf('cross-instance') > -1) {
        primary = 'Live Connect'; fallback = 'Zero Copy Connect'; confidence = 'High';
        reasoning = 'Query involves ServiceNow-to-ServiceNow data sharing, ideal for Live Connect.';
    } else if (q.indexOf('sap') > -1 || q.indexOf('erp') > -1 || q.indexOf('oracle') > -1 || q.indexOf('workday') > -1) {
        primary = 'ZCC for ERP'; fallback = 'Integration Hub'; confidence = 'High';
        reasoning = 'Query mentions ERP systems which are best served by ZCC for ERP with pre-built data models.';
    } else if (q.indexOf('database') > -1 || q.indexOf('sql') > -1 || q.indexOf('postgres') > -1 || q.indexOf('mysql') > -1 || q.indexOf('snowflake') > -1 || q.indexOf('query') > -1 || q.indexOf('join') > -1) {
        primary = 'Zero Copy Connect'; fallback = 'Integration Hub'; confidence = 'High';
        reasoning = 'Query references direct database access patterns ideal for Zero Copy Connect virtual tables.';
    } else if (q.indexOf('ai') > -1 || q.indexOf('agent') > -1 || q.indexOf('mcp') > -1 || q.indexOf('llm') > -1 || q.indexOf('model') > -1 || q.indexOf('tool') > -1) {
        primary = 'MCP Client'; fallback = 'Integration Hub'; confidence = 'High';
        reasoning = 'Query involves AI agent or tool-use patterns best served by MCP Client for structured tool access.';
    } else if (q.indexOf('api') > -1 || q.indexOf('saas') > -1 || q.indexOf('cloud') > -1 || q.indexOf('rest') > -1 || q.indexOf('integration') > -1) {
        primary = 'Integration Hub'; fallback = 'Zero Copy Connect'; confidence = 'Medium';
        reasoning = 'Query involves cloud/SaaS API integration patterns well-suited to Integration Hub spokes.';
    } else {
        reasoning = 'No strong keyword signals detected. Integration Hub is the most versatile default connector for general integration scenarios.';
    }

    // Resolve IDs from names
    var primaryId = _resolveConnectorId(primary, connectors);
    var fallbackId = _resolveConnectorId(fallback, connectors);

    return {
        primary_id: primaryId,
        primary_name: primary,
        fallback_id: fallbackId,
        fallback_name: fallback,
        also_needed_id: null,
        also_needed_reason: null,
        confidence: confidence,
        reasoning: reasoning,
        alternatives_rejected: 'Other connectors did not match the integration pattern indicated by the query keywords.',
        next_steps: [
            'Review the recommended connector detail page for protocol and auth requirements',
            'Check if a MID Server is needed for your network topology',
            'Validate with a proof-of-concept using the connector\'s demo scenario'
        ]
    };
}

function _resolveConnectorId(name, connectors) {
    for (var i = 0; i < connectors.length; i++) {
        if (connectors[i].name === name) return connectors[i].id;
    }
    return '';
}
