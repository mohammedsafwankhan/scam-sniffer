import React, { useState } from 'react';
import '../styles/Report.css';

export default function Report() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setStatus('Please enter a URL to report.');
      return;
    }

    setLoading(true);
    setStatus('Reporting...');

    try {
      // ✔ FIX: Use full backend URL – avoids React proxy error
      const res = await fetch("http://localhost:5000/api/report", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Non-JSON response from server: ${text}`);
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to report URL');
      }

      setStatus(
        `Reported: ${data.url || url} — Reports: ${data.reportCount ?? '-'}`
      );
      setUrl('');
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    } finally {
      setLoading(false);

      // Clear status after 5 seconds
      setTimeout(() => setStatus(''), 5000);
    }
  };

  return (
    <main className="report-container">
      <section className="report-card" role="region" aria-label="Report Suspicious URL">
        <h1 className="report-title">Report Suspicious Web3 URL</h1>

        <form className="report-form" onSubmit={handleSubmit}>
          <input
            className="report-input"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            aria-label="URL to report"
            type="url"
          />

          <button className="report-button" type="submit" disabled={loading}>
            {loading ? 'Reporting...' : 'Submit URL'}
          </button>
        </form>

        <div className="status-message" aria-live="polite">{status}</div>

        <a className="report-link" href="/dashboard">
          Go to Dashboard
        </a>
      </section>
    </main>
  );
}
