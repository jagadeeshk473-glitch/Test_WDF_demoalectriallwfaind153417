import React, { useState, useEffect, useCallback } from "react";
import "./app.css";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { QuickChips } from "./components/QuickChips";
import { TabStrip } from "./components/TabStrip";
import { ConnectorDetail } from "./components/ConnectorDetail";
import { CompareView } from "./components/CompareView";
import { ClarifyFlow } from "./components/ClarifyFlow";
import { ScenarioStepper } from "./components/ScenarioStepper";
import { WebSearchPanel } from "./components/WebSearchPanel";

type Persona = "business" | "builder" | "admin";

function getView() {
  const params = new URLSearchParams(window.location.search);
  return params.get("view") || "home";
}

function getParam(key: string) {
  return new URLSearchParams(window.location.search).get(key) || "";
}

export function navigate(params: Record<string, string>) {
  const url = new URL(window.location.href);
  url.search = "";
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  history.pushState(null, "", url.toString());
  window.dispatchEvent(new Event("popstate"));
}

export function App() {
  const [view, setView] = useState(getView);
  const [activeTab, setActiveTab] = useState(() => getParam("tab") || "connectors");
  const [persona, setPersona] = useState<Persona>(
    () => (sessionStorage.getItem("wdf_persona") as Persona) || "business"
  );
  const [search, setSearch] = useState("");
  const [resultShown, setResultShown] = useState(false);

  const handlePopState = useCallback(() => {
    setView(getView());
    const tab = getParam("tab");
    if (tab) setActiveTab(tab);
    setResultShown(false);
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [handlePopState]);

  useEffect(() => {
    sessionStorage.setItem("wdf_persona", persona);
  }, [persona]);

  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set("view", "home");
    url.searchParams.set("tab", tab);
    history.replaceState(null, "", url.toString());
  };

  // Get the active search query from URL params (used for WebSearchPanel persistence)
  const activeQuery = getParam("q");

  return (
    <>
      <Header persona={persona} setPersona={setPersona} />
      {view === "home" && (
        <div className="home-container">
          <SearchBar value={search} onChange={setSearch} />
          <QuickChips />
          <TabStrip persona={persona} activeTab={activeTab} setActiveTab={handleSetActiveTab} />
        </div>
      )}
      {view === "connector" && (
        <div className="page-container">
          <ConnectorDetail
            connectorId={getParam("id")}
            persona={persona}
            onBack={() => navigate({ view: "home", tab: "connectors" })}
          />
        </div>
      )}
      {view === "compare" && (
        <div className="page-container">
          <CompareView
            connectorA={getParam("a")}
            connectorB={getParam("b")}
            onBack={() => navigate({ view: "home", tab: "connectors" })}
          />
        </div>
      )}
      {view === "demo" && (
        <div className="page-container">
          <ScenarioStepper demoId={getParam("id")} persona={persona} />
        </div>
      )}
      {view === "clarify" && (
        <div className="page-container">
          <div className={`clarify-layout${resultShown ? " clarify-layout--full" : ""}`}>
            <div className="clarify-main">
              <ClarifyFlow initialQuery={activeQuery} onResultShown={setResultShown} />
            </div>
            <div className="clarify-aside">
              <WebSearchPanel query={activeQuery} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
