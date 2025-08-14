const IpLog = require('../models/iplog.model');
const geoip = require('geoip-lite');

const logIp = async (req, res) => {
  try {
    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ip = rawIp.split(',')[0].trim();

    const { accountId } = req.body;
    const userAgent = req.headers['user-agent'] || null;

    const exists = await IpLog.findOne({ ip });
    if (exists) {
      return res.status(200).json({ success: true, message: 'IP already logged' });
    }

    const geo = geoip.lookup(ip);

    await IpLog.create({
      ip,
      accountId: accountId || null,
      userAgent,
      country: geo?.country || null,
      region: geo?.region || null,
      city: geo?.city || null,
      countryCode: geo?.country || null,
      timezone: geo?.timezone || null,
      zip: geo?.zip || null,
      lat: geo?.ll?.[0] || null,
      lon: geo?.ll?.[1] || null,
    });

    res.status(201).json({ success: true });
  } catch (e) {
    console.error('[IP_LOG]', e);
    res.status(500).json({
      message: 'Не удалось определить страну',
      error: 'Failed to log IP',
    });
  }
};

module.exports = {
  logIp,
};
