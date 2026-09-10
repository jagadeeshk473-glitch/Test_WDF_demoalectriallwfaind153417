import React, { useState, useRef, useEffect } from "react";
import { sendScenarioMessage } from "../services/api";
import { navigate } from "../app";
import type { ChatContextType } from "./ChatWithContext";

interface Message {
  role: "agent" | "user";
  content: string;
  type?: "question" | "recommendation";
  options?: string[];
  multiSelect?: boolean;
  recommendation?: any;
}

const AgentAvatar = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="16" cy="16" r="16" fill="url(#agentGrad)" />
    <path
      d="M16 6 C17 12, 20 13, 26 16 C20 17, 17 20, 16 26 C15 20, 12 17, 6 16 C12 15, 15 12, 16 6Z"
      fill="#6BEC3F"
    />
    <circle cx="16" cy="16" r="3" fill="#1a2744" />
    <defs>
      <radialGradient id="agentGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#2d4a7a" />
        <stop offset="100%" stopColor="#1a2744" />
      </radialGradient>
    </defs>
  </svg>
);

/**
 * Lightweight markdown renderer — converts **bold** and *italic* to JSX.
 * Handles the most common patterns returned by the AI chat endpoint.
 */
function renderMarkdown(text: string): React.ReactNode {
  if (!text) return text;
  // Split on **…** (bold).  split with a capturing group puts matches at odd indices.
  const boldParts = text.split(/\*\*(.*?)\*\*/g);
  if (boldParts.length === 1) return text; // no bold markers found

  return boldParts.map((segment, i) =>
    i % 2 === 1
      ? <strong key={i}>{segment}</strong>
      : <React.Fragment key={i}>{segment}</React.Fragment>
  );
}

const WELCOME_MESSAGE: Message = {
  role: "agent",
  content:
    "Hi! I'm WDF Advisor. Tell me about your Data and integration challenges — I'll ask a few questions to understand your needs, then recommend the right architecture pattern for you.",
  type: "question",
  options: [],
  multiSelect: false,
};

interface CustomerScenarioProps {
  assessmentContext?: ChatContextType;
  isContextReady?: boolean;
  userPersona?: 'business' | 'technical' | 'admin';
  personaAccess?: {
    show_protocol_detail: boolean;
    show_compliance: boolean;
    show_lab_exercises: boolean;
    show_admin_checklists: boolean;
  };
}

export function CustomerScenario({ assessmentContext, isContextReady, userPersona, personaAccess }: CustomerScenarioProps) {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [turn, setTurn] = useState(1);
  const [chatEnded, setChatEnded] = useState(false);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isContextReady && assessmentContext?.assessment) {
      (window as any).wdfChatContext = {
        pluginsScanned: assessmentContext.pluginsScanned,
        tablesScanned: assessmentContext.tablesScanned,
        totalFindings: assessmentContext.assessmentFindings.length,
        criticalFindings: assessmentContext.criticalFindingsCount,
      };
    }
  }, [isContextReady, assessmentContext]);

  // Store persona in window global so server-side AI path can reference it
  useEffect(() => {
    if (userPersona) {
      (window as any).wdfUserPersona = userPersona;
      (window as any).wdfPersonaAccess = personaAccess;
    }
  }, [userPersona, personaAccess]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading || chatEnded) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setSelectedChips([]);
    setLoading(true);

    try {
      const apiMessages = updatedMessages
        .filter((m) => m.role === "user" || (m.role === "agent" && m.content !== WELCOME_MESSAGE.content))
        .map((m) => ({ role: m.role === "agent" ? "assistant" : "user", content: m.content }));

      const nextTurn = turn + 1;
      const res = await sendScenarioMessage(apiMessages, nextTurn);

      const agentMsg: Message = {
        role: "agent",
        content: res.reply || "Here's what I recommend:",
        type: res.type || "question",
        options: res.options || [],
        multiSelect: res.multiSelect || false,
        recommendation: res.recommendation || undefined,
      };

      setMessages((prev) => [...prev, agentMsg]);
      setTurn(nextTurn);

      if (res.type === "recommendation") {
        setChatEnded(true);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "agent", content: "Sorry, something went wrong. Please try again or rephrase your scenario.", type: "question", options: [], multiSelect: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleChipClick = (option: string, isMultiSelect: boolean) => {
    if (isMultiSelect) {
      setSelectedChips((prev) =>
        prev.includes(option) ? prev.filter((c) => c !== option) : [...prev, option]
      );
    } else {
      sendMessage(option);
    }
  };

  const handleMultiSubmit = () => {
    if (selectedChips.length > 0) {
      sendMessage(selectedChips.join(", "));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const resetChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setInput("");
    setTurn(1);
    setChatEnded(false);
    setSelectedChips([]);
  };

  // Check if the last agent message is multi-select (for showing Continue button)
  const lastAgentMsg = messages.filter((m) => m.role === "agent").pop();
  const showContinueBtn = lastAgentMsg?.multiSelect && selectedChips.length > 0 && !loading && !chatEnded;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerTop}>
          <AgentAvatar />
          <div>
            <div style={styles.headerTitle}>Customer Scenario</div>
            <div style={styles.headerSub}>
              Describe your scenario and I'll guide you to the right WDF solution
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div style={styles.chatArea}>
        {messages.map((msg, idx) => {
          const isLastAgent = msg.role === "agent" && idx === messages.length - 1;
          return (
            <div key={idx} style={msg.role === "agent" ? styles.agentRow : styles.userRow}>
              {msg.role === "agent" && (
                <div style={styles.avatarWrap}>
                  <AgentAvatar />
                </div>
              )}
              <div style={msg.role === "agent" ? styles.agentBubble : styles.userBubble}>
                <div style={styles.msgText}>{msg.role === "agent" ? renderMarkdown(msg.content) : msg.content}</div>

                {/* Option chips — only show on last agent message when chat is active */}
                {msg.role === "agent" && msg.options && msg.options.length > 0 && !chatEnded && isLastAgent && !loading && (
                  <div style={styles.chipsSection}>
                    {msg.multiSelect && (
                      <div style={styles.multiHint}>Select one or more, then click Continue</div>
                    )}
                    {msg.multiSelect && (
                      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                        <button
                          style={{
                            padding: "4px 12px",
                            fontSize: 12,
                            border: "1px solid #00C6A2",
                            borderRadius: 14,
                            background: "#fff",
                            color: "#00C6A2",
                            cursor: "pointer",
                            fontWeight: 600,
                          }}
                          onClick={() => setSelectedChips([...(msg.options || [])])}
                        >
                          Select All
                        </button>
                        <button
                          style={{
                            padding: "4px 12px",
                            fontSize: 12,
                            border: "1px solid #E0E5EC",
                            borderRadius: 14,
                            background: "#fff",
                            color: "#5A6677",
                            cursor: "pointer",
                            fontWeight: 500,
                          }}
                          onClick={() => {
                            setSelectedChips([]);
                            sendMessage("None of the above");
                          }}
                        >
                          None / Skip
                        </button>
                      </div>
                    )}
                    <div style={styles.chipsWrap}>
                      {msg.options.map((opt, i) => {
                        const isSelected = selectedChips.includes(opt);
                        return (
                          <button
                            key={i}
                            style={{
                              ...styles.chip,
                              ...(isSelected ? styles.chipSelected : {}),
                            }}
                            onClick={() => handleChipClick(opt, !!msg.multiSelect)}
                          >
                            {msg.multiSelect && <span style={styles.checkmark}>{isSelected ? "✓ " : ""}</span>}
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {msg.multiSelect && selectedChips.length > 0 && (
                      <button style={styles.continueBtn} onClick={handleMultiSubmit}>
                        Continue with {selectedChips.length} selected →
                      </button>
                    )}
                  </div>
                )}

                {/* Recommendation card */}
                {msg.recommendation && <RecommendationCard rec={msg.recommendation} />}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {loading && (
          <div style={styles.agentRow}>
            <div style={styles.avatarWrap}>
              <AgentAvatar />
            </div>
            <div style={styles.agentBubble}>
              <style>{`
                @keyframes wdfPulse {
                  0%, 100% { opacity: 0.3; }
                  50% { opacity: 1; }
                }
              `}</style>
              <div style={styles.typing}>
                <span style={{ color: "#5A6677", fontSize: 14, animation: "wdfPulse 1.2s ease-in-out infinite" }}>●</span>
                <span style={{ color: "#5A6677", fontSize: 14, animation: "wdfPulse 1.2s ease-in-out infinite", animationDelay: "0.2s" }}>●</span>
                <span style={{ color: "#5A6677", fontSize: 14, animation: "wdfPulse 1.2s ease-in-out infinite", animationDelay: "0.4s" }}>●</span>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div style={styles.inputArea}>
        {chatEnded ? (
          <button style={styles.resetBtn} onClick={resetChat}>
            ↻ Start New Conversation
          </button>
        ) : (
          <div style={styles.inputRow}>
            <input
              style={styles.input}
              placeholder="Type your scenario or question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button
              style={{ ...styles.sendBtn, opacity: input.trim() ? 1 : 0.5 }}
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
            >
              Send →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Recommendation Card (4-Stage) ──────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const s = (status || "").toLowerCase();
  let bg = "#E0E7FF";
  let color = "#3730A3";
  if (s === "ga") { bg = "#D1FAE5"; color = "#065F46"; }
  else if (s === "preview") { bg = "#FEF3C7"; color = "#92400E"; }
  return (
    <span style={{ ...styles.badge, background: bg, color }}>{status}</span>
  );
}

function ConfidenceBadge({ level }: { level: string }) {
  const l = (level || "").toLowerCase();
  let bg = "#E0E5EC";
  let color = "#5A6677";
  if (l === "high") { bg = "#D1FAE5"; color = "#065F46"; }
  else if (l === "medium") { bg = "#FEF3C7"; color = "#92400E"; }
  return (
    <span style={{ ...styles.badge, background: bg, color }}>{level}</span>
  );
}

function ExpandToggle({ label, expanded, onToggle }: { label: string; expanded: boolean; onToggle: () => void }) {
  return (
    <button style={styles.expandBtn} onClick={onToggle}>
      <span style={{ transform: expanded ? "rotate(90deg)" : "rotate(0deg)", display: "inline-block", transition: "transform 0.2s" }}>▶</span>
      {" "}{label}
    </button>
  );
}

function TradeoffGrid({ tradeoffs }: { tradeoffs: any }) {
  if (!tradeoffs) return null;
  const dims = [
    { key: "freshness", label: "Freshness" },
    { key: "maintenance", label: "Maintenance" },
    { key: "accessControl", label: "Access Control" },
    { key: "history", label: "History" },
    { key: "scaleRisk", label: "Scale Risk" },
  ];
  return (
    <div style={styles.tradeoffGrid}>
      {dims.map((d, i) => (
        <div key={d.key} style={{ ...styles.tradeoffRow, background: i % 2 === 0 ? "#F8FAFE" : "#FFFFFF" }}>
          <div style={styles.tradeoffLabel}>{d.label}</div>
          <div style={styles.tradeoffValue}>{tradeoffs[d.key] || "—"}</div>
        </div>
      ))}
    </div>
  );
}

function ConnectorCard({ connector, linkedConnector }: { connector: any; linkedConnector?: any }) {
  const [showTradeoffs, setShowTradeoffs] = useState(false);
  return (
    <div style={styles.connectorMiniCard}>
      <div style={styles.connectorHeader}>
        <span style={styles.connectorName}>{connector.name}</span>
        <StatusBadge status={connector.status} />
      </div>
      <div style={styles.connectorReason}>{renderMarkdown(connector.reason)}</div>
      {connector.tradeoffs && (
        <>
          <ExpandToggle label="Tradeoffs" expanded={showTradeoffs} onToggle={() => setShowTradeoffs(!showTradeoffs)} />
          {showTradeoffs && <TradeoffGrid tradeoffs={connector.tradeoffs} />}
        </>
      )}
      {linkedConnector && (
        <button
          style={styles.recLink}
          onClick={() => navigate({ view: "connector", id: linkedConnector.sys_id })}
        >
          View {linkedConnector.name} details →
        </button>
      )}
    </div>
  );
}

function FourCPillarCard({ fourC }: { fourC: any }) {
  if (!fourC) return null;

  const pillars = [
    { key: 'connect', label: 'Connect', icon: '🔌', color: '#2E86AB', description: 'Data connectors and integration' },
    { key: 'control', label: 'Control', icon: '🛡️', color: '#A23B72', description: 'Governance, catalog, and compliance' },
    { key: 'contextualize', label: 'Contextualize', icon: '📊', color: '#F18F01', description: 'Analytics, context engine, and insights' },
    { key: 'converge', label: 'Converge', icon: '⚡', color: '#00C6A2', description: 'Automation, orchestration, and action' },
  ];

  const populatedPillars = pillars.filter(p => {
    const items = fourC[p.key];
    return items && items.length > 0;
  });
  if (populatedPillars.length < 2) return null;

  return (
    <div style={fourCStyles.container}>
      <div style={fourCStyles.header}>Complete Data Architecture (4C)</div>
      <div style={fourCStyles.pillarsGrid}>
        {pillars.map(pillar => {
          const items = fourC[pillar.key] || [];
          if (items.length === 0) return null;
          return (
            <div key={pillar.key} style={{ ...fourCStyles.pillarCard, borderTopColor: pillar.color }}>
              <div style={fourCStyles.pillarHeader}>
                <span style={{ fontSize: 16 }}>{pillar.icon}</span>
                <span style={{ ...fourCStyles.pillarLabel, color: pillar.color }}>{pillar.label}</span>
              </div>
              <div style={fourCStyles.pillarDesc}>{pillar.description}</div>
              <div style={fourCStyles.productList}>
                {items.map((item: any, idx: number) => (
                  <div key={idx} style={fourCStyles.productItem}>
                    <div style={fourCStyles.productName}>{item.name}</div>
                    {item.reason && <div style={fourCStyles.productReason}>{item.reason}</div>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const fourCStyles: Record<string, React.CSSProperties> = {
  container: {
    background: '#FFFFFF',
    border: '1px solid #E0E5EC',
    borderLeft: '3px solid #00C6A2',
    borderRadius: 8,
    padding: 16,
    marginTop: 14,
  },
  header: {
    fontSize: 11,
    fontWeight: 700,
    color: '#5A6677',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    marginBottom: 12,
  },
  pillarsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
  },
  pillarCard: {
    background: '#F8FAFE',
    border: '1px solid #E0E5EC',
    borderTop: '3px solid #ccc',
    borderRadius: 6,
    padding: 12,
  },
  pillarHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  pillarLabel: {
    fontSize: 13,
    fontWeight: 700,
  },
  pillarDesc: {
    fontSize: 11,
    color: '#5A6677',
    marginBottom: 8,
  },
  productList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 6,
  },
  productItem: {
    background: '#FFFFFF',
    borderRadius: 4,
    padding: '6px 8px',
    border: '1px solid #E0E5EC',
  },
  productName: {
    fontSize: 13,
    fontWeight: 600,
    color: '#1A1A1A',
  },
  productReason: {
    fontSize: 11,
    color: '#5A6677',
    lineHeight: '1.4',
    marginTop: 2,
  },
};

function RecommendationCard({ rec }: { rec: any }) {
  const [showTalkTrack, setShowTalkTrack] = useState(false);

  const { stage1_pattern, stage2_connectors, stage3_governance, stage4_proof, nextSteps, connectors, pattern } = rec;

  return (
    <div style={styles.recCardOuter}>
      {/* ── Stage 1: Pattern Matched ── */}
      {stage1_pattern && (
        <div style={styles.stageBlock}>
          <div style={styles.stageHeader}>Stage 1 · Pattern Matched</div>
          <div style={styles.patternCard}>
            <div style={styles.patternTitle}>{stage1_pattern.title}</div>
            <div style={styles.patternQuadrant}>{stage1_pattern.quadrant}</div>
          </div>
          <div style={styles.patternDesc}>{renderMarkdown(stage1_pattern.description)}</div>
          {stage1_pattern.talkTrack && (
            <>
              <ExpandToggle label="Talk Track" expanded={showTalkTrack} onToggle={() => setShowTalkTrack(!showTalkTrack)} />
              {showTalkTrack && (
                <div style={styles.talkTrack}>{renderMarkdown(stage1_pattern.talkTrack)}</div>
              )}
            </>
          )}
        </div>
      )}

      {/* ── Stage 2: Recommended Connectors ── */}
      {stage2_connectors && stage2_connectors.length > 0 && (
        <div style={styles.stageBlock}>
          <div style={styles.stageHeader}>Stage 2 · Recommended Connectors</div>
          {stage2_connectors.map((conn: any, i: number) => {
            const linked = connectors?.find((c: any) => c.name === conn.name);
            return <ConnectorCard key={i} connector={conn} linkedConnector={linked} />;
          })}
        </div>
      )}

      {/* ── 4C Architecture Pillars ── */}
      {rec.fourC && <FourCPillarCard fourC={rec.fourC} />}

      {/* ── Stage 3: Governance ── */}
      {stage3_governance && (
        <div style={styles.stageBlock}>
          <div style={styles.stageHeader}>Stage 3 · Governance</div>
          <div style={styles.govCard}>
            <div style={styles.govRow}>
              <span style={styles.govIcon}>🔒</span>
              <span style={styles.govLabel}>Access Control:</span>
              <span style={styles.govValue}>{stage3_governance.accessControl}</span>
            </div>
            <div style={styles.govRow}>
              <span style={styles.govIcon}>🌍</span>
              <span style={styles.govLabel}>Data Residency:</span>
              <span style={styles.govValue}>{stage3_governance.dataResidency}</span>
            </div>
            <div style={styles.govRow}>
              <span style={styles.govIcon}>✅</span>
              <span style={styles.govLabel}>Status:</span>
              <StatusBadge status={stage3_governance.status || ""} />
            </div>
            <div style={styles.govRow}>
              <span style={styles.govIcon}>🛡️</span>
              <span style={styles.govLabel}>Governance:</span>
              <span style={styles.govValue}>{stage3_governance.governance}</span>
            </div>
            {stage3_governance.constraints && stage3_governance.constraints.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <div style={styles.govRow}>
                  <span style={styles.govIcon}>⚠️</span>
                  <span style={styles.govLabel}>Constraints:</span>
                </div>
                <ul style={styles.constraintList}>
                  {stage3_governance.constraints.map((c: string, i: number) => (
                    <li key={i} style={styles.constraintItem}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Enhanced Governance Detail ── */}
      {rec.governance_detail && (
        <div style={styles.stageBlock}>
          <div style={styles.stageHeader}>Connector Maturity</div>
          <div style={styles.govCard}>
            <div style={styles.govRow}>
              <span style={styles.govIcon}>
                {rec.governance_detail.label === 'GA' ? '✅' : rec.governance_detail.label === 'Beta' ? '🧪' : '⚠️'}
              </span>
              <span style={styles.govLabel}>Status:</span>
              <span style={styles.govValue}>
                {rec.governance_detail.label === 'GA' ? '✓ APPROVED' : rec.governance_detail.label === 'Beta' ? '🧪 BETA (Preview)' : '⚠️ NEEDS REVIEW'}
              </span>
            </div>
            {rec.governance_detail.since && (
              <div style={styles.govRow}>
                <span style={styles.govIcon}>📅</span>
                <span style={styles.govLabel}>Available Since:</span>
                <span style={styles.govValue}>{rec.governance_detail.since}</span>
              </div>
            )}
            <div style={styles.govRow}>
              <span style={styles.govIcon}>📋</span>
              <span style={styles.govLabel}>Details:</span>
              <span style={styles.govValue}>{rec.governance_detail.description}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Stage 4: Proof Scenarios ── */}
      {stage4_proof && stage4_proof.length > 0 && (
        <div style={styles.stageBlock}>
          <div style={styles.stageHeader}>Stage 4 · Proof — Real Scenarios</div>
          {stage4_proof.map((proof: any, i: number) => (
            <div key={i} style={styles.proofRow}>
              <div style={styles.proofTitleRow}>
                <span style={styles.proofTitle}>{proof.title}</span>
                <ConfidenceBadge level={proof.confidence} />
              </div>
              <div style={styles.proofTags}>
                {proof.industry && <span style={styles.tag}>{proof.industry}</span>}
                {proof.systems && <span style={styles.tag}>{proof.systems}</span>}
              </div>
              <div style={styles.proofSummary}>{renderMarkdown(proof.summary)}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── Trade-Off Analysis ── */}
      {rec.tradeoff_analysis && rec.tradeoff_analysis.length > 0 && (
        <div style={styles.stageBlock}>
          <div style={styles.stageHeader}>Trade-Off Analysis</div>
          {rec.tradeoff_analysis.map((t: any, i: number) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 13, color: '#065F46', marginBottom: 2 }}>✅ {t.pro}</div>
              <div style={{ fontSize: 13, color: '#92400E' }}>⚠️ {t.con}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── Proof Points Detail ── */}
      {rec.proof_points_detail && rec.proof_points_detail.length > 0 && (
        <div style={styles.stageBlock}>
          <div style={styles.stageHeader}>Key Capabilities</div>
          {rec.proof_points_detail.map((p: any, i: number) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: 13 }}>
              <span>{p.icon}</span>
              <div>
                <span style={{ fontWeight: 600, color: '#1A1A1A' }}>{p.label}</span>
                <span style={{ color: '#5A6677' }}> — {p.detail}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Implementation Roadmap ── */}
      {rec.next_steps_roadmap && rec.next_steps_roadmap.length > 0 && (
        <div style={styles.stageBlock}>
          <div style={styles.stageHeader}>Implementation Roadmap</div>
          {rec.next_steps_roadmap.map((s: any, i: number) => (
            <div key={i} style={{ marginBottom: 10, paddingLeft: 4 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>
                {s.order}. {s.title}
              </div>
              <div style={{ fontSize: 12, color: '#5A6677', marginLeft: 16 }}>{s.description}</div>
              <div style={{ display: 'flex', gap: 16, marginLeft: 16, marginTop: 2 }}>
                {s.effort && <span style={{ fontSize: 11, color: '#00796b' }}>⏱️ {s.effort}</span>}
                {s.governance && s.governance !== 'none' && <span style={{ fontSize: 11, color: '#92400E' }}>🔐 {s.governance}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Orchestration Flow ── */}
      {rec.orchestration_flow && (
        <div style={styles.stageBlock}>
          <div style={styles.stageHeader}>Orchestration Flow</div>
          <div style={{ fontSize: 13, color: '#0B2D4E', fontWeight: 600, padding: '8px 12px', background: '#F0F7FF', borderRadius: 6, border: '1px solid #BFDBFE' }}>
            {rec.orchestration_flow}
          </div>
        </div>
      )}

      {/* ── Also Needed ── */}
      {rec.also_needed && rec.also_needed.length > 0 && (
        <div style={styles.stageBlock}>
          <div style={styles.stageHeader}>Also Needed</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
            {rec.also_needed.map((name: string, i: number) => (
              <span key={i} style={{ padding: '4px 12px', background: '#E0F2FE', borderRadius: 12, fontSize: 12, fontWeight: 600, color: '#0369A1' }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Bottom: Next Steps + Links ── */}
      {nextSteps && nextSteps.length > 0 && (
        <div style={styles.stageBlock}>
          <div style={styles.stageHeader}>Next Steps</div>
          <ol style={styles.stepsList}>
            {nextSteps.map((step: string, i: number) => (
              <li key={i} style={styles.stepItem}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      <div style={styles.linksRow}>
        {pattern && (
          <button style={styles.recLink} onClick={() => navigate({ view: "home", tab: "patterns" })}>
            🏗️ {pattern.name} — View Pattern →
          </button>
        )}
        {connectors && connectors.length > 0 && connectors.map((c: any, i: number) => (
          <button key={i} style={styles.recLink} onClick={() => navigate({ view: "connector", id: c.sys_id })}>
            🔌 {c.name} →
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "620px",
    border: "1px solid #E0E5EC",
    borderRadius: 12,
    overflow: "hidden",
    background: "#FFFFFF",
  },
  header: {
    padding: "14px 20px",
    borderBottom: "1px solid #E0E5EC",
    background: "#F8FAFE",
  },
  headerTop: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: "#1A1A1A",
  },
  headerSub: {
    fontSize: 12,
    color: "#5A6677",
  },
  chatArea: {
    flex: 1,
    overflowY: "auto" as const,
    padding: "20px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  agentRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    maxWidth: "88%",
  },
  userRow: {
    display: "flex",
    justifyContent: "flex-end",
  },
  avatarWrap: {
    paddingTop: 2,
  },
  agentBubble: {
    background: "#F8FAFE",
    border: "1px solid #E0E5EC",
    borderRadius: "2px 12px 12px 12px",
    padding: "12px 16px",
    maxWidth: "100%",
  },
  userBubble: {
    background: "#E8FFF5",
    border: "1px solid #A7F3D0",
    borderRadius: "12px 2px 12px 12px",
    padding: "12px 16px",
    maxWidth: "75%",
  },
  msgText: {
    fontSize: 14,
    color: "#1A1A1A",
    lineHeight: "1.5",
  },
  chipsSection: {
    marginTop: 12,
  },
  multiHint: {
    fontSize: 11,
    color: "#5A6677",
    fontStyle: "italic",
    marginBottom: 8,
  },
  chipsWrap: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 8,
  },
  chip: {
    padding: "7px 14px",
    border: "1px solid #E0E5EC",
    borderRadius: 20,
    background: "#FFFFFF",
    fontSize: 13,
    color: "#1A1A1A",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  chipSelected: {
    background: "#E8FFF5",
    borderColor: "#00C6A2",
    color: "#065F46",
    fontWeight: 600,
  },
  checkmark: {
    color: "#00C6A2",
    fontWeight: 700,
  },
  continueBtn: {
    marginTop: 10,
    padding: "8px 18px",
    background: "#00C6A2",
    color: "#FFFFFF",
    border: "none",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  typing: {
    display: "flex",
    gap: 4,
    padding: "4px 0",
  },
  typingDot: {
    color: "#5A6677",
    fontSize: 14,
    animation: "pulse 1s infinite",
  },
  inputArea: {
    padding: "12px 16px",
    borderTop: "1px solid #E0E5EC",
    background: "#FFFFFF",
  },
  inputRow: {
    display: "flex",
    gap: 8,
  },
  input: {
    flex: 1,
    padding: "10px 14px",
    border: "1px solid #E0E5EC",
    borderRadius: 8,
    fontSize: 14,
    outline: "none",
    color: "#1A1A1A",
  },
  sendBtn: {
    padding: "10px 18px",
    background: "#00C6A2",
    color: "#FFFFFF",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  resetBtn: {
    width: "100%",
    padding: "12px",
    background: "#F8FAFE",
    border: "1px solid #E0E5EC",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    color: "#00C6A2",
    cursor: "pointer",
  },
  // ─── 4-Stage Recommendation Styles ───
  recCardOuter: {
    marginTop: 12,
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  stageBlock: {
    background: "#FFFFFF",
    border: "1px solid #E0E5EC",
    borderLeft: "3px solid #00C6A2",
    borderRadius: 8,
    padding: 16,
  },
  stageHeader: {
    fontSize: 11,
    fontWeight: 700,
    color: "#5A6677",
    textTransform: "uppercase" as const,
    letterSpacing: "1px",
    marginBottom: 10,
  },
  // Stage 1 – Pattern
  patternCard: {
    background: "#0B2D4E",
    borderRadius: 8,
    padding: "14px 16px",
    marginBottom: 10,
  },
  patternTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  patternQuadrant: {
    fontSize: 12,
    color: "#A0B4C8",
    fontStyle: "italic",
  },
  patternDesc: {
    fontSize: 13,
    color: "#1A1A1A",
    lineHeight: "1.5",
    marginBottom: 8,
  },
  talkTrack: {
    fontSize: 13,
    color: "#5A6677",
    fontStyle: "italic",
    lineHeight: "1.5",
    background: "#F8FAFE",
    padding: "10px 12px",
    borderRadius: 6,
    marginTop: 6,
  },
  expandBtn: {
    background: "none",
    border: "none",
    color: "#00C6A2",
    fontWeight: 600,
    fontSize: 12,
    cursor: "pointer",
    padding: "4px 0",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  // Stage 2 – Connectors
  connectorMiniCard: {
    background: "#F8FAFE",
    border: "1px solid #E0E5EC",
    borderRadius: 8,
    padding: "12px 14px",
    marginBottom: 8,
  },
  connectorHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  connectorName: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1A1A1A",
  },
  connectorReason: {
    fontSize: 13,
    color: "#5A6677",
    lineHeight: "1.4",
    marginBottom: 6,
  },
  badge: {
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: 10,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.3px",
  },
  tradeoffGrid: {
    marginTop: 6,
    borderRadius: 6,
    overflow: "hidden",
    border: "1px solid #E0E5EC",
  },
  tradeoffRow: {
    display: "flex",
    padding: "6px 10px",
    fontSize: 12,
  },
  tradeoffLabel: {
    fontWeight: 600,
    color: "#5A6677",
    width: "35%",
    flexShrink: 0,
  },
  tradeoffValue: {
    color: "#1A1A1A",
    flex: 1,
  },
  // Stage 3 – Governance
  govCard: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  govRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
  },
  govIcon: {
    flexShrink: 0,
    width: 20,
    textAlign: "center" as const,
  },
  govLabel: {
    fontWeight: 600,
    color: "#5A6677",
    flexShrink: 0,
  },
  govValue: {
    color: "#1A1A1A",
  },
  constraintList: {
    margin: "4px 0 0 26px",
    padding: 0,
    listStyle: "disc",
  },
  constraintItem: {
    fontSize: 13,
    color: "#1A1A1A",
    marginBottom: 2,
    lineHeight: "1.4",
  },
  // Stage 4 – Proof
  proofRow: {
    background: "#F8FAFE",
    border: "1px solid #E0E5EC",
    borderRadius: 8,
    padding: "10px 14px",
    marginBottom: 8,
  },
  proofTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  proofTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1A1A1A",
  },
  proofTags: {
    display: "flex",
    gap: 6,
    marginBottom: 4,
  },
  tag: {
    display: "inline-block",
    padding: "2px 8px",
    background: "#E0E5EC",
    borderRadius: 10,
    fontSize: 11,
    color: "#5A6677",
    fontWeight: 500,
  },
  proofSummary: {
    fontSize: 12,
    color: "#5A6677",
    lineHeight: "1.4",
  },
  // Bottom links
  linksRow: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  recLink: {
    background: "none",
    border: "none",
    color: "#00C6A2",
    fontWeight: 600,
    fontSize: 13,
    cursor: "pointer",
    padding: 0,
    textAlign: "left" as const,
  },
  stepsList: {
    margin: 0,
    paddingLeft: 18,
  },
  stepItem: {
    fontSize: 13,
    color: "#1A1A1A",
    marginBottom: 4,
    lineHeight: "1.4",
  },
};
