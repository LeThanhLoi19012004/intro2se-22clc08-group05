import * as dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';
import net from 'net';

// Tạo một transporter duy nhất
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Gửi email khôi phục mật khẩu
const sendMail = async (password, email) => {
  try {
    let info = await transporter.sendMail({
      from: 'Suki - The Ultimate Event Creation and Promotion Hub',
      to: email,
      subject: "FORGOT PASSWORD",
      text: `Your password is: ${password}`,
      html: `<b>Your password is: ${password}</b>`,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending mail:", error);
  }
};

// Gửi email xác nhận
const sendVerificationEmail = async (emailToken, email, req) => {
  try {
    const url = `${req.protocol}://${req.get('host')}/verify-email/${emailToken}`;
    console.log(url);
    let info = await transporter.sendMail({
      from: 'Suki - The Ultimate Event Creation and Promotion Hub',
      to: email,
      subject: "VERIFY EMAIL",
      text: "Please verify your email by clicking the link below",
      html: `<a href='${url}'>Click here to verify your email</a>`,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

// Kiểm tra kết nối SMTP
const checkSMTPConnection = (host, port) => {
  return new Promise((resolve, reject) => {
    const socket = net.createConnection(port, host, () => {
      console.log(`Connected to ${host}:${port}`);
      socket.end();
      resolve(true);
    });

    socket.on('error', (err) => {
      console.error(`Connection error: ${err.message}`);
      reject(false);
    });
  });
};

// Ví dụ kiểm tra kết nối SMTP
checkSMTPConnection('smtp.gmail.com', 587)
  .then((result) => {
    if (result) {
      console.log('SMTP connection successful');
    }
  })
  .catch((error) => {
    console.error('SMTP connection failed');
  });

const Email = {
  sendMail,
  sendVerificationEmail,
};

export default Email;