const axios = require("axios");

/**
 * fakeBotTest
 * Performs a lightweight phishing keyword scan.
 * - Tries to fetch the URL HTML with axios.get(url)
 * - If fetch fails, still scans the URL string itself
 * - Detects a set of suspicious keywords and builds an analysis object
 */
module.exports = async function fakeBotTest(url) {
  const suspiciousWords = [
    "connect wallet",
    "approve",
    "sign",
    "metamask",
    "mint",
    "airdrop",
    "claim",
    "private key",
    "seed phrase",
    "restore wallet",
    "verify",
    "walletconnect",
    "nft"
  ];

  let content = "";
  try {
    const res = await axios.get(url, { timeout: 5000 });
    content = (res && res.data) ? String(res.data) : "";
  } catch (err) {
    // If fetch fails, fallback to scanning the URL string itself
    content = String(url);
  }

  const lowered = content.toLowerCase();
  const issuesDetected = [];
  let scamScore = 0;

  suspiciousWords.forEach((kw) => {
    if (lowered.includes(kw)) {
      issuesDetected.push(`Detected keyword: ${kw}`);
      scamScore += 15;
    }
  });

  // Ensure scamScore within 0-100
  if (scamScore < 0) scamScore = 0;
  if (scamScore > 100) scamScore = 100;

  // Wallet safety
  const walletSafety = issuesDetected.length > 0 ? "Unsafe" : "Safe";

  // Determine risk level according to spec
  let riskLevel = "Low Risk";
  if (scamScore >= 70) riskLevel = "Critical Risk";
  else if (scamScore >= 50) riskLevel = "High Risk";
  else if (scamScore >= 30) riskLevel = "Medium Risk";

  const status = issuesDetected.length > 0 ? "Suspicious" : "Clean";

  return {
    status,
    issuesDetected,
    walletSafety,
    scamScore,
    riskLevel,
    timestamp: new Date().toISOString()
  };
};
