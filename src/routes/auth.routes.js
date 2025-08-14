const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const { sendCode, verifyCode, getCurrentAccount } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/send-code', sendCode);
router.post('/verify-code', verifyCode);
router.get('/me', authMiddleware, getCurrentAccount);

module.exports = router;
