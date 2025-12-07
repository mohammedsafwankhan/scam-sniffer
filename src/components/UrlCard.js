import React from "react";
import "../styles/UrlCard.css";

export default function UrlCard({
  url,
  reportCount,
  status,
  botResult,
  scamScore,
  riskLevel,
  fdcAttestation
}) {
  // Normalize values and provide safe defaults
  const score = typeof scamScore === "number" ? scamScore : (botResult && typeof botResult.scamScore === 'number' ? botResult.scamScore : 0);

  // Derive risk level from passed in value or from score
  const derivedRisk = riskLevel || (botResult && botResult.riskLevel) || (
    score >= 70 ? "Critical Risk" :
    score >= 50 ? "High Risk" :
    score >= 30 ? "Medium Risk" :
    "Low Risk"
  );

  // Determine risk class for styling
  const riskClass =
    derivedRisk === "Critical Risk" ? "risk-critical" :
    derivedRisk === "High Risk" ? "risk-high" :
    derivedRisk === "Medium Risk" ? "risk-medium" :
    derivedRisk === "Low Risk" ? "risk-low" :
    "risk-unknown";

  return (
    <div 
      className={`url-card ${riskClass} ${status === "testing" ? "scanning" : ""}`}
    >
      {/* ----------- TOP ROW (URL + SCORE) ----------- */}
      <div className="card-top">

        {/* URL + Meta */}
        <div className="url-meta">
          <div className="url-text" data-text={url}>{url}</div>

          <div className="meta-row">
            <span className="badge reports">Reports: {reportCount}</span>
            <span className={`badge status ${status}`}>{status}</span>
          </div>
        </div>

        {/* SCORE CIRCLE */}
          <div className="score-wrap" title={`Scam Score: ${score}`}>
          <div className="score-circle">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path
                className="circle-bg"
                d="M18 2a16 16 0 1 0 0 32a16 16 0 1 0 0-32"
              />
              <path
                className="circle"
                strokeDasharray={`${Math.max(0, Math.min(100, score))}, 100`}
                d="M18 2a16 16 0 1 0 0 32a16 16 0 1 0 0-32"
              />
              <text x="18" y="20" className="score-text">
                {score}
              </text>
            </svg>
          </div>

          <div className="risk-text">{derivedRisk}</div>
        </div>
      </div>

      {/* ----------- SCAM SCORE BAR ----------- */}
      <div className="score-bar">
        <div
          className="score-bar-fill"
          style={{ width: `${Math.max(0, Math.min(100, score))}%` }}
        ></div>
      </div>

      {/* ----------- BODY CONTENT ----------- */}
      <div className="card-body">

        {/* BOT SCAN SECTION */}
        <div className="section">
          <h4 className="section-title">Bot Scan Result</h4>

          {/* Radar scan shimmer when scanning */}
          {status === "testing" ? (
            <div className="scan-shimmer">Scanning website…</div>
          ) : (
            <div className="section-content">
              <p><strong>Status:</strong> {botResult?.status ?? "Not scanned"}</p>
              <p><strong>Wallet Safety:</strong> {botResult?.walletSafety ?? "Unknown"}</p>

              {/* Issues Detected */}
              {Array.isArray(botResult?.issuesDetected) &&
              botResult.issuesDetected.length > 0 ? (
                <ul className="issues-list">
                  {botResult.issuesDetected.map((issue, idx) => (
                    <li key={idx} className="issue-item">⚠ {issue}</li>
                  ))}
                </ul>
              ) : (
                <p className="no-issues">No issues found</p>
              )}

              <p className="muted"><strong>Time:</strong> {botResult?.timestamp ?? "-"}</p>
            </div>
          )}
        </div>

        {/* ----------- FDC SECTION ----------- */}
        <div className="section split">
          <div className="left">
            <h4 className="section-title">FDC Attestation</h4>
            <p><strong>Tx Hash:</strong> <span className="mono">{fdcAttestation?.txHash ?? "-"}</span></p>
            <p><strong>Chain:</strong> {fdcAttestation?.chain ?? "-"}</p>
            <p><strong>Verified:</strong> {fdcAttestation?.verified ? "Yes" : "No"}</p>
            <p><strong>Suspicion:</strong> {fdcAttestation?.suspicion ?? "-"}</p>
            <p className="muted"><strong>Time:</strong> {fdcAttestation?.timestamp ?? "-"}</p>
          </div>

          <div className="right">
            <h4 className="section-title">Summary</h4>
            <p>
              <strong>Risk:</strong>{" "}
              <span className={`risk-pill ${riskClass}`}>{derivedRisk}</span>
            </p>
            <p><strong>Reports:</strong> {reportCount}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
