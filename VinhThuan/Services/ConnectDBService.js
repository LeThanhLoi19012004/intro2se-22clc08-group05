import mongoose from "mongoose";
async function connectDatabase(){
  try {
    await mongoose.connect('mongodb+srv://ltloi22:pPuHnCXOxwNbUiG0@cluster0.qjyfi4f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
   console.log('Connect database success');
  } catch(err) {
    console.log('connect database fail', err);
  }
}
export default connectDatabase;