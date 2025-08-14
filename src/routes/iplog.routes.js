const express = require('express');
const { logIp } = require('../controllers/iplog.controller');

const router = express.Router();

router.post('/', logIp);

module.exports = router;
