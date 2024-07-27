import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import ProfileModel from "../Models/ProfileModel.js"
import mongoose from 'mongoose';
const __dirname = dirname(fileURLToPath(import.meta.url));

const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  });
});

const UpdateProfile = async (req, res) => {
  try {
    const idaccount = req.body['idaccount'];
    const fullname = req.body['fullname'];
    const sex = req.body['sex'];
    const university = req.body['university'];
    const phone = req.body['phone'];
    const idcard = req.body['idcard'];
    const dob = req.body['dob'];
    const hometown = req.body['hometown'];

    // Xử lý ảnh đại diện nếu có
    const avatar = req.file ? {
      filename: req.file.filename,
      contentType: req.file.mimetype,
      size: req.file.size,
      uploadDate: new Date()
    } : null;

    // Tìm hồ sơ dựa trên account ID
    const profile = await ProfileModel.findOne({ idaccount: idaccount }).exec();

    if (profile) {
      profile.fullname = fullname || profile.fullname;
      profile.sex = sex || profile.sex;
      profile.university = university || profile.university;
      profile.phone = phone || profile.phone;
      profile.idcard = idcard || profile.idcard;
      profile.dob = dob ? new Date(dob) : profile.dob;
      profile.hometown = hometown || profile.hometown;
      if (avatar) profile.avatar = avatar;

      await profile.save(); // Lưu hồ sơ đã cập nhật
      console.log('Profile updated successfully');
    } else {
      // Tạo mới hồ sơ nếu không tồn tại
      const newProfile = new ProfileModel({
        idaccount,
        fullname,
        sex,
        university,
        phone,
        idcard,
        dob: new Date(dob),
        hometown,
        avatar
      });

      await newProfile.save(); // Lưu hồ sơ mới
      console.log('Profile created successfully');
    }

    res.sendFile(path.join(__dirname, '../public', 'page.html')); // Chuyển hướng sau khi lưu
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).send('Internal Server Error');
  }
};


const RenderProfile = async (req, res) => {
  const { idaccount } = req.body;  

  try {
    // Tìm hồ sơ dựa trên ID tài khoản
    const profile = await ProfileModel.findOne({ idaccount: idaccount })
      .populate('idaccount', 'username') 
      .exec();

    if (!profile) {
      return res.status(404).send('Profile not found');
    } else {
      const profileData = {
        ...profile.toObject(),
        dobFormatted: profile.dob ? new Date(profile.dob).toDateString() : 'No date available'
      };

      const ejsFilePath = path.join(__dirname, '..', 'renderProfile.ejs');
      const html = await ejs.renderFile(ejsFilePath, { profile: profileData });
      res.send(html);
    }
  } catch (error) {
    console.error('Error finding profile:', error);
    res.status(500).send('Server error');
  }
};


const ProfileController = {
  UpdateProfile: UpdateProfile,
  RenderProfile: RenderProfile
};

export default ProfileController;