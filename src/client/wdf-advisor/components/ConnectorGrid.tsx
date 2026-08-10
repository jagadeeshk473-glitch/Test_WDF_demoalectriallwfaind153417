import React, { useState, useEffect } from "react";
import { fetchAllConnectors } from "../services/api";
import { ConnectorCard } from "./ConnectorCard";

interface Props {
  persona: string;
}

export function ConnectorGrid({ persona }: Props) {
  const [connectors, setConnectors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllConnectors()
      .then((data) => setConnectors(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading connectors...</div>;
  }

  if (!connectors.length) {
    return <div style={styles.loading}>No connectors found.</div>;
  }

  return (
    <div>
      <div style={styles.grid}>
        {connectors.map((c: any) => (
          <ConnectorCard key={c.sys_id?.value || c.sys_id} connector={c} persona={persona} />
        ))}
      </div>
      <p style={styles.hint}>
        Not sure where to start? Type your use case in the search bar above.
      </p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  grid: {
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16
  },
  loading: {
    textAlign: "center", color: "#5A6677", fontSize: 14, padding: "40px 0"
  },
  hint: {
    textAlign: "center", color: "#5A6677", fontSize: 13, marginTop: 24
  }
};
