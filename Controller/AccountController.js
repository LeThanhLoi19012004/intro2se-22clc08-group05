import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import AccountModel from "../Models/AccountModel.js"
import ProfileModel from '../Models/ProfileModel.js';
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

const AccountController = {
  PostSignin: PostSignin,
  PostSignup: PostSignup,
  PostForget_Pass: PostForget_Pass,
};

export default AccountController;