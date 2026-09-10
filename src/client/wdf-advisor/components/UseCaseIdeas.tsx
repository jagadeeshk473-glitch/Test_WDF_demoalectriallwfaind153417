import React, { useState, useEffect, useCallback } from "react";
import { jsPDF } from "jspdf";
import { generateUseCases, fetchCustomerUseCases, createCustomerUseCase, updateCustomerUseCase, deleteCustomerUseCase } from "../services/api";

const INDUSTRIES = ["Healthcare", "Financial Services", "Manufacturing", "Retail", "Technology", "Government", "Education", "Energy", "Telecommunications", "Cross-Industry"];
const SYSTEMS = ["SAP", "Oracle", "Workday", "Salesforce", "Jira", "ServiceNow", "Snowflake", "AWS", "Azure", "GCP", "Kafka", "SharePoint", "Confluence", "Splunk", "Active Directory", "Custom APIs"];

// --- GeneratorTab ---
function GeneratorTab() {
  const [pain, setPain] = useState("");
  const [industry, setIndustry] = useState("");
  const [selectedSystems, setSelectedSystems] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState<Record<number, boolean>>({});

  const toggleSystem = (sys: string) => {
    setSelectedSystems(prev => prev.includes(sys) ? prev.filter(s => s !== sys) : [...prev, sys]);
  };

  const handleGenerate = async () => {
    setLoading(true); setError(""); setResults([]);
    try {
      const data = await generateUseCases(pain, industry, selectedSystems);
      setResults(data);
    } catch (e: any) { setError(e.message || "Generation failed"); }
    setLoading(false);
  };

  const handleExportPDF = () => {
    const items = results.filter((_, i) => selected[i]);
    if (!items.length) return;
    const doc = new jsPDF();
    let y = 20;
    doc.setFontSize(16); doc.text("Generated Use Cases", 14, y); y += 12;
    items.forEach((uc, idx) => {
      if (y > 260) { doc.addPage(); y = 20; }
      doc.setFontSize(12); doc.text(`${idx + 1}. ${uc.title}`, 14, y); y += 7;
      doc.setFontSize(9);
      doc.text(`Connectors: ${(uc.connectors || []).join(", ")}`, 14, y); y += 5;
      doc.text(`Pain: ${uc.pain}`, 14, y); y += 5;
      const lines = doc.splitTextToSize(`ServiceNow Enables: ${uc.servicenowEnables}`, 180);
      doc.text(lines, 14, y); y += lines.length * 4 + 4;
      (uc.businessValue || []).forEach((bv: string) => { doc.text(`• ${bv}`, 18, y); y += 5; });
      y += 6;
    });
    doc.save("generated-use-cases.pdf");
  };

  if (results.length > 0) {
    return (
      <div>
        <div style={s.warningBanner}>⚠️ These results are ephemeral — they won't persist after you leave this page. Export or save what you need.</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "12px 0" }}>
          {pain && <span style={s.contextTag}>Pain: {pain.slice(0, 40)}{pain.length > 40 ? "…" : ""}</span>}
          {industry && <span style={s.contextTag}>{industry}</span>}
          {selectedSystems.map(sys => <span key={sys} style={s.contextTag}>{sys}</span>)}
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <button style={s.btnSecondary} onClick={() => setResults([])}>← Refine inputs</button>
          <button style={s.btnSecondary} onClick={handleGenerate}>↻ Regenerate</button>
          <button style={s.btnSecondary} onClick={() => { setSelectMode(!selectMode); setSelected({}); }}>{selectMode ? "Cancel selection" : "Select & export PDF"}</button>
          {selectMode && <button style={s.btnOrange} onClick={handleExportPDF}>Export PDF</button>}
        </div>
        <div style={s.grid}>
          {results.map((uc, i) => (
            <div key={i} style={{ ...s.card, border: expanded[i] ? "2px solid #00C6A2" : "1px solid #E0E5EC" }}>
              {selectMode && <input type="checkbox" checked={!!selected[i]} onChange={() => setSelected(p => ({ ...p, [i]: !p[i] }))} style={{ marginBottom: 8 }} />}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
                {(uc.connectors || []).map((c: string) => <span key={c} style={s.connBadge}>{c}</span>)}
              </div>
              <h4 style={s.cardTitle}>{uc.title}</h4>
              <p style={s.cardText}>{uc.pain}</p>
              <button style={s.expandBtn} onClick={() => setExpanded(p => ({ ...p, [i]: !p[i] }))}>
                {expanded[i] ? "▾ Collapse" : "▸ Details"}
              </button>
              {expanded[i] && (
                <div style={{ marginTop: 8 }}>
                  <p style={s.sectionHead}>Connector Reasoning</p>
                  <p style={s.cardText}>{uc.connectorReasoning}</p>
                  <p style={s.sectionHead}>ServiceNow Enables</p>
                  <p style={s.cardText}>{uc.servicenowEnables}</p>
                  <p style={s.sectionHead}>Business Value</p>
                  <ul style={{ paddingLeft: 16 }}>{(uc.businessValue || []).map((v: string, j: number) => <li key={j} style={s.cardText}>{v}</li>)}</ul>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                    {(uc.industryTags || []).map((t: string) => <span key={t} style={s.industryTag}>{t}</span>)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <label style={s.label}>Pain / Challenge</label>
        <textarea style={s.textarea} value={pain} onChange={e => setPain(e.target.value)} placeholder="Describe the customer's integration pain point..." rows={3} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={s.label}>Industry</label>
        <select style={s.select} value={industry} onChange={e => setIndustry(e.target.value)}>
          <option value="">-- Select --</option>
          {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
        </select>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={s.label}>External Systems</label>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {SYSTEMS.map(sys => (
            <button key={sys} onClick={() => toggleSystem(sys)} style={{ ...s.chip, ...(selectedSystems.includes(sys) ? s.chipActive : {}) }}>
              {sys}
            </button>
          ))}
        </div>
      </div>
      {error && <div style={s.errorBanner}>{error} <button style={s.retryBtn} onClick={handleGenerate}>Retry</button></div>}
      <button style={s.btnOrange} onClick={handleGenerate} disabled={loading}>
        {loading ? <><span style={s.spinner} /> Generating...</> : "Generate Use Cases"}
      </button>
    </div>
  );
}

// --- CustomerTab ---
function CustomerTab() {
  const [useCases, setUseCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [currentUser, setCurrentUser] = useState("");
  const [form, setForm] = useState({ title: "", line_of_business: "", industry: "", persona: "", products: "", external_systems: "", business_problem: "", solution: "", outcome: "", links: "[]" });

  useEffect(() => {
    const uname = (window as any).NOW?.user_name || "admin";
    setCurrentUser(uname);
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchCustomerUseCases();
    setUseCases(data);
    setLoading(false);
  };

  const filtered = useCases.filter(uc => {
    const q = search.toLowerCase();
    const matchSearch = !q || (uc.title?.value || uc.title || "").toLowerCase().includes(q) || (uc.products?.value || uc.products || "").toLowerCase().includes(q);
    const matchInd = !filterIndustry || (uc.industry?.value || uc.industry || "") === filterIndustry;
    return matchSearch && matchInd;
  });

  const val = (field: any) => typeof field === "object" && field !== null ? (field.display_value || field.value || "") : (field || "");

  const openCreate = () => { setEditId(null); setForm({ title: "", line_of_business: "", industry: "", persona: "", products: "", external_systems: "", business_problem: "", solution: "", outcome: "", links: "[]" }); setModalOpen(true); };
  const openEdit = (uc: any) => {
    setEditId(uc.sys_id?.value || uc.sys_id);
    setForm({ title: val(uc.title), line_of_business: val(uc.line_of_business), industry: val(uc.industry), persona: val(uc.persona), products: val(uc.products), external_systems: val(uc.external_systems), business_problem: val(uc.business_problem), solution: val(uc.solution), outcome: val(uc.outcome), links: val(uc.links) || "[]" });
    setModalOpen(true);
  };

  const handleSave = async () => {
    const payload = { ...form };
    if (editId) { await updateCustomerUseCase(editId, payload); }
    else { await createCustomerUseCase(payload); }
    setModalOpen(false); loadData();
  };

  const handleDelete = async () => {
    if (deleteId) { await deleteCustomerUseCase(deleteId); setDeleteId(null); loadData(); }
  };

  const handleCSV = () => {
    const rows = [["Title", "Industry", "Products", "Business Problem", "Solution", "Outcome", "Author"]];
    filtered.forEach(uc => rows.push([val(uc.title), val(uc.industry), val(uc.products), val(uc.business_problem), val(uc.solution), val(uc.outcome), val(uc.sys_created_by)]));
    const csv = rows.map(r => r.map(c => `"${(c || "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" }); const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "customer-use-cases.csv"; a.click();
  };

  const handlePDF = () => {
    const items = filtered.filter(uc => selected[uc.sys_id?.value || uc.sys_id]);
    if (!items.length) return;
    const doc = new jsPDF(); let y = 20;
    doc.setFontSize(16); doc.text("Customer Use Cases", 14, y); y += 12;
    items.forEach((uc, idx) => {
      if (y > 250) { doc.addPage(); y = 20; }
      doc.setFontSize(12); doc.text(`${idx + 1}. ${val(uc.title)}`, 14, y); y += 7;
      doc.setFontSize(9);
      doc.text(`Products: ${val(uc.products)}`, 14, y); y += 5;
      const prob = doc.splitTextToSize(`Problem: ${val(uc.business_problem)}`, 180);
      doc.text(prob, 14, y); y += prob.length * 4 + 3;
      const sol = doc.splitTextToSize(`Solution: ${val(uc.solution)}`, 180);
      doc.text(sol, 14, y); y += sol.length * 4 + 3;
      const out = doc.splitTextToSize(`Outcome: ${val(uc.outcome)}`, 180);
      doc.text(out, 14, y); y += out.length * 4 + 8;
    });
    doc.save("customer-use-cases.pdf");
  };

  // Links helpers
  const getLinks = (): { label: string; url: string }[] => { try { return JSON.parse(form.links || "[]"); } catch { return []; } };
  const setLinks = (links: { label: string; url: string }[]) => setForm(f => ({ ...f, links: JSON.stringify(links) }));

  return (
    <div>
      <p style={s.description}>Have a customer use case you want to share? Submit it here so others can learn from it and build on it.</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <input style={s.searchInput} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search use cases..." />
        <select style={s.filterSelect} value={filterIndustry} onChange={e => setFilterIndustry(e.target.value)}>
          <option value="">All Industries</option>
          {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
        </select>
        <button style={s.btnSecondary} onClick={handleCSV}>Export CSV</button>
        <button style={s.btnSecondary} onClick={() => { setSelectMode(!selectMode); setSelected({}); }}>{selectMode ? "Cancel" : "Select & export PDF"}</button>
        {selectMode && <button style={s.btnOrange} onClick={handlePDF}>Export PDF</button>}
        <button style={s.btnOrange} onClick={openCreate}>+ Submit use case</button>
      </div>
      {loading ? <p style={s.muted}>Loading...</p> : filtered.length === 0 ? <p style={s.muted}>No use cases found.</p> : (
        <div style={s.grid}>
          {filtered.map(uc => {
            const id = uc.sys_id?.value || uc.sys_id;
            const isOwner = val(uc.sys_created_by) === currentUser;
            return (
              <div key={id} style={s.card}>
                {selectMode && <input type="checkbox" checked={!!selected[id]} onChange={() => setSelected(p => ({ ...p, [id]: !p[id] }))} style={{ marginBottom: 8 }} />}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
                  {(val(uc.products)).split(",").filter(Boolean).slice(0, 3).map((p: string) => <span key={p} style={s.productPill}>{p.trim()}</span>)}
                </div>
                <h4 style={s.cardTitle}>{val(uc.title)}</h4>
                <p style={s.muted}>{val(uc.sys_created_by)} · {val(uc.industry)}</p>
                <button style={s.expandBtn} onClick={() => setExpanded(p => ({ ...p, [id]: !p[id] }))}>
                  {expanded[id] ? "▾ Collapse" : "▸ Details"}
                </button>
                {expanded[id] && (
                  <div style={{ marginTop: 8 }}>
                    <p style={s.sectionHead}>Business Problem</p><p style={s.cardText}>{val(uc.business_problem)}</p>
                    <p style={s.sectionHead}>Solution</p><p style={s.cardText}>{val(uc.solution)}</p>
                    <p style={s.sectionHead}>Outcome</p><p style={s.cardText}>{val(uc.outcome)}</p>
                    {val(uc.external_systems) && <><p style={s.sectionHead}>External Systems</p><p style={s.cardText}>{val(uc.external_systems)}</p></>}
                    {val(uc.line_of_business) && <><p style={s.sectionHead}>Line of Business</p><p style={s.cardText}>{val(uc.line_of_business)}</p></>}
                    {val(uc.links) && val(uc.links) !== "[]" && (
                      <div><p style={s.sectionHead}>Supporting Links</p>
                        {(() => { try { return JSON.parse(val(uc.links)); } catch { return []; } })().map((lnk: any, i: number) => (
                          <a key={i} href={lnk.url} target="_blank" rel="noreferrer" style={{ display: "block", color: "#00C6A2", fontSize: 13 }}>{lnk.label || lnk.url}</a>
                        ))}
                      </div>
                    )}
                    <p style={{ ...s.muted, marginTop: 8, fontSize: 11 }}>Created: {val(uc.sys_created_on)}</p>
                    {isOwner && (
                      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                        <button style={s.btnSecondary} onClick={() => openEdit(uc)}>Edit</button>
                        <button style={{ ...s.btnSecondary, color: "#D64045" }} onClick={() => setDeleteId(id)}>Delete</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Submit/Edit Modal */}
      {modalOpen && (
        <div style={s.modalOverlay}>
          <div style={s.modal}>
            <h3 style={{ color: "#0B2D4E", marginBottom: 16 }}>{editId ? "Edit Use Case" : "Submit Use Case"}</h3>
            <div style={s.formGrid}>
              <div><label style={s.label}>Title *</label><input style={s.input} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
              <div><label style={s.label}>Submitted by</label><input style={s.input} value={currentUser} disabled /></div>
              <div><label style={s.label}>Line of Business</label><input style={s.input} value={form.line_of_business} onChange={e => setForm(f => ({ ...f, line_of_business: e.target.value }))} /></div>
              <div><label style={s.label}>Industry</label>
                <select style={s.select} value={form.industry} onChange={e => setForm(f => ({ ...f, industry: e.target.value }))}>
                  <option value="">-- Select --</option>{INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div><label style={s.label}>Persona</label><input style={s.input} value={form.persona} onChange={e => setForm(f => ({ ...f, persona: e.target.value }))} /></div>
              <div><label style={s.label}>Products *</label><input style={s.input} value={form.products} onChange={e => setForm(f => ({ ...f, products: e.target.value }))} placeholder="Comma-separated" /></div>
              <div><label style={s.label}>External Systems</label><input style={s.input} value={form.external_systems} onChange={e => setForm(f => ({ ...f, external_systems: e.target.value }))} /></div>
              <div style={{ gridColumn: "1/-1" }}><label style={s.label}>Business Problem *</label><textarea style={s.textarea} value={form.business_problem} onChange={e => setForm(f => ({ ...f, business_problem: e.target.value }))} rows={3} /></div>
              <div style={{ gridColumn: "1/-1" }}><label style={s.label}>Solution *</label><textarea style={s.textarea} value={form.solution} onChange={e => setForm(f => ({ ...f, solution: e.target.value }))} rows={3} /></div>
              <div style={{ gridColumn: "1/-1" }}><label style={s.label}>Outcome *</label><textarea style={s.textarea} value={form.outcome} onChange={e => setForm(f => ({ ...f, outcome: e.target.value }))} rows={3} /></div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={s.label}>Supporting Links</label>
                {getLinks().map((lnk, i) => (
                  <div key={i} style={{ display: "flex", gap: 6, marginBottom: 4 }}>
                    <input style={{ ...s.input, flex: 1 }} value={lnk.label} placeholder="Label" onChange={e => { const ls = [...getLinks()]; ls[i] = { ...ls[i], label: e.target.value }; setLinks(ls); }} />
                    <input style={{ ...s.input, flex: 2 }} value={lnk.url} placeholder="URL" onChange={e => { const ls = [...getLinks()]; ls[i] = { ...ls[i], url: e.target.value }; setLinks(ls); }} />
                    <button style={s.btnSecondary} onClick={() => { const ls = [...getLinks()]; ls.splice(i, 1); setLinks(ls); }}>✕</button>
                  </div>
                ))}
                <button style={s.btnSecondary} onClick={() => setLinks([...getLinks(), { label: "", url: "" }])}>+ Add link</button>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "flex-end" }}>
              <button style={s.btnSecondary} onClick={() => setModalOpen(false)}>Cancel</button>
              <button style={s.btnOrange} onClick={handleSave} disabled={!form.title || !form.products || !form.business_problem || !form.solution || !form.outcome}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div style={s.modalOverlay}>
          <div style={{ ...s.modal, maxWidth: 400 }}>
            <h3 style={{ color: "#0B2D4E", marginBottom: 12 }}>Delete Use Case?</h3>
            <p style={s.cardText}>This action cannot be undone.</p>
            <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "flex-end" }}>
              <button style={s.btnSecondary} onClick={() => setDeleteId(null)}>Cancel</button>
              <button style={{ ...s.btnOrange, background: "#D64045" }} onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Main Component ---
export function UseCaseIdeas() {
  const [tab, setTab] = useState<"generate" | "customer">("generate");

  return (
    <div style={{ width: "100%" }}>
      <div style={s.subTabRow}>
        <button style={{ ...s.subTab, ...(tab === "generate" ? s.subTabActive : {}) }} onClick={() => setTab("generate")}>Generate Use Cases</button>
        <button style={{ ...s.subTab, ...(tab === "customer" ? s.subTabActive : {}) }} onClick={() => setTab("customer")}>Customer Use Cases</button>
      </div>
      <div style={{ padding: "24px 0" }}>
        {tab === "generate" && <GeneratorTab />}
        {tab === "customer" && <CustomerTab />}
      </div>
    </div>
  );
}

// --- Styles ---
const s: Record<string, React.CSSProperties> = {
  subTabRow: { display: "flex", gap: 4, borderBottom: "1px solid #E0E5EC" },
  subTab: { padding: "8px 16px", border: "none", background: "none", cursor: "pointer", fontSize: 13, color: "#5A6677", borderBottom: "2px solid transparent", marginBottom: -1 },
  subTabActive: { color: "#0B2D4E", borderBottomColor: "#00C6A2", fontWeight: 600 },
  label: { display: "block", fontSize: 12, fontWeight: 600, color: "#0B2D4E", marginBottom: 4 },
  textarea: { width: "100%", padding: "10px 12px", border: "1px solid #E0E5EC", borderRadius: 6, fontSize: 14, resize: "vertical" as const, fontFamily: "inherit" },
  select: { padding: "8px 12px", border: "1px solid #E0E5EC", borderRadius: 6, fontSize: 14, background: "#fff" },
  input: { width: "100%", padding: "8px 12px", border: "1px solid #E0E5EC", borderRadius: 6, fontSize: 14 },
  chip: { padding: "5px 12px", border: "1px solid #E0E5EC", borderRadius: 16, fontSize: 12, cursor: "pointer", background: "#fff", color: "#1A1A1A" },
  chipActive: { background: "#E8FFF5", borderColor: "#00C6A2", color: "#0B2D4E", fontWeight: 600 },
  btnOrange: { padding: "10px 20px", background: "#FF6B35", color: "#fff", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer" },
  btnSecondary: { padding: "8px 14px", background: "#fff", color: "#0B2D4E", border: "1px solid #E0E5EC", borderRadius: 6, fontSize: 13, cursor: "pointer" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 },
  card: { background: "#FFFFFF", border: "1px solid #E0E5EC", borderRadius: 10, padding: 16 },
  cardTitle: { color: "#0B2D4E", fontSize: 15, fontWeight: 600, marginBottom: 4 },
  cardText: { color: "#1A1A1A", fontSize: 13, lineHeight: 1.5, marginBottom: 4 },
  sectionHead: { color: "#0B2D4E", fontWeight: 700, fontSize: 12, marginTop: 8, marginBottom: 2 },
  expandBtn: { border: "none", background: "none", color: "#00C6A2", fontSize: 12, cursor: "pointer", padding: 0, fontWeight: 600 },
  connBadge: { background: "#E8FFF5", color: "#0B2D4E", fontSize: 11, padding: "2px 8px", borderRadius: 10, fontWeight: 600 },
  industryTag: { background: "#E0F2FA", color: "#0B2D4E", fontSize: 10, padding: "2px 6px", borderRadius: 8 },
  productPill: { background: "#E8FFF5", color: "#0B2D4E", fontSize: 11, padding: "2px 8px", borderRadius: 10, fontWeight: 500 },
  contextTag: { background: "#E0F2FA", color: "#0B2D4E", fontSize: 11, padding: "3px 8px", borderRadius: 10 },
  warningBanner: { background: "#FFF3E0", border: "1px solid #FFB74D", borderRadius: 6, padding: "10px 14px", fontSize: 13, marginBottom: 12, color: "#5A3E00" },
  errorBanner: { background: "#FFEBEE", border: "1px solid #EF5350", borderRadius: 6, padding: "10px 14px", fontSize: 13, marginBottom: 12, color: "#B71C1C" },
  retryBtn: { marginLeft: 8, background: "none", border: "1px solid #B71C1C", borderRadius: 4, color: "#B71C1C", cursor: "pointer", fontSize: 12, padding: "2px 8px" },
  spinner: { display: "inline-block", width: 14, height: 14, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.6s linear infinite", marginRight: 6 },
  muted: { color: "#5A6677", fontSize: 13 },
  description: { color: "#5A6677", fontSize: 14, marginBottom: 16 },
  searchInput: { padding: "8px 12px", border: "1px solid #E0E5EC", borderRadius: 6, fontSize: 14, minWidth: 200 },
  filterSelect: { padding: "8px 12px", border: "1px solid #E0E5EC", borderRadius: 6, fontSize: 13, background: "#fff" },
  modalOverlay: { position: "fixed" as const, inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "#fff", borderRadius: 12, padding: 24, maxWidth: 680, width: "90%", maxHeight: "85vh", overflow: "auto" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
};
