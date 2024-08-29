import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import InteractionModel from "../Models/InteractionModel.js";
import InfoPostModel from "../Models/PostModel.js";
import ProfileModel from "../Models/ProfileModel.js";
import mongoose from "mongoose";

const __dirname = dirname(fileURLToPath(import.meta.url));

const savePostInteraction = async (req, res) => {
  try {
    const { postid, likeid, commentid, comment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postid) || !mongoose.Types.ObjectId.isValid(likeid) || !mongoose.Types.ObjectId.isValid(commentid)) {
      return res.status(400).send('Invalid postID, likeID, or commentID');
    }

    const profileExists = await ProfileModel.findById(likeid);
    if (!profileExists) {
      return res.status(404).send('Profile ID not found');
    }

    // Tìm bài viết
    const post = await InfoPostModel.findById(postid);
    if (!post) {
      return res.status(404).send('Post not found');
    }

    // Tạo ObjectId từ postid, likeid, và commentid
    const postObjectId = new mongoose.Types.ObjectId(postid);
    const likeObjectId = new mongoose.Types.ObjectId(likeid);
    const commentObjectId = new mongoose.Types.ObjectId(commentid);

    // Tìm hoặc tạo đối tượng Interaction
    let interaction = await InteractionModel.findOne({ postID: postObjectId });

    if (!interaction) {
      interaction = new InteractionModel({ postID: postObjectId, profileIDs: [], comments: [] });
    }

    // Cập nhật lượt thích
    const likeIndex = interaction.profileIDs.indexOf(likeObjectId);
    if (likeIndex === -1) {
      // Nếu lượt thích chưa tồn tại, thêm vào
      interaction.profileIDs.push(likeObjectId);
    } else {
      // Nếu lượt thích đã tồn tại, xóa bỏ
      interaction.profileIDs.splice(likeIndex, 1);
    }

    // Thêm bình luận
    interaction.comments.push({ profileID: commentObjectId, comment });

    // Lưu thay đổi
    await interaction.save();

    res.sendFile(path.join(__dirname, '../public', 'page.html')); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const InteractionController = {
  savePostInteraction: savePostInteraction,
};

export default InteractionController;