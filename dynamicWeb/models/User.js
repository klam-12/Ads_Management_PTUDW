import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  fullName: String,
  password: String,
  email: String,
  phoneNumber: String,
  birthDate: Date,
  role: { type: String, enum: ['Cán bộ Phường', 'Cán bộ Quận', 'Cán bộ Sở'] },
  ward: String,
  district: String,
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User;
