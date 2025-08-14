const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  dialCode: { type: String, required: true },
  emoji: { type: String, default: null },
  image: { type: String, default: null },
}, { timestamps: false });

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;