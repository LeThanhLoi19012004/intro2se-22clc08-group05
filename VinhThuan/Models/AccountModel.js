import mongoose from 'mongoose';

// Định nghĩa Schema cho User
const AccountSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  key: { type: String, required: true },
  iv: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
  emailToken: { type: String },
});

// Tạo Model từ Schema
const AccountModel = mongoose.model('InfoAccount', AccountSchema);

// Xuất khẩu Model
export default AccountModel;