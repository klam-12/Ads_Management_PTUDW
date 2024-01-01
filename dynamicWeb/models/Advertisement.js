import mongoose from 'mongoose';

const AdvertisementSchema = new mongoose.Schema({
  typeofAds: { 
    type: String, 
    enum: [
      'Trụ bảng hiflex', 
      'Trụ màn hình điện tử LED', 
      'Trụ hộp đèn', 
      'Bảng hiflex ốp tường', 
      'Màn hình điện tử ốp tường', 
      'Trụ treo băng rôn dọc', 
      'Trụ treo băng rôn ngang', 
      'Trụ/Cụm pano', 
      'Cổng chào', 
      'Trung tâm thương mại'
    ] 
  },
  width: Number,
  height: Number,
  quantity: Number,
  image: String,
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  startDate: {
    type: Date,
    default: Date.now,
  },
  expireDate: Date,
}, { timestamps: true });

const Advertisement = mongoose.model('Advertisement', AdvertisementSchema);

export default Advertisement;
