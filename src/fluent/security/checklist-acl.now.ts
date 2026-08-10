import '@servicenow/sdk/global'
import { Acl } from '@servicenow/sdk/core'
import { adminRole } from './roles.now'

export const checklistReadAcl = Acl({
    $id: Now.ID['checklist-read-acl'],
    type: 'record',
    table: 'x_snc_wdf_advisory_checklist',
    operation: 'read',
    roles: [adminRole],
    description: 'Restrict checklist item read access to WDF Admin role only',
    adminOverrides: true,
})

export const checklistWriteAcl = Acl({
    $id: Now.ID['checklist-write-acl'],
    type: 'record',
    table: 'x_snc_wdf_advisory_checklist',
    operation: 'write',
    roles: [adminRole],
    description: 'Restrict checklist item write access to WDF Admin role only',
    adminOverrides: true,
})

export const checklistCreateAcl = Acl({
    $id: Now.ID['checklist-create-acl'],
    type: 'record',
    table: 'x_snc_wdf_advisory_checklist',
    operation: 'create',
    roles: [adminRole],
    description: 'Restrict checklist item creation to WDF Admin role only',
    adminOverrides: true,
})

export const checklistDeleteAcl = Acl({
    $id: Now.ID['checklist-delete-acl'],
    type: 'record',
    table: 'x_snc_wdf_advisory_checklist',
    operation: 'delete',
    roles: [adminRole],
    description: 'Restrict checklist item deletion to WDF Admin role only',
    adminOverrides: true,
})
