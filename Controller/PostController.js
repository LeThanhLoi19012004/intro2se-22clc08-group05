import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import PostModel from "../Models/PostModel.js"
import mongoose from 'mongoose';
import fs from 'fs';
const __dirname = dirname(fileURLToPath(import.meta.url));

const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  });
});

const UpPost = async (req, res) => {
  try {
    const eventID = req.body['eventid'];
    const descriptionpost = req.body['descriptionpost'];   
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).send('No file uploaded');
    }

    const images = files.map(file => ({
      filename: file.filename,
      contentType: file.mimetype,
      size: file.size,
      uploadDate: new Date(),
      imageBase64: fs.readFileSync(file.path, 'base64')
    }));

    if (!mongoose.isValidObjectId(eventID)) {
      return res.status(400).send('Invalid event ID');
    }

    const eventObjectId = new mongoose.Types.ObjectId(eventID);

    // Tạo mới bài viết
    const newPost = new PostModel({
      eventID: eventObjectId,
      descriptionpost: descriptionpost,
      images: images
    });
    await newPost.save();

    console.log('Post created successfully');
    res.sendFile(path.join(__dirname, '../public', 'page.html'));
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send('Internal Server Error');
  }
};

const RenderPost = async (req, res) => {
  const eventID_ = req.body['eventid'];
  const ejsFilePath = path.join(__dirname, '..', 'renderPost.ejs'); 
  console.log(eventID_);
  try {
    // Tìm bài đăng dựa trên eventID
    const posts = await PostModel.find({ eventID: eventID_ })  
      .populate('eventID', 'eventname')  // Sửa eventID_ thành eventID
      .populate('images')
      .exec();

   
    if (posts.length === 0) {
      return res.status(400).send('No posts found for this event ID');
    } else {
      const postsData = posts.map(post => ({
        ...post.toObject(),
        postcreationdateFormatted: post.postcreationdate ? new Date(post.postcreationdate).toDateString() : 'No date available'
      }));

      const html = await ejs.renderFile(ejsFilePath, { posts: postsData });
      res.send(html);
    }
  } catch (error) {
    console.error('Error rendering posts:', error);
    res.status(500).send('Server error');
  }
};

const PostController = {
  UpPost: UpPost,
  RenderPost: RenderPost,
};

export default PostController;