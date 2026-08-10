import '@servicenow/sdk/global'
import { RestApi } from '@servicenow/sdk/core'

RestApi({
    $id: Now.ID['wdf-ai-recommend-api'],
    name: 'WDF AI Recommendation',
    serviceId: 'wdf_ai_recommend',
    consumes: 'application/json',
    routes: [
        {
            $id: Now.ID['wdf-ai-recommend-route'],
            name: 'recommend',
            method: 'POST',
            path: '/recommend',
            script: Now.include('../../server/rest/ai-recommend.js'),
        },
    ],
})
