import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import AccountModel from "../Models/AccountModel.js";
import ProfileModel from '../Models/ProfileModel.js';
import OrderTicketModel from "../Models/OrderTicketModel.js"; //release2
import InteractionModel from "../Models/InteractionModel.js"; //release2
import CEventModel from "../Models/CEventModel.js"; //release2
import mongoose from 'mongoose'; //release2
import bcrypt from "bcrypt";
import sendMail from "../Email/SendEmail.js"
const __dirname = dirname(fileURLToPath(import.meta.url));

const PostSignin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const account = await AccountModel.findOne({ username: username }).exec();

    if (account) {
      const match = await bcrypt.compare(password, account.password);
      if (match) {
        console.log("right password");
        res.sendFile(path.join(__dirname, '../public', 'page.html'));
      } else {
        console.log("wrong email or password");
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
      }
    } else {
      console.log("wrong email or password");
      res.sendFile(path.join(__dirname, '../public', 'index.html'));
    }
  } catch (err) {
    console.error("Error finding user:", err);
    return res.status(500).send("Internal Server Error");
  }
};

const PostSignup = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAccount = await AccountModel.create({
      username,
      password: hashedPassword,
      email,
    });
    console.log(newAccount._id);
    await ProfileModel.create({
      idaccount: newAccount._id,
      avatar: null,
      fullname: null,
      sex: null,
      university: null,
      phone: null,
      idcard: null,
      dob: null,
      hometown: null,
    });


    res.sendFile(path.join(__dirname, '../public', 'index.html'));
    console.log('Successfully!!!');
  } catch (err) {
    console.log('error', err);
    res.status(500).send('An error occurred during signup');
  }
};

const PostForget_Pass = async (req, res) => {
  const { email } = req.body;

  try {
    const findinfor = await AccountModel.findOne({ email: email }).exec();

    if (!findinfor) {
      return res.status(400).send('No user with that email');
    } else {
      const html = await ejs.renderFile(path.join(__dirname, '../forgot-password.ejs'), { user: findinfor, resetLink: '#' });
      res.send(html);
      
      await sendMail(findinfor.email);
    }
  } catch (err) {
    console.error("Error finding user:", err);
    return res.status(500).send("Internal Server Error");
  }
}

//release
//content
/*
Khi user muốn xóa account sẽ phải yêu cầu nhập lại password để xác nhận(truyền vào profileID và password)
và các thông tin sẽ xóa bao gồm: comment, like, follow, và ticket order, lượng vé user đã đặt sẽ đc
trả lại cho event và coi như user đó chưa đặt vé
 */

//solution
/*
sẽ xóa theo thứ tự
+ comment, like, follow và ticket order
+ profile
+ account
 */

//lưu ý
/*
organizer sẽ không thể xóa acc(nên thêm điều khoản này vào chính sách của web).
sẽ ko có hàm render, chỉ hiện ra thông báo xóa acc thành công(đúng/sai tự check lại trong database).
*/
const DeleteAccount = async (req, res) =>
{
  try {
    const { profileID, password } = req.body;
    if (!profileID || !password) {
      return res.status(400).send('ProfileID and password are required');
    }

    if (!mongoose.isValidObjectId(profileID)) {
      return res.status(400).send('Invalid ProfileID');
    }

    const profileInfo = await ProfileModel.findById(profileID);
    if (!profileInfo) {
      return res.status(404).send('Profile not found');
    }

    const account = await AccountModel.findById(profileInfo.idaccount);
    if (!account) {
      return res.status(404).send('Account not found');
    }

    const checkPassword = await bcrypt.compare(password, account.password);
    if (!checkPassword) {
      return res.status(401).send('Incorrect password');
    }

    const checkOrganizer = await CEventModel.findOne({ profile: profileID });
    if (checkOrganizer) {
      return res.status(400).send('Cannot delete profile because it is associated with an event');
    }

    await CEventModel.updateMany(
      { follows: profileID },
      { $pull: { follows: profileID } }
    );


    await InteractionModel.updateMany(
      { profileIDs: profileID },
      { $pull: { profileIDs: profileID } }
    );
    await InteractionModel.updateMany(
      { "comments.profileID": profileID },
      { $pull: { comments: { profileID: profileID } } }
    );
    
    const orders = await OrderTicketModel.find({ profileID: profileID });
    for (const order of orders) {
      await CEventModel.findByIdAndUpdate(order.eventID, {
        $inc: { ticketavailable: order.ticketorder }
      });
    }
    await OrderTicketModel.deleteMany({ profileID: profileID });   

    await AccountModel.findByIdAndDelete(profileInfo.idaccount);
    await ProfileModel.findByIdAndDelete(profileID);

    res.status(200).send('Account successfully deleted');
    
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).send('Internal Server Error');
  }
};



const AccountController = {
  PostSignin: PostSignin,
  PostSignup: PostSignup,
  PostForget_Pass: PostForget_Pass,
  DeleteAccount: DeleteAccount
};

export default AccountController;