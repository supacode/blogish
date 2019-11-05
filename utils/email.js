const nodemailer = require('nodemailer');

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: +process.env.EMAIL_PORT,
    auth: {
      username: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: `${process.env.INFO_EMAIL_SENDER_NAME} <${process.env.INFO_EMAIL_SENDER_ADDRESS}>`,
    to: options.email,
    subject: options.email,
    text: options.message
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
