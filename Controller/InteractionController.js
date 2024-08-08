import InteractionModel from "../Models/InteractionModel.js";
import InfoPostModel from "../Models/PostModel.js";
import ProfileModel from "../Models/ProfileModel.js";
import mongoose from "mongoose";

const savePostInteraction = async (req, res) => {
  try {
    const { postid, profileid, comment } = req.body;
    // Tạo ObjectId từ postid và profileid
    const postObjectId = new mongoose.Types.ObjectId(postid);
    const profileObjectId = new mongoose.Types.ObjectId(profileid);
    // Tìm bài viết
    const post = await InfoPostModel.findById(postid);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // Tìm hoặc tạo đối tượng Interaction
    let interaction = await InteractionModel.findOne({ postID: postObjectId });
    if (!interaction) {
      interaction = new InteractionModel({
        postID: postObjectId,
        profileIDs: [],
        comments: [],
      });
    }

    // Xử lý comment
    if (comment !== "") {
      interaction.comments.push({ profileID: profileObjectId, comment });
    }

    // Lưu thay đổi
    await interaction.save();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


const getPostInteraction = async (req, res) => {
  try {
    const { postid, userid } = req.body;

    const postObjectId = new mongoose.Types.ObjectId(postid);
    const userObjectId = new mongoose.Types.ObjectId(userid);

    // Find the interaction for the given post ID
    let interaction = await InteractionModel.findOne({ postID: postObjectId })
    .populate('comments.profileID', 'fullname avatar')
    .exec();
    if (!interaction) {
      res.json({
        liked: false,
        comments: [],
        fullnames: [],
        avatars: [],
      });
      return;
    } else {
      const baseUrl = "http://localhost:3000/uploads";
      const liked = interaction.profileIDs.includes(userObjectId);
      const comments = interaction.comments.map(comment => comment.comment);
      const fullnames = interaction.comments.map(comment => comment.profileID.fullname);
      const avatars = interaction.comments.map(comment => {
        const filename = comment.profileID.avatar.filename;
        return `${baseUrl}/${filename}`;
      });
      const num_likes = interaction.profileIDs.length
      console.log("send data success")
      res.json({success: true, data: {num_likes, liked, comments, fullnames, avatars }});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const InteractionController = {
  savePostInteraction: savePostInteraction,
  getPostInteraction: getPostInteraction,
};

export default InteractionController;
