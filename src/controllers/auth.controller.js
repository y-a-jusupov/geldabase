const { generateCode } = require('../utils/generate-code');
const { saveCodeToRedis, verifyCodeInRedis } = require('../services/code.service');
const { sendSmsCode } = require('../services/sms.service');
const { generateToken } = require('../services/jwt.service');
const Account = require('../models/account.model');
const uuidv4 = require('uuid').v4;

const sendCode = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    const code = generateCode();
    await saveCodeToRedis(phone, code);
    await sendSmsCode(phone, code);

    return res.status(200).json({ message: 'Code sent successfully' });
  } catch (error) {
    console.error('sendCode error:', error);
    return res.status(500).json({ message: 'Failed to send code' });
  }
};

const verifyCode = async (req, res) => {
  try {
    const { phone, code } = req.body;

    if (!phone || !code) {
      return res.status(400).json({ message: 'Phone and code are required' });
    }

    const isValid = await verifyCodeInRedis(phone, code);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid or expired code' });
    }

    let account = await Account.findOne({ phone });

    if (!account) {
      account = await Account.create({
        uid: uuidv4(),
        phone,
        createdAt: new Date(),
      });
    }

    const token = generateToken(account.uid);
    return res.status(200).json({ token });
  } catch (error) {
    console.error('verifyCode error:', error);
    return res.status(500).json({ message: 'Failed to verify code' });
  }
};

const getCurrentAccount = async (req, res) => {
  const { uid } = req.user; 

  const account = await Account.findOne({ uid });

  if (!account) {
    return res.status(404).json({ message: 'Account not found' });
  }

  res.json(account);
};

module.exports = {
  sendCode,
  verifyCode,
  getCurrentAccount,
};
