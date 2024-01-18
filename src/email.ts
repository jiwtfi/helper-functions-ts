import { SendMailOptions } from 'nodemailer';
import MailComposer from 'nodemailer/lib/mail-composer';

export const createEmailContent = (options: SendMailOptions) => (
  new Promise<string>((resolve, reject) => {
    new MailComposer(options).compile().build((err, message) => {
      if (err) return reject(err);
      resolve(message.toString('base64'));
    });
  })
);