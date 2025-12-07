import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import UrlCard from "../components/UrlCard";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch("http://localhost:5000/api/urls");
        const text = await res.text();
        
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error(`Non-JSON response: ${text}`);
        }

        if (!res.ok) throw new Error(data.error || "Failed to load URLs");

        if (mounted) setItems(data);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-title">Scam Detection Dashboard</header>

      {loading && <div className="dashboard-loading">Loading...</div>}
      {error && <div className="dashboard-error">Error: {error}</div>}

      {!loading && !error && (
        <div className="cards-grid">
          {items.map((it) => (
            <UrlCard
              key={it._id || it.url}
              url={it.url}
              reportCount={it.reportCount}
              status={it.status}
              botResult={it.botResult}
              fdcAttestation={it.fdcAttestation}
            />
          ))}
        </div>
      )}
    </div>
  );
}
