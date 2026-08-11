// @ts-nocheck
/* eslint-disable */
/**
 * PersonaVisibility — GlideAjax-callable script include
 *
 * Provides a reusable visibility API for all WDF Advisor screens.
 * Call from client-side via GlideAjax to get the full visibility map
 * for the active persona and (optionally) a specific screen.
 */
var PersonaVisibility = Class.create();
PersonaVisibility.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
    getVisibility: function() {
        var personaKey = this.getParameter('sysparm_persona') || 'business';
        var screen = this.getParameter('sysparm_screen') || '';
        var config = this._buildConfig(personaKey, screen);
        return JSON.stringify(config);
    },
    getPersonas: function() {
        var personas = [];
        var gr = new GlideRecord('x_snc_wdf_advisory_persona');
        gr.addQuery('active', true);
        gr.orderBy('sort_order');
        gr.query();
        while (gr.next()) {
            personas.push({
                key: gr.getValue('key'),
                label: gr.getValue('label'),
                subtitle: gr.getValue('subtitle'),
                description: gr.getValue('description'),
                role_name: gr.getValue('role_name'),
                icon: gr.getValue('icon')
            });
        }
        return JSON.stringify(personas);
    },
    getUserPersonaAccess: function() {
        var access = {
            business: gs.hasRole('x_snc_wdf_advisory.business_user') || gs.hasRole('admin'),
            technical: gs.hasRole('x_snc_wdf_advisory.builder_dev') || gs.hasRole('admin'),
            admin: gs.hasRole('x_snc_wdf_advisory.admin') || gs.hasRole('admin')
        };
        return JSON.stringify(access);
    },
    _buildConfig: function(personaKey, screen) {
        var config = { persona: null, visible: {}, screens: {} };
        var personaGr = new GlideRecord('x_snc_wdf_advisory_persona');
        personaGr.addQuery('key', personaKey);
        personaGr.addQuery('active', true);
        personaGr.setLimit(1);
        personaGr.query();
        if (!personaGr.next()) { config.error = 'Persona not found'; return config; }
        config.persona = {
            key: personaGr.getValue('key'),
            label: personaGr.getValue('label'),
            show_protocol_detail: personaGr.getValue('show_protocol_detail') == '1',
            show_compliance: personaGr.getValue('show_compliance') == '1',
            show_lab_exercises: personaGr.getValue('show_lab_exercises') == '1',
            show_build_agent: personaGr.getValue('show_build_agent') == '1',
            show_admin_checklists: personaGr.getValue('show_admin_checklists') == '1',
            show_pricing: personaGr.getValue('show_pricing') == '1'
        };
        var ruleGr = new GlideRecord('x_snc_wdf_advisory_vis_rule');
        ruleGr.addQuery('persona', personaGr.getUniqueValue());
        if (screen) { ruleGr.addQuery('screen', screen); }
        ruleGr.query();
        while (ruleGr.next()) {
            var ruleScreen = ruleGr.getValue('screen');
            var contentArea = ruleGr.getValue('content_area');
            var isVisible = ruleGr.getValue('visible') == '1';
            if (screen) { config.visible[contentArea] = isVisible; }
            if (!config.screens[ruleScreen]) { config.screens[ruleScreen] = {}; }
            config.screens[ruleScreen][contentArea] = isVisible;
        }
        return config;
    },
    type: 'PersonaVisibility'
});
