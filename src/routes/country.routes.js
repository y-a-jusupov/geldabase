const { Router } = require('express');
const {
  getAllCountries,
  getMyCountry,
  getCountryByCode,
} = require('../controllers/country.controller');

const router = Router();

router.get('/', getAllCountries);
router.get('/me', getMyCountry); 
router.get('/:code', getCountryByCode);

module.exports = router;