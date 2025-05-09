import nodemailer from "nodemailer"

export async function sendOTP(email: string, otp: string) {
  const message = `Your OTP is ${otp}. Do not share it with anyone. It will be valid for 5 minutes. Please do not share it with anyone.`;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USERNAME,
      to: email, // Replace with your desired recipient
      subject: `OTP verification for Artlink`,
      text: message,
    //   replyTo: email,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}