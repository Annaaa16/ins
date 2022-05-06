import nodemailer from 'nodemailer';

const sendEmail = async (to: string, token: string, userId: string): Promise<string> => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  const info = await transporter.sendMail({
    from: 'Instagram 👻',
    to,
    subject: '💬 Change password 🚀',
    text: 'Hello my friend 👋',
    html: `<a href='http://localhost:3000/change-password?token=${token}&userId=${userId}'>Click here to change your password</a>`,
  });

  return nodemailer.getTestMessageUrl(info) as string;
};

export default sendEmail;
