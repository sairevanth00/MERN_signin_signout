import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: { user: process.env.EMAIL_USER || 'sairevanth7373@gmail.com', pass: process.env.EMAIL_PASS || 'xime jsuu polw ftkh' },
});

export default (to, subject, text) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER || 'sairevanth7373@gmail.com',
    to,
    subject,
    text,
  });
};
