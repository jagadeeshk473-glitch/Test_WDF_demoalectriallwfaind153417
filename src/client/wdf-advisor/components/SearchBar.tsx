import React, { useState, useEffect, useRef } from "react";
import { searchConnectors, searchUseCases, fetchAllConnectors } from "../services/api";
import { navigate } from "../app";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const v = (f: any) => f?.display_value || f?.value || f || "";

function detectComparison(query: string): { isCompare: boolean; names: string[] } {
  const compareWords = /\b(vs|versus|compare|comparison|difference between|compared to)\b/i;
  if (!compareWords.test(query)) return { isCompare: false, names: [] };
  const parts = query.split(compareWords).filter(p => p.trim() && !compareWords.test(p));
  return { isCompare: true, names: parts.map(p => p.trim()) };
}

function matchConnector(name: string, connectors: any[]): any | null {
  const lower = name.toLowerCase();
  return connectors.find((c: any) => {
    const n = v(c.name).toLowerCase();
    const sn = v(c.short_name).toLowerCase();
    const kw = v(c.keywords).toLowerCase();
    return n.includes(lower) || sn.includes(lower) || lower.includes(n) || lower.includes(sn) || kw.includes(lower);
  }) || null;
}

export function SearchBar({ value, onChange }: Props) {
  const [results, setResults] = useState<{ connectors: any[]; useCases: any[] }>({
    connectors: [], useCases: []
  });
  const [showDrop, setShowDrop] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!value.trim()) { setResults({ connectors: [], useCases: [] }); return; }
    if (timer.current) clearTimeout(timer.current);
    timer.current = window.setTimeout(async () => {
      const [c, u] = await Promise.all([searchConnectors(value), searchUseCases(value)]);
      setResults({ connectors: c, useCases: u });
      setShowDrop(true);
    }, 300);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [value]);

  async function submit() {
    if (!value.trim()) return;
    const { isCompare, names } = detectComparison(value);
    if (isCompare && names.length >= 2) {
      const all = await fetchAllConnectors();
      const a = matchConnector(names[0], all);
      const b = matchConnector(names[1], all);
      if (a && b) {
        navigate({ view: "compare", a: v(a.sys_id), b: v(b.sys_id) });
        return;
      }
    }
    navigate({ view: "clarify", q: value.trim() });
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") submit();
  }

  const hasResults = results.connectors.length > 0 || results.useCases.length > 0;

  return (
    <div style={styles.wrap}>
      <div style={styles.inputRow}>
        <input
          style={styles.input}
          placeholder="Ask about connectors, use cases, or integration patterns..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          onFocus={() => hasResults && setShowDrop(true)}
          onBlur={() => setTimeout(() => setShowDrop(false), 200)}
        />
        <button style={styles.submitBtn} onClick={submit} aria-label="Search">➜</button>
      </div>
      {showDrop && hasResults && (
        <div style={styles.dropdown}>
          {results.connectors.length > 0 && (
            <>
              <div style={styles.section}>Matching connectors</div>
              {results.connectors.map((c: any) => (
                <button key={c.sys_id.value} style={styles.item}
                  onMouseDown={() => navigate({ view: "connector", id: c.sys_id.value })}>
                  <span style={styles.pill}>{c.short_name?.display_value || c.name.display_value}</span>
                  <span style={styles.tagline}>{c.tagline?.display_value}</span>
                </button>
              ))}
            </>
          )}
          {results.useCases.length > 0 && (
            <>
              <div style={styles.section}>Scenarios</div>
              {results.useCases.map((u: any) => (
                <button key={u.sys_id.value} style={styles.item}
                  onMouseDown={() => navigate({ view: "demo", id: u.demo_id?.value || u.sys_id.value })}>
                  <span>{u.title.display_value}</span>
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: { position: "relative", width: "100%" },
  inputRow: { position: "relative", display: "flex", alignItems: "center" },
  input: {
    width: "100%", padding: "14px 56px 14px 18px", borderRadius: 28,
    border: "1px solid #E0E5EC", fontSize: 15,
    outline: "none", background: "#fff"
  },
  submitBtn: {
    position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)",
    width: 40, height: 40, borderRadius: "50%",
    background: "#00C6A2", border: "none", color: "#fff",
    fontSize: 18, cursor: "pointer", display: "flex",
    alignItems: "center", justifyContent: "center"
  },
  dropdown: {
    position: "absolute", top: 54, left: 0, right: 0,
    background: "#fff", borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    zIndex: 50, maxHeight: 320, overflowY: "auto"
  },
  section: { padding: "10px 16px 4px", fontSize: 11, fontWeight: 700, color: "#5A6677", textTransform: "uppercase" },
  item: {
    display: "flex", gap: 8, alignItems: "center", width: "100%",
    padding: "10px 16px", border: "none", background: "none",
    cursor: "pointer", textAlign: "left", fontSize: 14
  },
  pill: {
    background: "#E8F8F5", color: "#0B2D4E", padding: "3px 10px",
    borderRadius: 12, fontSize: 12, fontWeight: 600
  },
  tagline: { color: "#5A6677", fontSize: 13 }
};
