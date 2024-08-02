import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import AccountModel from "../Models/AccountModel.js"
import sendMail from "../Email/SendEmail.js"
const __dirname = dirname(fileURLToPath(import.meta.url));

const PostSignin = async (req, res) => {
  const { username, password , remember} = req.body;
  try {
    const account = await AccountModel.findOne({ username: username, password: password }).exec();

    if (account) {
      console.log("right password: " + account.username);
      res.json({ success: true, username: account.username, userID: account._id });
    } else {
      console.log("wrong email or password");
      res.json({ success: false, message: "Wrong email or password" });
    }
  } catch (err) {
    console.error("Error finding user:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function PostSignup(req, res) {
  const { username, password, email } = req.body;

  try {
    // Kiểm tra xem email đã tồn tại chưa
    const existingEmail = await AccountModel.findOne({ email: email }).exec();
    if (existingEmail) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    // Kiểm tra xem username đã tồn tại chưa
    const existingUsername = await AccountModel.findOne({ username: username }).exec();
    if (existingUsername) {
      return res.status(400).json({ success: false, message: 'Username already in use' });
    }

    // Nếu không có tài liệu trùng lặp, tạo tài liệu mới
    await AccountModel.create({ username, password, email });

    res.json({ success: true, message: 'Sign up successfully' });
    console.log('Sign up Successfully!!!');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ success: false, message: 'An error occurred during signup' });
  }
}


async function PostForget_Pass(req, res) {
  const { email } = req.body;
  try {
    const findinfor = await AccountModel.findOne({ email: email }).exec();
    console.log(findinfor)
    if (!findinfor) {
      console.log('No user with that email');
      return res.status(400).json({success: false,message: 'No user with that email'});
    } else {
      console.log('Already send email')
      res.json({success: true,message: 'Already send email'});
      await sendMail(findinfor.email);
    }
  } catch (err) {
    console.error("Error finding user:", err);
    return res.status(500).json({success: false,message: "Internal Server Error"});
  }
}

const AccountController = {
  PostSignin: PostSignin,
  PostSignup: PostSignup,
  PostForget_Pass: PostForget_Pass,
};

export default AccountController;