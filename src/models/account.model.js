const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
