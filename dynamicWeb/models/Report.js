const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  reportType: { type: String, enum: ['Tố giác sai phạm', 'Đăng ký nội dung', 'Đóng góp ý kiến', 'Giải đáp thắc mắc'] },
  fullName: String,
  phoneNumber: String,
  reportContent: String,
  image1: String,
  image2: String,
}, { timestamps: true });

const Report = mongoose.model('Report', ReportSchema);

module.exports = Report;
