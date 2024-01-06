import nodemailer from 'nodemailer';

export const sendMail = async (resetToken, email) => {
  // Create a Nodemailer transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: user.email,
    subject: 'Password Reset',
    text: `Please click the following link to reset your password: ${process.env.CLIENT_URL}/reset-password/${resetToken}`,
  }

  // Send mail with defined transport object
  try {
    await transporter.sendEmail(mailOptions)
  } catch (error) {
    console.error('Failed to send email: ', error);
    throw error;
  }
}