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
    'postmaster@sandbox11a6332191b74f188ba25fb16b0a1586.mailgun.org',
  smtpPassword: 'a7df6fae84159d06cd56c2dee71c2613-181449aa-428ad8b4',
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
    this.mailgunClient = mailgun({
      apiKey: mailgunConfig.apiKey,
      domain: mailgunConfig.domain,
    });
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
