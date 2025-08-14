const geoip = require('geoip-lite');
const IpLog = require('../models/iplog.model');

const ipLogger = async (req, res, next) => {
  try {
    const rawIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip = rawIp?.split(',')[0]?.trim();

    const userAgent = req.headers['user-agent'];
    const geo = geoip.lookup(ip);

    const ipData = {
      ip,
      userAgent,
      country: geo?.country || null,
      countryCode: geo?.country || null,
      region: geo?.region || null,
      city: geo?.city || null,
      timezone: geo?.timezone || null,
      zip: geo?.zip || null,
      lat: geo?.ll?.[0] || null,
      lon: geo?.ll?.[1] || null,
      isp: null, // geoip-lite не даёт isp/org
      org: null,
      as: null,
    };

    await IpLog.findOneAndUpdate(
      { ip },
      ipData,
      { upsert: true, new: true }
    );

    console.log(`📥 IP logged: ${ip}`);
  } catch (error) {
    console.error('❌ IP logging error:', error.message);
  }

  next();
};

module.exports = ipLogger;
