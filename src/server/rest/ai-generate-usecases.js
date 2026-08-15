// @ts-nocheck
/* eslint-disable */
/**
 * AI Use Case Generation Handler
 * 
 * Called by the Scripted REST API. Generates 6 use case ideas using Gen AI
 * based on customer pain points, industry, and systems.
 */
(function process(request, response) {
    var body = request.body ? request.body.data : {};
    var pain = body.pain || '';
    var industry = body.industry || '';
    var systems = body.systems || '';

    // Build connector context from the connector table
    var connectorContext = _fetchConnectorContext();

    var systemPrompt = 'You are a ServiceNow Workflow Data Fabric (WDF) solutions architect. Given a customer pain point, industry, and external systems, generate exactly 6 creative use case ideas that leverage ServiceNow WDF connectors.\n\n'
        + 'CONNECTOR TABLE (available connectors):\n' + connectorContext + '\n\n'
        + 'REASONING GUIDE:\n'
        + '- Match connectors to the data access pattern (real-time query, streaming, bulk sync, content search, AI tool use)\n'
        + '- Prefer Zero Copy Connect for direct database/data warehouse access without replication\n'
        + '- Prefer Stream Connect for event-driven, CDC, or real-time streaming scenarios\n'
        + '- Prefer Integration Hub for orchestrated multi-step workflows with SaaS APIs\n'
        + '- Prefer External Content Connectors for document/knowledge search and indexing\n'
        + '- Prefer MCP Client for AI agent tool-use patterns\n'
        + '- Prefer ZCC for ERP for SAP/Oracle/Workday business object access\n'
        + '- Prefer Live Connect for ServiceNow-to-ServiceNow cross-instance data sharing\n\n'
        + 'MULTI-CONNECTOR PRIORITIZATION:\n'
        + '- Each use case can reference 1-3 connectors, listed in priority order\n'
        + '- The first connector listed is the primary integration path\n'
        + '- Additional connectors serve complementary roles (e.g., streaming + orchestration)\n\n'
        + 'OUTPUT FORMAT: Return a JSON array of exactly 6 objects. Each object must have these fields:\n'
        + '- title: string (concise use case name)\n'
        + '- connectors: string[] (1-3 connector names from the table above)\n'
        + '- pain: string (the specific customer pain this addresses)\n'
        + '- connectorReasoning: string (why these connectors were chosen)\n'
        + '- servicenowEnables: string (what ServiceNow capabilities enable this)\n'
        + '- businessValue: string[] (3-4 bullet points of business value)\n'
        + '- industryTags: string[] (relevant industry verticals)\n\n'
        + 'Return ONLY the JSON array, no markdown, no explanation.';

    var userPrompt = 'Generate 6 use case ideas for the following context:\n';
    if (pain) userPrompt += '- Customer pain/challenge: ' + pain + '\n';
    if (industry) userPrompt += '- Industry: ' + industry + '\n';
    if (systems) userPrompt += '- External systems: ' + systems + '\n';
    if (!pain && !industry && !systems) {
        userPrompt += '- General cross-industry WDF use cases showcasing diverse connector patterns\n';
    }

    try {
        var aiApi = new sn_gen_ai.GlideGenAIAPI();
        var aiResponse = aiApi.generateText(systemPrompt, userPrompt);

        if (!aiResponse) {
            gs.warn('WDF Advisor: AI use case generation returned empty response');
            response.setStatus(500);
            response.setBody({ error: 'AI returned an empty response. Please try again.' });
            return;
        }

        // Clean response - strip markdown code fences if present
        var cleaned = aiResponse.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
        var parsed = JSON.parse(cleaned);

        if (!Array.isArray(parsed) || parsed.length !== 6) {
            gs.warn('WDF Advisor: AI response was not an array of 6 items, got: ' + (Array.isArray(parsed) ? parsed.length : typeof parsed));
            response.setStatus(500);
            response.setBody({ error: 'AI returned an unexpected format. Please try again.' });
            return;
        }

        // Validate each object has required fields
        for (var i = 0; i < parsed.length; i++) {
            var item = parsed[i];
            if (!item.title || !item.connectors || !item.pain || !item.connectorReasoning || !item.servicenowEnables || !item.businessValue || !item.industryTags) {
                gs.warn('WDF Advisor: AI response item ' + i + ' missing required fields');
                response.setStatus(500);
                response.setBody({ error: 'AI returned incomplete use case data. Please try again.' });
                return;
            }
        }

        response.setStatus(200);
        response.setBody({ useCases: parsed });

    } catch (e) {
        gs.error('WDF Advisor: AI use case generation error: ' + e.message);
        response.setStatus(500);
        response.setBody({ error: 'Failed to generate use cases: ' + e.message });
    }
})(request, response);

function _fetchConnectorContext() {
    var lines = [];
    var gr = new GlideRecord('x_snc_wdf_advisory_connector');
    gr.orderBy('name');
    gr.query();
    while (gr.next()) {
        lines.push(gr.getValue('name') + ': ' + (gr.getValue('tagline') || '') + ' | Best for: ' + (gr.getValue('best_for') || ''));
    }
    return lines.join('\n');
}
