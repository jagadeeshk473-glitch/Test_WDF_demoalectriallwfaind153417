import React, { useState, useEffect, useRef } from "react";
import { webSearch } from "../services/api";

interface WebSearchResult {
  summary: string;
  findings: string[];
  source_hint: string;
}

interface Props {
  query: string;
}

const LOADING_MESSAGES = [
  "Searching the web for relevant guidance...",
  "Querying internet sources...",
  "Analyzing search results...",
  "Summarizing findings...",
];

export function WebSearchPanel({ query }: Props) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WebSearchResult | null>(null);
  const [error, setError] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(0);
  const lastQuery = useRef("");

  // Rotate loading messages for better perceived performance
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingMsg((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (!query || query === lastQuery.current) return;
    lastQuery.current = query;
    setLoading(true);
    setError(false);
    setResult(null);
    setLoadingMsg(0);

    webSearch(query)
      .then((data) => {
        if (data && (data.summary || data.findings?.length)) {
          setResult(data);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [query]);

  if (!query) return null;

  const panelStyle: React.CSSProperties = {
    background: "#F8FAFE",
    border: "1px solid #E0E5EC",
    borderRadius: 8,
    padding: "16px 20px",
    margin: 0,
    overflow: "hidden",
    wordBreak: "break-word",
    overflowWrap: "break-word",
  };

  const headerStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 600,
    color: "#3E4C59",
    marginBottom: 12,
    display: "flex",
    alignItems: "center",
    gap: 8,
  };

  const summaryStyle: React.CSSProperties = {
    fontSize: 13,
    color: "#1A1A1A",
    lineHeight: 1.5,
    marginBottom: 12,
  };

  const listStyle: React.CSSProperties = {
    margin: 0,
    padding: "0 0 0 18px",
    listStyleType: "disc",
  };

  const listItemStyle: React.CSSProperties = {
    fontSize: 12.5,
    color: "#3E4C59",
    lineHeight: 1.6,
    marginBottom: 4,
  };

  const footerStyle: React.CSSProperties = {
    marginTop: 12,
    fontSize: 11,
    color: "#7B8794",
    fontStyle: "italic",
  };

  if (loading) {
    return (
      <div style={panelStyle}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16 }}>🌐</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#3E4C59" }}>Searching the internet</span>
          </div>
          {/* Progress bar */}
          <div style={{ height: 3, background: "#E0E5EC", borderRadius: 2, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              background: "linear-gradient(90deg, #00C6A2, #0080FF)",
              borderRadius: 2,
              animation: "shimmer 2s ease-in-out infinite",
              width: "60%",
            }} />
          </div>
          <span style={{ fontSize: 12, color: "#7B8794" }}>{LOADING_MESSAGES[loadingMsg]}</span>
        </div>
        <style>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); opacity: 0.7; }
            50% { transform: translateX(30%); opacity: 1; }
            100% { transform: translateX(100%); opacity: 0.7; }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={panelStyle}>
        <div style={{ fontSize: 12, color: "#7B8794" }}>
          🌐 Web search unavailable — try again later.
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div style={panelStyle}>
      <div style={headerStyle}>
        <span>🌐</span>
        <span>Found this from the internet — see if it can help you</span>
      </div>
      {result.summary && <p style={summaryStyle}>{result.summary}</p>}
      {result.findings && result.findings.length > 0 && (
        <ul style={listStyle}>
          {result.findings.map((finding, i) => (
            <li key={i} style={listItemStyle}>{finding}</li>
          ))}
        </ul>
      )}
      {result.source_hint && (
        <div style={footerStyle}>Source: {result.source_hint}</div>
      )}
    </div>
  );
}
