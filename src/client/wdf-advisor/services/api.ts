const API_BASE = '/api/now/table'

const headers = () => ({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-UserToken': (window as any).g_ck || '',
})

export async function searchConnectors(query: string) {
    const encoded = `nameLIKE${query}^ORtaglineLIKE${query}^ORkeywordsLIKE${query}`
    const url = `${API_BASE}/x_snc_wdf_advisory_connector?sysparm_query=${encodeURIComponent(encoded)}&sysparm_limit=3&sysparm_display_value=all&sysparm_fields=sys_id,name,short_name,tagline,keywords`
    const res = await fetch(url, { headers: headers() })
    const data = await res.json()
    return data.result || []
}

export async function searchUseCases(query: string) {
    const encoded = `titleLIKE${query}^ORbusiness_problemLIKE${query}`
    const url = `${API_BASE}/x_snc_wdf_advisory_use_case?sysparm_query=${encodeURIComponent(encoded)}&sysparm_limit=4&sysparm_display_value=all&sysparm_fields=sys_id,title,industry,products`
    const res = await fetch(url, { headers: headers() })
    const data = await res.json()
    return data.result || []
}

export async function fetchAllConnectors() {
    const fields =
        'sys_id,name,short_name,tagline,detail,best_for,not_for,protocol,auth_method,mid_server_requirement,latency,supports_write_back,write_back_note,status,keywords,q2_roadmap,q4_roadmap'
    const url = `${API_BASE}/x_snc_wdf_advisory_connector?sysparm_display_value=all&sysparm_fields=${fields}&sysparm_query=ORDERBYname`
    const res = await fetch(url, { headers: headers() })
    const data = await res.json()
    return data.result || []
}

export async function fetchConnector(sysId: string) {
    const url = `${API_BASE}/x_snc_wdf_advisory_connector/${sysId}?sysparm_display_value=all`
    const res = await fetch(url, { headers: headers() })
    const data = await res.json()
    return data.result || null
}

export async function fetchScenarioDemo(identifier: string) {
    if (/^[0-9a-f]{32}$/.test(identifier)) {
        const url = `${API_BASE}/x_snc_wdf_advisory_scn_demo/${identifier}?sysparm_display_value=all`
        const res = await fetch(url, { headers: headers() })
        const data = await res.json()
        return data.result || null
    }
    const encoded = `titleLIKE${identifier}`
    const url = `${API_BASE}/x_snc_wdf_advisory_scn_demo?sysparm_query=${encodeURIComponent(encoded)}&sysparm_limit=1&sysparm_display_value=all`
    const res = await fetch(url, { headers: headers() })
    const data = await res.json()
    const results = data.result || []
    return results[0] || null
}

export async function fetchDemoSteps(scenarioId: string) {
    const encoded = `scenario=${scenarioId}^ORDERBYstep_number`
    const url = `${API_BASE}/x_snc_wdf_advisory_demo_step?sysparm_query=${encodeURIComponent(encoded)}&sysparm_display_value=all`
    const res = await fetch(url, { headers: headers() })
    const data = await res.json()
    return data.result || []
}

export async function fetchUseCases() {
    const url = `${API_BASE}/x_snc_wdf_advisory_use_case?sysparm_display_value=all&sysparm_query=ORDERBYtitle`
    const res = await fetch(url, { headers: headers() })
    const data = await res.json()
    return data.result || []
}

export async function fetchArchPatterns() {
    const fields = 'sys_id,name,tagline,data_flow_steps,connectors,industry_examples,linked_demo'
    const url = `${API_BASE}/x_snc_wdf_advisory_arch_pat?sysparm_display_value=all&sysparm_fields=${fields}&sysparm_query=ORDERBYname`
    const res = await fetch(url, { headers: headers() })
    const data = await res.json()
    return data.result || []
}

export async function fetchChecklistItems(): Promise<{ items: any[]; denied: boolean }> {
    const url = `${API_BASE}/x_snc_wdf_advisory_checklist?sysparm_display_value=all&sysparm_query=ORDERBYchecklist_type,section,label`
    const res = await fetch(url, { headers: headers() })
    if (res.status === 403 || res.status === 401) return { items: [], denied: true }
    const data = await res.json()
    return { items: data.result || [], denied: false }
}

export async function getAIRecommendation(query: string): Promise<any> {
    const url = `/api/x_snc_wdf_advisory/wdf_ai_recommend/recommend`
    const res = await fetch(url, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ query }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.result || data
}

// --- Use Case Generator API ---

export async function generateUseCases(pain: string, industry: string, systems: string[]): Promise<any[]> {
    const url = `/api/x_snc_wdf_advisory/wdf_ai_recommend/generate-usecases`
    const res = await fetch(url, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ pain, industry, systems: systems.join(', ') }),
    })
    if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.result?.error || errData.error || 'Failed to generate use cases')
    }
    const data = await res.json()
    const result = data.result || data
    return result.useCases || []
}

export async function fetchCustomerUseCases(): Promise<any[]> {
    const url = `${API_BASE}/x_snc_wdf_advisory_use_case?sysparm_display_value=all&sysparm_query=ORDERBYsys_created_on DESC&sysparm_fields=sys_id,title,domain,line_of_business,industry,persona,products,external_systems,business_problem,solution,outcome,links,sys_created_by,sys_created_on`
    const res = await fetch(url, { headers: headers() })
    const data = await res.json()
    return data.result || []
}

export async function createCustomerUseCase(data: any): Promise<any> {
    const url = `${API_BASE}/x_snc_wdf_advisory_use_case`
    const res = await fetch(url, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(data),
    })
    const result = await res.json()
    return result.result || result
}

export async function updateCustomerUseCase(sysId: string, data: any): Promise<any> {
    const url = `${API_BASE}/x_snc_wdf_advisory_use_case/${sysId}`
    const res = await fetch(url, {
        method: 'PATCH',
        headers: headers(),
        body: JSON.stringify(data),
    })
    const result = await res.json()
    return result.result || result
}

export async function deleteCustomerUseCase(sysId: string): Promise<void> {
    const url = `${API_BASE}/x_snc_wdf_advisory_use_case/${sysId}`
    await fetch(url, {
        method: 'DELETE',
        headers: headers(),
    })
}

// --- Instance Assessment API ---

export async function runInstanceAssessment(): Promise<any> {
    const url = `/api/x_snc_wdf_advisory/wdf_ai_recommend/instance-assess`
    const res = await fetch(url, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({}),
    })
    if (!res.ok) {
        throw new Error('Instance assessment request failed')
    }
    const data = await res.json()
    return data.result || data
}

// --- Instance Assessment Auto-Load ---

export async function getOrRunInstanceAssessment(): Promise<any> {
  const cached = sessionStorage.getItem('wdf_instance_assessment');
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      console.log('[WDF] Using cached instance assessment');
      return parsed;
    } catch (parseErr) {
      console.warn('[WDF] Corrupt assessment cache — clearing and re-running:', parseErr);
      sessionStorage.removeItem('wdf_instance_assessment');
      sessionStorage.removeItem('wdf_assessment_timestamp');
    }
  }
  try {
    console.log('[WDF] Running instance assessment...');
    const result = await runInstanceAssessment();
    if (result) {
      sessionStorage.setItem('wdf_instance_assessment', JSON.stringify(result));
      sessionStorage.setItem('wdf_assessment_timestamp', String(Date.now()));
    }
    return result;
  } catch (e) {
    console.warn('[WDF] Instance assessment failed:', e);
    return null;
  }
}

export function getCachedAssessment(): any {
  const cached = sessionStorage.getItem('wdf_instance_assessment');
  if (!cached) return null;
  try {
    return JSON.parse(cached);
  } catch (e) {
    console.warn('[WDF] Corrupt assessment cache in getCachedAssessment — clearing:', e);
    sessionStorage.removeItem('wdf_instance_assessment');
    sessionStorage.removeItem('wdf_assessment_timestamp');
    return null;
  }
}

export function clearAssessmentCache(): void {
  sessionStorage.removeItem('wdf_instance_assessment');
  sessionStorage.removeItem('wdf_assessment_timestamp');
}

export function getAssessmentAge(): { hours: number; isStale: boolean } | null {
  const ts = sessionStorage.getItem('wdf_assessment_timestamp');
  if (!ts) return null;
  const hours = (Date.now() - Number(ts)) / (1000 * 60 * 60);
  return { hours: Math.round(hours * 10) / 10, isStale: hours > 24 };
}

export function setGlobalAssessmentContext(assessment: any): void {
  (window as any).wdfAssessmentContext = assessment;
}

export function getGlobalAssessmentContext(): any {
  return (window as any).wdfAssessmentContext || null;
}

// --- Scenario Chat API ---

export async function sendScenarioMessage(messages: { role: string; content: string }[], turn: number): Promise<any> {
    const url = `/api/x_snc_wdf_advisory/wdf_ai_recommend/scenario-chat`
    const res = await fetch(url, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ messages, turn }),
    })
    if (!res.ok) throw new Error('Scenario chat request failed')
    const data = await res.json()
    return data.result || data
}

// --- Web Search API ---

export async function webSearch(query: string): Promise<{ summary: string; findings: string[]; source_hint: string }> {
    const url = `/api/x_snc_wdf_advisory/wdf_ai_recommend/web-search`
    const res = await fetch(url, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ query }),
    })
    if (!res.ok) {
        throw new Error('Web search request failed')
    }
    const data = await res.json()
    return data.result || data
}
