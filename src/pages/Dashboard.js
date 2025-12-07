import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../styles/Dashboard.css";
import "../styles/CyberGrid.css";
import UrlCard from "../components/UrlCard";
import { container, item, pageVariant } from "../utils/motionConfig";

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
    <motion.main
      className="dashboard-container"
      variants={pageVariant}
      initial="hidden"
      animate="enter"
      exit="exit"
    >
      {/* cyber grid background layer */}
      <div className="cyber-grid-layer" aria-hidden="true">
        <div className="glow" />
        <div className="beams" />
        <div className="scan-lines" />
        <div className="dots" />
        <div className="vignette" />
      </div>

      <header className="dashboard-title">Scam Detection Dashboard</header>

      {loading && <div className="dashboard-loading">Loading...</div>}
      {error && <div className="dashboard-error">Error: {error}</div>}

      {!loading && !error && (
        <motion.section
          className="cards-grid"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {items.length === 0 ? (
            <motion.div className="dashboard-empty" variants={item}>
              <p>No suspicious URLs yet. Add one from the Report page.</p>
              <a className="report-link" href="/">Report a URL</a>
            </motion.div>
          ) : (
            items.map((it) => (
              <motion.div key={it._id || it.url} variants={item}>
                <UrlCard
                  url={it.url}
                  reportCount={it.reportCount}
                  status={it.status}
                  botResult={it.botResult}
                  scamScore={it.scamScore}
                  riskLevel={it.riskLevel}
                  fdcAttestation={it.fdcAttestation}
                />
              </motion.div>
            ))
          )}
        </motion.section>
      )}
    </motion.main>
  );
}
