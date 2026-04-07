import { BrevoClient } from "@getbrevo/brevo";
import type {
  MailerService,
  SendEmailOptions,
  SendEmailResult,
} from "../../domain/interfaces";
import { NocError } from "../../domain/errors";

export class BrevoMailerAdapter implements MailerService {
  private readonly client: BrevoClient;

  constructor(
    apiKey: string,
    private readonly sender: { email: string; name: string },
  ) {
    this.client = new BrevoClient({ apiKey });
  }

  async sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
    const result = await this.client.transactionalEmails.sendTransacEmail({
      sender: this.sender,
      to: options.to,
      subject: options.subject,
      htmlContent: options.htmlContent,
      textContent: options.textContent,
      attachment: options.attachments?.map((a) => ({
        name: a.filename,
        content: a.content,
      })),
      templateId: options.templateId,
      params: options.params,
    });

    if (!result.messageId) {
      throw NocError.network("Brevo did not return a messageId");
    }

    return { messageId: result.messageId };
  }
}
