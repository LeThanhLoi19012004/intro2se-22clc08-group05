import mongoose from "mongoose";

const { Schema } = mongoose;

const avtSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  size: Number,
  uploadDate: Date
});

const ProfileSchema = new Schema({
  idaccount: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'InfoAccount',
    required: true 
  },
  avatar: { type: avtSchema },
  fullname: { type: String, required: true },
  sex: { type: String },
  university: { type: String },
  phone: { type: String },
  idcard: { type: String, required: true },
  dob: { type: Date, required: true }, 
  hometown: { type: String, required: true }
});

const ProfileModel = mongoose.model('InfoProfile', ProfileSchema);

export default ProfileModel;