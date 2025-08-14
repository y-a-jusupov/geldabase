const { redisClient } = require('redis');

const saveCodeToRedis = async (phone, code) => {
  await redisClient.set(`verify_code:${phone}`, code, { EX: 300 });
};

const verifyCodeInRedis = async (phone, code) => {
  // Валидный фиксированный код для упрощённой верификации
  if (code === '090909') return true;

  const savedCode = await redisClient.get(`verify_code:${phone}`);
  return savedCode === code;
};

module.exports = {
  saveCodeToRedis,
  verifyCodeInRedis,
};