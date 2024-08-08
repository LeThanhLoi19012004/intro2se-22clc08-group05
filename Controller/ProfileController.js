import ProfileModel from "../Models/ProfileModel.js"
import mongoose from 'mongoose';

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
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).send('Internal Server Error');
  }
};


const RenderProfile = async (req, res) => {
  const { user_id } = req.body;
  try {
    // Tìm hồ sơ dựa trên ID tài khoản
    const profile = await ProfileModel.findOne({ idaccount: user_id })
      .populate('idaccount', 'username email') 
      .exec();
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    } else {
      const baseUrl = 'http://localhost:3000/uploads'; // Change to your server's base URL
      const profileObj = profile.toObject();

      const avatarFilename = profile.avatar ? profile.avatar.filename : null;
      profileObj.avatar = avatarFilename ? `${baseUrl}/${avatarFilename}` : null;
      profileObj.dobFormatted = profile.dob 
      res.json({ success: true, data: profileObj });
    }
  } catch (error) {
    console.error('Error finding profile:', error);
    res.status(500).json({message: 'Server error'});
  }
};


const ProfileController = {
  UpdateProfile: UpdateProfile,
  RenderProfile: RenderProfile
};

export default ProfileController;