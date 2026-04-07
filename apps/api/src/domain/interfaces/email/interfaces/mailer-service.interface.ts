import type { SendEmailOptions, SendEmailResult } from "../types/mailer.type";

export interface MailerService {
  sendEmail(options: SendEmailOptions): Promise<SendEmailResult>;
}
