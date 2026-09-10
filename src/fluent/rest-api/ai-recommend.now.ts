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
        {
            $id: Now.ID['wdf-ai-generate-usecases-route'],
            name: 'generate-usecases',
            method: 'POST',
            path: '/generate-usecases',
            script: Now.include('../../server/rest/ai-generate-usecases.js'),
        },
        {
            $id: Now.ID['wdf-ai-web-search-route'],
            name: 'web-search',
            method: 'POST',
            path: '/web-search',
            script: Now.include('../../server/rest/web-search.js'),
        },
        {
            $id: Now.ID['wdf-ai-instance-assess-route'],
            name: 'instance-assess',
            method: 'POST',
            path: '/instance-assess',
            script: Now.include('../../server/rest/instance-assess.js'),
        },
    ],
})
