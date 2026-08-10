import '@servicenow/sdk/global'
import { Table, StringColumn, BooleanColumn, Record } from '@servicenow/sdk/core'

/**
 * Persona Definition Table
 *
 * Stores the three personas that drive UI visibility across all screens.
 * Each persona record defines the persona's identity, which role grants it,
 * and high-level content visibility flags.
 *
 * The UI reads these records at runtime to determine which content sections
 * to render for the currently active persona.
 */
export const x_snc_wdf_advisory_persona = Table({
    name: 'x_snc_wdf_advisory_persona',
    label: 'WDF Persona',
    display: 'label',
    allowWebServiceAccess: true,
    schema: {
        key: StringColumn({
            label: 'Key',
            mandatory: true,
            maxLength: 40,
            unique: true,
        }),
        label: StringColumn({
            label: 'Label',
            mandatory: true,
            maxLength: 100,
        }),
        subtitle: StringColumn({
            label: 'Subtitle',
            maxLength: 200,
        }),
        description: StringColumn({
            label: 'Description',
            maxLength: 1000,
        }),
        role_name: StringColumn({
            label: 'Role Name',
            maxLength: 100,
        }),
        icon: StringColumn({
            label: 'Icon',
            maxLength: 40,
        }),
        sort_order: StringColumn({
            label: 'Sort Order',
            maxLength: 10,
        }),
        active: BooleanColumn({
            label: 'Active',
            default: true,
        }),
        // High-level visibility flags (quick-check booleans)
        show_protocol_detail: BooleanColumn({
            label: 'Show Protocol Detail',
            default: false,
        }),
        show_compliance: BooleanColumn({
            label: 'Show Compliance',
            default: false,
        }),
        show_lab_exercises: BooleanColumn({
            label: 'Show Lab Exercises',
            default: false,
        }),
        show_build_agent: BooleanColumn({
            label: 'Show Build Agent',
            default: false,
        }),
        show_admin_checklists: BooleanColumn({
            label: 'Show Admin Checklists',
            default: false,
        }),
        show_pricing: BooleanColumn({
            label: 'Show Pricing Calculator',
            default: false,
        }),
    },
})

// ─── Seed: Business User Persona ────────────────────────────────────────────

export const personaBusiness = Record({
    $id: Now.ID['persona-business'],
    table: 'x_snc_wdf_advisory_persona',
    data: {
        key: 'business',
        label: 'Business User',
        subtitle: 'Plain English - outcomes - no protocols',
        description: 'Sees connector recommendations in plain English with business outcomes, use-case framing, and scenario demos. No protocol, auth, or infrastructure detail.',
        role_name: 'x_snc_wdf_advisory.business_user',
        icon: 'briefcase',
        sort_order: '100',
        active: true,
        show_protocol_detail: false,
        show_compliance: false,
        show_lab_exercises: false,
        show_build_agent: false,
        show_admin_checklists: false,
        show_pricing: false,
    },
})

// ─── Seed: Builder/Dev Persona ──────────────────────────────────────────────

export const personaBuilderDev = Record({
    $id: Now.ID['persona-builder-dev'],
    table: 'x_snc_wdf_advisory_persona',
    data: {
        key: 'technical',
        label: 'Builder / Dev',
        subtitle: 'RFC - BAPI - OData - deployment - Build Agent',
        description: 'Sees full protocol detail, authentication methods, latency specifications, MID Server requirements, lab exercises, build notes, and the Build Agent deployment flow.',
        role_name: 'x_snc_wdf_advisory.builder_dev',
        icon: 'code',
        sort_order: '200',
        active: true,
        show_protocol_detail: true,
        show_compliance: false,
        show_lab_exercises: true,
        show_build_agent: true,
        show_admin_checklists: false,
        show_pricing: true,
    },
})

// ─── Seed: Admin Persona ────────────────────────────────────────────────────

export const personaAdmin = Record({
    $id: Now.ID['persona-admin'],
    table: 'x_snc_wdf_advisory_persona',
    data: {
        key: 'admin',
        label: 'Admin',
        subtitle: 'Compliance - infra readiness - governance',
        description: 'Sees compliance and governance framing, write-back risk assessment, infrastructure readiness checklists, and environment-specific readiness checks.',
        role_name: 'x_snc_wdf_advisory.admin',
        icon: 'shield',
        sort_order: '300',
        active: true,
        show_protocol_detail: false,
        show_compliance: true,
        show_lab_exercises: false,
        show_build_agent: false,
        show_admin_checklists: true,
        show_pricing: false,
    },
})
