import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['27740bf82f76cb50809dea3fafa4e3dc'],
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
        from_service_plan_feature: 'a7740bf82f76cb50809dea3fafa4e3d7',
        internal_name: 'WebSearch__WDF Web Search',
        name: 'edge',
        order: '0',
        to_service_plan_feature: 'af740bf82f76cb50809dea3fafa4e3da',
    },
})
