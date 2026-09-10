import '@servicenow/sdk/global'
import { Acl } from '@servicenow/sdk/core'

export const useCaseReadAcl = Acl({
    $id: Now.ID['use-case-read-acl'],
    type: 'record',
    table: 'x_snc_wdf_advisory_use_case',
    operation: 'read',
    roles: [],
    description: 'Allow everyone to read customer use cases',
    adminOverrides: true,
})

export const useCaseCreateAcl = Acl({
    $id: Now.ID['use-case-create-acl'],
    type: 'record',
    table: 'x_snc_wdf_advisory_use_case',
    operation: 'create',
    roles: [],
    description: 'Allow everyone to submit customer use cases',
    adminOverrides: true,
})

export const useCaseWriteAcl = Acl({
    $id: Now.ID['use-case-write-acl'],
    type: 'record',
    table: 'x_snc_wdf_advisory_use_case',
    operation: 'write',
    script: `answer = (current.sys_created_by == gs.getUserName());`,
    description: 'Only allow the record creator to edit their own use cases',
    adminOverrides: true,
})

export const useCaseDeleteAcl = Acl({
    $id: Now.ID['use-case-delete-acl'],
    type: 'record',
    table: 'x_snc_wdf_advisory_use_case',
    operation: 'delete',
    script: `answer = (current.sys_created_by == gs.getUserName());`,
    description: 'Only allow the record creator to delete their own use cases',
    adminOverrides: true,
})
