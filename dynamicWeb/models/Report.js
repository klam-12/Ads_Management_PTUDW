import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  reportType: { type: String, enum: ['Tố giác sai phạm', 'Đăng ký nội dung', 'Đóng góp ý kiến', 'Giải đáp thắc mắc'] },
  fullName: String,
  phoneNumber: String,
  reportContent: String,
  email: String,
  image1: String,
  image2: String,
  isHandled: { type: Boolean, default: false },
}, { timestamps: true });

const Report = mongoose.model('Report', ReportSchema);

export default Report;
