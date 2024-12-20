import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "810672001@smtp-brevo.com", // This is literally the string "apikey"
    pass: "5DRT0ZP7vKEqML3J"
  },
  tls: {
    rejectUnauthorized: false // Only for development
  }
});

export const sendEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: {
      name: 'Mohan Reddy Marriage Bureau',
      address: process.env.EMAIL_USER
    },
    to,
    subject,
    text,
    html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};