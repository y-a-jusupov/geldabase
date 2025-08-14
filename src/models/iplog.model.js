const mongoose = require('mongoose');

const ipLogSchema = new mongoose.Schema({
  accountId: { type: String, default: null },
  ip: { type: String, required: true },
  userAgent: { type: String, default: null },
  country: { type: String, default: null },
  countryCode: { type: String, default: null },
  region: { type: String, default: null },
  city: { type: String, default: null },
  timezone: { type: String, default: null },
  zip: { type: String, default: null },
  lat: { type: Number, default: null },
  lon: { type: Number, default: null },
  isp: { type: String, default: null },
  org: { type: String, default: null },
  as: { type: String, default: null },
}, {
  timestamps: true, // createdAt, updatedAt
});

ipLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 }); // TTL: 30 дней

const IpLog = mongoose.model('IpLog', ipLogSchema);

module.exports = IpLog;
