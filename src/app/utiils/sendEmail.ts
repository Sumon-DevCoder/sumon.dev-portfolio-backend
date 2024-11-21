import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === "production",
    auth: {
      user: "mustafizurrahmansumon24@gmail.com",
      pass: "atnv xhaa tfdp sfpp",
    },
  });

  await transporter.sendMail({
    from: '"mustafizurrahmansumon24@gmail.com', // sender address
    to,
    subject: "Reset your password", // Subject line
    text: "Reset your password within 10mins!", // plain text body
    html,
  });
};
