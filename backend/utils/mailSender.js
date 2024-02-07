const { exist } = require("joi");
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.mailSender = async (email, subject, body) => {
  try {
    let transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = transporter.sendMail({
      from: '"Blog App " blogapp24@gmail.com',
      to: `${email}`,
      subject: `${subject}`,
      html: `${body}`,
    });
    return info;
  } catch (error) {
    console.log(error);
    exist(1);
  }
};
