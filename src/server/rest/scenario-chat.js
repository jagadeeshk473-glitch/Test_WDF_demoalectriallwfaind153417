// @ts-nocheck
/* eslint-disable */
(function process(request, response) {
    var body = request.body ? request.body.data : {};
    var messages = body.messages || [];
    var turn = parseInt(body.turn, 10) || 1;

    // ── Bootstrap: no messages → open the conversation ──────────────────
    if (!messages || messages.length === 0) {
        response.setStatus(200);
        response.setBody({
            reply: "Welcome to the WDF Data Framework Advisor! Tell me about your integration challenge — what data are you trying to move, where does it live today, and what do you need to do with it?",
            type: "question",
            options: [],
            multiSelect: false
        });
        return;
    }

    // ── Collect every user utterance across ALL turns ─────────────────
    var userAnswers = [];
    for (var i = 0; i < messages.length; i++) {
        if (messages[i].role === "user") {
            var msgContent = messages[i].content || '';
            if (typeof msgContent !== 'string') msgContent = String(msgContent);
            if (msgContent.length > 0) userAnswers.push(msgContent);
        }
    }
    // Accumulate ALL user messages from every conversation turn — not just the latest
    var allUserText = userAnswers.join(" ").toLowerCase();

    // ── System-to-chapter affinity map (multi-chapter resolution) ───────
    var SYSTEM_CHAPTER_MAP = {
        'Snowflake': '4', 'Databricks': '4', 'BigQuery': '4', 'DataWarehouse': '4',
        'SAP': '4', 'Workday': '4', 'Oracle ERP': '4', 'Oracle DB': '4', 'Oracle': '4',
        'SharePoint': '5', 'Confluence': '5', 'Google Drive': '5', 'Slack': '5',
        'Power BI': '6', 'Tableau': '6',
        'Kafka': '7',
        'Salesforce': '8a', 'Jira': '8a',
        'Mainframe': '8a',
        'AI/LLM': '8a', 'MCP': '8a',
        'AWS': '8a', 'Azure': '8a', 'GCP': '8a'
    };

    // ═══════════════════════════════════════════════════════════════════════
    // PRODUCT DEPENDENCIES — prerequisite and complementary relationships
    // ═══════════════════════════════════════════════════════════════════════
    var PRODUCT_DEPENDENCIES = {
        'Live Connect': {
            requires: ['RaptorDB Pro'],
            note: 'RaptorDB Pro is required — powers Live Connect direct SQL access'
        },
        'HTAP Engine': {
            requires: ['RaptorDB Pro'],
            note: 'RaptorDB Pro is required — powers HTAP analytical processing'
        },
        'Live Archive': {
            requires: ['RaptorDB Pro'],
            note: 'RaptorDB Pro is required — powers Live Archive historical queries'
        },
        'MCP Client': {
            complementary: ['MCP Registry'],
            note: 'MCP Registry governs which external MCP servers the client may call'
        },
        'Stream Connect Outbound': {
            complementary: ['Integration Hub'],
            note: 'Integration Hub orchestrates workflows that produce the change events Stream Connect exports'
        },
        'Stream Connect Inbound': {
            complementary: ['Integration Hub'],
            note: 'Integration Hub processes and routes records created by inbound Kafka events'
        },
        'Zero Copy Connectors': {
            writeback_complement: 'Integration Hub',
            writeback_note: 'ZCC is read-only. For write-back to external systems, pair with Integration Hub spokes.'
        },
        'ZCC for ERP': {
            writeback_complement: 'Integration Hub',
            writeback_note: 'ZCC for ERP is read-only. For write-back to ERP systems, pair with Integration Hub spokes.'
        },
        'External Content Connectors (XCC)': {
            complementary: ['Integration Hub'],
            note: 'Integration Hub can automate content refresh schedules and alert on crawl failures'
        }
    };

    // ═══════════════════════════════════════════════════════════════════════
    // CAPABILITY TRIGGERS — contextual keyword → product/callout rules
    // ═══════════════════════════════════════════════════════════════════════
    var CAPABILITY_TRIGGERS = [
        {
            id: 'reverse_tunnel',
            keywords: ['private network', 'no ip whitelisting', 'ip whitelist', "can't whitelist", 'cannot whitelist', 'vpn', 'network privatization', 'private vpc', 'behind a firewall', 'no direct access', 'private subnet', 'network restriction', 'restricted network', 'no public endpoint', 'firewall restriction'],
            appliesTo: ['Zero Copy Connectors', 'ZCC for ERP'],
            callout: '\n\n💡 **Reverse Tunnel available**: If your network is private or IP whitelisting isn\'t possible, ZCC includes a built-in Reverse Tunnel option for secure connectivity without MID Server or VPN. Discuss with your network team to confirm if needed.',
            addToReason: false
        },
        {
            id: 'data_governance',
            keywords: ['gdpr', 'hipaa', 'compliance', 'regulated', 'data sovereignty', 'audit requirement', 'pci', 'sox', 'data residency', 'data stays', 'must stay'],
            appliesTo: ['Zero Copy Connectors', 'ZCC for ERP', 'Live Archive'],
            callout: '\n\n🛡️ **Data Governance**: Built-in lineage tracking and policy-based controls ensure compliance. With ZCC, data stays at source — no copies to govern.',
            addToReason: false
        },
        {
            id: 'write_back',
            keywords: ['write back', 'write-back', 'writeback', 'update external', 'update erp', 'update sap', 'bidirectional sync', 'two-way sync', 'two way sync', 'push changes back', 'modify external'],
            appliesTo: ['Zero Copy Connectors', 'ZCC for ERP'],
            addProduct: 'Integration Hub',
            addProductReason: 'ZCC is read-only by design — Integration Hub spokes handle write-back to external systems.',
            callout: '\n\n✏️ **Write-back note**: ZCC provides read-only federation. For writing data back to external systems, Integration Hub is included to handle write operations via spokes.',
            addToReason: false
        },
        {
            id: 'ai_agent_context',
            keywords: ['ai agent', 'ai agents', 'now assist', 'agentic', 'agent needs to', 'agent should', 'agent can', 'intelligent agent', 'ai native', 'ai-native', 'ai ready', 'ai-ready', 'make it ai', 'make my system ai', 'artificial intelligence', 'machine learning', 'generative ai', 'genai', 'gen ai', 'llm', 'large language model', 'copilot', 'ai powered', 'ai-powered'],
            appliesTo: ['Zero Copy Connectors', 'ZCC for ERP', 'External Content Connectors (XCC)', 'Live Connect', 'Stream Connect Inbound', 'Integration Hub'],
            addProduct: 'MCP Client',
            addProductReason: 'MCP Client lets AI agents invoke external tools alongside the data connectors for richer context.',
            callout: '\n\n🤖 **AI Agent Enhancement**: MCP Client is included to let AI agents invoke external tools and data sources alongside the recommended connectors.',
            addToReason: false
        },
        {
            id: 'performance_scale',
            keywords: ['slow report', 'slow dashboard', 'performance impact', 'instance slow', 'sluggish', 'heavy queries', 'analytical load', 'reporting load', 'locking up', 'locks up', 'complex aggregation', 'blocking agents'],
            appliesTo: ['Live Connect'],
            addProduct: 'HTAP Engine',
            addProductReason: 'Separates analytical query load from operational transactions — prevents heavy reports from impacting agent performance.',
            callout: '\n\n⚡ **HTAP Engine**: Included to separate analytical query load from operational transactions, preventing performance degradation.',
            addToReason: false
        },
        {
            id: 'historical_data',
            keywords: ['historical data', 'archive', 'archived', 'years of data', 'old records', 'retention', 'cold data', 'audit trail', 'long-term', 'long term'],
            appliesTo: ['Live Connect', 'RaptorDB Pro', 'HTAP Engine'],
            addProduct: 'Live Archive',
            addProductReason: 'Extends query reach into archived/historical ServiceNow data while keeping it fully queryable.',
            callout: '\n\n📦 **Live Archive**: Included to extend live query reach into historical/archived data.',
            addToReason: false
        },
        {
            id: 'real_time_streaming',
            keywords: ['real-time', 'real time', 'realtime', 'event-driven', 'event driven', 'continuous feed', 'cdc', 'change data capture'],
            appliesTo: ['Integration Hub'],
            addProduct: 'Stream Connect',
            addProductReason: 'For real-time/event-driven streaming patterns, Stream Connect handles continuous data flow alongside Integration Hub workflow orchestration.',
            callout: '',
            addToReason: false
        }
    ];

    // ── Try AI-enhanced path first, fall back to deterministic ──────────
    var result = null;

    // Force recommendation at turn 5+ — don't let AI loop
    if (turn >= 5) {
        gs.info('WDF Chat AI: Turn ' + turn + ' reached, forcing deterministic recommendation');
        result = _deterministicFramework(messages, turn, userAnswers, allUserText);
    } else {
        try {
            result = _tryAIPath(messages, turn, allUserText);
        } catch (e) {
            gs.warn('WDF Chat AI: Exception in _tryAIPath: ' + e.message);
            result = null;
        }
        if (!result) {
            result = _deterministicFramework(messages, turn, userAnswers, allUserText);
        }
    }

    response.setStatus(200);
    response.setBody(result);

    // ═══════════════════════════════════════════════════════════════════════
    // AI PATH — uses OneExtendUtil.execute() with WDF Chat Advisor skill
    // ═══════════════════════════════════════════════════════════════════════

    function _tryAIPath(msgs, currentTurn, fullText) {
        // ── System property toggle ──────────────────────────────────────
        var aiEnabled = gs.getProperty('x_snc_wdf_advisory.ai_chat_enabled', 'true');
        if (aiEnabled !== 'true') {
            gs.info('WDF Chat AI: Disabled via system property, falling back to deterministic');
            return null;
        }

        // ── Dynamic skill lookup ────────────────────────────────────────
        var capGR = new GlideRecord('sys_one_extend_capability');
        capGR.addQuery('name', 'WDF Chat Advisor');
        capGR.addQuery('sys_scope', '61afbcba2f2a0310809dea3fafa4e3ab');
        capGR.setLimit(1);
        capGR.query();
        if (!capGR.next()) {
            gs.info('WDF Chat AI: Skill capability not found, falling back to deterministic');
            return null;
        }
        var capId = capGR.getUniqueValue();

        var cfgGR = new GlideRecord('sn_nowassist_skill_config');
        cfgGR.addQuery('skill_id', capId);
        cfgGR.setLimit(1);
        cfgGR.query();
        if (!cfgGR.next()) {
            gs.info('WDF Chat AI: Skill config not found for capability ' + capId + ', falling back to deterministic');
            return null;
        }
        var cfgId = cfgGR.getUniqueValue();

        // ── Serialize conversation for the skill ────────────────────────
        var convJson = JSON.stringify(msgs);

        // ── Call via OneExtendUtil.execute() ─────────────────────────────
        var startTime = new GlideDateTime().getNumericValue();

        var req = {
            executionRequests: [{
                payload: {
                    conversation: convJson,
                    'turn number': String(currentTurn)
                },
                capabilityId: capId,
                meta: { skillConfigId: cfgId }
            }],
            mode: 'sync'
        };

        var res = sn_one_extend.OneExtendUtil.execute(req) || {};

        var endTime = new GlideDateTime().getNumericValue();
        var duration = endTime - startTime;
        gs.info('WDF Chat AI: OneExtend response in ' + duration + 'ms on turn ' + currentTurn);

        // ── Extract response from capabilities map ──────────────────────
        var sr = null;
        if (res.capabilities) {
            var ks = Object.keys(res.capabilities);
            for (var i = 0; i < ks.length; i++) {
                var e = res.capabilities[ks[i]];
                if (e.response !== undefined && e.response !== null) {
                    sr = e.response;
                    break;
                }
            }
        }

        if (sr === null || sr === undefined) {
            gs.info('WDF Chat AI: No response in capabilities map, falling back to deterministic');
            return null;
        }

        // ── Unwrap model_output if present ──────────────────────────────
        var txt = '';
        if (typeof sr === 'object' && sr.model_output) {
            txt = String(sr.model_output);
        } else if (typeof sr === 'string') {
            try {
                var parsed = JSON.parse(sr);
                if (parsed && parsed.model_output) txt = String(parsed.model_output);
                else txt = sr;
            } catch (pe) {
                txt = sr;
            }
        } else {
            txt = JSON.stringify(sr);
        }

        // ── Parse the LLM JSON response ─────────────────────────────────
        var cleaned = txt.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
        try {
            var result = JSON.parse(cleaned);
            if (result.reply && result.type) {
                gs.info('WDF Chat AI: Success on turn ' + currentTurn + ', type=' + result.type + ' (' + duration + 'ms)');

                // Log AI path conversation (only on recommendation turns, fire-and-forget)
                if (result.type === 'recommendation') {
                    try {
                        var aiLogGR = new GlideRecord('x_snc_wdf_advisory_chat_log');
                        aiLogGR.initialize();
                        aiLogGR.setValue('session_id', gs.generateGUID());
                        aiLogGR.setValue('user_query', (msgs && msgs.length > 0) ? msgs[0].content : '');
                        aiLogGR.setValue('messages', JSON.stringify(msgs || []));
                        if (result.recommendation) {
                            aiLogGR.setValue('recommendation', JSON.stringify(result.recommendation));
                            var aiProds = [];
                            if (result.recommendation.stage2_connectors) {
                                for (var _api = 0; _api < result.recommendation.stage2_connectors.length; _api++) {
                                    aiProds.push(result.recommendation.stage2_connectors[_api].name);
                                }
                            }
                            aiLogGR.setValue('products_recommended', aiProds.join(', '));
                        }
                        aiLogGR.setValue('turn_count', currentTurn || 0);
                        aiLogGR.setValue('path_used', 'ai');
                        aiLogGR.setValue('duration_ms', duration || 0);
                        var aiPillars = [];
                        if (result.recommendation && result.recommendation.fourC) {
                            var afc = result.recommendation.fourC;
                            if (afc.connect && afc.connect.length > 0) aiPillars.push('Connect');
                            if (afc.control && afc.control.length > 0) aiPillars.push('Control');
                            if (afc.contextualize && afc.contextualize.length > 0) aiPillars.push('Contextualize');
                            if (afc.converge && afc.converge.length > 0) aiPillars.push('Converge');
                        }
                        aiLogGR.setValue('four_c_pillars', aiPillars.join(', '));
                        aiLogGR.insert();
                    } catch (aiLogErr) {
                        // Never let logging break the response
                        gs.warn('WDF Chat Log (AI): ' + aiLogErr.message);
                    }
                }

                return result;
            }
            gs.warn('WDF Chat AI: Parsed JSON missing reply/type fields');
        } catch (je) {
            gs.warn('WDF Chat AI: JSON parse failed: ' + je.message + ', raw=' + cleaned.substring(0, 200));
        }

        gs.info('WDF Chat AI: No valid response, falling back to deterministic');
        return null;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // DETERMINISTIC 4-STAGE FRAMEWORK
    // ═══════════════════════════════════════════════════════════════════════

    function _deterministicFramework(msgs, currentTurn, answers, fullText) {

        // ── Stage 1: Extract everything we can ─────────────────────────
        var extracted = {
            direction: _extractDirection(fullText),
            mechanism: _extractMechanism(fullText),
            action: _extractAction(fullText),
            systems: _extractSystems(fullText),
            industry: _extractIndustry(fullText),
            timeline: _extractTimeline(fullText),
            frontDoor: _checkFrontDoor(fullText)
        };

        // ── Front door fast-track ──────────────────────────────────────
        if (extracted.frontDoor) {
            return _buildFullRecommendation(answers, extracted, extracted.frontDoor);
        }

        // ── Determine chapter from 2x2 matrix + action ────────────────
        var chapter = _resolveChapter(extracted);

        // ── If we can resolve a chapter and have systems → recommend ───
        if (chapter && extracted.systems) {
            return _buildFullRecommendation(answers, extracted, chapter);
        }

        // ── Turn 4+ with resolved chapter → force recommendation to prevent repetition ──
        if (currentTurn >= 4 && chapter) {
            return _buildFullRecommendation(answers, extracted, chapter);
        }

        // ── Max turns reached → force recommendation with what we have ─
        if (currentTurn >= 5) {
            var fallbackChapter = chapter || _bestGuessChapter(extracted);
            return _buildFullRecommendation(answers, extracted, fallbackChapter);
        }

        // ── Ask the most discriminating missing question ───────────────
        return _askNextQuestion(extracted, currentTurn, userAnswers);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // FRONT DOOR LOOKUP (Chapter 3)
    // ═══════════════════════════════════════════════════════════════════════

    function _checkFrontDoor(text) {
        var frontDoors = [
            { phrases: ["bi against snowflake", "reporting against snowflake", "bi against databricks", "reporting against databricks", "snowflake no copy", "databricks no copy", "query snowflake live", "query databricks live"], chapter: "4", product: "Zero Copy Connectors", title: "Read External Data Where It Sits", quadrant: "Inbound + Federated" },
            { phrases: ["live sap data", "live workday data", "sap no copy", "workday no copy", "erp data no copy", "live erp data"], chapter: "4", product: "ZCC for ERP", title: "Read External Data Where It Sits", quadrant: "Inbound + Federated" },
            { phrases: ["warehouse data inside servicenow", "warehouse data inside sn", "bring warehouse data", "import warehouse data", "land warehouse data"], chapter: "6", product: "RaptorDB Pro", title: "Platform Engine", quadrant: "Platform Engine" },
            { phrases: ["slack searchable", "confluence searchable", "sharepoint searchable", "searchable by ai agent", "ai search external content", "index external content"], chapter: "5", product: "External Content Connectors (XCC)", title: "Bring In and Keep", quadrant: "Inbound + Materialized" },
            { phrases: ["bi team query sn", "bi query servicenow", "power bi against sn", "power bi against servicenow", "tableau against sn", "tableau against servicenow", "sql client against sn", "sql client query sn"], chapter: "6", product: "Live Connect", title: "Open Up Live", quadrant: "Outbound + Federated" },
            { phrases: ["reporting slowing", "reports slow down instance", "analytical load", "slow reports on instance", "separate analytical", "separate reporting load"], chapter: "6", product: "HTAP Engine", title: "Open Up Live", quadrant: "Outbound + Federated" },
            { phrases: ["years of historical", "historical sn data", "archive data live", "cold data live query", "long term retention"], chapter: "6", product: "Live Archive", title: "Open Up Live", quadrant: "Outbound + Federated" },
            { phrases: ["one-time export", "one time export", "bulk export to warehouse", "export to data lake", "dump to warehouse"], chapter: "7", product: "Table API", title: "Export in Bulk", quadrant: "Outbound + Materialized" },
            { phrases: ["continuous feed to kafka", "stream to kafka", "cdc to kafka", "change feed to kafka", "real-time feed to kafka"], chapter: "7", product: "Stream Connect Outbound", title: "Export in Bulk", quadrant: "Outbound + Materialized" },
            { phrases: ["push kafka events into sn", "kafka events into servicenow", "kafka trigger servicenow", "inbound kafka", "consume kafka events"], chapter: "8b", product: "Stream Connect Inbound", title: "Others Trigger ServiceNow", quadrant: "Action Inbound" },
            { phrases: ["workflow step reads salesforce", "workflow step writes salesforce", "flow calls external", "spoke integration", "integration hub spoke"], chapter: "8a", product: "Integration Hub", title: "ServiceNow Triggers Others", quadrant: "Action Outbound" },
            { phrases: ["agent call external mcp", "agent call mcp server", "ai agent call tool", "mcp client call", "ai agent needs to look up", "ai agent needs to check", "ai agent needs to query", "ai agent needs to call", "ai agent needs to access", "our ai agent needs", "agent needs to look up", "agent needs to check", "agent needs to query", "agent invoke external"], chapter: "8a", product: "MCP Client", title: "ServiceNow Triggers Others", quadrant: "Action Outbound" },
            { phrases: ["no api just a screen", "no api only screen", "legacy system no api", "mainframe no api", "screen scraping"], chapter: "8a", product: "RPA Hub", title: "ServiceNow Triggers Others", quadrant: "Action Outbound" },
            { phrases: ["claude take action in sn", "external agent act on sn", "gpt call servicenow", "ai agent invoke sn", "external ai acts on servicenow", "mcp server for sn"], chapter: "8b", product: "SN MCP Server", title: "Others Trigger ServiceNow", quadrant: "Action Inbound" },
            { phrases: ["other system create sn record", "external system update sn", "create records from outside", "inbound api call", "rest api into servicenow"], chapter: "8b", product: "Inbound APIs", title: "Others Trigger ServiceNow", quadrant: "Action Inbound" }
        ];

        for (var i = 0; i < frontDoors.length; i++) {
            var fd = frontDoors[i];
            for (var p = 0; p < fd.phrases.length; p++) {
                if (text.indexOf(fd.phrases[p]) > -1) {
                    return {
                        chapter: fd.chapter,
                        product: fd.product,
                        title: fd.title,
                        quadrant: fd.quadrant
                    };
                }
            }
        }
        return null;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SMART KEYWORD EXTRACTION
    // ═══════════════════════════════════════════════════════════════════════

    function _extractDirection(text) {
        // Chip-text fast-tracks
        if (text.indexOf("both directions") > -1) return "bidirectional";
        if (text.indexOf("triggering actions between systems") > -1) return null; // handled by _extractAction

        // Context-based direction detection: external system querying ServiceNow = outbound
        if (text.match(/(?:snowflake|databricks|tableau|bigquery|power bi|external|outside)\s+(?:want|need|can|should|will|would)\s+(?:to\s+)?(?:query|read|access|fetch)/)) {
            return "outbound";
        }
        if (text.match(/(?:let|allow|enable|permit)\s+(?:snowflake|databricks|tableau|bigquery|external)/)) {
            return "outbound";
        }

        var inboundPhrases = [
            "bring in", "import", "ingest", "get data from", "query external",
            "read from", "pull from", "access external", "see data from",
            "connect to our warehouse", "sap data in servicenow", "warehouse data",
            "external data", "data from outside", "bring data into",
            "get from", "fetch from", "load from", "sync from",
            "data coming into servicenow", "coming into servicenow", "data coming in",
            "unstructured content search", "unstructured content",
            "read", "fetch", "pull", "from sap", "from oracle", "from workday",
            "from snowflake", "from databricks", "from bigquery", "from kafka",
            "from warehouse", "into servicenow", "into sn", "into our instance",
            "without moving it", "without moving", "without copying it",
            "on-demand", "on demand"
        ];
        var outboundPhrases = [
            "export", "share data", "send data to", "bi reporting", "feed to",
            "push to", "get data out", "power bi", "tableau",
            "query servicenow from", "external system query sn", "bulk export",
            "share sn data", "expose sn data", "data out of servicenow",
            "reporting on sn data", "analytics on sn data",
            "data going out of servicenow", "going out of servicenow", "data going out",
            "expose", "publish", "share out", "query our", "query servicenow",
            "query our cmdb", "query our servicenow", "want to query", "access our",
            "query sn", "external tools query", "external systems query",
            "outside systems", "let snowflake", "let databricks", "let tableau",
            "expose servicenow", "push out", "send out", "send to",
            "export to", "exporting to"
        ];

        var inScore = 0;
        var outScore = 0;
        for (var i = 0; i < inboundPhrases.length; i++) {
            if (text.indexOf(inboundPhrases[i]) > -1) inScore += 1;
        }
        for (var o = 0; o < outboundPhrases.length; o++) {
            if (text.indexOf(outboundPhrases[o]) > -1) outScore += 1;
        }

        // ── Context-aware direction correction ─────────────────────────
        // Ambiguous phrases like "query our X" score outbound because they
        // match "query our" (intended for "external system queries our SN").
        // But when X is an external system (Snowflake, SAP, …), the actual
        // intent is inbound. Check what follows the ambiguous phrase.
        var externalSystems = ['snowflake', 'databricks', 'bigquery', 'sap', 'oracle', 'workday',
            'warehouse', 'data warehouse', 'erp', 'database', 'kafka', 'sharepoint', 'confluence',
            'salesforce', 'jira', 'slack', 'mainframe', 'mongodb', 'postgresql', 'mysql',
            'data lake', 'lakehouse', 'external'];
        var snSystems = ['servicenow', 'sn', 'cmdb', 'instance', 'platform'];

        var ambiguousPhrases = ['query our', 'access our', 'read our', 'fetch our', 'see our', 'look up our', 'search our'];
        for (var api = 0; api < ambiguousPhrases.length; api++) {
            var ap = ambiguousPhrases[api];
            var apIdx = text.indexOf(ap);
            if (apIdx > -1) {
                var afterPhrase = text.substring(apIdx + ap.length, apIdx + ap.length + 50).toLowerCase();

                var isExternal = false;
                var isSN = false;
                for (var esi = 0; esi < externalSystems.length; esi++) {
                    if (afterPhrase.indexOf(externalSystems[esi]) > -1) { isExternal = true; break; }
                }
                for (var sni = 0; sni < snSystems.length; sni++) {
                    if (afterPhrase.indexOf(snSystems[sni]) > -1) { isSN = true; break; }
                }

                if (isExternal && !isSN) {
                    // "query our Snowflake" → inbound, not outbound
                    inScore += 2;
                    if (outScore > 0) outScore -= 1;
                }
                // If isSN, the existing outbound scoring is correct — no change
            }
        }

        if (inScore > 0 && outScore === 0) return "inbound";
        if (outScore > 0 && inScore === 0) return "outbound";
        if (inScore > 0 && outScore > 0) return "bidirectional";
        return null;
    }

    function _extractMechanism(text) {
        // Negation pre-processing: if negation phrases are present, boost federate score
        var negationPhrases = [
            "without replicating", "without copying", "without syncing", "without moving",
            "don't want to replicate", "dont want to replicate", "don't want to copy",
            "no replication needed", "no copying needed", "without importing",
            "without any data replication", "without data replication", "without transferring"
        ];
        var negationBoost = 0;
        for (var n = 0; n < negationPhrases.length; n++) {
            if (text.indexOf(negationPhrases[n]) > -1) negationBoost += 2;
        }

        var federatePhrases = [
            "no copy", "live", "in-place", "without copying", "real-time query",
            "zero copy", "where it sits", "don't want to replicate", "federate", "federated",
            "query-time", "no replication", "leave data where", "query in place",
            "dont want to copy", "live query", "real time",
            "query it live where it sits", "query it live", "no copy needed",
            "external tools query servicenow live", "no export",
            "must always be real-time / live", "must always be real-time",
            "real-time", "realtime", "live read",
            "on-demand", "on demand", "without moving", "without copy",
            "no copies", "no replication", "no duplication",
            "in place", "where it lives", "federation",
            "virtual", "virtual table", "virtual tables"
        ];
        var materializePhrases = [
            "keep a copy", "replicate", "sync", "land the data",
            "store inside", "bring in permanently", "etl", "bulk load",
            "warehouse inside sn", "copy data", "move data into",
            "data migration", "batch import", "load data", "transfer data",
            "keep a copy inside servicenow", "keep a copy inside",
            "for workflows, agents, records",
            "one-time or infrequent bulk export", "infrequent bulk export",
            "continuous real-time feed", "real-time feed", "streaming",
            "periodic refresh is fine", "periodic refresh",
            "unstructured content search", "unstructured content",
            "streamed", "stream", "streams", "replicated", "replicating",
            "synced", "syncing", "synchronize", "synchronized",
            "export", "exports", "exporting", "exported",
            "batch", "continuous feed", "continuous", "continuously",
            "copy inside", "maintain a copy", "maintain copies", "maintain copy",
            "infrequent", "one-time", "one time", "bulk export", "bulk import"
        ];

        var fedScore = 0;
        var matScore = 0;
        for (var f = 0; f < federatePhrases.length; f++) {
            if (text.indexOf(federatePhrases[f]) > -1) fedScore += 1;
        }
        for (var m = 0; m < materializePhrases.length; m++) {
            if (text.indexOf(materializePhrases[m]) > -1) matScore += 1;
        }

        fedScore += negationBoost;

        if (fedScore > 0 && matScore === 0) return "federate";
        if (matScore > 0 && fedScore === 0) return "materialize";
        if (fedScore > 0 && matScore > 0) return "both";
        return null;
    }

    function _extractAction(text) {
        // Chip-text fast-track
        if (text.indexOf("triggering actions between systems") > -1) return "action_both";

        var actionInbound = [
            "trigger workflow", "create records from outside", "external agent",
            "claude", "ai agent acts on sn", "push events", "kafka events into sn",
            "external system triggers", "inbound event", "webhook into servicenow",
            "external trigger", "invoke servicenow", "call into sn",
            "triggering actions"
        ];
        var actionOutbound = [
            "call external api", "trigger in salesforce", "write to sap",
            "automate external", "workflow calls", "agent calls tool",
            "spoke", "integration hub", "call out to", "invoke external",
            "send to external", "post to external", "rpa",
            "single-record actions", "workflow/automation",
            "ai agent needs", "ai agent call", "agent needs to look up", "agent needs to check",
            "agent needs to query", "agent needs to access", "agent invoke", "agent tool"
        ];

        var inAct = false;
        var outAct = false;
        for (var ai = 0; ai < actionInbound.length; ai++) {
            if (text.indexOf(actionInbound[ai]) > -1) { inAct = true; break; }
        }
        for (var ao = 0; ao < actionOutbound.length; ao++) {
            if (text.indexOf(actionOutbound[ao]) > -1) { outAct = true; break; }
        }

        if (inAct && !outAct) return "action_inbound";
        if (outAct && !inAct) return "action_outbound";
        if (inAct && outAct) return "action_both";
        return null;
    }

    function _extractSystems(text) {
        var systems = [
            { keywords: ["data warehouse", "warehouse", "data lake", "lakehouse"], name: "DataWarehouse" },
            { keywords: ["snowflake"], name: "Snowflake" },
            { keywords: ["databricks"], name: "Databricks" },
            { keywords: ["bigquery", "big query"], name: "BigQuery" },
            { keywords: ["sap", "s/4hana", "s4hana", "sap hana"], name: "SAP" },
            { keywords: ["workday"], name: "Workday" },
            { keywords: ["oracle ebs", "oracle e-business", "oracle fusion", "oracle cloud erp", "jd edwards", "peoplesoft", "oracle erp"], name: "Oracle ERP" },
            { keywords: ["oracle db", "oracle database", "oracle sql"], name: "Oracle DB" },
            { keywords: ["salesforce", "sfdc"], name: "Salesforce" },
            { keywords: ["kafka", "confluent", "event streaming"], name: "Kafka" },
            { keywords: ["power bi", "powerbi"], name: "Power BI" },
            { keywords: ["tableau"], name: "Tableau" },
            { keywords: ["sharepoint"], name: "SharePoint" },
            { keywords: ["confluence"], name: "Confluence" },
            { keywords: ["slack"], name: "Slack" },
            { keywords: ["google drive"], name: "Google Drive" },
            { keywords: ["jira"], name: "Jira" },
            { keywords: ["aws", "amazon web services", "s3", "lambda"], name: "AWS" },
            { keywords: ["azure", "microsoft azure"], name: "Azure" },
            { keywords: ["gcp", "google cloud"], name: "GCP" },
            { keywords: ["active directory", "ldap"], name: "Active Directory" },
            { keywords: ["splunk"], name: "Splunk" },
            { keywords: ["mongodb", "mongo"], name: "MongoDB" },
            { keywords: ["postgresql", "postgres"], name: "PostgreSQL" },
            { keywords: ["mysql"], name: "MySQL" },
            { keywords: ["mainframe", "legacy"], name: "Mainframe" },
            { keywords: ["mcp server", "mcp"], name: "MCP" },
            { keywords: ["claude", "gpt", "openai", "copilot", "ai/llm", "llm agents"], name: "AI/LLM" }
        ];
        var found = [];
        for (var i = 0; i < systems.length; i++) {
            for (var k = 0; k < systems[i].keywords.length; k++) {
                if (text.indexOf(systems[i].keywords[k]) > -1) {
                    found.push(systems[i].name);
                    break;
                }
            }
        }
        // Post-processing: disambiguate bare "oracle" mentions
        var hasOracleERP = false;
        var hasOracleDB = false;
        for (var oi = 0; oi < found.length; oi++) {
            if (found[oi] === 'Oracle ERP') hasOracleERP = true;
            if (found[oi] === 'Oracle DB') hasOracleDB = true;
        }
        if (!hasOracleERP && !hasOracleDB && text.indexOf('oracle') > -1) {
            // Bare "oracle" detected without specific qualifier — check context
            var erpContext = ['erp', 'ebs', 'fusion', 'e-business', 'finance', 'procurement', 'hcm', 'supply chain', 'peoplesoft', 'jd edwards'];
            var dbContext = ['database', 'db', 'sql', 'warehouse', 'data lake', 'jdbc', 'schema', 'table'];
            var isERP = false;
            var isDB = false;
            for (var eci = 0; eci < erpContext.length; eci++) {
                if (text.indexOf(erpContext[eci]) > -1) { isERP = true; break; }
            }
            for (var dci = 0; dci < dbContext.length; dci++) {
                if (text.indexOf(dbContext[dci]) > -1) { isDB = true; break; }
            }
            if (isERP && !isDB) {
                found.push('Oracle ERP');
            } else {
                // Default to Oracle DB (safer — ZCC for ERP is a narrower product)
                found.push('Oracle DB');
            }
            gs.info('WDF Chat: Bare "oracle" disambiguated to ' + found[found.length - 1]);
        }

        return found.length > 0 ? found.join(", ") : null;
    }

    function _extractIndustry(text) {
        var industries = {
            "healthcare": "Healthcare", "pharma": "Healthcare",
            "hospital": "Healthcare", "clinical": "Healthcare",
            "patient": "Healthcare", "medical": "Healthcare",
            "financial": "Financial Services", "banking": "Financial Services",
            "insurance": "Financial Services", "fintech": "Financial Services",
            "trading": "Financial Services",
            "manufactur": "Manufacturing", "supply chain": "Manufacturing",
            "factory": "Manufacturing", "production line": "Manufacturing",
            "automotive": "Automotive/Manufacturing",
            "retail": "Retail", "ecommerce": "Retail", "e-commerce": "Retail",
            "storefront": "Retail", "point of sale": "Retail",
            "technolog": "Technology", "software": "Technology", "saas": "Technology",
            "government": "Government", "public sector": "Government",
            "federal": "Government", "municipal": "Government",
            "telecom": "Telecommunications", "telco": "Telecommunications",
            "education": "Education", "university": "Education",
            "energy": "Energy & Utilities", "utilities": "Energy & Utilities",
            "oil and gas": "Energy & Utilities",
            "logistics": "Transportation & Logistics",
            "transport": "Transportation & Logistics",
            "shipping": "Transportation & Logistics",
            "media": "Media & Entertainment", "entertainment": "Media & Entertainment"
        };
        for (var key in industries) {
            if (text.indexOf(key) > -1) return industries[key];
        }
        return null;
    }

    function _extractTimeline(text) {
        var immediate = ["urgent", "asap", "immediately", "right now", "this week", "this month", "production ready", "ga solution", "need it now", "need ga"];
        var nextQuarter = ["next quarter", "q2", "q3", "q4", "few months", "3 months", "planning phase", "upcoming"];
        var exploring = ["exploring", "early stage", "just looking", "researching", "evaluating", "long term", "next year", "no rush", "future"];

        for (var i = 0; i < immediate.length; i++) {
            if (text.indexOf(immediate[i]) > -1) return "Immediate (Need GA Solution)";
        }
        for (var j = 0; j < nextQuarter.length; j++) {
            if (text.indexOf(nextQuarter[j]) > -1) return "Next Quarter";
        }
        for (var e = 0; e < exploring.length; e++) {
            if (text.indexOf(exploring[e]) > -1) return "Exploring / Early Stage";
        }
        return null;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 2×2 MATRIX CHAPTER RESOLUTION
    // ═══════════════════════════════════════════════════════════════════════

    function _resolveChapter(extracted) {
        // Action types take priority (Chapter 8)
        if (extracted.action === "action_inbound") {
            return { chapter: "8b", title: "Others Trigger ServiceNow", quadrant: "Action Inbound", description: "An external system or agent needs to trigger work inside ServiceNow." };
        }
        if (extracted.action === "action_outbound") {
            return { chapter: "8a", title: "ServiceNow Triggers Others", quadrant: "Action Outbound", description: "ServiceNow needs to trigger actions or read/write in external systems as part of a workflow." };
        }
        if (extracted.action === "action_both") {
            return { chapter: "8", title: "Action Layer (Bidirectional)", quadrant: "Action Bidirectional", description: "Bidirectional action triggers between ServiceNow and external systems." };
        }

        // System-based fast inference
        var sysTxt = (extracted.systems || "").toLowerCase();

        // Outbound context check: external system is the CONSUMER, not the source
        if (_hasAny(sysTxt, ["snowflake", "databricks", "bigquery", "tableau"]) && extracted.direction === "outbound") {
            if (extracted.mechanism === "materialize") {
                return { chapter: "7", title: "Export in Bulk", quadrant: "Outbound + Materialized", description: "Export ServiceNow data to external systems, one-time or continuously." };
            }
            return { chapter: "6", title: "Open Up Live", quadrant: "Outbound + Federated", description: "Let external tools query ServiceNow data live without exporting it." };
        }

        if (_hasAny(sysTxt, ["snowflake", "databricks", "bigquery", "datawarehouse"]) && extracted.mechanism !== "materialize") {
            if (!extracted.direction || extracted.direction === "inbound") {
                return { chapter: "4", title: "Read External Data Where It Sits", quadrant: "Inbound + Federated", description: "Query external analytical stores live — no copy, no pipeline, no staleness." };
            }
        }
        // ERP systems → Chapter 4 (Inbound + Federated via ZCC for ERP)
        if (_hasAny(sysTxt, ["sap", "workday", "oracle erp"]) && !_hasAny(sysTxt, ["snowflake", "databricks", "bigquery"])) {
            if (!extracted.direction || extracted.direction === "inbound") {
                return { chapter: "4", title: "Read External Data Where It Sits", quadrant: "Inbound + Federated", description: "Connect to ERP systems live via pre-built business object mappings — no data replication needed." };
            }
        }
        if (_hasAny(sysTxt, ["kafka"]) && extracted.direction !== "outbound") {
            if (extracted.direction === "inbound" || extracted.action === "action_inbound") {
                return { chapter: "8b", title: "Others Trigger ServiceNow", quadrant: "Action Inbound", description: "External Kafka events trigger work inside ServiceNow." };
            }
        }
        if (_hasAny(sysTxt, ["kafka"]) && extracted.direction === "outbound") {
            return { chapter: "7", title: "Export in Bulk", quadrant: "Outbound + Materialized", description: "Continuous feed of ServiceNow changes to external Kafka consumers." };
        }
        if (_hasAny(sysTxt, ["power bi", "tableau"]) || (sysTxt.indexOf("bi") > -1 && extracted.direction === "outbound")) {
            return { chapter: "6", title: "Open Up Live", quadrant: "Outbound + Federated", description: "Let external BI/analytics tools query ServiceNow data live via SQL." };
        }
        if (_hasAny(sysTxt, ["sharepoint", "confluence", "slack", "google drive"])) {
            return { chapter: "5", title: "Bring In and Keep", quadrant: "Inbound + Materialized", description: "Index external content so ServiceNow AI Search and agents can find it." };
        }
        if (_hasAny(sysTxt, ["mainframe"]) || text_has(allUserText, "no api")) {
            return { chapter: "8a", title: "ServiceNow Triggers Others", quadrant: "Action Outbound", description: "Automate legacy systems that only expose a screen, no API." };
        }

        // 2×2 matrix resolution
        if (extracted.direction && extracted.mechanism) {
            if (extracted.direction === "inbound" && extracted.mechanism === "federate") {
                return { chapter: "4", title: "Read External Data Where It Sits", quadrant: "Inbound + Federated", description: "Query external data live without copying it into ServiceNow." };
            }
            if (extracted.direction === "inbound" && extracted.mechanism === "materialize") {
                return { chapter: "5", title: "Bring In and Keep", quadrant: "Inbound + Materialized", description: "Bring external data into ServiceNow and keep a copy for ongoing use." };
            }
            if (extracted.direction === "outbound" && extracted.mechanism === "federate") {
                return { chapter: "6", title: "Open Up Live", quadrant: "Outbound + Federated", description: "Let external tools query ServiceNow data live without exporting it." };
            }
            if (extracted.direction === "outbound" && extracted.mechanism === "materialize") {
                return { chapter: "7", title: "Export in Bulk", quadrant: "Outbound + Materialized", description: "Export ServiceNow data to external systems, one-time or continuously." };
            }
        }

        // Partial: direction only
        if (extracted.direction === "inbound") {
            return { chapter: "4/5", title: "Inbound Data (method TBD)", quadrant: "Inbound", description: "Data needs to come into ServiceNow — we need to determine if you want it live (federated) or copied (materialized)." };
        }
        if (extracted.direction === "outbound") {
            return { chapter: "7", title: "Export in Bulk", quadrant: "Outbound + Materialized", description: "Data needs to leave ServiceNow — defaulting to materialize/export pattern (most common outbound need)." };
        }

        return null;
    }

    function _bestGuessChapter(extracted) {
        // Fallback: make best guess from whatever we have
        if (extracted.systems) {
            var sysTxt = (extracted.systems).toLowerCase();
            if (_hasAny(sysTxt, ["snowflake", "databricks", "bigquery"])) {
                return { chapter: "4", title: "Read External Data Where It Sits", quadrant: "Inbound + Federated", description: "Your external analytical systems suggest a federated inbound pattern." };
            }
            if (_hasAny(sysTxt, ["sap", "workday", "oracle erp"])) {
                return { chapter: "4", title: "Read External Data Where It Sits", quadrant: "Inbound + Federated", description: "ERP systems often work best with federated live-query access." };
            }
            if (_hasAny(sysTxt, ["oracle db", "oracle"])) {
                return { chapter: "4", title: "Read External Data Where It Sits", quadrant: "Inbound + Federated", description: "Database systems can be queried live without copying data." };
            }
            if (_hasAny(sysTxt, ["kafka"])) {
                return { chapter: "7", title: "Export in Bulk", quadrant: "Outbound + Materialized", description: "Kafka suggests event streaming, likely outbound from ServiceNow." };
            }
            if (_hasAny(sysTxt, ["power bi", "tableau"])) {
                return { chapter: "6", title: "Open Up Live", quadrant: "Outbound + Federated", description: "BI tools suggest outbound live querying of ServiceNow data." };
            }
            if (_hasAny(sysTxt, ["salesforce", "jira"])) {
                return { chapter: "8a", title: "ServiceNow Triggers Others", quadrant: "Action Outbound", description: "CRM/project tools suggest workflow-level integration actions." };
            }
        }
        return { chapter: "4", title: "Read External Data Where It Sits", quadrant: "Inbound + Federated", description: "Default starting recommendation — query external data live." };
    }

    function text_has(text, phrase) {
        return text.indexOf(phrase) > -1;
    }

    function _hasAny(text, phrases) {
        for (var i = 0; i < phrases.length; i++) {
            if (text.indexOf(phrases[i]) > -1) return true;
        }
        return false;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PER-SYSTEM CHAPTER RESOLUTION (context-aware direction per system)
    // ═══════════════════════════════════════════════════════════════════════

    function _resolveSystemChapter(systemName, fullText, globalDirection, mechanism) {
        var ftLower = (fullText || '').toLowerCase();
        var sysLower = (systemName || '').toLowerCase();

        // Warehouse / analytical systems: check if source (inbound) or target (outbound)
        var warehouseSystems = ['snowflake', 'databricks', 'bigquery', 'datawarehouse'];
        var isWarehouse = false;
        for (var wi = 0; wi < warehouseSystems.length; wi++) {
            if (sysLower.indexOf(warehouseSystems[wi]) > -1) { isWarehouse = true; break; }
        }

        if (isWarehouse) {
            // Outbound indicators: "stream to X", "export to X", "send to X", "flowing to X", "push to X"
            var outboundToPatterns = ['to ' + sysLower, 'into ' + sysLower, 'feed ' + sysLower, 'flowing to ' + sysLower];
            var isOutboundTarget = false;
            for (var oi = 0; oi < outboundToPatterns.length; oi++) {
                if (ftLower.indexOf(outboundToPatterns[oi]) > -1) { isOutboundTarget = true; break; }
            }

            // Inbound indicators: "from X", "query X", "read X", "data in X", "X data warehouse"
            var inboundFromPatterns = ['from ' + sysLower, 'query ' + sysLower, 'read ' + sysLower, 'in ' + sysLower, sysLower + ' data'];
            var isInboundSource = false;
            for (var ii = 0; ii < inboundFromPatterns.length; ii++) {
                if (ftLower.indexOf(inboundFromPatterns[ii]) > -1) { isInboundSource = true; break; }
            }

            if (isOutboundTarget && !isInboundSource) {
                // E.g. "flowing to Databricks" → outbound target
                return (mechanism === 'materialize' || mechanism === 'both') ? '7' : '7'; // Stream/Table API
            }
            if (isInboundSource && !isOutboundTarget) return '4'; // ZCC
            // Ambiguous: use global direction
            if (globalDirection === 'outbound') {
                return (mechanism === 'materialize' || mechanism === 'both') ? '7' : '6';
            }
            return '4'; // Default: inbound (most common warehouse use case)
        }

        // BI tools are always outbound (they consume SN data)
        if (sysLower === 'power bi' || sysLower === 'tableau') return '6';

        // Kafka: direction-dependent
        if (sysLower === 'kafka') {
            var kafkaOutbound = ftLower.indexOf('to kafka') > -1 || ftLower.indexOf('feed kafka') > -1 || ftLower.indexOf('stream to') > -1;
            var kafkaInbound = ftLower.indexOf('from kafka') > -1 || ftLower.indexOf('kafka event') > -1 || ftLower.indexOf('kafka trigger') > -1;
            if (kafkaOutbound && !kafkaInbound) return '7';
            if (kafkaInbound && !kafkaOutbound) return '8b';
            if (globalDirection === 'outbound') return '7';
            return '8b'; // Default: inbound
        }

        // Content systems are always Ch5
        if (sysLower === 'sharepoint' || sysLower === 'confluence' || sysLower === 'google drive' || sysLower === 'slack') return '5';

        // ERP systems → Ch4 (inbound federate)
        if (sysLower === 'sap' || sysLower === 'workday' || sysLower === 'oracle erp') return '4';

        // Oracle DB → Ch4 (ZCC, not ERP); bare Oracle → check context
        if (sysLower === 'oracle db' || sysLower === 'oracle') {
            // If ERP keywords present in full text, treat as ERP
            if (ftLower.indexOf('ebs') > -1 || ftLower.indexOf('e-business') > -1 || ftLower.indexOf('fusion') > -1 || ftLower.indexOf('erp') > -1) return '4';
            // Otherwise treat as generic database → Ch4 (ZCC)
            return '4';
        }

        // Action systems → Ch8a
        if (sysLower === 'salesforce' || sysLower === 'jira' || sysLower === 'mainframe') return '8a';
        if (sysLower === 'ai/llm' || sysLower === 'mcp') return '8a';
        if (sysLower === 'aws' || sysLower === 'azure' || sysLower === 'gcp') return '8a';

        // Fallback to static map for any unmapped system
        if (SYSTEM_CHAPTER_MAP[systemName]) return SYSTEM_CHAPTER_MAP[systemName];

        return null;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // DISCOVERY QUESTIONS (Chapter 10)
    // ═══════════════════════════════════════════════════════════════════════

    function _askNextQuestion(extracted, currentTurn, userAnswers) {
        var latestAnswer = (userAnswers && userAnswers.length > 0) ? userAnswers[userAnswers.length - 1] : "";
        var ack = _buildAcknowledgment(extracted, currentTurn, latestAnswer);

        // Priority 1: No direction and no action → most discriminating question
        if (!extracted.direction && !extracted.action) {
            return {
                reply: ack + "Which direction is the data flowing? Is external data coming INTO ServiceNow, or does ServiceNow data need to go OUT to other tools? Or is this about triggering actions between systems?",
                type: "question",
                options: [
                    "Data coming INTO ServiceNow",
                    "Data going OUT of ServiceNow",
                    "Triggering actions between systems",
                    "Both directions"
                ],
                multiSelect: false
            };
        }

        // Priority 2: Have direction but no mechanism
        if (extracted.direction && !extracted.mechanism && !extracted.action) {
            if (extracted.direction === "inbound") {
                return {
                    reply: ack + "Does this data need to be visible to workflows as a live ServiceNow record, or is the access pattern more exploratory — like querying it for reports or dashboards without copying it in?",
                    type: "question",
                    options: [
                        "Keep a copy inside ServiceNow (for workflows, agents, records)",
                        "Query it live where it sits (no copy needed)",
                        "Not sure yet"
                    ],
                    multiSelect: false
                };
            }
            if (extracted.direction === "outbound") {
                return {
                    reply: ack + "Is this a one-time export, a continuous feed, or do external tools just need to query ServiceNow live without exporting?",
                    type: "question",
                    options: [
                        "One-time or infrequent bulk export",
                        "Continuous real-time feed (streaming)",
                        "External tools query ServiceNow live (no export)",
                        "Not sure yet"
                    ],
                    multiSelect: false
                };
            }
        }

        // Priority 3: No systems identified
        if (!extracted.systems) {
            return {
                reply: ack + "What external systems or platforms are involved? This helps me narrow down the right connector.",
                type: "question",
                options: [
                    "Snowflake / Databricks / BigQuery",
                    "SAP / Workday / Oracle (ERP)",
                    "Kafka / Event Streaming",
                    "Power BI / Tableau (BI Tools)",
                    "SharePoint / Confluence / Slack",
                    "Salesforce / Jira",
                    "AI/LLM Agents (Claude, GPT)",
                    "Legacy/Mainframe (no API)",
                    "Other / Custom"
                ],
                multiSelect: true
            };
        }

        // Priority 4: Additional refinement — staleness tolerance
        if (extracted.mechanism === "federate" || !extracted.mechanism) {
            return {
                reply: ack + "Does your answer need zero tolerance for staleness — meaning you always need the absolute latest data — or is a periodic refresh acceptable?",
                type: "question",
                options: [
                    "Must always be real-time / live",
                    "Periodic refresh is fine (hourly, daily)",
                    "Depends on the use case"
                ],
                multiSelect: false
            };
        }

        // Priority 5: Volume/pattern question
        return {
            reply: ack + "Is this a single-record action (like a workflow step reading one record from SAP), or a bulk analytical need (like querying millions of rows for BI)?",
            type: "question",
            options: [
                "Single-record actions (workflow/automation)",
                "Bulk analytical (BI, ML, reporting)",
                "Both single and bulk",
                "Unstructured content search"
            ],
            multiSelect: false
        };
    }

    // ═══════════════════════════════════════════════════════════════════════
    // FULL 4-STAGE RECOMMENDATION BUILDER
    // ═══════════════════════════════════════════════════════════════════════

    function _buildFullRecommendation(answers, extracted, chapter) {
        var chapterInfo = chapter;
        if (typeof chapter === "string") {
            // From front door — was passed as simple chapter string; shouldn't happen but guard
            chapterInfo = { chapter: chapter, title: "", quadrant: "", description: "" };
        }

        // ── Stage 1: Pattern ───────────────────────────────────────────
        var stage1 = _buildStage1(chapterInfo);

        // ── Stage 2: Connectors (multi-chapter aware) ─────────────────
        var stage2;
        var _systemsList = (extracted.systems || "").split(", ").filter(function(s) { return s.length > 0; });

        if (_systemsList.length >= 2) {
            var _chaptersNeeded = {};

            for (var msi = 0; msi < _systemsList.length; msi++) {
                var _sysName = _systemsList[msi];
                var _sysChapter = _resolveSystemChapter(_sysName, allUserText, extracted.direction, extracted.mechanism);

                if (_sysChapter) {
                    _chaptersNeeded[_sysChapter] = true;
                }
            }

            // Also include the primary resolved chapter
            if (chapterInfo.chapter) {
                _chaptersNeeded[chapterInfo.chapter] = true;
            }

            var _chapterKeys = Object.keys(_chaptersNeeded);

            if (_chapterKeys.length >= 2) {
                // Multi-chapter scenario — aggregate recommendations from all chapters
                var _allRecs = [];
                for (var mci = 0; mci < _chapterKeys.length; mci++) {
                    var _chInfo = { chapter: _chapterKeys[mci], product: null };
                    var _chRecs = _buildStage2(_chInfo, extracted, allUserText);
                    for (var mri = 0; mri < _chRecs.length; mri++) {
                        // Dedup by name
                        var _isDup = false;
                        for (var mdi = 0; mdi < _allRecs.length; mdi++) {
                            if (_allRecs[mdi].name === _chRecs[mri].name) { _isDup = true; break; }
                        }
                        if (!_isDup) _allRecs.push(_chRecs[mri]);
                    }
                }
                // Cap at 4 recommendations
                if (_allRecs.length > 4) _allRecs = _allRecs.slice(0, 4);
                stage2 = _allRecs.length > 0 ? _allRecs : _buildStage2(chapterInfo, extracted, allUserText);
            } else {
                stage2 = _buildStage2(chapterInfo, extracted, allUserText);
            }
        } else {
            stage2 = _buildStage2(chapterInfo, extracted, allUserText);
        }

        // ── Stage 3: Governance ────────────────────────────────────────
        var stage3 = _buildStage3(chapterInfo, extracted);

        // ── Stage 4: Proof scenarios from use_case table ───────────────
        var stage4 = _queryProofScenarios(extracted, stage2);

        // ── Score DB connectors for legacy format ──────────────────────
        var dbConnectors = _scoreDBConnectors(answers, extracted);

        // ── Score architecture patterns ────────────────────────────────
        var bestPattern = _scoreBestPattern(answers, extracted);

        // ── Next steps ─────────────────────────────────────────────────
        var nextSteps = _buildNextSteps(chapterInfo, extracted);

        // ── Build natural reply ────────────────────────────────────────
        var replyParts = [];
        replyParts.push("Based on what you've described");
        if (extracted.industry) replyParts.push(" in " + extracted.industry);
        if (extracted.systems) replyParts.push(" involving " + extracted.systems);
        replyParts.push(", your scenario maps to **" + stage1.title + "** (" + stage1.quadrant + ").");
        replyParts.push("\n\nThe recommended connector");
        if (stage2.length > 1) replyParts.push("s are");
        else replyParts.push(" is");
        for (var sc = 0; sc < stage2.length; sc++) {
            if (sc > 0) replyParts.push(sc === stage2.length - 1 ? " and" : ",");
            replyParts.push(" **" + stage2[sc].name + "**");
        }
        replyParts.push(". " + stage1.talkTrack);

        // ── Add capability callouts from enrichment engine ──
        if (stage2._callouts && stage2._callouts.length > 0) {
            for (var coi = 0; coi < stage2._callouts.length; coi++) {
                replyParts.push(stage2._callouts[coi].text);
            }
        }

        // ── Auto-added product callouts ──
        var autoAddedNames = [];
        var autoRequiredNames = [];
        for (var aaci = 0; aaci < stage2.length; aaci++) {
            if (stage2[aaci].isAutoAdded) {
                if (stage2[aaci].reason && stage2[aaci].reason.indexOf('⚙️ Required:') === 0) {
                    autoRequiredNames.push(stage2[aaci].name);
                } else {
                    autoAddedNames.push(stage2[aaci].name);
                }
            }
        }
        if (autoRequiredNames.length > 0) {
            replyParts.push("\n\n⚙️ **Prerequisites**: " + autoRequiredNames.join(", ") + " automatically included as required dependencies.");
        }
        if (autoAddedNames.length > 0) {
            replyParts.push("\n\n➕ **Complementary**: " + autoAddedNames.join(", ") + " included based on your scenario context.");
        }

        // Add 4C summary to reply
        if (stage2._fourC) {
            var fourCParts = [];
            if (stage2._fourC.connect.length > 0) fourCParts.push('**Connect**: ' + stage2._fourC.connect.map(function(p) { return p.name; }).join(', '));
            if (stage2._fourC.control.length > 0) fourCParts.push('**Control**: ' + stage2._fourC.control.map(function(p) { return p.name; }).join(', '));
            if (stage2._fourC.contextualize.length > 0) fourCParts.push('**Contextualize**: ' + stage2._fourC.contextualize.map(function(p) { return p.name; }).join(', '));
            if (stage2._fourC.converge.length > 0) fourCParts.push('**Converge**: ' + stage2._fourC.converge.map(function(p) { return p.name; }).join(', '));
            if (fourCParts.length >= 2) {
                replyParts.push('\n\nYour complete data architecture across all pillars:\n' + fourCParts.join('\n'));
            }
        }

        var replyText = replyParts.join("");

        var _result = {
            reply: replyText,
            type: "recommendation",
            options: [],
            multiSelect: false,
            recommendation: {
                stage1_pattern: stage1,
                stage2_connectors: stage2,
                stage3_governance: stage3,
                stage4_proof: stage4,
                nextSteps: nextSteps,
                connectors: dbConnectors,
                pattern: bestPattern,
                governance_detail: _getGovernanceDetail(stage2[0] ? stage2[0].name : ''),
                tradeoff_analysis: _getTradeoffAnalysis(stage2[0] ? stage2[0].name : ''),
                proof_points_detail: _getProofPointsDetail(stage2[0] ? stage2[0].name : ''),
                next_steps_roadmap: _getNextStepsRoadmap(stage2[0] ? stage2[0].name : ''),
                also_needed: _getAlsoNeeded(stage2),
                orchestration_flow: _getOrchestrationFlowText(stage2),
                fourC: stage2._fourC || null
            }
        };

        // Log conversation to chat_log table (fire-and-forget, never blocks response)
        try {
            var logGR = new GlideRecord('x_snc_wdf_advisory_chat_log');
            logGR.initialize();
            logGR.setValue('session_id', gs.generateGUID());
            logGR.setValue('user_query', (answers && answers.length > 0) ? answers[0] : '');
            logGR.setValue('messages', JSON.stringify(messages || []));
            logGR.setValue('recommendation', JSON.stringify(_result.recommendation || {}));
            var prodNames = [];
            if (_result.recommendation && _result.recommendation.stage2_connectors) {
                for (var _pi = 0; _pi < _result.recommendation.stage2_connectors.length; _pi++) {
                    prodNames.push(_result.recommendation.stage2_connectors[_pi].name);
                }
            }
            logGR.setValue('products_recommended', prodNames.join(', '));
            logGR.setValue('systems_detected', extracted.systems || '');
            logGR.setValue('industry_detected', extracted.industry || '');
            logGR.setValue('turn_count', turn || 0);
            logGR.setValue('path_used', 'deterministic');
            var pillars = [];
            if (_result.recommendation && _result.recommendation.fourC) {
                var fc = _result.recommendation.fourC;
                if (fc.connect && fc.connect.length > 0) pillars.push('Connect');
                if (fc.control && fc.control.length > 0) pillars.push('Control');
                if (fc.contextualize && fc.contextualize.length > 0) pillars.push('Contextualize');
                if (fc.converge && fc.converge.length > 0) pillars.push('Converge');
            }
            logGR.setValue('four_c_pillars', pillars.join(', '));
            logGR.insert();
        } catch (logErr) {
            // Never let logging break the response
            gs.warn('WDF Chat Log: ' + logErr.message);
        }

        return _result;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // STAGE 1: PATTERN (talk track per chapter)
    // ═══════════════════════════════════════════════════════════════════════

    function _buildStage1(chapterInfo) {
        var talkTracks = {
            "4": "Your data stays exactly where it is. ServiceNow reaches out and asks the question live, and your own security model still applies. No pipelines to build, no copies to keep fresh.",
            "5": "We bring the data in and keep it inside ServiceNow. Your workflows, agents, and platform features treat it as native data. The tradeoff is you need to keep it synchronized.",
            "6": "ServiceNow opens up its data live to external tools. BI analysts, data scientists, and AI models query ServiceNow directly without waiting for exports or extracts.",
            "7": "ServiceNow data gets exported — either as a one-time bulk transfer or a continuous stream. The external system owns its copy and can transform it however it needs.",
            "8a": "ServiceNow triggers actions in external systems — a workflow step reads from Salesforce, writes to SAP, or invokes an AI tool. This is about doing work, not moving data.",
            "8b": "Something outside ServiceNow triggers work inside it — an external event, an AI agent, or another system creates or updates ServiceNow records.",
            "8": "Action-layer integration in both directions — ServiceNow both triggers external work and responds to external triggers."
        };

        var ch = chapterInfo.chapter || "4";
        var trackKey = ch.replace("a", "").replace("b", "");
        if (ch === "8a" || ch === "8b") trackKey = ch;

        return {
            chapter: "",
            title: chapterInfo.title || "",
            quadrant: chapterInfo.quadrant || "",
            description: chapterInfo.description || "",
            talkTrack: talkTracks[trackKey] || talkTracks[ch.charAt(0)] || ""
        };
    }

    // ═══════════════════════════════════════════════════════════════════════
    // POST-PROCESSING: ENRICH RECOMMENDATIONS (dependency + capability)
    // ═══════════════════════════════════════════════════════════════════════

    function _enrichRecommendations(recommendations, fullText, portfolio) {
        var ftLower = (fullText || '').toLowerCase();

        // PHASE 1: Apply capability triggers
        var callouts = [];
        var productsToAdd = [];

        for (var ti = 0; ti < CAPABILITY_TRIGGERS.length; ti++) {
            var trigger = CAPABILITY_TRIGGERS[ti];

            // Check if any trigger keyword is in the full text
            var triggered = false;
            for (var ki = 0; ki < trigger.keywords.length; ki++) {
                if (ftLower.indexOf(trigger.keywords[ki]) > -1) {
                    triggered = true;
                    break;
                }
            }
            if (!triggered) continue;

            // Check if any recommended product matches appliesTo
            var matchedProduct = false;
            for (var ri = 0; ri < recommendations.length; ri++) {
                for (var ai = 0; ai < trigger.appliesTo.length; ai++) {
                    if (recommendations[ri].name === trigger.appliesTo[ai]) {
                        matchedProduct = true;
                        // Capability trigger matched — tracking via callouts array (no visible tag in reason text)
                        break;
                    }
                }
                if (matchedProduct) break;
            }

            if (matchedProduct) {
                // Add callout for response text
                if (trigger.callout) {
                    var dupCallout = false;
                    for (var ci = 0; ci < callouts.length; ci++) {
                        if (callouts[ci].id === trigger.id) { dupCallout = true; break; }
                    }
                    if (!dupCallout) callouts.push({ id: trigger.id, text: trigger.callout });
                }

                // Add complementary product if specified
                if (trigger.addProduct) {
                    var alreadyRecommended = false;
                    for (var ari = 0; ari < recommendations.length; ari++) {
                        if (recommendations[ari].name === trigger.addProduct) { alreadyRecommended = true; break; }
                    }
                    if (!alreadyRecommended) {
                        var dupAdd = false;
                        for (var dai = 0; dai < productsToAdd.length; dai++) {
                            if (productsToAdd[dai].name === trigger.addProduct) { dupAdd = true; break; }
                        }
                        if (!dupAdd) {
                            productsToAdd.push({ name: trigger.addProduct, reason: trigger.addProductReason });
                        }
                    }
                }
            }
        }

        // PHASE 2: Apply product dependencies (requires/complementary)
        // Check each recommended product for prerequisites
        for (var di = 0; di < recommendations.length; di++) {
            var dep = PRODUCT_DEPENDENCIES[recommendations[di].name];
            if (!dep) continue;

            // Required dependencies (must-have)
            if (dep.requires) {
                for (var dri = 0; dri < dep.requires.length; dri++) {
                    var reqName = dep.requires[dri];
                    var alreadyHas = false;
                    for (var ahi = 0; ahi < recommendations.length; ahi++) {
                        if (recommendations[ahi].name === reqName) { alreadyHas = true; break; }
                    }
                    if (!alreadyHas) {
                        var dupReq = false;
                        for (var dqi = 0; dqi < productsToAdd.length; dqi++) {
                            if (productsToAdd[dqi].name === reqName) { dupReq = true; break; }
                        }
                        if (!dupReq) {
                            productsToAdd.push({ name: reqName, reason: dep.note, required: true });
                        }
                    }
                }
            }

            // Complementary (nice-to-have, only added by CAPABILITY_TRIGGERS when context matches)
        }

        // PHASE 3: Add products from Phase 1 and Phase 2
        for (var pai = 0; pai < productsToAdd.length; pai++) {
            var toAdd = productsToAdd[pai];
            // Find in portfolio
            for (var pfi = 0; pfi < portfolio.length; pfi++) {
                if (portfolio[pfi].name === toAdd.name) {
                    recommendations.push({
                        name: portfolio[pfi].name,
                        chapter: '',
                        reason: (toAdd.required ? '⚙️ Required: ' : '➕ Complementary: ') + toAdd.reason,
                        status: portfolio[pfi].status,
                        tradeoffs: portfolio[pfi].tradeoffs,
                        isAutoAdded: true
                    });
                    break;
                }
            }
        }

        // PHASE 4: Also check if auto-added products have their own dependencies
        // (e.g., if HTAP Engine was added by performance trigger, it needs RaptorDB Pro)
        for (var pi = 0; pi < recommendations.length; pi++) {
            var pDep = PRODUCT_DEPENDENCIES[recommendations[pi].name];
            if (!pDep || !pDep.requires) continue;
            for (var pri = 0; pri < pDep.requires.length; pri++) {
                var rn = pDep.requires[pri];
                var has = false;
                for (var hi = 0; hi < recommendations.length; hi++) {
                    if (recommendations[hi].name === rn) { has = true; break; }
                }
                if (!has) {
                    for (var fpfi = 0; fpfi < portfolio.length; fpfi++) {
                        if (portfolio[fpfi].name === rn) {
                            recommendations.push({
                                name: portfolio[fpfi].name,
                                chapter: '',
                                reason: '⚙️ Required: ' + pDep.note,
                                status: portfolio[fpfi].status,
                                tradeoffs: portfolio[fpfi].tradeoffs,
                                isAutoAdded: true
                            });
                            break;
                        }
                    }
                }
            }
        }

        // PHASE 5: Build 4C cross-product recommendation
        var fourC = { connect: [], control: [], contextualize: [], converge: [] };

        // Categorize existing recommendations into pillars
        var connectProducts = ['Zero Copy Connectors', 'ZCC for ERP', 'Stream Connect', 'Stream Connect Inbound', 'Stream Connect Outbound', 'External Content Connectors (XCC)', 'Integration Hub', 'Live Connect', 'MCP Client', 'SN MCP Server', 'RPA Hub', 'Table API', 'Inbound APIs'];
        var contextualizeProducts = ['RaptorDB Pro', 'HTAP Engine', 'Live Archive'];
        var convergeProducts = ['Automation Engine'];

        for (var fci = 0; fci < recommendations.length; fci++) {
            var recName = recommendations[fci].name;
            if (connectProducts.indexOf(recName) > -1) {
                fourC.connect.push({ name: recName, reason: recommendations[fci].reason || '' });
            } else if (contextualizeProducts.indexOf(recName) > -1) {
                fourC.contextualize.push({ name: recName, reason: recommendations[fci].reason || '' });
            } else if (convergeProducts.indexOf(recName) > -1) {
                fourC.converge.push({ name: recName, reason: recommendations[fci].reason || '' });
            }
        }

        // Auto-add Control pillar (always include Data Catalog)
        if (fourC.control.length === 0) {
            fourC.control.push({ name: 'Data Catalog', reason: 'Register and track all data assets flowing through the recommended connectors' });

            // Add Data Governance if compliance/sensitivity keywords in full text
            var govKeywords = ['compliance', 'gdpr', 'hipaa', 'sox', 'pci', 'regulated', 'pii', 'sensitive', 'audit', 'retention', 'masking', 'privacy'];
            var hasGovNeed = false;
            for (var gki = 0; gki < govKeywords.length; gki++) {
                if (ftLower.indexOf(govKeywords[gki]) > -1) { hasGovNeed = true; break; }
            }
            if (hasGovNeed) {
                fourC.control.push({ name: 'Data Governance', reason: 'Enforce compliance policies, data quality rules, and access controls' });
            }
        }

        // Auto-add Contextualize if analytics/performance detected but not already present
        if (fourC.contextualize.length === 0) {
            var ctxKeywords = ['analytics', 'reporting', 'dashboard', 'bi', 'medallion', 'trends', 'forecasting', 'insights', 'slow', 'performance', 'sluggish', 'historical', 'retention', 'archive', 'years of data', 'old records', 'long-term', 'ai native', 'ai-native', 'ai ready', 'ai-ready'];
            var hasCtxNeed = false;
            for (var cki = 0; cki < ctxKeywords.length; cki++) {
                if (ftLower.indexOf(ctxKeywords[cki]) > -1) { hasCtxNeed = true; break; }
            }
            if (hasCtxNeed) {
                fourC.contextualize.push({ name: 'RaptorDB Pro', reason: 'HTAP engine for analytics without impacting operational performance' });

                // Also check for historical/archive specifically → add Live Archive
                var histKeywords = ['historical', 'retention', 'archive', 'years of data', 'old records', 'long-term'];
                var hasHistNeed = false;
                for (var hki = 0; hki < histKeywords.length; hki++) {
                    if (ftLower.indexOf(histKeywords[hki]) > -1) { hasHistNeed = true; break; }
                }
                if (hasHistNeed) {
                    fourC.contextualize.push({ name: 'Live Archive', reason: 'Retain and query historical data with full live access (requires RaptorDB Pro)' });
                }
            }
        }

        // Auto-add Converge if automation detected but not already present
        if (fourC.converge.length === 0) {
            var convKeywords = ['automate', 'automation', 'trigger', 'alert', 'threshold', 'rule', 'escalate', 'notify', 'when stock', 'when inventory', 'if score', 'ai native', 'ai-native', 'ai ready', 'ai-ready'];
            var hasConvNeed = false;
            for (var cvki = 0; cvki < convKeywords.length; cvki++) {
                if (ftLower.indexOf(convKeywords[cvki]) > -1) { hasConvNeed = true; break; }
            }
            if (hasConvNeed) {
                fourC.converge.push({ name: 'Automation Engine', reason: 'Event-driven automation to trigger actions based on data patterns' });
            }
        }

        // Auto-add MCP Client to Connect if AI-native intent detected
        var aiKeywords = ['ai native', 'ai-native', 'ai ready', 'ai-ready', 'ai powered', 'ai-powered', 'ai agent', 'agentic', 'genai', 'gen ai', 'llm', 'generative ai', 'large language model'];
        var hasAIIntent = false;
        for (var aki = 0; aki < aiKeywords.length; aki++) {
            if (ftLower.indexOf(aiKeywords[aki]) > -1) { hasAIIntent = true; break; }
        }
        if (hasAIIntent) {
            var hasMCP = false;
            for (var mci = 0; mci < fourC.connect.length; mci++) {
                if (fourC.connect[mci].name === 'MCP Client') { hasMCP = true; break; }
            }
            if (!hasMCP) {
                fourC.connect.push({ name: 'MCP Client', reason: 'Enables AI agents to invoke external tools — key to your AI-native goal' });
            }
        }

        // Attach fourC to recommendations array
        recommendations._fourC = fourC;

        // Cap at 5 to keep manageable
        if (recommendations.length > 5) {
            recommendations = recommendations.slice(0, 5);
        }

        // Attach callouts for the reply builder to use
        recommendations._callouts = callouts;

        return recommendations;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // STAGE 2: CONNECTOR RECOMMENDATION (16-product portfolio)
    // ═══════════════════════════════════════════════════════════════════════

    function _buildStage2(chapterInfo, extracted, fullText) {
        // Full 16-product portfolio with tradeoffs
        var portfolio = [
            { name: "Zero Copy Connectors", chapter: "4", direction: "Inbound", mechanism: "Live query", whatFor: "Query external data warehouses and lakes (Snowflake, Databricks, BigQuery, and more) live without copying. Prebuilt connectors enable connections up to 6x faster, cutting integration costs by up to 70%. Includes Reverse Tunnel for secure private network access without MID Server or VPN.", status: "GA", systemHints: ["snowflake", "databricks", "bigquery", "data lake", "trino", "federation", "reverse tunnel", "private network", "ip whitelist", "datawarehouse", "data warehouse", "warehouse", "lakehouse", "oracle db", "oracle database"], tradeoffs: { freshness: "Exact — no copy to lag", maintenance: "No pipeline to build; connector config only", accessControl: "Source's native rules inherited", history: "No — live query only, point-in-time", scaleRisk: "Slowest source in a cross-system query" } },
            { name: "ZCC for ERP", chapter: "4", direction: "Inbound", mechanism: "Live query", whatFor: "Same federated pattern for SAP/Workday-shaped ERP systems. Supports Reverse Tunnel for private network connectivity.", status: "GA", systemHints: ["sap", "workday", "oracle erp", "oracle ebs", "oracle e-business", "oracle fusion", "oracle cloud erp", "jd edwards", "peoplesoft", "erp", "reverse tunnel"], tradeoffs: { freshness: "Exact — reads live ERP data", maintenance: "Connector + ERP-side credentials; no pipeline", accessControl: "ERP's access rules apply", history: "No — live query only", scaleRisk: "ERP API rate limits; batch-size caps" } },
            { name: "RaptorDB Pro", chapter: "6", direction: "Platform", mechanism: "HTAP engine + medallion architecture", whatFor: "HTAP database engine using medallion architecture to ingest and unify external data. Runs transactional and analytical queries on live data simultaneously. Powers Live Connect (external BI access) and Live Archive (historical data). Enables ultra-fast workflow performance at scale.", status: "GA", systemHints: ["raptordb", "htap", "medallion", "analytics", "performance", "reporting", "dashboard", "column-store"], tradeoffs: { freshness: "Depends on sync schedule (minutes to hours)", maintenance: "Need sync pipeline and monitoring", accessControl: "ServiceNow ACLs apply after import", history: "Yes — data stored in SN, can version/archive", scaleRisk: "Storage growth; sync pipeline failures" } },
            { name: "External Content Connectors (XCC)", chapter: "5", direction: "Inbound", mechanism: "Keep a copy", whatFor: "Index external content (Slack, Confluence, SharePoint) for ServiceNow AI Search", status: "GA", systemHints: ["sharepoint", "confluence", "slack", "google drive", "content", "unstructured"], tradeoffs: { freshness: "Crawl-based — minutes to hours depending on config", maintenance: "Crawl schedule and connector auth", accessControl: "SN search respects source ACLs via connector config", history: "Indexed content versioned by crawl", scaleRisk: "Crawl throughput; large content repos can lag" } },
            { name: "Live Connect", chapter: "6", direction: "Outbound", mechanism: "Live query", whatFor: "Let external BI/AI tools (Power BI, Tableau, SQL clients) query ServiceNow data live", status: "GA", systemHints: ["power bi", "tableau", "bi", "sql client", "reporting"], tradeoffs: { freshness: "Exact — queries hit live SN data", maintenance: "Minimal — SQL endpoint config", accessControl: "ServiceNow ACLs enforced on every query", history: "Limited to what's in SN tables", scaleRisk: "Heavy analytical queries can impact instance if HTAP not enabled" } },
            { name: "HTAP Engine", chapter: "6", direction: "Outbound", mechanism: "Live query", whatFor: "Powered by RaptorDB Pro (required). Separates analytical query load from the operational instance, preventing heavy reports from impacting transaction performance. Uses column-store indexing and parallel processing.", status: "GA", systemHints: ["htap", "analytical", "slow report", "performance"], tradeoffs: { freshness: "Near-real-time replica (seconds lag)", maintenance: "Platform-managed — minimal ops", accessControl: "Same SN ACLs; separate compute", history: "Same as SN tables", scaleRisk: "Replica lag under extreme write bursts" } },
            { name: "Live Archive", chapter: "6", direction: "Outbound", mechanism: "Live query cold", whatFor: "Powered by RaptorDB Pro (required). Offloads growing ServiceNow data to archival storage while keeping it fully queryable for agentic and deterministic workflows. Extends live query reach into historical data.", status: "GA", systemHints: ["archive", "historical", "retention", "cold data"], tradeoffs: { freshness: "Archived data — not changing; query is live", maintenance: "Archive policy config", accessControl: "ServiceNow ACLs still apply", history: "Full — that is the point, years of retention", scaleRisk: "Query latency on very deep archives" } },
            { name: "Table API", chapter: "7", direction: "Outbound", mechanism: "Copy batch", whatFor: "One-time or infrequent bulk export of ServiceNow data", status: "GA", systemHints: ["export", "bulk", "one-time", "rest api"], tradeoffs: { freshness: "Point-in-time snapshot — stale immediately", maintenance: "Script/scheduled job to run exports", accessControl: "API user's SN ACLs at export time", history: "Only what you export and store externally", scaleRisk: "Large exports can time out; pagination required" } },
            { name: "Stream Connect Outbound", chapter: "7", direction: "Outbound", mechanism: "Copy continuous", whatFor: "Continuous feed of ServiceNow changes to external Kafka/streaming consumers", status: "GA", systemHints: ["kafka", "streaming", "cdc", "continuous", "event stream"], tradeoffs: { freshness: "Near-real-time (seconds from commit)", maintenance: "Kafka cluster + topic config + monitoring", accessControl: "Kafka consumer must enforce its own ACLs", history: "Kafka retention window", scaleRisk: "High-volume tables can saturate topics" } },
            { name: "Stream Connect Inbound", chapter: "8b", direction: "Inbound", mechanism: "One event", whatFor: "External Kafka events trigger ServiceNow flows or create records", status: "GA", systemHints: ["kafka", "inbound event", "trigger"], tradeoffs: { freshness: "Event-driven — as fast as Kafka delivers", maintenance: "Kafka consumer config + flow designer setup", accessControl: "ServiceNow flow ACLs + inbound mapping", history: "Kafka topic retention + SN audit trail", scaleRisk: "Burst events can queue; need flow concurrency tuning" } },
            { name: "Integration Hub", chapter: "8a", direction: "Bidirectional", mechanism: "Multi-pattern", whatFor: "Comprehensive integration platform with 600+ prebuilt spokes, Remote Tables for lightweight federation, IH Import for data mapping, REST API Trigger for inbound webhooks, and GenAI-powered Spoke Generator. Connects hundreds of enterprise apps to ServiceNow workflows.", status: "GA", systemHints: ["salesforce", "jira", "spoke", "integration hub", "workflow", "import", "remote table", "webhook", "flow", "automation", "rest trigger"], tradeoffs: { freshness: "Real-time per action execution", maintenance: "Spoke config + credential management", accessControl: "Spoke's auth; SN flow permissions", history: "Flow execution log", scaleRisk: "Spoke API rate limits; parallel action caps" } },
            { name: "MCP Client", chapter: "8a", direction: "Outbound", mechanism: "One action", whatFor: "ServiceNow AI agent invokes external MCP server tools", status: "GA", systemHints: ["mcp client", "mcp", "ai agent", "agent needs", "agent call", "agent query", "agent access", "agent invoke", "agent look up", "agent check", "agent tool", "claude", "gpt"], tradeoffs: { freshness: "Real-time per invocation", maintenance: "MCP server registry + trust config", accessControl: "MCP Registry governs which servers are callable", history: "Agent execution audit trail", scaleRisk: "External MCP server availability/latency" } },
            { name: "RPA Hub", chapter: "8a", direction: "Outbound", mechanism: "One action UI", whatFor: "Intelligent robotic process automation hub for systems with no API. Automates cross-system processes via UI interactions, cutting manual tasks from days to hours.", status: "GA", systemHints: ["rpa", "mainframe", "legacy", "no api", "screen"], tradeoffs: { freshness: "Real-time per bot execution", maintenance: "Bot scripts break when target UI changes", accessControl: "Bot's login credentials", history: "RPA execution logs", scaleRisk: "UI-dependent — fragile at scale" } },
            { name: "MCP Registry", chapter: "8a", direction: "N/A", mechanism: "Trust/governance", whatFor: "Curates and governs which MCP servers the MCP Client may call", status: "Roadmap", systemHints: ["mcp registry", "governance", "trust"], tradeoffs: { freshness: "N/A — governance layer", maintenance: "Registry curation", accessControl: "Central trust policy", history: "Audit log of approvals", scaleRisk: "N/A" } },
            { name: "SN MCP Server", chapter: "8b", direction: "Inbound", mechanism: "One action", whatFor: "External AI agents (Claude, GPT) invoke ServiceNow capabilities", status: "GA", systemHints: ["mcp server", "claude", "gpt", "external ai", "external agent"], tradeoffs: { freshness: "Real-time per invocation", maintenance: "MCP server endpoint config + ACLs", accessControl: "ServiceNow ACLs + MCP auth", history: "Invocation audit trail", scaleRisk: "Concurrent agent calls; rate limiting needed" } },
            { name: "Inbound APIs", chapter: "8b", direction: "Inbound", mechanism: "One record", whatFor: "External systems create/update ServiceNow records via REST/SOAP", status: "GA", systemHints: ["inbound api", "rest api", "create record", "update record", "webhook"], tradeoffs: { freshness: "Real-time per API call", maintenance: "API endpoint + auth + scripted rules", accessControl: "ServiceNow ACLs on target tables", history: "Audit trail on records", scaleRisk: "API rate limits; transaction concurrency" } },
            { name: "Data Catalog", chapter: "control", direction: "Platform", mechanism: "Metadata registry", whatFor: "Central registry of all data assets with metadata, lineage, and business glossary. Register data sources, tables, and fields with business context.", status: "GA", systemHints: ["catalog", "metadata", "lineage", "glossary", "discovery", "data assets", "registry"], tradeoffs: { freshness: "Metadata always current", maintenance: "Auto-discovery from connectors", accessControl: "ServiceNow ACLs", history: "Full lineage tracking", scaleRisk: "N/A — metadata only" } },
            { name: "Data Governance", chapter: "control", direction: "Platform", mechanism: "Policy enforcement", whatFor: "Enforce data quality, compliance, access control, and retention policies. PII masking, classification, row-level security, and full audit trails.", status: "GA", systemHints: ["governance", "compliance", "quality", "pii", "masking", "retention", "gdpr", "hipaa", "sox", "pci", "audit", "policy", "classification", "sensitive", "regulated"], tradeoffs: { freshness: "Policies enforced in real-time", maintenance: "Rule configuration", accessControl: "Granular RLS + field masking", history: "Full audit trail", scaleRisk: "N/A — policy layer" } },
            { name: "Automation Engine", chapter: "converge", direction: "Platform", mechanism: "Event-driven rules", whatFor: "Event-driven automation rules that trigger actions based on data patterns and thresholds. Define rules like 'when inventory < 5, create PO' or 'when fraud score > 0.8, escalate.'", status: "GA", systemHints: ["automation", "automate", "trigger", "threshold", "alert", "rule", "event-driven", "pattern", "escalate", "notify", "when", "if then"], tradeoffs: { freshness: "Sub-second rule evaluation", maintenance: "Rule definition", accessControl: "Execution permissions", history: "Execution audit trail", scaleRisk: "Complex rule chains" } }
        ];

        var ch = (chapterInfo.chapter || "").replace("Ch. ", "");
        var sysTxt = ((extracted.systems || "") + " " + (fullText || "")).toLowerCase();
        var recommendations = [];

        // Primary: match by chapter
        for (var i = 0; i < portfolio.length; i++) {
            var p = portfolio[i];
            if (p.chapter === ch || (ch === "8" && (p.chapter === "8a" || p.chapter === "8b"))) {
                var sysMatch = false;
                for (var s = 0; s < p.systemHints.length; s++) {
                    if (sysTxt.indexOf(p.systemHints[s]) > -1) { sysMatch = true; break; }
                }
                if (sysMatch) {
                    recommendations.unshift({ name: p.name, chapter: "", reason: p.whatFor, status: p.status, tradeoffs: p.tradeoffs });
                }
                // else: chapter matches but system does NOT match → skip entirely (do not recommend)
            }
        }

        // If front door gave us a specific product, ensure it's first
        if (chapterInfo.product) {
            var foundIdx = -1;
            for (var fi = 0; fi < recommendations.length; fi++) {
                if (recommendations[fi].name === chapterInfo.product) { foundIdx = fi; break; }
            }
            if (foundIdx > 0) {
                var item = recommendations.splice(foundIdx, 1)[0];
                recommendations.unshift(item);
            } else if (foundIdx === -1) {
                // Product from front door not in chapter matches — find in full portfolio
                for (var fp = 0; fp < portfolio.length; fp++) {
                    if (portfolio[fp].name === chapterInfo.product) {
                        recommendations.unshift({ name: portfolio[fp].name, chapter: "", reason: portfolio[fp].whatFor, status: portfolio[fp].status, tradeoffs: portfolio[fp].tradeoffs });
                        break;
                    }
                }
            }
        }

        // Cap at 3 recommendations
        if (recommendations.length > 3) {
            recommendations = recommendations.slice(0, 3);
        }

        // Ensure at least one recommendation — AI-aware fallback
        if (recommendations.length === 0) {
            // Check if AI intent is present in the conversation
            var aiKeywords = ['ai native', 'ai-native', 'ai ready', 'ai-ready', 'ai agent', 'agentic',
                'generative ai', 'genai', 'gen ai', 'llm', 'copilot', 'ai powered', 'ai-powered',
                'artificial intelligence', 'machine learning', 'make it ai', 'make my system ai',
                'large language model', 'now assist', 'intelligent agent'];
            var hasAIIntent = false;
            var ftCheck = (fullText || '').toLowerCase();
            for (var aki = 0; aki < aiKeywords.length; aki++) {
                if (ftCheck.indexOf(aiKeywords[aki]) > -1) { hasAIIntent = true; break; }
            }

            if (hasAIIntent) {
                // AI intent detected — recommend MCP Client as primary
                for (var mpi = 0; mpi < portfolio.length; mpi++) {
                    if (portfolio[mpi].name === 'MCP Client') {
                        recommendations.push({
                            name: portfolio[mpi].name,
                            chapter: '',
                            reason: 'Your AI-native goal points to MCP Client — enables ServiceNow AI agents to invoke external tools and data sources via the Model Context Protocol. ' + portfolio[mpi].whatFor,
                            status: portfolio[mpi].status,
                            tradeoffs: portfolio[mpi].tradeoffs
                        });
                        break;
                    }
                }
                // Also add Integration Hub as complement
                for (var ihi = 0; ihi < portfolio.length; ihi++) {
                    if (portfolio[ihi].name === 'Integration Hub') {
                        recommendations.push({
                            name: portfolio[ihi].name,
                            chapter: '',
                            reason: 'Complements MCP Client with 600+ prebuilt spokes for workflow-level integrations. ' + portfolio[ihi].whatFor,
                            status: portfolio[ihi].status,
                            tradeoffs: portfolio[ihi].tradeoffs
                        });
                        break;
                    }
                }
                // Also add SN MCP Server if "external agents" context is present
                var externalAgentKeywords = ['external agent', 'external ai', 'partner ai', 'claude', 'gpt', 'openai', 'copilot'];
                var hasExternalAgent = false;
                for (var eai = 0; eai < externalAgentKeywords.length; eai++) {
                    if (ftCheck.indexOf(externalAgentKeywords[eai]) > -1) { hasExternalAgent = true; break; }
                }
                if (hasExternalAgent) {
                    for (var smi = 0; smi < portfolio.length; smi++) {
                        if (portfolio[smi].name === 'SN MCP Server') {
                            recommendations.push({
                                name: portfolio[smi].name,
                                chapter: '',
                                reason: 'Exposes ServiceNow capabilities as tools for external AI agents. ' + portfolio[smi].whatFor,
                                status: portfolio[smi].status,
                                tradeoffs: portfolio[smi].tradeoffs
                            });
                            break;
                        }
                    }
                }
            } else {
                // No AI intent — default to Integration Hub
                recommendations.push({ name: "Integration Hub", chapter: "", reason: "General-purpose workflow integration — a safe starting point", status: "GA", tradeoffs: { freshness: "Real-time per action execution", maintenance: "Spoke config + credential management", accessControl: "Spoke auth; SN flow permissions", history: "Flow execution log", scaleRisk: "Spoke API rate limits" } });
            }
        }

        // ── Post-processing: Universal enrichment (dependencies + capabilities) ──
        recommendations = _enrichRecommendations(recommendations, fullText, portfolio);

        return recommendations;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // STAGE 3: GOVERNANCE
    // ═══════════════════════════════════════════════════════════════════════

    function _buildStage3(chapterInfo, extracted) {
        var ch = (chapterInfo.chapter || "").replace("Ch. ", "");
        var governance = {
            accessControl: "",
            dataResidency: "",
            status: "",
            governance: "",
            constraints: []
        };

        // Access control by chapter
        var accessByChapter = {
            "4": "Source system's native access rules inherited — no SN ACL bypass",
            "5": "ServiceNow ACLs apply after import; source permissions lost",
            "6": "ServiceNow ACLs enforced on every external query",
            "7": "API user's permissions at export time; external system must re-enforce",
            "8a": "Spoke's authentication; ServiceNow flow-level permissions",
            "8b": "ServiceNow ACLs + inbound authentication (OAuth, API key, mutual TLS)"
        };
        governance.accessControl = accessByChapter[ch] || accessByChapter[ch.charAt(0)] || "Depends on connector and pattern";

        // Data residency
        var residencyByChapter = {
            "4": "Data never leaves the source system — only query results transit",
            "5": "Data copied into ServiceNow — SN data residency policies apply",
            "6": "Data stays in ServiceNow — only query results sent externally",
            "7": "Data exported — external system's residency policies apply",
            "8a": "Single-record transit — minimal data movement, action-oriented",
            "8b": "Inbound data lands in ServiceNow — SN residency policies apply"
        };
        governance.dataResidency = residencyByChapter[ch] || residencyByChapter[ch.charAt(0)] || "Depends on data flow direction";

        // GA vs roadmap
        var gaChapters = ["4", "5", "6", "7"];
        var mixedChapters = ["8a", "8b"];
        if (gaChapters.indexOf(ch) > -1) {
            governance.status = "GA — production ready";
        } else if (mixedChapters.indexOf(ch) > -1) {
            governance.status = "Mixed — core connectors GA, MCP features GA since Xanadu";
        } else {
            governance.status = "Check individual connector status";
        }

        // Governance recommendations
        var govRecs = [];
        govRecs.push("Consider Autonomous Data Governance for data quality, enrichment, and lifecycle management");

        var fullText = (extracted.systems || "").toLowerCase();
        if (_hasAny(fullText, ["ai", "llm", "claude", "gpt", "mcp", "agent"])) {
            govRecs.push("AI Control Tower recommended for governing AI agent access and tool usage");
            govRecs.push("MCP Registry for curating trusted external tool endpoints");
        }
        if (ch === "5" || ch === "7") {
            govRecs.push("Data quality jobs: classification, enrichment, deduplication, PII detection, lineage tracking");
        }
        if (ch === "6") {
            govRecs.push("HTAP Engine recommended if analytical queries risk impacting operational performance");
        }
        governance.governance = govRecs.join(". ");

        // Constraints
        var constraints = [];
        if (ch === "4") {
            constraints.push("MID Server required for on-premise data sources");
            constraints.push("Query performance depends on source system capacity");
        }
        if (ch === "5") {
            constraints.push("Sync pipeline requires monitoring for freshness SLA");
            constraints.push("Storage costs grow with data volume");
        }
        if (ch === "6") {
            constraints.push("SQL-based access requires Live Connect licensing");
            constraints.push("Enable HTAP to protect operational instance from heavy queries");
        }
        if (ch === "7") {
            constraints.push("Kafka infrastructure required for Stream Connect");
            constraints.push("Large exports need pagination and error handling");
        }
        if (ch === "8a" || ch === "8b" || ch === "8") {
            constraints.push("Spoke licensing per connector");
            constraints.push("MCP features are GA since Xanadu — verify instance version");
        }

        var timeline = extracted.timeline || "";
        if (timeline.indexOf("Immediate") > -1) {
            constraints.push("Filter to GA-status connectors only for immediate deployment");
        }

        governance.constraints = constraints;
        return governance;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // STAGE 4: PROOF SCENARIOS (query use_case table)
    // ═══════════════════════════════════════════════════════════════════════

    function _queryProofScenarios(extracted, stage2connectors) {
        var proofs = [];
        var gr = new GlideRecord("x_snc_wdf_advisory_use_case");
        gr.orderBy("title");
        gr.query();

        var industry = (extracted.industry || "").toLowerCase();
        var systems = (extracted.systems || "").toLowerCase();

        // Collect product names from stage2 connectors
        var productNames = [];
        for (var pn = 0; pn < stage2connectors.length; pn++) {
            productNames.push(stage2connectors[pn].name.toLowerCase());
        }

        while (gr.next()) {
            var score = 0;
            var matchReasons = [];

            var ucIndustry = (gr.getValue("industry") || "").toLowerCase();
            var ucProducts = (gr.getValue("products") || "").toLowerCase();
            var ucSystems = (gr.getValue("external_systems") || "").toLowerCase();
            var ucKeywords = (gr.getValue("keywords") || "").toLowerCase();
            var ucTitle = (gr.getValue("title") || "").toLowerCase();
            var ucProblem = (gr.getValue("business_problem") || "").toLowerCase();

            // Industry match
            if (industry && ucIndustry.indexOf(industry) > -1) {
                score += 3;
                matchReasons.push("industry");
            }

            // System match
            if (systems) {
                var sysArr = systems.split(", ");
                for (var si = 0; si < sysArr.length; si++) {
                    var sysLower = sysArr[si].toLowerCase();
                    if (ucSystems.indexOf(sysLower) > -1 || ucKeywords.indexOf(sysLower) > -1) {
                        score += 4;
                        matchReasons.push("system:" + sysArr[si]);
                        break;
                    }
                }
            }

            // Product match
            for (var pi = 0; pi < productNames.length; pi++) {
                // Check for partial matches (e.g. "zero copy" in "zero copy connectors")
                var prodWords = productNames[pi].split(" ");
                for (var pw = 0; pw < prodWords.length; pw++) {
                    if (prodWords[pw].length > 3 && ucProducts.indexOf(prodWords[pw]) > -1) {
                        score += 3;
                        matchReasons.push("product");
                        break;
                    }
                }
            }

            // Keyword overlap from all user text
            var allText = (extracted.systems || "") + " " + (extracted.industry || "");
            var words = allText.toLowerCase().split(/\s+/);
            for (var wi = 0; wi < words.length; wi++) {
                if (words[wi].length > 3) {
                    if (ucTitle.indexOf(words[wi]) > -1 || ucProblem.indexOf(words[wi]) > -1 || ucKeywords.indexOf(words[wi]) > -1) {
                        score += 1;
                    }
                }
            }

            if (score >= 3) {
                var confidence = "Low";
                if (score >= 8) confidence = "High";
                else if (score >= 5) confidence = "Medium";

                proofs.push({
                    score: score,
                    title: gr.getValue("title") || "",
                    industry: gr.getValue("industry") || "",
                    systems: gr.getValue("external_systems") || "",
                    products: gr.getValue("products") || "",
                    confidence: confidence,
                    summary: gr.getValue("outcome") || gr.getValue("solution") || "",
                    matchReasons: matchReasons.join(", ")
                });
            }
        }

        // Sort by score descending
        proofs.sort(function(a, b) { return b.score - a.score; });

        // Return top 3
        var topProofs = [];
        for (var tp = 0; tp < Math.min(3, proofs.length); tp++) {
            topProofs.push({
                title: proofs[tp].title,
                industry: proofs[tp].industry,
                systems: proofs[tp].systems,
                confidence: proofs[tp].confidence,
                summary: proofs[tp].summary
            });
        }

        return topProofs;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // DB CONNECTOR SCORING (legacy format compatibility)
    // ═══════════════════════════════════════════════════════════════════════

    function _scoreDBConnectors(answers, extracted) {
        var allText = answers.join(" ").toLowerCase();
        var connectors = [];
        var gr = new GlideRecord("x_snc_wdf_advisory_connector");
        gr.orderBy("name");
        gr.query();
        while (gr.next()) {
            connectors.push({
                sys_id: gr.getUniqueValue(),
                name: gr.getValue("name") || "",
                tagline: gr.getValue("tagline") || "",
                best_for: gr.getValue("best_for") || "",
                keywords: gr.getValue("keywords") || "",
                status: gr.getValue("status") || ""
            });
        }

        var scored = [];
        for (var c = 0; c < connectors.length; c++) {
            var conn = connectors[c];
            var score = 0;
            var kw = (conn.best_for + " " + conn.keywords + " " + conn.tagline + " " + conn.name).toLowerCase();

            // Word-level matching
            var words = allText.split(/\s+/);
            for (var w = 0; w < words.length; w++) {
                if (words[w].length > 3 && kw.indexOf(words[w]) > -1) score += 1;
            }

            // System-specific boosts
            var sysTxt = (extracted.systems || "").toLowerCase();
            if (sysTxt.indexOf("kafka") > -1 && kw.indexOf("stream") > -1) score += 6;
            if (sysTxt.indexOf("sap") > -1 && (kw.indexOf("erp") > -1 || kw.indexOf("sap") > -1)) score += 6;
            if (sysTxt.indexOf("workday") > -1 && (kw.indexOf("erp") > -1 || kw.indexOf("workday") > -1)) score += 6;
            if (sysTxt.indexOf("snowflake") > -1 && (kw.indexOf("zero copy") > -1 || kw.indexOf("snowflake") > -1)) score += 6;
            if (sysTxt.indexOf("databricks") > -1 && (kw.indexOf("zero copy") > -1 || kw.indexOf("databricks") > -1)) score += 6;
            if (sysTxt.indexOf("salesforce") > -1 && (kw.indexOf("hub") > -1 || kw.indexOf("salesforce") > -1)) score += 5;
            if (sysTxt.indexOf("sharepoint") > -1 && (kw.indexOf("content") > -1 || kw.indexOf("sharepoint") > -1)) score += 6;
            if (sysTxt.indexOf("confluence") > -1 && (kw.indexOf("content") > -1 || kw.indexOf("confluence") > -1)) score += 6;
            if (sysTxt.indexOf("power bi") > -1 && (kw.indexOf("live connect") > -1 || kw.indexOf("bi") > -1)) score += 6;
            if (sysTxt.indexOf("tableau") > -1 && (kw.indexOf("live connect") > -1 || kw.indexOf("bi") > -1)) score += 6;

            // Direction-based boosts
            if (extracted.direction === "inbound" && kw.indexOf("inbound") > -1) score += 3;
            if (extracted.direction === "outbound" && kw.indexOf("outbound") > -1) score += 3;

            scored.push({ connector: conn, score: score });
        }

        scored.sort(function(a, b) { return b.score - a.score; });

        var topConnectors = [];
        for (var t = 0; t < Math.min(3, scored.length); t++) {
            if (scored[t].score > 0) {
                topConnectors.push({
                    sys_id: scored[t].connector.sys_id,
                    name: scored[t].connector.name,
                    reason: scored[t].connector.best_for || scored[t].connector.tagline
                });
            }
        }

        if (topConnectors.length === 0 && connectors.length > 0) {
            topConnectors.push({
                sys_id: connectors[0].sys_id,
                name: connectors[0].name,
                reason: "Recommended starting point for your scenario"
            });
        }

        return topConnectors;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // ARCHITECTURE PATTERN SCORING
    // ═══════════════════════════════════════════════════════════════════════

    function _scoreBestPattern(answers, extracted) {
        var allText = answers.join(" ").toLowerCase();
        var patGR = new GlideRecord("x_snc_wdf_advisory_arch_pat");
        patGR.orderBy("name");
        patGR.query();
        var bestPattern = null;
        var bestPScore = 0;

        while (patGR.next()) {
            var pScore = 0;
            var pText = ((patGR.getValue("tagline") || "") + " " + (patGR.getValue("industry_examples") || "") + " " + (patGR.getValue("data_flow_steps") || "")).toLowerCase();

            if (extracted.industry && pText.indexOf(extracted.industry.toLowerCase()) > -1) pScore += 4;

            var pWords = allText.split(/\s+/);
            for (var pw = 0; pw < pWords.length; pw++) {
                if (pWords[pw].length > 3 && pText.indexOf(pWords[pw]) > -1) pScore += 1;
            }

            if (pScore > bestPScore) {
                bestPScore = pScore;
                bestPattern = {
                    sys_id: patGR.getUniqueValue(),
                    name: patGR.getValue("name") || "",
                    tagline: patGR.getValue("tagline") || ""
                };
            }
        }

        return bestPattern;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // NEXT STEPS BUILDER
    // ═══════════════════════════════════════════════════════════════════════

    function _buildNextSteps(chapterInfo, extracted) {
        var ch = (chapterInfo.chapter || "").replace("Ch. ", "");
        var timeline = extracted.timeline || "";
        var steps = [];

        // Chapter-specific steps
        if (ch === "4") {
            steps.push("Validate source system connectivity (network path, credentials, MID Server if on-prem)");
            steps.push("Identify the top 3-5 external tables/views to federate first");
            steps.push("Test query performance with representative data volumes");
        } else if (ch === "5") {
            steps.push("Map source schema to ServiceNow target tables");
            steps.push("Define sync frequency and freshness SLA");
            steps.push("Plan data governance: quality rules, PII detection, retention policy");
        } else if (ch === "6") {
            steps.push("Enable Live Connect and validate SQL endpoint access");
            steps.push("Assess whether HTAP is needed to protect operational performance");
            steps.push("Configure BI tool connections and test with representative queries");
        } else if (ch === "7") {
            steps.push("Determine export format and target system ingestion requirements");
            steps.push("Set up Kafka topics and consumer groups (if Stream Connect)");
            steps.push("Plan error handling and retry logic for failed exports");
        } else if (ch === "8a" || ch === "8b" || ch === "8") {
            steps.push("Identify the specific actions/events to integrate");
            steps.push("Check spoke availability or MCP server readiness");
            steps.push("Design error handling and retry patterns for action failures");
        } else {
            steps.push("Schedule a deep-dive with the WDF team to map your specific scenario");
            steps.push("Document integration requirements, volumes, and latency expectations");
        }

        // Timeline-aware additions
        if (timeline.indexOf("Immediate") > -1) {
            steps.push("Focus on GA connectors only — validate licensing and prerequisites");
        } else if (timeline.indexOf("Next") > -1) {
            steps.push("Review roadmap items and request early access where applicable");
        } else {
            steps.push("Explore the architecture pattern demos to validate the approach");
        }

        return steps;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // ACKNOWLEDGMENT BUILDER
    // ═══════════════════════════════════════════════════════════════════════

    function _buildAcknowledgment(extracted, currentTurn, latestAnswer) {
        // ── Turn-aware, non-repetitive acknowledgments ──────────────
        // Each turn gets a DIFFERENT opening that focuses on what the
        // user JUST said, not a full re-summary of everything so far.

        var latest = (latestAnswer || "").toLowerCase();

        // Turn 2: first real follow-up — acknowledge the initial scenario
        if (currentTurn <= 2) {
            if (extracted.industry) {
                return "Got it — a " + extracted.industry + " integration scenario. ";
            }
            if (extracted.systems) {
                return "Thanks — working with " + extracted.systems + " narrows things down. ";
            }
            return "Thanks for that context! ";
        }

        // Turn 3+: acknowledge only what's NEW from the latest answer
        var openers = [
            "Good choice. ",
            "That helps a lot. ",
            "Understood. ",
            "Perfect, that narrows it down. ",
            "Great — one more thing. ",
            "Noted. "
        ];
        // Pick a stable opener based on turn number (not random, so it's predictable)
        var opener = openers[(currentTurn - 3) % openers.length];

        // Add a brief, specific nod to what they just selected
        if (latest.indexOf("keep a copy") > -1 || latest.indexOf("materialize") > -1) {
            return "Keeping a copy inside ServiceNow — that's the materialized pattern. ";
        }
        if (latest.indexOf("query it live") > -1 || latest.indexOf("no copy") > -1 || latest.indexOf("live") > -1) {
            return "Live query, no copies — that's the federated pattern. ";
        }
        if (latest.indexOf("one-time") > -1 || latest.indexOf("bulk export") > -1) {
            return "A bulk export approach — makes sense. ";
        }
        if (latest.indexOf("continuous") > -1 || latest.indexOf("streaming") > -1 || latest.indexOf("real-time feed") > -1) {
            return "Continuous streaming — noted. ";
        }
        if (latest.indexOf("triggering actions") > -1 || latest.indexOf("both directions") > -1) {
            return "Bidirectional action triggers — got it. ";
        }
        if (latest.indexOf("data coming into") > -1 || latest.indexOf("inbound") > -1) {
            return "Inbound data flow — understood. ";
        }
        if (latest.indexOf("data going out") > -1 || latest.indexOf("outbound") > -1) {
            return "Outbound data flow — noted. ";
        }
        if (latest.indexOf("sap") > -1 || latest.indexOf("oracle") > -1 || latest.indexOf("workday") > -1 || latest.indexOf("erp") > -1) {
            return "ERP integration — that's a common pattern we see. ";
        }
        if (latest.indexOf("snowflake") > -1 || latest.indexOf("databricks") > -1 || latest.indexOf("bigquery") > -1) {
            return "Cloud data warehouse — several options here. ";
        }
        if (latest.indexOf("kafka") > -1 || latest.indexOf("event") > -1) {
            return "Event streaming — interesting use case. ";
        }
        if (latest.indexOf("power bi") > -1 || latest.indexOf("tableau") > -1 || latest.indexOf("bi") > -1) {
            return "BI tool integration — a popular pattern. ";
        }
        if (latest.indexOf("sharepoint") > -1 || latest.indexOf("confluence") > -1 || latest.indexOf("slack") > -1) {
            return "Content indexing — we have a dedicated connector for that. ";
        }
        if (latest.indexOf("ai") > -1 || latest.indexOf("llm") > -1 || latest.indexOf("claude") > -1 || latest.indexOf("gpt") > -1 || latest.indexOf("mcp") > -1) {
            return "AI/agent integration — cutting-edge territory. ";
        }
        if (latest.indexOf("periodic") > -1 || latest.indexOf("refresh") > -1) {
            return "Periodic refresh is fine — that opens up more options. ";
        }
        if (latest.indexOf("must always be real-time") > -1) {
            return "Zero-staleness requirement — that's a firm constraint. ";
        }

        return opener;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // AI CONTEXT HELPERS
    // ═══════════════════════════════════════════════════════════════════════

    function _getPortfolioSummary() {
        return "Zero Copy Connectors (Ch.4, Inbound/Live, Snowflake/Databricks/BigQuery); " +
            "ZCC for ERP (Ch.4, Inbound/Live, SAP/Workday); " +
            "RaptorDB Pro (Platform, HTAP engine + medallion architecture, powers Live Connect and Live Archive); " +
            "XCC (Ch.5, Inbound/Copy, index Slack/Confluence/SharePoint for AI Search); " +
            "Live Connect (Ch.6, Outbound/Live, external BI queries SN via SQL); " +
            "HTAP Engine (Ch.6, Outbound/Live, separate analytical load); " +
            "Live Archive (Ch.6, Outbound/Live cold, historical SN data); " +
            "Table API (Ch.7, Outbound/Batch, one-time export); " +
            "Stream Connect outbound (Ch.7, Outbound/Continuous, Kafka feed); " +
            "Stream Connect inbound (Ch.8b, Inbound/Event, Kafka triggers SN); " +
            "Integration Hub (Ch.8a, Outbound/Action, workflow spokes); " +
            "MCP Client (Ch.8a, Outbound/Action, agent calls MCP server); " +
            "RPA Hub (Ch.8a, Outbound/Action UI, no-API fallback); " +
            "MCP Registry (Ch.8a, Governance, curates MCP servers); " +
            "SN MCP Server (Ch.8b, Inbound/Action, external agents invoke SN); " +
            "Inbound APIs (Action Inbound, REST/SOAP APIs for external record operations); " +
            "Data Catalog (Control, metadata registry + lineage); " +
            "Data Governance (Control, compliance + quality + access control); " +
            "Automation Engine (Converge, event-driven automation + threshold triggers)";
    }

    function _getConnectorContext() {
        var lines = [];
        var gr = new GlideRecord("x_snc_wdf_advisory_connector");
        gr.setLimit(20);
        gr.orderBy("name");
        gr.query();
        while (gr.next()) {
            lines.push(gr.getValue("name") + ": " + (gr.getValue("tagline") || "") + " [" + (gr.getValue("status") || "") + "]");
        }
        return lines.join("; ");
    }

    function _getPatternContext() {
        var lines = [];
        var gr = new GlideRecord("x_snc_wdf_advisory_arch_pat");
        gr.orderBy("name");
        gr.query();
        while (gr.next()) {
            lines.push(gr.getValue("name") + ": " + (gr.getValue("tagline") || ""));
        }
        return lines.join("; ");
    }
    // ═══════════════════════════════════════════════════════════════════════
    // ENHANCED RECOMMENDATION HELPERS
    // ═══════════════════════════════════════════════════════════════════════

    function _getGovernanceDetail(connectorName) {
        var govMap = {
            'Stream Connect': { label: 'GA', since: 'Xanadu', description: 'Generally available with full support and SLA coverage.' },
            'Zero Copy Connectors': { label: 'GA', since: 'Washington DC', description: 'Generally available; supports Snowflake, Databricks, and more.' },
            'ZCC for ERP': { label: 'GA', since: 'Xanadu', description: 'Pre-built ERP connectors with certified mapping tables.' },
            'Live Connect': { label: 'GA', since: 'Vancouver', description: 'Production-ready for ServiceNow-to-ServiceNow federation.' },
            'Integration Hub': { label: 'GA', since: 'Orlando', description: 'Mature platform with 600+ spokes and enterprise SLA.' },
            'External Content Connectors (XCC)': { label: 'GA', since: 'Xanadu', description: 'Index and search external content repositories.' },
            'MCP Client': { label: 'GA', since: 'Xanadu', description: 'Model Context Protocol client for AI agent tool invocation — generally available.' },
            'SN MCP Server': { label: 'GA', since: 'Xanadu', description: 'ServiceNow as MCP server for external AI agents — generally available.' },
            'Inbound APIs': { label: 'GA', since: 'Fuji', description: 'REST and SOAP APIs for inbound record operations.' },
            'Data Catalog': { label: 'GA', since: 'Xanadu', description: 'Central metadata registry with lineage tracking.' },
            'Data Governance': { label: 'GA', since: 'Xanadu', description: 'Policy enforcement for compliance, quality, and access control.' },
            'Automation Engine': { label: 'GA', since: 'Xanadu', description: 'Event-driven automation rules for threshold triggers and pattern detection.' },
            'Table API': { label: 'GA', since: 'Orlando', description: 'Paginated REST export endpoint.' },
            'Stream Connect Outbound': { label: 'GA', since: 'Xanadu', description: 'Continuous CDC feed to external Kafka consumers.' },
            'Stream Connect Inbound': { label: 'GA', since: 'Xanadu', description: 'Kafka event triggers for ServiceNow workflows.' },
            'HTAP Engine': { label: 'GA', since: 'Xanadu', description: 'Separate analytical load from operational instance.' },
            'Live Archive': { label: 'GA', since: 'Washington DC', description: 'Extend live query reach into historical data.' },
            'RaptorDB Pro': { label: 'GA', since: 'Xanadu', description: 'High-performance database engine that unifies data and analytics on the ServiceNow AI Platform.' },
            'RPA Hub': { label: 'GA', since: 'Orlando', description: 'UI-driven automation for legacy systems without APIs.' }
        };
        return govMap[connectorName] || { label: 'GA', since: null, description: 'Standard ServiceNow connector.' };
    }

    function _getTradeoffAnalysis(connectorName) {
        var tradeoffMap = {
            'Stream Connect': [
                { pro: 'Real-time event streaming with sub-second latency', con: 'Requires Kafka infrastructure and operational expertise' },
                { pro: 'Native CDC support for change detection', con: 'Higher infrastructure cost vs. batch integration' }
            ],
            'Zero Copy Connectors': [
                { pro: 'No data duplication — query data in place', con: 'Read-only; write-back requires additional config' },
                { pro: 'Federated SQL joins across sources via Trino', con: 'Query latency depends on source system performance' }
            ],
            'Live Connect': [
                { pro: 'Native ServiceNow-to-ServiceNow real-time federation', con: 'Both instances must be on compatible releases' },
                { pro: 'No middleware required — platform-native', con: 'Cross-instance ACL alignment can be complex' }
            ],
            'Integration Hub': [
                { pro: 'Largest spoke ecosystem (600+) with low-code authoring', con: 'Spoke licensing costs scale with volume' },
                { pro: 'Built-in orchestration, retry, and error handling', con: 'Not optimized for high-frequency streaming patterns' }
            ],
            'ZCC for ERP': [
                { pro: 'Pre-built mapping tables for SAP, Oracle, Workday', con: 'Limited to supported ERP systems and certified fields' }
            ],
            'RaptorDB Pro': [
                { pro: 'Ultra-fast analytical queries without impacting operational workloads', con: 'Requires RaptorDB Pro licensing and migration planning' },
                { pro: 'Unified data and analytics on the same platform', con: 'Large dataset imports need sync pipeline monitoring' }
            ]
        };
        return tradeoffMap[connectorName] || [];
    }

    function _getProofPointsDetail(connectorName) {
        var proofMap = {
            'Stream Connect': [
                { icon: '⚡', label: 'Sub-second latency', detail: 'Events delivered in < 1s from Kafka topic' },
                { icon: '🔄', label: 'Native CDC', detail: 'Built-in change-data-capture adapters' },
                { icon: '📈', label: 'Scalable throughput', detail: 'Millions of events per hour' }
            ],
            'Zero Copy Connectors': [
                { icon: '🔗', label: 'Zero duplication', detail: 'Query external data without copying' },
                { icon: '🧮', label: 'Federated joins', detail: 'Trino engine cross-system SQL joins' },
                { icon: '🛡️', label: 'Governance in place', detail: 'Data stays in source — no compliance scope expansion' }
            ],
            'Live Connect': [
                { icon: '🌐', label: 'Platform native', detail: 'Direct ServiceNow-to-ServiceNow federation' },
                { icon: '📡', label: 'Real-time access', detail: 'Live queries — no stale data' }
            ],
            'Integration Hub': [
                { icon: '🔌', label: '600+ spokes', detail: 'Pre-built connectors for SaaS, cloud, on-prem' },
                { icon: '🎨', label: 'Low-code authoring', detail: 'Flow Designer UI' }
            ],
            'RaptorDB Pro': [
                { icon: '⚡', label: 'Ultra-fast performance', detail: 'High-performance database engine at enterprise scale' },
                { icon: '📊', label: 'Unified analytics', detail: 'Data and analytics on one platform' },
                { icon: '🤖', label: 'AI-ready data', detail: 'Powers AI agents with instant, actionable data' }
            ]
        };
        return proofMap[connectorName] || [];
    }

    function _getNextStepsRoadmap(connectorName) {
        var stepsMap = {
            'Stream Connect': [
                { order: 1, title: 'Verify Kafka access', description: 'Ensure ServiceNow can reach Kafka broker endpoints', effort: '2 days', governance: 'IT approval' },
                { order: 2, title: 'Create Stream channel', description: 'Define topics and message schemas', effort: '1 day', governance: 'none' },
                { order: 3, title: 'Map to target table', description: 'Configure message-to-record mapping', effort: '4 hours', governance: 'none' },
                { order: 4, title: 'Enable audit logging', description: 'Turn on event audit trail', effort: '2 hours', governance: 'Compliance sign-off' }
            ],
            'Zero Copy Connectors': [
                { order: 1, title: 'Register data source', description: 'Add external database as ZCC data source', effort: '4 hours', governance: 'DBA approval' },
                { order: 2, title: 'Define virtual tables', description: 'Create virtual table definitions', effort: '2 hours', governance: 'none' },
                { order: 3, title: 'Test federated queries', description: 'Run queries to validate connectivity', effort: '2 hours', governance: 'none' }
            ],
            'Live Connect': [
                { order: 1, title: 'Establish instance trust', description: 'Configure OAuth between instances', effort: '2 hours', governance: 'IT approval' },
                { order: 2, title: 'Define remote tables', description: 'Register remote tables to federate', effort: '3 hours', governance: 'Data governance' },
                { order: 3, title: 'Align ACLs', description: 'Ensure cross-instance security consistency', effort: '2 hours', governance: 'Security review' }
            ],
            'Integration Hub': [
                { order: 1, title: 'Install spokes', description: 'Install connectors from spoke catalog', effort: '2 hours', governance: 'none' },
                { order: 2, title: 'Build integration flow', description: 'Create flow in Flow Designer', effort: '4 hours', governance: 'none' },
                { order: 3, title: 'Test & activate', description: 'Run in test mode then activate', effort: '2 hours', governance: 'Reliability review' }
            ],
            'RaptorDB Pro': [
                { order: 1, title: 'Assess RaptorDB Pro eligibility', description: 'Review licensing and instance compatibility', effort: '1 day', governance: 'License review' },
                { order: 2, title: 'Plan migration', description: 'Identify tables and data volumes for migration', effort: '3 days', governance: 'DBA approval' },
                { order: 3, title: 'Enable and test', description: 'Activate RaptorDB Pro and run performance benchmarks', effort: '2 days', governance: 'Performance review' }
            ]
        };
        return stepsMap[connectorName] || [];
    }

    function _getAlsoNeeded(stage2connectors) {
        if (!stage2connectors || stage2connectors.length <= 1) return [];
        var extra = [];
        for (var i = 1; i < stage2connectors.length; i++) {
            extra.push(stage2connectors[i].name);
        }
        return extra;
    }

    function _getOrchestrationFlowText(stage2connectors) {
        if (!stage2connectors || stage2connectors.length <= 1) return null;
        var names = [];
        for (var i = 0; i < stage2connectors.length; i++) {
            names.push(stage2connectors[i].name);
        }
        return names.join(' → ');
    }

})(request, response);
