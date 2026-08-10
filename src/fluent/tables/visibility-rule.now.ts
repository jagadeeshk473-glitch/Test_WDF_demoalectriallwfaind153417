import '@servicenow/sdk/global'
import { Table, StringColumn, BooleanColumn, ReferenceColumn, Record } from '@servicenow/sdk/core'
import { personaBusiness, personaBuilderDev, personaAdmin } from './persona.now'

/**
 * WDF Visibility Rule Table
 *
 * Controls which content areas are visible to each persona on each screen.
 * The UI queries this table at runtime to determine what sections to render
 * based on the active persona and current screen context.
 */
export const x_snc_wdf_advisory_vis_rule = Table({
    name: 'x_snc_wdf_advisory_vis_rule',
    label: 'WDF Visibility Rule',
    display: 'content_area',
    allowWebServiceAccess: true,
    schema: {
        persona: ReferenceColumn({
            label: 'Persona',
            mandatory: true,
            referenceTable: 'x_snc_wdf_advisory_persona',
        }),
        screen: StringColumn({
            label: 'Screen',
            mandatory: true,
            maxLength: 80,
        }),
        content_area: StringColumn({
            label: 'Content Area',
            mandatory: true,
            maxLength: 80,
        }),
        visible: BooleanColumn({
            label: 'Visible',
            mandatory: true,
            default: true,
        }),
        description: StringColumn({
            label: 'Description',
            maxLength: 500,
        }),
    },
})

// ═══════════════════════════════════════════════════════════════════════════════
// SEED DATA: Visibility Rules
// 4 screens × (16+8+8+4) content areas × 3 personas = 108 records
// ═══════════════════════════════════════════════════════════════════════════════



// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN: connector_detail (16 areas × 3 personas = 48 records)
// ═══════════════════════════════════════════════════════════════════════════════

// --- tagline ---
export const visConnectorDetailTaglineBusiness = Record({
    $id: Now.ID['vis-connector_detail-tagline-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'connector_detail', content_area: 'tagline', visible: true },
})
export const visConnectorDetailTaglineTechnical = Record({
    $id: Now.ID['vis-connector_detail-tagline-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'connector_detail', content_area: 'tagline', visible: true },
})
export const visConnectorDetailTaglineAdmin = Record({
    $id: Now.ID['vis-connector_detail-tagline-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'connector_detail', content_area: 'tagline', visible: true },
})

// --- detail ---
export const visConnectorDetailDetailBusiness = Record({
    $id: Now.ID['vis-connector_detail-detail-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'connector_detail', content_area: 'detail', visible: true },
})
export const visConnectorDetailDetailTechnical = Record({
    $id: Now.ID['vis-connector_detail-detail-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'connector_detail', content_area: 'detail', visible: true },
})
export const visConnectorDetailDetailAdmin = Record({
    $id: Now.ID['vis-connector_detail-detail-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'connector_detail', content_area: 'detail', visible: true },
})

// --- best_for ---
export const visConnectorDetailBestForBusiness = Record({
    $id: Now.ID['vis-connector_detail-best_for-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'connector_detail', content_area: 'best_for', visible: true },
})
export const visConnectorDetailBestForTechnical = Record({
    $id: Now.ID['vis-connector_detail-best_for-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'connector_detail', content_area: 'best_for', visible: true },
})
export const visConnectorDetailBestForAdmin = Record({
    $id: Now.ID['vis-connector_detail-best_for-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'connector_detail', content_area: 'best_for', visible: true },
})

// --- not_for ---
export const visConnectorDetailNotForBusiness = Record({
    $id: Now.ID['vis-connector_detail-not_for-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'connector_detail', content_area: 'not_for', visible: true },
})
export const visConnectorDetailNotForTechnical = Record({
    $id: Now.ID['vis-connector_detail-not_for-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'connector_detail', content_area: 'not_for', visible: true },
})
export const visConnectorDetailNotForAdmin = Record({
    $id: Now.ID['vis-connector_detail-not_for-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'connector_detail', content_area: 'not_for', visible: true },
})

// --- protocol ---
export const visConnectorDetailProtocolBusiness = Record({
    $id: Now.ID['vis-connector_detail-protocol-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'connector_detail', content_area: 'protocol', visible: false },
})
export const visConnectorDetailProtocolTechnical = Record({
    $id: Now.ID['vis-connector_detail-protocol-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'connector_detail', content_area: 'protocol', visible: true },
})
export const visConnectorDetailProtocolAdmin = Record({
    $id: Now.ID['vis-connector_detail-protocol-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'connector_detail', content_area: 'protocol', visible: false },
})

// --- auth_method ---
export const visConnectorDetailAuthMethodBusiness = Record({
    $id: Now.ID['vis-connector_detail-auth_method-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'connector_detail', content_area: 'auth_method', visible: false },
})
export const visConnectorDetailAuthMethodTechnical = Record({
    $id: Now.ID['vis-connector_detail-auth_method-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'connector_detail', content_area: 'auth_method', visible: true },
})
export const visConnectorDetailAuthMethodAdmin = Record({
    $id: Now.ID['vis-connector_detail-auth_method-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'connector_detail', content_area: 'auth_method', visible: false },
})

// --- latency ---
export const visConnectorDetailLatencyBusiness = Record({
    $id: Now.ID['vis-connector_detail-latency-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'connector_detail', content_area: 'latency', visible: false },
})
export const visConnectorDetailLatencyTechnical = Record({
    $id: Now.ID['vis-connector_detail-latency-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'connector_detail', content_area: 'latency', visible: true },
})
export const visConnectorDetailLatencyAdmin = Record({
    $id: Now.ID['vis-connector_detail-latency-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'connector_detail', content_area: 'latency', visible: false },
})

// --- mid_server ---
export const visConnectorDetailMidServerBusiness = Record({
    $id: Now.ID['vis-connector_detail-mid_server-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'connector_detail', content_area: 'mid_server', visible: false },
})
export const visConnectorDetailMidServerTechnical = Record({
    $id: Now.ID['vis-connector_detail-mid_server-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'connector_detail', content_area: 'mid_server', visible: true },
})
export const visConnectorDetailMidServerAdmin = Record({
    $id: Now.ID['vis-connector_detail-mid_server-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'connector_detail', content_area: 'mid_server', visible: true },
})

// --- data_flow ---
export const visConnectorDetailDataFlowBusiness = Record({
    $id: Now.ID['vis-connector_detail-data_flow-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'connector_detail', content_area: 'data_flow', visible: false },
})
export const visConnectorDetailDataFlowTechnical = Record({
    $id: Now.ID['vis-connector_detail-data_flow-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'connector_detail', content_area: 'data_flow', visible: true },
})
export const visConnectorDetailDataFlowAdmin = Record({
    $id: Now.ID['vis-connector_detail-data_flow-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'connector_detail', content_area: 'data_flow', visible: false },
})

// --- write_back_risk ---
export const visConnectorDetailWriteBackRiskBusiness = Record({
    $id: Now.ID['vis-connector_detail-write_back_risk-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'connector_detail', content_area: 'write_back_risk', visible: false },
})
export const visConnectorDetailWriteBackRiskTechnical = Record({
    $id: Now.ID['vis-connector_detail-write_back_risk-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'connector_detail', content_area: 'write_back_risk', visible: false },
})
export const visConnectorDetailWriteBackRiskAdmin = Record({
    $id: Now.ID['vis-connector_detail-write_back_risk-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'connector_detail', content_area: 'write_back_risk', visible: true },
})

// --- compliance_note ---
export const visConnectorDetailComplianceNoteBusiness = Record({
    $id: Now.ID['vis-connector_detail-compliance_note-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'connector_detail', content_area: 'compliance_note', visible: false },
})
export const visConnectorDetailComplianceNoteTechnical = Record({
    $id: Now.ID['vis-connector_detail-compliance_note-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'connector_detail', content_area: 'compliance_note', visible: false },
})
export const visConnectorDetailComplianceNoteAdmin = Record({
    $id: Now.ID['vis-connector_detail-compliance_note-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'connector_detail', content_area: 'compliance_note', visible: true },
})

// --- lab_exercise ---
export const visConnectorDetailLabExerciseBusiness = Record({
    $id: Now.ID['vis-connector_detail-lab_exercise-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'connector_detail', content_area: 'lab_exercise', visible: false },
})
export const visConnectorDetailLabExerciseTechnical = Record({
    $id: Now.ID['vis-connector_detail-lab_exercise-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'connector_detail', content_area: 'lab_exercise', visible: true },
})
export const visConnectorDetailLabExerciseAdmin = Record({
    $id: Now.ID['vis-connector_detail-lab_exercise-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'connector_detail', content_area: 'lab_exercise', visible: false },
})

// --- roadmap ---
export const visConnectorDetailRoadmapBusiness = Record({
    $id: Now.ID['vis-connector_detail-roadmap-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'connector_detail', content_area: 'roadmap', visible: true },
})
export const visConnectorDetailRoadmapTechnical = Record({
    $id: Now.ID['vis-connector_detail-roadmap-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'connector_detail', content_area: 'roadmap', visible: true },
})
export const visConnectorDetailRoadmapAdmin = Record({
    $id: Now.ID['vis-connector_detail-roadmap-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'connector_detail', content_area: 'roadmap', visible: true },
})

// --- readiness_check ---
export const visConnectorDetailReadinessCheckBusiness = Record({
    $id: Now.ID['vis-connector_detail-readiness_check-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'connector_detail', content_area: 'readiness_check', visible: false },
})
export const visConnectorDetailReadinessCheckTechnical = Record({
    $id: Now.ID['vis-connector_detail-readiness_check-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'connector_detail', content_area: 'readiness_check', visible: true },
})
export const visConnectorDetailReadinessCheckAdmin = Record({
    $id: Now.ID['vis-connector_detail-readiness_check-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'connector_detail', content_area: 'readiness_check', visible: true },
})

// --- pricing_calculator ---
export const visConnectorDetailPricingCalculatorBusiness = Record({
    $id: Now.ID['vis-connector_detail-pricing_calculator-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'connector_detail', content_area: 'pricing_calculator', visible: false },
})
export const visConnectorDetailPricingCalculatorTechnical = Record({
    $id: Now.ID['vis-connector_detail-pricing_calculator-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'connector_detail', content_area: 'pricing_calculator', visible: true },
})
export const visConnectorDetailPricingCalculatorAdmin = Record({
    $id: Now.ID['vis-connector_detail-pricing_calculator-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'connector_detail', content_area: 'pricing_calculator', visible: false },
})

// --- supported_systems ---
export const visConnectorDetailSupportedSystemsBusiness = Record({
    $id: Now.ID['vis-connector_detail-supported_systems-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'connector_detail', content_area: 'supported_systems', visible: true },
})
export const visConnectorDetailSupportedSystemsTechnical = Record({
    $id: Now.ID['vis-connector_detail-supported_systems-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'connector_detail', content_area: 'supported_systems', visible: true },
})
export const visConnectorDetailSupportedSystemsAdmin = Record({
    $id: Now.ID['vis-connector_detail-supported_systems-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'connector_detail', content_area: 'supported_systems', visible: true },
})

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN: scenario_demo (8 areas × 3 personas = 24 records)
// ═══════════════════════════════════════════════════════════════════════════════

// --- step_title ---
export const visScenarioDemoStepTitleBusiness = Record({
    $id: Now.ID['vis-scenario_demo-step_title-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'scenario_demo', content_area: 'step_title', visible: true },
})
export const visScenarioDemoStepTitleTechnical = Record({
    $id: Now.ID['vis-scenario_demo-step_title-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'scenario_demo', content_area: 'step_title', visible: true },
})
export const visScenarioDemoStepTitleAdmin = Record({
    $id: Now.ID['vis-scenario_demo-step_title-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'scenario_demo', content_area: 'step_title', visible: true },
})

// --- step_description ---
export const visScenarioDemoStepDescriptionBusiness = Record({
    $id: Now.ID['vis-scenario_demo-step_description-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'scenario_demo', content_area: 'step_description', visible: true },
})
export const visScenarioDemoStepDescriptionTechnical = Record({
    $id: Now.ID['vis-scenario_demo-step_description-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'scenario_demo', content_area: 'step_description', visible: true },
})
export const visScenarioDemoStepDescriptionAdmin = Record({
    $id: Now.ID['vis-scenario_demo-step_description-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'scenario_demo', content_area: 'step_description', visible: true },
})

// --- panel_data ---
export const visScenarioDemoPanelDataBusiness = Record({
    $id: Now.ID['vis-scenario_demo-panel_data-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'scenario_demo', content_area: 'panel_data', visible: true },
})
export const visScenarioDemoPanelDataTechnical = Record({
    $id: Now.ID['vis-scenario_demo-panel_data-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'scenario_demo', content_area: 'panel_data', visible: true },
})
export const visScenarioDemoPanelDataAdmin = Record({
    $id: Now.ID['vis-scenario_demo-panel_data-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'scenario_demo', content_area: 'panel_data', visible: true },
})

// --- kpis ---
export const visScenarioDemoKpisBusiness = Record({
    $id: Now.ID['vis-scenario_demo-kpis-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'scenario_demo', content_area: 'kpis', visible: true },
})
export const visScenarioDemoKpisTechnical = Record({
    $id: Now.ID['vis-scenario_demo-kpis-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'scenario_demo', content_area: 'kpis', visible: true },
})
export const visScenarioDemoKpisAdmin = Record({
    $id: Now.ID['vis-scenario_demo-kpis-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'scenario_demo', content_area: 'kpis', visible: true },
})

// --- llm_prompt ---
export const visScenarioDemoLlmPromptBusiness = Record({
    $id: Now.ID['vis-scenario_demo-llm_prompt-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'scenario_demo', content_area: 'llm_prompt', visible: false },
})
export const visScenarioDemoLlmPromptTechnical = Record({
    $id: Now.ID['vis-scenario_demo-llm_prompt-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'scenario_demo', content_area: 'llm_prompt', visible: true },
})
export const visScenarioDemoLlmPromptAdmin = Record({
    $id: Now.ID['vis-scenario_demo-llm_prompt-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'scenario_demo', content_area: 'llm_prompt', visible: false },
})

// --- context_engine ---
export const visScenarioDemoContextEngineBusiness = Record({
    $id: Now.ID['vis-scenario_demo-context_engine-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'scenario_demo', content_area: 'context_engine', visible: false },
})
export const visScenarioDemoContextEngineTechnical = Record({
    $id: Now.ID['vis-scenario_demo-context_engine-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'scenario_demo', content_area: 'context_engine', visible: true },
})
export const visScenarioDemoContextEngineAdmin = Record({
    $id: Now.ID['vis-scenario_demo-context_engine-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'scenario_demo', content_area: 'context_engine', visible: false },
})

// --- resilience_note ---
export const visScenarioDemoResilienceNoteBusiness = Record({
    $id: Now.ID['vis-scenario_demo-resilience_note-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'scenario_demo', content_area: 'resilience_note', visible: true },
})
export const visScenarioDemoResilienceNoteTechnical = Record({
    $id: Now.ID['vis-scenario_demo-resilience_note-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'scenario_demo', content_area: 'resilience_note', visible: true },
})
export const visScenarioDemoResilienceNoteAdmin = Record({
    $id: Now.ID['vis-scenario_demo-resilience_note-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'scenario_demo', content_area: 'resilience_note', visible: true },
})

// --- build_agent ---
export const visScenarioDemoBuildAgentBusiness = Record({
    $id: Now.ID['vis-scenario_demo-build_agent-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'scenario_demo', content_area: 'build_agent', visible: false },
})
export const visScenarioDemoBuildAgentTechnical = Record({
    $id: Now.ID['vis-scenario_demo-build_agent-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'scenario_demo', content_area: 'build_agent', visible: true },
})
export const visScenarioDemoBuildAgentAdmin = Record({
    $id: Now.ID['vis-scenario_demo-build_agent-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'scenario_demo', content_area: 'build_agent', visible: false },
})

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN: use_case_library (8 areas × 3 personas = 24 records)
// ═══════════════════════════════════════════════════════════════════════════════

// --- title ---
export const visUseCaseLibraryTitleBusiness = Record({
    $id: Now.ID['vis-use_case_library-title-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'use_case_library', content_area: 'title', visible: true },
})
export const visUseCaseLibraryTitleTechnical = Record({
    $id: Now.ID['vis-use_case_library-title-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'use_case_library', content_area: 'title', visible: true },
})
export const visUseCaseLibraryTitleAdmin = Record({
    $id: Now.ID['vis-use_case_library-title-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'use_case_library', content_area: 'title', visible: true },
})

// --- otto_description ---
export const visUseCaseLibraryOttoDescriptionBusiness = Record({
    $id: Now.ID['vis-use_case_library-otto_description-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'use_case_library', content_area: 'otto_description', visible: true },
})
export const visUseCaseLibraryOttoDescriptionTechnical = Record({
    $id: Now.ID['vis-use_case_library-otto_description-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'use_case_library', content_area: 'otto_description', visible: true },
})
export const visUseCaseLibraryOttoDescriptionAdmin = Record({
    $id: Now.ID['vis-use_case_library-otto_description-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'use_case_library', content_area: 'otto_description', visible: true },
})

// --- sources ---
export const visUseCaseLibrarySourcesBusiness = Record({
    $id: Now.ID['vis-use_case_library-sources-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'use_case_library', content_area: 'sources', visible: true },
})
export const visUseCaseLibrarySourcesTechnical = Record({
    $id: Now.ID['vis-use_case_library-sources-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'use_case_library', content_area: 'sources', visible: true },
})
export const visUseCaseLibrarySourcesAdmin = Record({
    $id: Now.ID['vis-use_case_library-sources-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'use_case_library', content_area: 'sources', visible: true },
})

// --- build_notes ---
export const visUseCaseLibraryBuildNotesBusiness = Record({
    $id: Now.ID['vis-use_case_library-build_notes-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'use_case_library', content_area: 'build_notes', visible: false },
})
export const visUseCaseLibraryBuildNotesTechnical = Record({
    $id: Now.ID['vis-use_case_library-build_notes-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'use_case_library', content_area: 'build_notes', visible: true },
})
export const visUseCaseLibraryBuildNotesAdmin = Record({
    $id: Now.ID['vis-use_case_library-build_notes-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'use_case_library', content_area: 'build_notes', visible: false },
})

// --- deploy_time ---
export const visUseCaseLibraryDeployTimeBusiness = Record({
    $id: Now.ID['vis-use_case_library-deploy_time-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'use_case_library', content_area: 'deploy_time', visible: true },
})
export const visUseCaseLibraryDeployTimeTechnical = Record({
    $id: Now.ID['vis-use_case_library-deploy_time-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'use_case_library', content_area: 'deploy_time', visible: true },
})
export const visUseCaseLibraryDeployTimeAdmin = Record({
    $id: Now.ID['vis-use_case_library-deploy_time-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'use_case_library', content_area: 'deploy_time', visible: true },
})

// --- tier_badge ---
export const visUseCaseLibraryTierBadgeBusiness = Record({
    $id: Now.ID['vis-use_case_library-tier_badge-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'use_case_library', content_area: 'tier_badge', visible: true },
})
export const visUseCaseLibraryTierBadgeTechnical = Record({
    $id: Now.ID['vis-use_case_library-tier_badge-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'use_case_library', content_area: 'tier_badge', visible: true },
})
export const visUseCaseLibraryTierBadgeAdmin = Record({
    $id: Now.ID['vis-use_case_library-tier_badge-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'use_case_library', content_area: 'tier_badge', visible: true },
})

// --- industry ---
export const visUseCaseLibraryIndustryBusiness = Record({
    $id: Now.ID['vis-use_case_library-industry-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'use_case_library', content_area: 'industry', visible: true },
})
export const visUseCaseLibraryIndustryTechnical = Record({
    $id: Now.ID['vis-use_case_library-industry-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'use_case_library', content_area: 'industry', visible: true },
})
export const visUseCaseLibraryIndustryAdmin = Record({
    $id: Now.ID['vis-use_case_library-industry-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'use_case_library', content_area: 'industry', visible: true },
})

// --- playbook_button ---
export const visUseCaseLibraryPlaybookButtonBusiness = Record({
    $id: Now.ID['vis-use_case_library-playbook_button-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'use_case_library', content_area: 'playbook_button', visible: true },
})
export const visUseCaseLibraryPlaybookButtonTechnical = Record({
    $id: Now.ID['vis-use_case_library-playbook_button-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'use_case_library', content_area: 'playbook_button', visible: true },
})
export const visUseCaseLibraryPlaybookButtonAdmin = Record({
    $id: Now.ID['vis-use_case_library-playbook_button-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'use_case_library', content_area: 'playbook_button', visible: true },
})

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN: admin_dashboard (4 areas × 3 personas = 12 records)
// ═══════════════════════════════════════════════════════════════════════════════

// --- compliance_checklist ---
export const visAdminDashboardComplianceChecklistBusiness = Record({
    $id: Now.ID['vis-admin_dashboard-compliance_checklist-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'admin_dashboard', content_area: 'compliance_checklist', visible: false },
})
export const visAdminDashboardComplianceChecklistTechnical = Record({
    $id: Now.ID['vis-admin_dashboard-compliance_checklist-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'admin_dashboard', content_area: 'compliance_checklist', visible: false },
})
export const visAdminDashboardComplianceChecklistAdmin = Record({
    $id: Now.ID['vis-admin_dashboard-compliance_checklist-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'admin_dashboard', content_area: 'compliance_checklist', visible: true },
})

// --- infra_checklist ---
export const visAdminDashboardInfraChecklistBusiness = Record({
    $id: Now.ID['vis-admin_dashboard-infra_checklist-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'admin_dashboard', content_area: 'infra_checklist', visible: false },
})
export const visAdminDashboardInfraChecklistTechnical = Record({
    $id: Now.ID['vis-admin_dashboard-infra_checklist-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'admin_dashboard', content_area: 'infra_checklist', visible: false },
})
export const visAdminDashboardInfraChecklistAdmin = Record({
    $id: Now.ID['vis-admin_dashboard-infra_checklist-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'admin_dashboard', content_area: 'infra_checklist', visible: true },
})

// --- readiness_summary ---
export const visAdminDashboardReadinessSummaryBusiness = Record({
    $id: Now.ID['vis-admin_dashboard-readiness_summary-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'admin_dashboard', content_area: 'readiness_summary', visible: false },
})
export const visAdminDashboardReadinessSummaryTechnical = Record({
    $id: Now.ID['vis-admin_dashboard-readiness_summary-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'admin_dashboard', content_area: 'readiness_summary', visible: false },
})
export const visAdminDashboardReadinessSummaryAdmin = Record({
    $id: Now.ID['vis-admin_dashboard-readiness_summary-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'admin_dashboard', content_area: 'readiness_summary', visible: true },
})

// --- blocker_count ---
export const visAdminDashboardBlockerCountBusiness = Record({
    $id: Now.ID['vis-admin_dashboard-blocker_count-business'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBusiness, screen: 'admin_dashboard', content_area: 'blocker_count', visible: false },
})
export const visAdminDashboardBlockerCountTechnical = Record({
    $id: Now.ID['vis-admin_dashboard-blocker_count-technical'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaBuilderDev, screen: 'admin_dashboard', content_area: 'blocker_count', visible: false },
})
export const visAdminDashboardBlockerCountAdmin = Record({
    $id: Now.ID['vis-admin_dashboard-blocker_count-admin'],
    table: 'x_snc_wdf_advisory_vis_rule',
    data: { persona: personaAdmin, screen: 'admin_dashboard', content_area: 'blocker_count', visible: true },
})
