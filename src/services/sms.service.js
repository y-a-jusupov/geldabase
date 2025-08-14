const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

let token = null;

const loginToEskiz = async () => {
  try {
    const res = await axios.post('https://notify.eskiz.uz/api/auth/login', {
      email: process.env.ESKIZ_EMAIL,
      password: process.env.ESKIZ_PASSWORD,
    });
    token = res.data.data.token;
  } catch (err) {
    console.error('❌ Login to Eskiz failed:', err.response?.data || err.message);
    throw err;
  }
};

const sendSmsCode = async (phone) => {
  try {
    if (!token) await loginToEskiz();

    await axios.post(
      'https://notify.eskiz.uz/api/message/sms/send',
      {
        mobile_phone: phone,
        message: `Это тест от Eskiz`,
        from: process.env.ESKIZ_FROM || '', // можно оставить пустым
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.error('❌ Failed to send SMS:', err.response?.data || err.message);
    throw err;
  }
};

module.exports = {
  loginToEskiz,
  sendSmsCode,
};
