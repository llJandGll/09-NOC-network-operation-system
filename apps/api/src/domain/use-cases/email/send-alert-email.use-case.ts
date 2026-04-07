import type {
  EmailContact,
  MailerService,
  SendEmailResult,
} from "../../interfaces";

interface SendAlertEmailDto {
  to: EmailContact[];
  subject: string;
  htmlContent: string;
}

export interface SendAlertEmailUseCase {
  execute(dto: SendAlertEmailDto): Promise<SendEmailResult>;
}

export class SendAlertEmailUseCaseImpl implements SendAlertEmailUseCase {
  constructor(private readonly mailerService: MailerService) {}

  execute(dto: SendAlertEmailDto): Promise<SendEmailResult> {
    return this.mailerService.sendEmail({
      to: dto.to,
      subject: dto.subject,
      htmlContent: dto.htmlContent,
    });
  }
}
