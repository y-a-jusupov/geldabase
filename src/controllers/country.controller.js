const Country = require('../models/country.model');
const geoip = require('geoip-lite');

const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find().sort({ name: 1 });
    res.status(200).json(countries);
  } catch (error) {
    console.error('❌ Ошибка при получении стран:', error);
    res.status(500).json({ message: 'Ошибка при получении списка стран' });
  }
}

const getCountryByCode = async (req, res) => {
  try {
    const code = req.params.code?.toUpperCase();
    if (!code) {
      return res.status(400).json({ message: 'Не передан код страны' });
    }

    const country = await Country.findOne({ code });
    if (!country) {
      return res.status(404).json({ message: 'Страна не найдена' });
    }

    res.status(200).json(country);
  } catch (error) {
    console.error('❌ Ошибка при получении страны по коду:', error);
    res.status(500).json({ message: 'Ошибка при получении страны' });
  }
};

const getMyCountry = async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const geo = geoip.lookup(ip);

    if (!geo || !geo.country) {
      return res.status(404).json({ message: 'Unable to determine country from IP' });
    }

    const country = await Country.findOne({ code: geo.country.toUpperCase() });

    if (!country) {
      return res.status(404).json({ message: `Country with code ${geo.country} not found` });
    }

    res.status(200).json(country);
  } catch (error) {
    console.error('❌ Error in getMyCountry:', error.message);
    res.status(500).json({ message: 'Server error while determining country' });
  }
};

module.exports = {
  getAllCountries,
  getCountryByCode,
  getMyCountry,
};
