import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

/**
 * PersonaVisibility — GlideAjax-callable script include
 *
 * The single reusable API that every WDF Advisor screen calls to determine
 * what content areas to show/hide for the currently active persona.
 */
export const PersonaVisibility = ScriptInclude({
    $id: Now.ID['PersonaVisibility'],
    name: 'PersonaVisibility',
    script: Now.include('../../server/script-includes/persona-visibility.js'),
    description: 'Reusable persona visibility API for WDF Advisor. Returns content visibility rules per persona/screen. Callable via GlideAjax from any UI page.',
    clientCallable: true,
    accessibleFrom: 'public',
})
