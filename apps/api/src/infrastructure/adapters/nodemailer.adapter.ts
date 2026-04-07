import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import type {
  MailerService,
  SendEmailOptions,
  SendEmailResult,
} from "../../domain/interfaces";
import { NocError } from "../../domain/errors";

interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export class NodemailerAdapter implements MailerService {
  private readonly transporter: Transporter;

  constructor(
    smtpConfig: SmtpConfig,
    private readonly sender: { email: string; name: string },
  ) {
    this.transporter = nodemailer.createTransport(smtpConfig);
  }

  async sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
    const info = await this.transporter.sendMail({
      from: `${this.sender.name} <${this.sender.email}>`,
      to: options.to.map((r) => (r.name ? `${r.name} <${r.email}>` : r.email)),
      subject: options.subject,
      html: options.htmlContent,
      text: options.textContent,
      attachments: options.attachments?.map((a) => ({
        filename: a.filename,
        content: Buffer.from(a.content, "base64"),
        contentType: a.contentType,
      })),
    });

    if (!info.messageId) {
      throw NocError.network("SMTP did not return a messageId");
    }

    return { messageId: info.messageId };
  }
}
