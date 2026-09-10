import { Pillar, getProductByName, getPillarForProduct, WDF_PRODUCTS } from './wdfProduct';

export interface FourCRecommendation {
    connect: { products: string[]; reasons: string[] };
    control: { products: string[]; reasons: string[] };
    contextualize: { products: string[]; reasons: string[] };
    converge: { products: string[]; reasons: string[] };
}

/**
 * Given a list of recommended connector names, expand to full 4C recommendation
 */
export function expandTo4C(connectorNames: string[], userContext: string): FourCRecommendation {
    const result: FourCRecommendation = {
        connect: { products: [], reasons: [] },
        control: { products: [], reasons: [] },
        contextualize: { products: [], reasons: [] },
        converge: { products: [], reasons: [] },
    };

    const ctx = userContext.toLowerCase();

    // Place recommended connectors in their pillars
    for (const name of connectorNames) {
        const pillar = getPillarForProduct(name);
        if (pillar) {
            result[pillar.toLowerCase() as keyof FourCRecommendation].products.push(name);
        } else {
            // Default: Connect pillar for unknown products
            result.connect.products.push(name);
        }
    }

    // Auto-add Control pillar if not already present
    if (result.control.products.length === 0) {
        result.control.products.push('Data Catalog');
        result.control.reasons.push('Register and track all data assets flowing through the recommended connectors');

        // Add Data Governance if compliance/sensitivity keywords detected
        const complianceKeywords = ['compliance', 'gdpr', 'hipaa', 'sox', 'pci', 'regulated', 'pii', 'sensitive', 'audit', 'retention', 'masking'];
        if (complianceKeywords.some(k => ctx.indexOf(k) > -1)) {
            result.control.products.push('Data Governance');
            result.control.reasons.push('Enforce compliance policies, data quality rules, and access controls');
        }
    }

    // Auto-add Contextualize if analytics/performance keywords detected
    const analyticsKeywords = ['analytics', 'reporting', 'dashboard', 'bi', 'medallion', 'trends', 'forecasting', 'insights'];
    const performanceKeywords = ['slow', 'performance', 'sluggish', 'heavy queries', 'locks up'];
    const historicalKeywords = ['archive', 'historical', 'retention', 'years of data', 'old records'];

    if (result.contextualize.products.length === 0) {
        if (analyticsKeywords.some(k => ctx.indexOf(k) > -1) || performanceKeywords.some(k => ctx.indexOf(k) > -1)) {
            result.contextualize.products.push('RaptorDB Pro');
            result.contextualize.reasons.push('HTAP engine for analytics without impacting operational performance');
        }
        if (historicalKeywords.some(k => ctx.indexOf(k) > -1)) {
            result.contextualize.products.push('Live Archive');
            result.contextualize.reasons.push('Retain and query historical data with full live access');
        }
    }

    // Auto-add Converge if automation/trigger keywords detected
    const automationKeywords = ['automate', 'automation', 'trigger', 'alert', 'threshold', 'rule', 'when', 'if then', 'escalate', 'notify'];
    if (result.converge.products.length === 0) {
        if (automationKeywords.some(k => ctx.indexOf(k) > -1)) {
            result.converge.products.push('Automation Engine');
            result.converge.reasons.push('Event-driven automation to trigger actions based on data patterns');
        }
    }

    return result;
}

/**
 * Check if a recommendation spans multiple pillars (is cross-product)
 */
export function isCrossProduct(rec: FourCRecommendation): boolean {
    let pillarCount = 0;
    if (rec.connect.products.length > 0) pillarCount++;
    if (rec.control.products.length > 0) pillarCount++;
    if (rec.contextualize.products.length > 0) pillarCount++;
    if (rec.converge.products.length > 0) pillarCount++;
    return pillarCount >= 2;
}
