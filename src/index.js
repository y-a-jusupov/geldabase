const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const { connectRedis } = require('./config/redis');
const ipLogRoutes = require('./routes/iplog.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const countryRoutes = require('./routes/country.routes');
const ipLogger = require('./middleware/iplog.middleware');

// Загрузка .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

(async () => {
  try {
    // Подключение к Redis
    await connectRedis();

    // Подключение MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');

    // Роуты
    app.use(ipLogger);
    app.use('/api/iplog', ipLogRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/user', userRoutes);
    app.use('/api/countries', countryRoutes);

    app.get('/', (req, res) => {
      res.send('✅ Whisper backend is working!');
    });

    // 404 handler
    app.use((req, res) => {
      req.url !== '/favicon.ico' &&
        console.log(`❌ 404 Not Found: ${req.method} ${req.url}`);
      res.status(404).send('Not Found');
    });

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Startup error:', err);
    process.exit(1);
  }
})();
