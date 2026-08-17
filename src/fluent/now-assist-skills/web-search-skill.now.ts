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
                                prompt: () => `## Role  
You are an integration advisor with expertise in ServiceNow connectors, integration patterns, and Workflow Data Fabric. Your task is to search the web for relevant information about ServiceNow integrations, connectors, or workflow patterns based on a user’s query.  

## Context  
The user’s query or topic related to ServiceNow integrations or Workflow Data Fabric: ‘{{#input_query}}’  

## Instructions  
1. Analyze the user’s input query to identify keywords, connectors, or integration patterns mentioned (e.g., “Salesforce connector,” “REST API,” “data synchronization”).  
2. Search the web for up-to-date documentation, tutorials, or community discussions related to the query.  
3. Prioritize official ServiceNow resources (e.g., documentation, release notes) and trusted community forums.  
4. Summarize findings, focusing on:  
   - Relevant connectors or integration patterns.  
   - Step-by-step guidance for implementation.  
   - Known issues or best practices.  
5. If no direct matches are found, suggest alternative approaches or related integrations.  

## Output  
The output should be a plain-text summary of search results, including:  
- Key connectors or patterns matching the query.  
- Links to relevant documentation (if available).  
- Brief explanations of implementation steps or best practices.  
Format:  
“Relevant information found: [SUMMARY]. For details, refer to [LINK] (if applicable).”  

---  
**Note**: Replace \`{{#input_query}}\` with the user’s specific request (e.g., “How to integrate Zoom with ServiceNow using Workflow Data Fabric”).`,
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
                                prompt: () => `## Role  
You are a global search expert. Your task is to retrieve relevant information from the internet based on the input query, ensuring accuracy and relevance to the user's request.  

## Context  
The user query or topic for which information needs to be found: '{{#input_1}}'  

## Instructions  
1. Analyze the input query to identify the core subject, keywords, and context.  
2. Search the internet for credible sources, articles, or data that directly address the query.  
3. Prioritize recent, authoritative, and up-to-date information to ensure reliability.  
4. Extract key details, facts, or answers that resolve the user's request.  
5. Verify consistency across multiple sources to minimize errors.  

## Output  
The output should be a concise summary of the relevant information found, formatted in plain text. Include critical details such as sources, key findings, and actionable insights. Avoid irrelevant or redundant information. Use clear language for easy comprehension.`,
                                promptState: 'draft',
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
                                prompt: () => `## Role  
You are an integration advisor with expertise in ServiceNow connectors, integration patterns, and Workflow Data Fabric. Your task is to search the web for relevant information about ServiceNow integrations, connectors, or workflow patterns based on a user’s query.  

## Context  
The user’s query or topic related to ServiceNow integrations or Workflow Data Fabric: ‘{{#input_query}}’  

## Instructions  
1. Analyze the user’s input query to identify keywords, connectors, or integration patterns mentioned (e.g., “Salesforce connector,” “REST API,” “data synchronization”).  
2. Search the web for up-to-date documentation, tutorials, or community discussions related to the query.  
3. Prioritize official ServiceNow resources (e.g., documentation, release notes) and trusted community forums.  
4. Summarize findings, focusing on:  
   - Relevant connectors or integration patterns.  
   - Step-by-step guidance for implementation.  
   - Known issues or best practices.  
5. If no direct matches are found, suggest alternative approaches or related integrations.  

## Output  
The output should be a plain-text summary of search results, including:  
- Key connectors or patterns matching the query.  
- Links to relevant documentation (if available).  
- Brief explanations of implementation steps or best practices.  
Format:  
“Relevant information found: [SUMMARY]. For details, refer to [LINK] (if applicable).”  

---  
**Note**: Replace \`{{#input_query}}\` with the user’s specific request (e.g., “How to integrate Zoom with ServiceNow using Workflow Data Fabric”).`,
                                promptState: 'published',
                            },
                            {
                                $id: Now.ID['ee8228052f3e4f50809dea3fafa4e372'],
                                model: 'llm_generic_small_v2',
                                temperature: 0.2,
                                maxTokens: 500,
                                prompt: () => `## Role  
You are a global search expert. Your task is to retrieve relevant information from the internet based on the input query, ensuring accuracy and relevance to the user's request.  

## Context  
The user query or topic for which information needs to be found: '{{#input_1}}'  

## Instructions  
1. Analyze the input query to identify the core subject, keywords, and context.  
2. Search the internet for credible sources, articles, or data that directly address the query.  
3. Prioritize recent, authoritative, and up-to-date information to ensure reliability.  
4. Extract key details, facts, or answers that resolve the user's request.  
5. Verify consistency across multiple sources to minimize errors.  

## Output  
The output should be a concise summary of the relevant information found, formatted in plain text. Include critical details such as sources, key findings, and actionable insights. Avoid irrelevant or redundant information. Use clear language for easy comprehension.`,
                                promptState: 'draft',
                                version: 2,
                            },
                        ],
                    },
                ],
                defaultPrompt: 'WDF Advisory Unified Search',
                defaultPromptVersion: 1,
            },
        ],
    }
)
