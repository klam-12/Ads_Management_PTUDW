import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  reportType: { type: String, enum: ['Tố giác sai phạm', 'Đăng ký nội dung', 'Đóng góp ý kiến', 'Giải đáp thắc mắc'] },
  fullName: String,
  phoneNumber: String,
  reportContent: String,
  email: String,
  image1: String,
  image2: String,
  type: {
    type: String,
    enum: ['Advertisement', 'SetPoint'],
  },
  lat: Number,
  lng: Number,
  isHandled: { type: Boolean, default: false },
  district: String,
  ward: String,
  address: String,
}, { timestamps: true });

const Report = mongoose.model('Report', ReportSchema);

export default Report;
