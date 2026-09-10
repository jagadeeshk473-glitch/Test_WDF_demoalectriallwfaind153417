import React, { useState, useEffect, useRef } from "react";

type Persona = "business" | "builder" | "admin";

interface Props {
  persona: Persona;
  setPersona: (p: Persona) => void;
}

const PERSONAS: { key: Persona; label: string; subtitle: string }[] = [
  { key: "business", label: "Business User", subtitle: "Outcomes & ROI focus" },
  { key: "builder", label: "Builder / Dev", subtitle: "Technical how-to" },
  { key: "admin", label: "Admin", subtitle: "Platform governance" }
];

export function Header({ persona, setPersona }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = PERSONAS.find((p) => p.key === persona)!;

  return (
    <header style={styles.header}>
      <div style={styles.badge}>WDF Advisor</div>
      <div ref={ref} style={styles.switcherWrap}>
        <button style={styles.switcherBtn} onClick={() => setOpen(!open)}>
          {current.label} ▾
        </button>
        {open && (
          <div style={styles.dropdown}>
            {PERSONAS.map((p) => (
              <button
                key={p.key}
                style={{
                  ...styles.dropItem,
                  fontWeight: p.key === persona ? 700 : 400
                }}
                onClick={() => { setPersona(p.key); setOpen(false); }}
              >
                <span>{p.label}</span>
                <span style={styles.subtitle}>{p.subtitle}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    position: "sticky", top: 0, zIndex: 100,
    background: "#0B2D4E", display: "flex",
    alignItems: "center", justifyContent: "center",
    padding: "12px 24px", minHeight: 56
  },
  badge: {
    background: "rgba(255,255,255,0.15)", color: "#fff",
    padding: "6px 18px", borderRadius: 20,
    fontSize: 15, fontWeight: 600, letterSpacing: 0.3
  },
  switcherWrap: { position: "absolute", right: 24 },
  switcherBtn: {
    background: "#00C6A2", color: "#fff", border: "none",
    borderRadius: 20, padding: "8px 16px", cursor: "pointer",
    fontSize: 13, fontWeight: 600
  },
  dropdown: {
    position: "absolute", right: 0, top: 44,
    background: "#fff", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    minWidth: 200, overflow: "hidden"
  },
  dropItem: {
    display: "flex", flexDirection: "column", alignItems: "flex-start",
    width: "100%", padding: "12px 16px", border: "none",
    background: "none", cursor: "pointer", textAlign: "left"
  },
  subtitle: { fontSize: 11, color: "#5A6677", marginTop: 2 }
};
