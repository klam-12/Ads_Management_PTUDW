import mongoose from 'mongoose';

const SetPointSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  typeofLocation: { type: String, enum: ['Đất công', 'Công viên', 'Hành lang an toàn giao thông, Đất tư nhân', 'Nhà ở riêng lẻ', 'Trung tâm thương mại', 'Chợ', 'Cây xăng', 'Nhà chờ xe buýt'] },
  adsFormat: { type: String, enum: ['Cổ động chính trị', 'Quảng cáo thương mại', 'Xã hội hoá'] },
  isPlanned: Boolean,
  image: String,
  advertisements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Advertisement' }],
}, { timestamps: true });

const SetPoint = mongoose.model('SetPoint', SetPointSchema);

export default SetPoint;
