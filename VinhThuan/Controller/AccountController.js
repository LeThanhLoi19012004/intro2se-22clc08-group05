import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import AccountModel from "../Models/AccountModel.js"
import ProfileModel from '../Models/ProfileModel.js';
import crypto from 'crypto';
import sendMail from "../Email/SendEmail.js"

const __dirname = dirname(fileURLToPath(import.meta.url));

const algorithm = 'aes-256-cbc';

const encrypt = (text) => {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return {
    encryptedData: encrypted,
    key: key.toString('hex'),
    iv: iv.toString('hex')
  }
}

const decrypt = (encryptedData, keyHex, ivHex) => {
  const key = Buffer.from(keyHex, 'hex');
  const iv = Buffer.from(ivHex, 'hex');
  let decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

const PostSignin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const account = await AccountModel.findOne({ username: username }).exec();
    // if (account.confirmed === false) {
    //   console.log("Please confirm your email first");
    //   res.sendFile(path.join(__dirname, '../public', 'index.html'));
    // }
    if (account) {
      const isMatch = password === decrypt(account.password, account.key, account.iv);
      if (isMatch) {
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
    const { encryptedData, key, iv } = encrypt(password);
    const newAccount = await AccountModel.create({
      username,
      password: encryptedData,
      key,
      iv,
      email,
      //isVerified: false,
      //token: crypto.randomBytes(16).toString('hex'),
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
      const password = decrypt(findinfor.password, findinfor.key, findinfor.iv);
      await sendMail(password, findinfor.email);
      const html = await ejs.renderFile(path.join(__dirname, '../forgot-password.ejs'), { user: findinfor, resetLink: '#' });
      res.send(html);
      //res.sendFile(path.join(__dirname, '../public', 'index.html'));
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