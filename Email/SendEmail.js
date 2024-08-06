import * as dotenv from 'dotenv'; //add
import nodemailer from 'nodemailer'; //add
dotenv.config(); //add

//add sendmail
const sendMail = async(email) =>{
  //console.log(process.env.USERNAME);
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
   
    auth: {
      user: "khavinhthuan114@gmail.com",
      pass: "wovfxklrkelbwyyt",
    },
  });
  let info = await transporter.sendMail({
    from: 'KhaVinhThuan', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
};

export default sendMail;