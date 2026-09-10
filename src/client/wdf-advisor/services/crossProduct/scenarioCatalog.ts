export interface CrossProductScenario {
    id: string;
    name: string;
    industry: string;
    tier: 'LAND' | 'EXPAND' | 'TRANSFORM';
    products: {
        connect: string[];
        control: string[];
        contextualize: string[];
        converge: string[];
    };
    businessFlow: string[];
    proof?: { customer: string; production: boolean; metrics: Record<string, string> };
}

export const SCENARIOS: CrossProductScenario[] = [
    {
        id: 'fraud-detection',
        name: 'Real-Time Fraud Detection',
        industry: 'Financial Services',
        tier: 'EXPAND',
        products: {
            connect: ['Stream Connect'],
            control: ['Data Catalog', 'Data Governance'],
            contextualize: ['RaptorDB Pro'],
            converge: ['Automation Engine', 'MCP Client'],
        },
        businessFlow: [
            'Transaction events stream from payment processor via Stream Connect',
            'Data Governance applies PII masking on card numbers',
            'RaptorDB Pro creates fraud score analytics tables',
            'Automation Engine triggers alert when fraud score > 0.8',
            'MCP Client notifies fraud team via external tools',
        ],
        proof: { customer: 'Banco Davivienda', production: true, metrics: { latency: '2-3 seconds', throughput: '50K+ tx/sec' } },
    },
    {
        id: 'supply-chain',
        name: 'Supply Chain Visibility',
        industry: 'Manufacturing',
        tier: 'EXPAND',
        products: {
            connect: ['ZCC for ERP'],
            control: ['Data Catalog', 'Data Governance'],
            contextualize: ['RaptorDB Pro'],
            converge: ['Automation Engine'],
        },
        businessFlow: [
            'ZCC for ERP queries SAP S/4HANA for live inventory data',
            'Data Catalog registers SKU, Warehouse, Supplier entities',
            'RaptorDB Pro creates demand forecasting analytics layer',
            'Automation Engine triggers PO when stock drops below threshold',
        ],
        proof: { customer: 'Stellantis', production: true, metrics: { latency: '3-5 seconds', stockAccuracy: '99.2%' } },
    },
];

export function getScenario(id: string): CrossProductScenario | undefined {
    return SCENARIOS.find(s => s.id === id);
}

export function getScenariosByIndustry(industry: string): CrossProductScenario[] {
    return SCENARIOS.filter(s => s.industry.toLowerCase() === industry.toLowerCase());
}
