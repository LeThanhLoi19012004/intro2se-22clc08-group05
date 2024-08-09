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
    
    console.log(req.body)
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
      uploadDate: new Date(),
      imageBase64: fs.readFileSync(req.file.path, 'base64')
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
      res.status(200).json({success: true,message: 'Profile updated successfully'});
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
    return res.status(500).json({success: false,message: "Internal Server Error"});
  }
};


const RenderProfile = async (req, res) => {
  const { idaccount  } = req.body;
  try {
    // Tìm hồ sơ dựa trên ID tài khoản
    const profile = await ProfileModel.findOne({ idaccount: idaccount })
      .populate('idaccount', 'username email') 
      .exec();
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    } else {
      const profileData = {
        ...profile.toObject(),
        dobFormatted: profile.dob ? new Date(profile.dob).toDateString() : 'No date available'
      };

      res.json({ success: true, data: profileData });
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