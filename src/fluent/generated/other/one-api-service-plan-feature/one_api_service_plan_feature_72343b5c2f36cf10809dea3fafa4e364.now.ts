import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['72343b5c2f36cf10809dea3fafa4e364'],
    table: 'one_api_service_plan_feature',
    data: {
        active: 'true',
        applicability_script: `(function(currentInputs, context) {
    /* @param {Object} currentInputs - Inputs provided for the current step.*/
    /* @param {Object} context - Execution context, which may include:*/
    /*						   - Previous tool outputs/inputs (e.g., context['ToolName.attributeName'] or context.getValue('ToolName.attributeName')).*/
    /*						   - Additional context information (e.g., context.getAllValues()).*/
    /* @returns {Boolean} - Return 'true' if the condition is met; otherwise 'false'.*/
    return true;
})(currentInputs, context);`,
        applicability_type: 'script',
        delay_output_processing: 'false',
        depends_on_list: '76343b5c2f36cf10809dea3fafa4e363',
        error_policy: 'continue_service_plan_execution',
        feature: '76343b5c2f36cf10809dea3fafa4e311',
        return_request: 'false',
        service_plan: 'f6343b5c2f36cf10809dea3fafa4e316',
        timeout_policy: 'continue_service_plan_execution',
        timeout_sec: '60',
    },
})
