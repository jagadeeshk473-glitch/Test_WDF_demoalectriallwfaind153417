import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['7bc5a1052f3acf50809dea3fafa4e3b4'],
    table: 'one_api_service_plan_feature',
    data: {
        active: 'true',
        applicability_script: `(function(currentInputs, context) {
    /* @param {Object} currentInputs - Inputs provided for the current step.*/
    /* @param {Object} context - Execution context, which may include:*/
    /*                         - Previous tool outputs/inputs (e.g., context['ToolName.attributeName'] or context.getValue('ToolName.attributeName')).*/
    /*                         - Additional context information (e.g., context.getAllValues()).*/
    /* @returns {Boolean} - Return 'true' if the condition is met; otherwise 'false'.*/
    return true;
})(currentInputs, context);`,
        applicability_type: 'script',
        delay_output_processing: 'false',
        depends_on_list: 'b3c5a1052f3acf50809dea3fafa4e3b1',
        error_policy: 'continue_service_plan_execution',
        feature: 'abc5a1052f3acf50809dea3fafa4e3aa',
        return_request: 'true',
        service_plan: 'a3c5a1052f3acf50809dea3fafa4e3af',
        timeout_policy: 'continue_service_plan_execution',
        timeout_sec: '60',
    },
})
