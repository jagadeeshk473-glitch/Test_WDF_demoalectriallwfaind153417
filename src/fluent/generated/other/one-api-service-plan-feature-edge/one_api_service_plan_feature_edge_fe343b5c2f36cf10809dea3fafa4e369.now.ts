import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['fe343b5c2f36cf10809dea3fafa4e369'],
    table: 'one_api_service_plan_feature_edge',
    data: {
        active: 'true',
        applicability_condition_expression: '{{search_type}}=searching_and_scraping',
        applicability_failed_policy: 'exit',
        applicability_script: `(function(currentInputs, context) {  
	/* @param {Object} currentInputs - Inputs provided for the current step.*/  
	/* @param {Object} context - Execution context, which may include:*/     
	/*         - Previous tool outputs/inputs (e.g., context['ToolName.attributeName'] or context.getValue('ToolName.attributeName')).*/     
	/*         - Additional context information (e.g., context.getAllValues()).*/  
	/* @returns {Boolean} - Return 'true' if the condition is met; otherwise 'false'.*/  
	return true;
  })(currentInputs, context);`,
        applicability_type: 'condition_expression',
        error_handler_script: `(function handleError() {  
	// customize condition logic here,  
	return ;
})();`,
        error_policy: 'exit',
        from_service_plan_feature: '72343b5c2f36cf10809dea3fafa4e317',
        internal_name: 'WebSearchType__webSearchAPIs',
        name: 'Default branch',
        order: '1000',
        to_service_plan_feature: '76343b5c2f36cf10809dea3fafa4e363',
    },
})
