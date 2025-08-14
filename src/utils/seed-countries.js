const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');
const country = require('../models/country.model');

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const countriesPath = path.resolve(__dirname, '../../assets/countries.json');
const countries = JSON.parse(fs.readFileSync(countriesPath, 'utf-8'));

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('🟢 Connected to MongoDB');
    await country.deleteMany();
    await country.insertMany(countries);
    console.log(`✅ Импортировано ${countries.length} стран`);
    process.exit();
  })
  .catch((err) => {
    console.error('❌ Ошибка подключения к базе:', err);
    process.exit(1);
  });
