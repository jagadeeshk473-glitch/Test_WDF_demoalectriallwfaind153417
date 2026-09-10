import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import page from '../../client/wdf-advisor/index.html'

/**
 * WDF Advisor Home Page
 *
 * Main entry point for the WDF Advisor application.
 * Provides persona-switchable views with unified search,
 * quick-launch demo chips, and a tabbed content browser.
 */
export const wdf_advisor = UiPage({
    $id: Now.ID['wdf-advisor-page'],
    endpoint: 'x_snc_wdf_advisory_home.do',
    description: 'WDF Advisor — connector recommendation, demos, and readiness tracking',
    category: 'general',
    html: page,
    direct: true,
})
