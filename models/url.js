const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },

  reportCount: {
    type: Number,
    default: 0,
  },

  status: {
    type: String,
    default: "observing", // consistent with controller
  },

  // Bot Scan Results
  botResult: {
    status: { type: String },
    issuesDetected: { type: Array, default: [] },
    walletSafety: { type: String },
    timestamp: { type: String }
  },

  // AI Scam Score
  scamScore: { type: Number },

  riskLevel: { type: String },

  // FDC Attestation Mock
  fdcAttestation: { type: Object }
});

module.exports = mongoose.model("Url", UrlSchema);
