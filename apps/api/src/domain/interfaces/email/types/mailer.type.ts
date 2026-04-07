export type EmailContact = {
  email: string;
  name?: string;
};

export type Attachment = {
  filename: string;
  content: string; // base64 encoded
  contentType?: string;
};

export type SendEmailOptions = {
  to: EmailContact[];
  subject: string;
  htmlContent?: string;
  textContent?: string;
  attachments?: Attachment[];
  templateId?: number;
  params?: Record<string, string>;
};

export type SendEmailResult = {
  messageId: string;
};
