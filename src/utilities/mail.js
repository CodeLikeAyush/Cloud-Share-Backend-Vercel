require("dotenv").config();
const nodemailer = require("nodemailer");

const send_mail = async function ({ receiver_email, html, subject }) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.in",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mail_options = {
      from: process.env.EMAIL,
      to: receiver_email,
      subject: subject,
      html: html,
    };

    const res = await transporter.sendMail(mail_options);
    console.log(res);
    return res;
  } catch (error) {
    console.log("here");
    console.log(error);
    return new Error("something went wrong in sending email");
  }
};

module.exports = send_mail;
