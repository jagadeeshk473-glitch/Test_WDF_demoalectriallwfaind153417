import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['d034ff1c2f36cf10809dea3fafa4e32a'],
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
        depends_on_list: '5034bf1c2f36cf10809dea3fafa4e3dc',
        error_policy: 'continue_service_plan_execution',
        feature: '4434bf1c2f36cf10809dea3fafa4e3d5',
        return_request: 'true',
        service_plan: '5034bf1c2f36cf10809dea3fafa4e3da',
        timeout_policy: 'continue_service_plan_execution',
        timeout_sec: '60',
    },
})
