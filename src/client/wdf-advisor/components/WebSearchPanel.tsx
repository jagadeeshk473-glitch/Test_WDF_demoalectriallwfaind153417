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

export function WebSearchPanel({ query }: Props) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WebSearchResult | null>(null);
  const [error, setError] = useState(false);
  const lastQuery = useRef("");

  useEffect(() => {
    if (!query || query === lastQuery.current) return;
    lastQuery.current = query;
    setLoading(true);
    setError(false);
    setResult(null);

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

  const loadingStyle: React.CSSProperties = {
    fontSize: 12,
    color: "#7B8794",
    display: "flex",
    alignItems: "center",
    gap: 8,
  };

  if (loading) {
    return (
      <div style={panelStyle}>
        <div style={loadingStyle}>
          <span style={{ animation: "pulse 1.5s infinite", display: "inline-block" }}>🌐</span>
          <span>Searching the web for relevant guidance...</span>
        </div>
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
