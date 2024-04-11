import { BaseError } from '../utils/errors';
import nodemailer from 'nodemailer';
interface IEmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendMail = async function ({
  to,
  subject,
  text = '',
  html = '',
}: IEmailOptions): Promise<void> {
  try {
    const mailOptions = {
      from: process.env.EMAIL_SENDER,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
  } catch (error: any) {
    throw new BaseError({
      code: 422,
      message: 'Email provider failed',
    });
  }
};
