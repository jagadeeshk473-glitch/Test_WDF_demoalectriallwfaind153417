const API_BASE = "/api/now/table";

const headers = () => ({
  "Content-Type": "application/json",
  "Accept": "application/json",
  "X-UserToken": (window as any).g_ck || ""
});

export async function searchConnectors(query: string) {
  const encoded = `nameLIKE${query}^ORtaglineLIKE${query}^ORkeywordsLIKE${query}`;
  const url = `${API_BASE}/x_snc_wdf_advisory_connector?sysparm_query=${encodeURIComponent(encoded)}&sysparm_limit=3&sysparm_display_value=all&sysparm_fields=sys_id,name,short_name,tagline,keywords`;
  const res = await fetch(url, { headers: headers() });
  const data = await res.json();
  return data.result || [];
}

export async function searchUseCases(query: string) {
  const encoded = `titleLIKE${query}^ORkeywordsLIKE${query}`;
  const url = `${API_BASE}/x_snc_wdf_advisory_use_case?sysparm_query=${encodeURIComponent(encoded)}&sysparm_limit=4&sysparm_display_value=all&sysparm_fields=sys_id,title,keywords,demo_id`;
  const res = await fetch(url, { headers: headers() });
  const data = await res.json();
  return data.result || [];
}

export async function fetchAllConnectors() {
  const fields = "sys_id,name,short_name,tagline,detail,best_for,not_for,protocol,auth_method,mid_server_requirement,latency,supports_write_back,write_back_note,status,keywords,q2_roadmap,q4_roadmap";
  const url = `${API_BASE}/x_snc_wdf_advisory_connector?sysparm_display_value=all&sysparm_fields=${fields}&sysparm_query=ORDERBYname`;
  const res = await fetch(url, { headers: headers() });
  const data = await res.json();
  return data.result || [];
}

export async function fetchConnector(sysId: string) {
  const url = `${API_BASE}/x_snc_wdf_advisory_connector/${sysId}?sysparm_display_value=all`;
  const res = await fetch(url, { headers: headers() });
  const data = await res.json();
  return data.result || null;
}

export async function fetchScenarioDemo(identifier: string) {
  // If it looks like a sys_id (32 hex chars), query directly by path
  if (/^[0-9a-f]{32}$/.test(identifier)) {
    const url = `${API_BASE}/x_snc_wdf_advisory_scn_demo/${identifier}?sysparm_display_value=all`;
    const res = await fetch(url, { headers: headers() });
    const data = await res.json();
    return data.result || null;
  }
  // Otherwise query by title LIKE for short identifiers from QuickChips
  const encoded = `titleLIKE${identifier}`;
  const url = `${API_BASE}/x_snc_wdf_advisory_scn_demo?sysparm_query=${encodeURIComponent(encoded)}&sysparm_limit=1&sysparm_display_value=all`;
  const res = await fetch(url, { headers: headers() });
  const data = await res.json();
  const results = data.result || [];
  return results[0] || null;
}

export async function fetchDemoSteps(scenarioId: string) {
  const encoded = `scenario=${scenarioId}^ORDERBYstep_number`;
  const url = `${API_BASE}/x_snc_wdf_advisory_demo_step?sysparm_query=${encodeURIComponent(encoded)}&sysparm_display_value=all`;
  const res = await fetch(url, { headers: headers() });
  const data = await res.json();
  return data.result || [];
}

export async function fetchUseCases() {
  const url = `${API_BASE}/x_snc_wdf_advisory_use_case?sysparm_display_value=all&sysparm_query=ORDERBYtier,title`;
  const res = await fetch(url, { headers: headers() });
  const data = await res.json();
  return data.result || [];
}

export async function fetchArchPatterns() {
  const url = `${API_BASE}/x_snc_wdf_advisory_arch_pat?sysparm_display_value=all&sysparm_query=ORDERBYname`;
  const res = await fetch(url, { headers: headers() });
  const data = await res.json();
  return data.result || [];
}

export async function fetchUseCaseIdeas() {
  const url = `${API_BASE}/x_snc_wdf_advisory_use_case?sysparm_display_value=all&sysparm_query=ORDERBYindustry,tier,title`;
  const res = await fetch(url, { headers: headers() });
  const data = await res.json();
  return data.result || [];
}

export async function fetchChecklistItems(): Promise<{ items: any[]; denied: boolean }> {
  const url = `${API_BASE}/x_snc_wdf_advisory_checklist?sysparm_display_value=all&sysparm_query=ORDERBYchecklist_type,section,label`;
  const res = await fetch(url, { headers: headers() });
  if (res.status === 403 || res.status === 401) return { items: [], denied: true };
  const data = await res.json();
  return { items: data.result || [], denied: false };
}

export async function getAIRecommendation(query: string): Promise<any> {
  const url = `/api/x_snc_wdf_advisory/wdf_ai_recommend/recommend`;
  const res = await fetch(url, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ query }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.result || data;
}
