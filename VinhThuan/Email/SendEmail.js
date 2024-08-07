import * as dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';
import net from 'net';

// sendMail function
const sendMail = async (password, email) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: 'Suki - The Ultimate Event Creation and Promotion Hub', // sender address
    to: email, // list of receivers
    subject: "FORGOT PASSWORD", // Subject line
    text: "Your password is: " + password, // plain text body
    html: "<b>Your password is: " + password + "</b>", // html body
  });
  console.log("Message sent: %s", info.messageId);
};

const send = async (emailToken, email) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: 'Suki - The Ultimate Event Creation and Promotion Hub', // sender address
    to: email, // list of receivers
    subject: "VERIFY EMAIL", // Subject line
    text: "Please verify your email by clicking the link below", // plain text body
    html: "<a href='http://localhost:3000/verify-email/" + emailToken + "'>Click here to verify your email</a>", // html
  });
  console.log("Message sent: %s", info.messageId);
};


// Function to check SMTP connection
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

// Example of using checkSMTPConnection
checkSMTPConnection('smtp.ethereal.email', 587)
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
  send,
};

export default Email;