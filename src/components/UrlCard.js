import React from 'react';
import "../styles/UrlCard.css";

export default function UrlCard({ url, reportCount, status, botResult, fdcAttestation }) {
  return (
    <div className="url-card neon-border" role="article" aria-label={`Report for ${url}`}>
      <div className="url-title">{url}</div>

      <div className="url-meta">
        <div className="badge">Reports: {reportCount ?? 0}</div>
        <div className={`badge status ${status === 'tested' || fdcAttestation?.verified ? 'status-success' : 'status-warning'}`}>
          {status ?? 'unknown'}
        </div>
      </div>

      <div className="url-section">
        <div className="section-label">Bot Result</div>
        <div className="section-value">{botResult ?? '—'}</div>
      </div>

      <div className="url-section">
        <div className="section-label">FDC Attestation</div>
        <div className="section-value">
          <div className="att-item">Tx: <span className="mono">{fdcAttestation?.txHash ?? '—'}</span></div>
          <div className={`att-item ${fdcAttestation?.verified ? 'status-success' : 'status-warning'}`}>
            Verified: {fdcAttestation?.verified ? 'Yes' : 'No'}
          </div>
        </div>
      </div>
    </div>
  );
}
