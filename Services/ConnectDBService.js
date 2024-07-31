import mongoose from "mongoose";
async function connectDatabase(){
  try {
    await mongoose.connect('mongodb+srv://khavinhthuan114:nU120UFQzpTvVRQs@cluster0.9ur4j7b.mongodb.net/');
   console.log('Connect database success');
  } catch(err) {
    console.log('connect database fail', err);
  }
}
export default connectDatabase;