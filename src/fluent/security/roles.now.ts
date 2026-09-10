import '@servicenow/sdk/global'
import { Role } from '@servicenow/sdk/core'

/**
 * WDF Advisor Persona Roles
 *
 * Three runtime-switchable personas that control what content is visible
 * on each screen. A user may hold multiple roles — the UI allows switching
 * between any persona the user is authorized for.
 *
 * - business_user: Plain-English descriptions, outcomes, no protocol detail
 * - builder_dev:   Protocol, auth, latency, MID Server, lab exercises, Build Agent
 * - admin:         Compliance/governance, write-back risk, infra readiness checklists
 */

export const businessUserRole = Role({
    name: 'x_snc_wdf_advisory.business_user',
    description:
        'WDF Advisor Business User — sees plain-English descriptions, outcomes, and connector recommendations without technical protocol detail.',
    federatedId: '85MZV8YySw90dGCwlL0kFIib6YCEQC94ehNbldzKax8=',
})

export const builderDevRole = Role({
    name: 'x_snc_wdf_advisory.builder_dev',
    description:
        'WDF Advisor Builder/Dev — sees full protocol, auth, latency, MID Server requirements, lab exercises, and Build Agent deployment steps.',
    containsRoles: [businessUserRole],
    federatedId: 'Wa6853MoDRzRk0y0E6QBKQ7ioZhfMtbDdkeUzHJmxHI=',
})

export const adminRole = Role({
    name: 'x_snc_wdf_advisory.admin',
    description:
        'WDF Advisor Admin — sees compliance/governance framing, write-back risk assessment, and infrastructure readiness checklists. Contains both lower roles.',
    containsRoles: [businessUserRole, builderDevRole],
    federatedId: '49V7kJ/+z91/E15q46bvmenPEKV2PUwwufLdCzv7Eyw=',
})
