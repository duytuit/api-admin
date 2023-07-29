import { Injectable } from '@nestjs/common';
import * as mailgun from 'mailgun-js';
import * as nodemailer from 'nodemailer';
export const mailgunConfig = {
  apiKey: '4ed674f6a2f06c2b748fda829668180d-262b213e-a8c5de4b',
  domain:
    'https://api.mailgun.net/v3/sandboxbf6d259ba5e8481f8edbd1c7d1b05733.mailgun.org',

  // smtpServer: 'sandbox.smtp.mailtrap.io',
  // smtpPort: 587,
  // smtpUsername: '6eafabcc26eedb',
  // smtpPassword: '2fc3d2f6a30663',
  // smtpServer: 'smtp.mailgun.org',
  // smtpPort: 587,
  // smtpUsername:
  //   'postmaster@sandboxbf6d259ba5e8481f8edbd1c7d1b05733.mailgun.org',
  // smtpPassword: 'dda0e2a7894723407a46972a5db56194-262b213e-da5adac0',
  smtpServer: 'smtp.gmail.com',
  smtpPort: 587,
  smtpUsername: 'rttretret@gmail.com',
  smtpPassword: 'pufdgiuwfdnvneaq',
  // smtpServer: 'smtp.gmail.com',
  // smtpPort: 587,
  // smtpUsername: 'duytu89@gmail.com',
  // smtpPassword: 'pyaouvqjsdatpkwg',
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

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    html: string,
  ): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'visavisa.net',
      to,
      subject,
      text,
      html,
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
