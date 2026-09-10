import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['f6343b5c2f36cf10809dea3fafa4e368'],
    table: 'one_api_service_plan_feature_edge',
    data: {
        active: 'true',
        applicability_script: `(function(currentInputs, context) {  
	/* @param {Object} currentInputs - Inputs provided for the current step.*/  
	/* @param {Object} context - Execution context, which may include:*/     
	/*         - Previous tool outputs/inputs (e.g., context['ToolName.attributeName'] or context.getValue('ToolName.attributeName')).*/     
	/*         - Additional context information (e.g., context.getAllValues()).*/  
	/* @returns {Boolean} - Return 'true' if the condition is met; otherwise 'false'.*/  
	return true;
  })(currentInputs, context);`,
        error_handler_script: `(function handleError() {  
	// customize condition logic here,  
	return ;
})();`,
        from_service_plan_feature: '7e343b5c2f36cf10809dea3fafa4e364',
        internal_name: 'QnA__Web Search',
        name: 'edge',
        order: '0',
        to_service_plan_feature: '7a343b5c2f36cf10809dea3fafa4e365',
    },
})
