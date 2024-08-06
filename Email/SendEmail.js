import * as dotenv from 'dotenv'; //add
import nodemailer from 'nodemailer'; //add
dotenv.config(); //add

//add sendmail
const sendMail = async(email) =>{

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
   
    auth: {
      user: "khavinhthuan114@gmail.com",
      pass: "wovfxklrkelbwyyt",
    },
  });
  let info = await transporter.sendMail({
    from: 'KhaVinhThuan', 
    to: email, 
    subject: "Hello ✔", 
    text: "Hello world?",
    html: "<b>Hello world?</b>", 
  });
};

export default sendMail;