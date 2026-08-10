export interface Answers {
  systemType: string;
  dataAction: string;
  writeBack?: string;
  multiJoin?: string;
  reactionSpeed?: string;
  aiAgent?: string;
}

export interface Recommendation {
  primary: string;
  fallback: string;
  confidence: "High" | "Low";
  note?: string;
}

export function computeRecommendation(answers: Answers): Recommendation {
  const { systemType, dataAction, multiJoin, aiAgent } = answers;

  if (systemType === "kafka" || dataAction === "detect_changes") {
    return { primary: "Stream Connect", fallback: "Zero Copy Connect", confidence: "High" };
  }
  if (systemType === "documents" || dataAction === "search_documents") {
    return { primary: "External Content Connectors", fallback: "MCP Client", confidence: "High" };
  }
  if (systemType === "servicenow") {
    return { primary: "Live Connect", fallback: "Zero Copy Connect", confidence: "High" };
  }
  if (systemType === "erp") {
    return { primary: "ZCC for ERP", fallback: "Integration Hub", confidence: "High" };
  }
  if (systemType === "database") {
    if (multiJoin === "yes") {
      return {
        primary: "Zero Copy Connect",
        fallback: "ZCC for ERP",
        confidence: "High",
        note: "Use Trino federated join for cross-system queries",
      };
    }
    return { primary: "Zero Copy Connect", fallback: "Integration Hub", confidence: "High" };
  }
  if (systemType === "cloud_saas") {
    return { primary: "Integration Hub", fallback: "Zero Copy Connect", confidence: "High" };
  }
  if (dataAction === "feed_ai_agent" || aiAgent === "yes") {
    return { primary: "MCP Client", fallback: "Integration Hub", confidence: "High" };
  }
  return { primary: "Integration Hub", fallback: "MCP Client", confidence: "Low" };
}
