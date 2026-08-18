import '@servicenow/sdk/global'
import { NowAssistSkillConfig } from '@servicenow/sdk/core'

NowAssistSkillConfig(
    {
        $id: Now.ID['wdf_web_search_skill'],
        name: 'WDF Web Search',
        shortDescription: 'Searches the internet for connector and integration guidance',
        inputs: [
            {
                $id: Now.ID['wdf_web_search_query_input'],
                name: 'search query',
                dataType: 'string',
                mandatory: true,
                description: 'The search query to find integration guidance on the web',
                testValues: 'How to integrate SAP with ServiceNow using Zero Copy Connectors',
                truncate: false,
            },
        ],
        tools: (t) => {
            const webSearch = t.WebSearch('WebSearch', {
                $id: Now.ID['97a230f6d014469fbc8e4149780f8072'],
                searchType: 'ai_answers',
                query: t.input['search query'],
            })
            return {
                WebSearch: webSearch,
            }
        },
        securityControls: {
            userAccess: {
                $id: Now.ID['wdf_web_search_access'],
                type: 'authenticated',
                roles: ['snc_internal'],
            },
            roleRestrictions: ['2831a114c611228501d4ea6c309d626d'],
        },
        description: 'Searches the internet for connector and integration guidance',
        outputs: [
            {
                $id: Now.ID['wdf_web_search_skill__output_response'],
                name: 'response',
                dataType: 'string',
            },
            {
                $id: Now.ID['wdf_web_search_skill__output_provider'],
                name: 'provider',
                dataType: 'string',
            },
            {
                $id: Now.ID['wdf_web_search_skill__output_errorcode'],
                name: 'errorcode',
                dataType: 'string',
            },
            {
                $id: Now.ID['wdf_web_search_skill__output_status'],
                name: 'status',
                dataType: 'string',
            },
            {
                $id: Now.ID['wdf_web_search_skill__output_error'],
                name: 'error',
                dataType: 'string',
            },
        ],
        state: 'published',
        deploymentSettings: {
            nowAssistPanel: {
                enabled: true,
                roles: ['now_assist_panel_user'],
            },
        },
    },
    {
        providers: [
            {
                provider: 'Now LLM Service',
                providerAPI: {
                    type: 'sys_hub_flow',
                    id: '936e514a53b3b110f028ddeeff7b128c',
                },
                prompts: [
                    {
                        name: 'Web Search Prompt',
                        versions: [
                            {
                                $id: Now.ID['wdf_web_search_prompt_v1'],
                                model: 'llm_generic_small_v2',
                                temperature: 0.2,
                                promptState: 'draft',
                                prompt: (p) => `## Role
You are an integration advisor. Summarize the web search results below for the user's query.

## Context
User query: ${p.input['search query']}

## Web Search Results
${p.tool.WebSearch.response}

## Instructions
Summarize the web search results into a clear, actionable response with key findings and steps.

## Output
Provide a concise summary with bullet points of key findings.`,
                                maxTokens: 500,
                            },
                        ],
                    },
                    {
                        name: 'WDF Advisory Global Search',
                        versions: [
                            {
                                $id: Now.ID['43e3648d2f3e4f50809dea3fafa4e31b'],
                                model: 'llm_generic_small_v2',
                                temperature: 0.2,
                                maxTokens: 500,
                                prompt: (p) => `## Role
You are a global search expert specializing in ServiceNow integrations and Workflow Data Fabric. Your task is to summarize web search results into a clear, relevant response.

## Context
User query: ${p.input['search query']}

## Web Search Results
${p.tool.WebSearch.response}

## Instructions
1. Read the web search results provided above carefully.
2. Extract the most relevant information that directly addresses the user's query.
3. Organize findings into a clear summary with key actionable points.
4. Include specific product names, steps, or documentation references from the results.
5. If results are insufficient, state what was found and suggest refining the query.

## Output
Provide a concise plain-text summary:
- A 1-2 sentence overview answering the query
- 3-5 bullet points with key findings from the search results
- Any relevant links or source references mentioned
Keep it focused, actionable, and based only on the search results above.`,
                                promptState: 'published',
                            },
                        ],
                    },
                    {
                        name: 'WDF Advisory Unified Search',
                        versions: [
                            {
                                $id: Now.ID['73a12c8d2ffa4f50809dea3fafa4e368'],
                                model: 'llm_generic_small_v2',
                                temperature: 0.2,
                                maxTokens: 500,
                                prompt: (p) => `## Role
You are an integration advisor with expertise in ServiceNow connectors, integration patterns, and Workflow Data Fabric.

## Context
User query: ${p.input['search query']}

## Web Search Results
${p.tool.WebSearch.response}

## Instructions
1. Analyze the web search results above for information relevant to the user's query.
2. Focus on ServiceNow-specific connectors, integration patterns, and best practices.
3. Summarize implementation steps and key guidance from the results.
4. Include any relevant links or documentation references.

## Output
Provide a plain-text summary:
- Key connectors or patterns matching the query
- Implementation steps or best practices from the results
- Links to relevant documentation (if available)
Format: "Relevant information found: [SUMMARY]."`,
                                promptState: 'published',
                            },
                        ],
                    },
                ],
                defaultPrompt: 'WDF Advisory Global Search',
                defaultPromptVersion: 1,
            },
        ],
    }
)
