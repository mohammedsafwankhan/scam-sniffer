import React, { useState } from "react";
import "./styles/Report.css";
import Dashboard from "./Dashboard";
import NeonButton from "./components/NeonButton";

function App() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      setStatus("Please enter a URL to report.");
      return;
    }

    setLoading(true);
    setStatus("Reporting...");

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to report URL");

      setStatus(
        `Reported: ${data.url || url} — reports: ${data.reportCount ?? "-"}`
      );
      setUrl("");
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const showDashboard = window.location.pathname.startsWith("/dashboard");

  return showDashboard ? (
    <Dashboard />
  ) : (
    <div className="report-container">
      <div className="report-card" role="region" aria-label="Report URL card">
        <h1 className="report-title">Scam Sniffer - Report Suspicious URL</h1>

        <form onSubmit={handleSubmit} className="report-form">
          <input
            type="url"
            className="report-input"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            aria-label="URL to report"
          />

          <NeonButton
            text={loading ? "Reporting..." : "Submit"}
            type="submit"
            disabled={loading}
            ariaLabel="Submit report"
          />
        </form>

        <div className="status-message" aria-live="polite">
          {status}
        </div>

        <NeonButton text="Dashboard" link="/dashboard" ariaLabel="Go to dashboard" />
      </div>
    </div>
  );
}

export default App;
