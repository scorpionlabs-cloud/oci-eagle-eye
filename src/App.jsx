import React, { useMemo, useState } from "react";
import { regions, resources, compartments } from "./ociResources";
import "./index.css";

const statusColor = {
  Healthy: "#10b981",
  Degraded: "#f59e0b",
  "Read-only": "#6366f1"
};

function App() {
  const [regionFilter, setRegionFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [compartmentFilter, setCompartmentFilter] = useState("All");
  const [selectedCompartment, setSelectedCompartment] = useState("prod-compartment");
  const [search, setSearch] = useState("");

  const summary = useMemo(() => {
    const totalResources = resources.length;
    const totalCompute = resources.filter(r => r.service === "Compute").length;
    const totalOke = resources.filter(
      r => r.service === "Container Engine for Kubernetes"
    ).length;
    const totalDb = resources.filter(
      r => r.service === "Autonomous Database"
    ).length;

    const runningOrActive = resources.filter(r =>
      ["Running", "Active", "Available"].includes(r.lifecycle)
    ).length;

    return {
      totalResources,
      runningOrActive,
      totalCompute,
      totalOke,
      totalDb
    };
  }, []);

  const allServices = useMemo(() => {
    const s = new Set(resources.map(r => r.service));
    return ["All", ...Array.from(s)];
  }, []);

  const allCompartments = useMemo(() => {
    const s = new Set(resources.map(r => r.compartment));
    return Array.from(s);
  }, []);

  const filteredResources = useMemo(() => {
    return resources.filter(r => {
      const regionOk = regionFilter === "All" || r.region === regionFilter;
      const serviceOk = serviceFilter === "All" || r.service === serviceFilter;
      const compartmentOk =
        compartmentFilter === "All" || r.compartment === compartmentFilter;
      const haystack = `${r.id} ${r.type} ${r.service} ${r.compartment}`.toLowerCase();
      const searchOk = haystack.includes(search.toLowerCase());
      return regionOk && serviceOk && compartmentOk && searchOk;
    });
  }, [regionFilter, serviceFilter, compartmentFilter, search]);

  const totalCostToday = regions.reduce((sum, r) => sum + r.costToday, 0);

  const selectedCompartmentMeta = useMemo(
    () => compartments.find(c => c.name === selectedCompartment),
    [selectedCompartment]
  );

  const selectedCompartmentResources = useMemo(
    () => resources.filter(r => r.compartment === selectedCompartment),
    [selectedCompartment]
  );

  const compRegionsCount = useMemo(() => {
    const s = new Set(selectedCompartmentResources.map(r => r.region));
    return s.size;
  }, [selectedCompartmentResources]);

  const compByService = useMemo(() => {
    const result = {};
    selectedCompartmentResources.forEach(r => {
      result[r.service] = (result[r.service] || 0) + 1;
    });
    return result;
  }, [selectedCompartmentResources]);

  const compActiveCount = useMemo(
    () =>
      selectedCompartmentResources.filter(r =>
        ["Running", "Active", "Available"].includes(r.lifecycle)
      ).length,
    [selectedCompartmentResources]
  );

  return (
    <div className="app-root">
      <aside className="sidebar">
        <div className="logo-block">
          <div className="logo-orb">
            <span className="logo-orb-core" />
          </div>
        </div>
        <div>
          <div className="logo-title">OCI Eagle Eye</div>
          <div className="logo-subtitle">Global Resource View (Mock)</div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">Overview</div>
          <button className="nav-item nav-item-active">Resources map</button>
          <button className="nav-item">Cost & usage (mock)</button>
          <button className="nav-item">Health & SLOs</button>

          <div className="nav-section-title">Operations</div>
          <button className="nav-item">Fleet actions</button>
          <button className="nav-item">Governance</button>
          <button className="nav-item">Drift detection</button>
        </nav>

        <div className="sidebar-footer">
          <div className="footer-label">Tenancy</div>
          <div className="footer-pill">
            <span className="footer-dot" />
            demo-oci-eagle-eye
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1 className="page-title">Global OCI Resources – Eagle Eye</h1>
            <p className="page-subtitle">
              High-level view of regions, services and compartments using{" "}
              <b>mock data</b> only. Safe for demos and screenshots.
            </p>
          </div>
          <div className="topbar-right">
            <button className="topbar-button">Mock Cloud Shell</button>
            <button className="topbar-button secondary">Export snapshot</button>
          </div>
        </header>

        <section className="grid grid-4">
          <div className="card">
            <div className="card-label">Total resources (mock)</div>
            <div className="card-value">{summary.totalResources}</div>
            <div className="card-meta">
              {summary.runningOrActive} currently running/active
            </div>
          </div>

          <div className="card">
            <div className="card-label">Compute / OKE</div>
            <div className="card-value">
              {summary.totalCompute} / {summary.totalOke}
            </div>
            <div className="card-meta">Elastic app + cluster capacity</div>
          </div>

          <div className="card">
            <div className="card-label">Autonomous DB</div>
            <div className="card-value">{summary.totalDb}</div>
            <div className="card-meta">Mission critical OLTP / DW</div>
          </div>

          <div className="card">
            <div className="card-label">Est. cost today (mock)</div>
            <div className="card-value">${totalCostToday.toFixed(1)}</div>
            <div className="card-meta">Summed across all regions</div>
          </div>
        </section>

        <section className="layout-2col">
          <div>
            <div className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">Regions overview</div>
                  <div className="card-subtitle">
                    Quick health & activity by Oracle Cloud region.
                  </div>
                </div>
                <button className="refresh-button">⟳ Mock refresh</button>
              </div>

              <div className="regions-grid">
                {regions.map(r => (
                  <div key={r.name} className="region-card">
                    <div className="region-header">
                      <span className="region-name">{r.name}</span>
                      <span
                        className="region-status"
                        style={{ borderColor: statusColor[r.status] }}
                      >
                        <span
                          className="region-dot"
                          style={{ backgroundColor: statusColor[r.status] }}
                        />
                        {r.status}
                      </span>
                    </div>

                    <div className="region-metrics">
                      <div className="region-metric">
                        <div className="region-metric-label">Active resources</div>
                        <div className="region-metric-value">
                          {r.activeResources}
                        </div>
                      </div>
                      <div className="region-metric">
                        <div className="region-metric-label">Critical incidents</div>
                        <div className="region-metric-value crit">
                          {r.criticalIncidents}
                        </div>
                      </div>
                      <div className="region-metric">
                        <div className="region-metric-label">Cost today</div>
                        <div className="region-metric-value">
                          ${r.costToday.toFixed(1)}
                        </div>
                      </div>
                    </div>

                    <div className="region-sparkline">
                      <div className="sparkline-label">Capacity view (mock)</div>
                      <div className="sparkline-bar">
                        <span className="sparkline-fill" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="filters">
              <select
                className="filter-select"
                value={regionFilter}
                onChange={e => setRegionFilter(e.target.value)}
              >
                <option value="All">Region: All</option>
                {regions.map(r => (
                  <option key={r.name} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>

              <select
                className="filter-select"
                value={serviceFilter}
                onChange={e => setServiceFilter(e.target.value)}
              >
                {allServices.map(s => (
                  <option key={s} value={s}>
                    {s === "All" ? "Service: All" : s}
                  </option>
                ))}
              </select>

              <select
                className="filter-select"
                value={compartmentFilter}
                onChange={e => {
                  const value = e.target.value;
                  setCompartmentFilter(value);
                  if (value !== "All") {
                    setSelectedCompartment(value);
                  }
                }}
              >
                <option value="All">Compartment: All</option>
                {allCompartments.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <input
                className="filter-search"
                placeholder="Search id, type, compartment…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="card table-card">
              <div className="card-header">
                <div>
                  <div className="card-title">Resource inventory</div>
                  <div className="card-subtitle">
                    {filteredResources.length} of {resources.length} resources shown.
                    {"  "}
                    <span className="card-subtitle-extra">
                      Click any row to zoom into its compartment.
                    </span>
                  </div>
                </div>
              </div>

              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Type</th>
                      <th>Service</th>
                      <th>Compartment</th>
                      <th>Region</th>
                      <th>Lifecycle</th>
                      <th>CPU</th>
                      <th>MEM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResources.map(r => (
                      <tr
                        key={r.id}
                        className="row-clickable"
                        onClick={() => {
                          setSelectedCompartment(r.compartment);
                          setCompartmentFilter(r.compartment);
                        }}
                      >
                        <td>{r.id}</td>
                        <td>{r.type}</td>
                        <td>{r.service}</td>
                        <td>{r.compartment}</td>
                        <td>{r.region}</td>
                        <td>{r.lifecycle || "-"}</td>
                        <td>{r.cpuOcp != null ? `${r.cpuOcp}%` : "-"}</td>
                        <td>{r.memoryOcp != null ? `${r.memoryOcp}%` : "-"}</td>
                      </tr>
                    ))}
                    {filteredResources.length === 0 && (
                      <tr>
                        <td colSpan="8" className="table-empty">
                          No resources match the current filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="card-footer-note">
                This is a <b>mock eagle eye dashboard</b>. In a real build, this
                table would be populated by the OCI SDK / REST APIs.
              </div>
            </div>

            <div className="card comp-card">
              <div className="comp-header">
                <div>
                  <div className="comp-title">
                    Compartment zoom: {selectedCompartment}
                  </div>
                  <div className="comp-meta">
                    Regions: {compRegionsCount} · Resources:{" "}
                    {selectedCompartmentResources.length} · Active: {compActiveCount}
                  </div>
                </div>
                {selectedCompartmentMeta && (
                  <span className="comp-badge">
                    {selectedCompartmentMeta.environment}
                  </span>
                )}
              </div>

              {selectedCompartmentMeta && (
                <p className="comp-description">
                  {selectedCompartmentMeta.description}
                  {"  "}
                  <span className="comp-owner">
                    Owner: {selectedCompartmentMeta.owner}
                  </span>
                </p>
              )}

              <div className="comp-stats-grid">
                {Object.entries(compByService).map(([service, count]) => (
                  <div key={service} className="comp-stat">
                    <div className="comp-stat-label">{service}</div>
                    <div className="comp-stat-value">{count}</div>
                  </div>
                ))}
                {Object.keys(compByService).length === 0 && (
                  <div className="comp-empty">No resources in this compartment.</div>
                )}
              </div>

              <div className="comp-resources-preview">
                <div className="comp-resources-title">Sample resources</div>
                <ul className="comp-resources-list">
                  {selectedCompartmentResources.slice(0, 4).map(r => (
                    <li key={r.id}>
                      <span className="comp-resource-id">{r.id}</span>
                      <span className="comp-resource-sub">
                        {r.type} · {r.region} · {r.lifecycle || "-"}
                      </span>
                    </li>
                  ))}
                  {selectedCompartmentResources.length === 0 && (
                    <li className="comp-empty">Nothing to show yet.</li>
                  )}
                </ul>
              </div>

              <div className="comp-note">
                This “zoom” panel is mock-only. In a real OCI build, it could:
                <ul>
                  <li>Show IAM policies, tags, and quotas for this compartment.</li>
                  <li>Trigger fleet actions (e.g., stop all DEV compute).</li>
                  <li>Drill into cost and anomaly dashboards for just this scope.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
