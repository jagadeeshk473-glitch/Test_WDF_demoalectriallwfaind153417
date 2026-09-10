import '@servicenow/sdk/global'
import { Table, StringColumn, IntegerColumn, ChoiceColumn, JsonColumn } from '@servicenow/sdk/core'

export const x_snc_wdf_advisory_chat_log = Table({
    name: 'x_snc_wdf_advisory_chat_log',
    label: 'WDF Chat Log',
    display: 'session_id',
    allowWebServiceAccess: true,
    schema: {
        session_id: StringColumn({ label: 'Session ID', maxLength: 40 }),
        user_query: StringColumn({ label: 'User Query (First Message)', maxLength: 4000 }),
        messages: JsonColumn({ label: 'Full Conversation (JSON)' }),
        recommendation: JsonColumn({ label: 'Recommendation (JSON)' }),
        products_recommended: StringColumn({ label: 'Products Recommended', maxLength: 1000 }),
        systems_detected: StringColumn({ label: 'Systems Detected', maxLength: 500 }),
        industry_detected: StringColumn({ label: 'Industry Detected', maxLength: 200 }),
        turn_count: IntegerColumn({ label: 'Turn Count' }),
        path_used: ChoiceColumn({
            label: 'Path Used',
            choices: {
                ai: { label: 'AI (GenAI Skill)', sequence: 1 },
                deterministic: { label: 'Deterministic (Fallback)', sequence: 2 },
                mixed: { label: 'Mixed', sequence: 3 },
            },
        }),
        duration_ms: IntegerColumn({ label: 'Duration (ms)' }),
        four_c_pillars: StringColumn({ label: '4C Pillars Used', maxLength: 500 }),
    },
})
