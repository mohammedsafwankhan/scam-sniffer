const express = require("express");
const Url = require("../models/url");
const fakeBotTest = require("../utils/fakeBotTest");

const router = express.Router();

/* ------------------------------------------------------
  ADVANCED BOT SCAN SIMULATION (Option 2)
------------------------------------------------------- */
function simulateBotScan(url) {
  const issuePool = [
    "Malicious wallet connect request",
    "Unauthorized token transfer attempt",
    "Suspicious contract signature detected",
    "Phishing script injected",
    "High-risk drainer pattern identified",
    "Website attempts to read private keys",
    "Redirect to known scam domain",
    "Fake airdrop claiming module active"
  ];

  const detectedIssues = [];

  // Randomly decide if this site has issues (40% chance clean)
  const isClean = Math.random() < 0.4;
  const issueCount = isClean ? 0 : Math.floor(Math.random() * 3) + 1;

  for (let i = 0; i < issueCount; i++) {
    detectedIssues.push(
      issuePool[Math.floor(Math.random() * issuePool.length)]
    );
  }

  return {
    status: isClean ? "Clean" : "Suspicious",
    issuesDetected: detectedIssues,
    walletSafety: detectedIssues.length === 0 ? "Safe" : "Compromised",
    timestamp: new Date().toISOString()
  };
}

/* ------------------------------------------------------
  AI SCAM SCORE CALCULATION (Option 3)
------------------------------------------------------- */
function generateScamScore(issuesCount, reportCount) {
  let baseScore = issuesCount * 25; // each issue = risky
  baseScore += Math.min(reportCount * 5, 20); // report count weight

  if (baseScore > 100) baseScore = 100;

  let riskLevel = "Low Risk";
  if (baseScore >= 80) riskLevel = "Critical Risk";
  else if (baseScore >= 50) riskLevel = "High Risk";
  else if (baseScore >= 30) riskLevel = "Medium Risk";

  return { scamScore: baseScore, riskLevel };
}

/* ------------------------------------------------------
  1️⃣ REPORT A URL
------------------------------------------------------- */
router.post("/report", async (req, res) => {
  const { url } = req.body;

  let entry = await Url.findOne({ url });

  if (!entry) {
    entry = new Url({
      url,
      reportCount: 1,
      status: "observing"
    });
  } else {
    entry.reportCount += 1;
  }

  await entry.save();

  // If >= 5 reports → run bot scan and store results
  if (entry.reportCount >= 5 && entry.status !== "tested") {
    entry.status = "testing";
    await entry.save();

    // Run the fake bot test (realistic keyword scan)
    const botResult = await fakeBotTest(url);

    // Assign results to the DB entry per spec
    entry.botResult = {
      status: botResult.status,
      issuesDetected: Array.isArray(botResult.issuesDetected) ? botResult.issuesDetected : [],
      walletSafety: botResult.walletSafety,
      timestamp: botResult.timestamp
    };

    entry.scamScore = typeof botResult.scamScore === 'number' ? botResult.scamScore : 0;
    entry.riskLevel = botResult.riskLevel || "Low Risk";
    entry.status = "tested";

    // Update FDC attestation with the risk level
    entry.fdcAttestation = {
      txHash: "0x" + Math.random().toString(16).slice(2, 10),
      chain: "flare-testnet",
      verified: true,
      suspicion: botResult.riskLevel || entry.riskLevel,
      timestamp: new Date().toISOString()
    };

    await entry.save();
  }

  res.json(entry);
});

/* ------------------------------------------------------
  2️⃣ GET ALL URLS
------------------------------------------------------- */
router.get("/urls", async (req, res) => {
  const urls = await Url.find().sort({ reportCount: -1 });
  res.json(urls);
});

module.exports = router;
