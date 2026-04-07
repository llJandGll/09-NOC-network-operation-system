import { Resend } from "resend";
import type {
  MailerService,
  SendEmailOptions,
  SendEmailResult,
} from "../../domain/interfaces";
import { NocError } from "../../domain/errors";

export class ResendMailerAdapter implements MailerService {
  private readonly client: Resend;

  constructor(
    apiKey: string,
    private readonly sender: { email: string; name: string },
  ) {
    this.client = new Resend(apiKey);
  }

  async sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
    const { data, error } = await this.client.emails.send({
      from: `${this.sender.name} <${this.sender.email}>`,
      to: options.to.map((r) => r.email),
      subject: options.subject,
      html: options.htmlContent ?? options.textContent ?? "",
      attachments: options.attachments?.map((a) => ({
        filename: a.filename,
        content: Buffer.from(a.content, "base64"),
        contentType: a.contentType,
      })),
    });

    if (error || !data?.id) {
      throw NocError.network(error?.message ?? "Resend did not return an id");
    }

    return { messageId: data.id };
  }
}
