import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['ffc5a1052f3acf50809dea3fafa4e3b5'],
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
        from_service_plan_feature: 'b3c5a1052f3acf50809dea3fafa4e3b1',
        internal_name: 'WebSearch__WDF Web Search',
        name: 'edge',
        order: '0',
        to_service_plan_feature: '7bc5a1052f3acf50809dea3fafa4e3b4',
    },
})
