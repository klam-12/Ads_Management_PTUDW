const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  address: String,
}, { timestamps: true });

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;
