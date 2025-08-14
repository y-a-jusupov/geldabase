const axios = require('axios');
const IpLog = require('../models/iplog.model');

const saveIpLog = async ({ ip, userAgent, accountId }) => {
  try {
    const { data } = await axios.get(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,regionName,city,timezone,zip,lat,lon,isp,org,as`);
    if (data.status !== 'success') {
      throw new Error('IP API did not return success');
    }

    const log = new IpLog({
      accountId,
      ip,
      userAgent,
      country: data.country,
      countryCode: data.countryCode,
      region: data.regionName,
      city: data.city,
      timezone: data.timezone,
      zip: data.zip,
      lat: data.lat,
      lon: data.lon,
      isp: data.isp,
      org: data.org,
      as: data.as,
    });

    await log.save();
  } catch (err) {
    console.error('[IP LOG ERROR]', err.message);
  }
};

module.exports = {
  saveIpLog,
};
