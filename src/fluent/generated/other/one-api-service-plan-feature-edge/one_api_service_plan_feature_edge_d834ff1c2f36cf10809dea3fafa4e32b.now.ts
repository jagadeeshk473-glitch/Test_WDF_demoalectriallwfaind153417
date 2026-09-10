import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['d834ff1c2f36cf10809dea3fafa4e32b'],
    table: 'one_api_service_plan_feature_edge',
    data: {
        active: 'true',
        applicability_script: `(function(currentInputs, context) {  
	/* customize condition logic here, return true or false */  
	return true;
  })(currentInputs, context);`,
        error_handler_script: `(function handleError() {  
	// customize condition logic here,  
	return ;
})();`,
        from_service_plan_feature: '5034bf1c2f36cf10809dea3fafa4e3dc',
        internal_name: 'WebSearch__WDF Web Search',
        name: 'edge',
        order: '0',
        to_service_plan_feature: 'd034ff1c2f36cf10809dea3fafa4e32a',
    },
})
