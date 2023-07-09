import { Injectable } from '@nestjs/common';
import * as mailgun from 'mailgun-js';
import * as nodemailer from 'nodemailer';
export const mailgunConfig = {
  apiKey: 'a9aa11c718f223a2e5bde618cdfb354f-181449aa-24b62077',
  domain:
    'https://api.mailgun.net/v3/sandbox11a6332191b74f188ba25fb16b0a1586.mailgun.org',
  smtpServer: 'smtp.mailgun.org',
  smtpPort: 587,
  smtpUsername:
    'postmaster@sandboxf801c965198e4248b994c72feb817208.mailgun.org',
  smtpPassword: '71806dc344e471ad3f7ba2918935b7c5-6d8d428c-8f5c5e33',
};
@Injectable()
export class MailService {
  private mailgunClient: mailgun.Mailgun;
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: mailgunConfig.smtpServer,
      port: mailgunConfig.smtpPort,
      auth: {
        user: mailgunConfig.smtpUsername,
        pass: mailgunConfig.smtpPassword,
      },
    });
    // this.mailgunClient = mailgun({
    //   apiKey: mailgunConfig.apiKey,
    //   domain: mailgunConfig.domain,
    // });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'no-reply@example.com',
      to,
      subject,
      text,
    };

    return await this.transporter.sendMail(mailOptions);
  }
  async sendEmailApi(to: string, subject: string, text: string): Promise<void> {
    const data = {
      from: 'your-email@example.com',
      to,
      subject,
      text,
    };

    return await this.mailgunClient.messages().send(data);
  }
}
