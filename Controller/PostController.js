import PostModel from "../Models/PostModel.js"
import mongoose from 'mongoose';

const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  });
});

const UpPost = async (req, res) => {
  try {
    const { eventID, description } = req.body;
    const files = req.files;


    const images = files.map(file => ({
      filename: file.filename,
      contentType: file.mimetype,
      size: file.size,
      uploadDate: new Date()
    }));

    const eventObjectId = new mongoose.Types.ObjectId(eventID);

    // Tạo mới bài viết
    const newPost = new PostModel({
      eventID: eventObjectId,
      descriptionpost: description,
      images: images
    });
    await newPost.save();

    console.log('Post created successfully');
    res.json({ success: true });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const RenderPost = async (req, res) => {
  const {event_id} = req.body;

  try {
    const posts = await PostModel.find({ eventID: event_id }).populate('eventID', 'logoevent eventname descriptionevent').exec();
    if (posts.length === 0) {
      return res.status(400).json({success: false, message: 'No posts found for this event ID'});
    } else {
      const baseUrl = 'http://localhost:3000/uploads';
      const postsData = posts.map(post => {
        const postObj = post.toObject();
        const logoeventFilename = post.eventID.logoevent[0].filename;
        postObj.logoeventUrl = `${baseUrl}/${logoeventFilename}`;
        postObj.imagesUrls = post.images.map(image => `${baseUrl}/${image.filename}`);
        return postObj;
      });
      
      res.json({success: true, data: postsData})
    }
  } catch (error) {
    console.error('Error rendering posts:', error);
    res.status(500).json({success: false, message: 'Server error'});
  }
};

const RenderMPPost = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('eventID', 'logoevent eventname').exec();
    
    if (posts.length === 0) {
      return res.json({ success: true, data: [] });
    } else {
      const baseUrl = 'http://localhost:3000/uploads'; // Change to your server's base URL
      const postsData = posts.map(post => {
        const postObj = post.toObject();
        const logoeventFilename = post.eventID.logoevent[0].filename;
        postObj.logoeventUrl = `${baseUrl}/${logoeventFilename}`;
        postObj.imagesUrls = post.images.map(image => `${baseUrl}/${image.filename}`);
        return postObj;
      });
      console.log("Send post data successfully!");
      res.json({ success: true, data: postsData });
    }
  } catch (error) {
    console.error('Error rendering posts:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
const PostController = {
  UpPost: UpPost,
  RenderPost: RenderPost,
  RenderMPPost: RenderMPPost
};

export default PostController;