import "dotenv/config";
import env from "env-var";

export class EnvsPlugin {
  static getPort(): number {
    return env.get("PORT").required().asPortNumber();
  }

  static getBrevoApiKey(): string {
    return env.get("BREVO_API_KEY").required().asString();
  }

  static getBrevoSenderEmail(): string {
    return env.get("BREVO_SENDER_EMAIL").required().asEmailString();
  }

  static getBrevoSenderName(): string {
    return env.get("BREVO_SENDER_NAME").required().asString();
  }

  // Nodemailer (SMTP)
  static getSmtpHost(): string {
    return env.get("SMTP_HOST").required().asString();
  }

  static getSmtpPort(): number {
    return env.get("SMTP_PORT").required().asPortNumber();
  }

  static getSmtpSecure(): boolean {
    return env.get("SMTP_SECURE").default("false").asBool();
  }

  static getSmtpUser(): string {
    return env.get("SMTP_USER").required().asString();
  }

  static getSmtpPass(): string {
    return env.get("SMTP_PASS").required().asString();
  }

  // Resend
  static getResendApiKey(): string {
    return env.get("RESEND_API_KEY").required().asString();
  }

  static getResendSenderEmail(): string {
    return env.get("RESEND_SENDER_EMAIL").required().asEmailString();
  }

  static getResendSenderName(): string {
    return env.get("RESEND_SENDER_NAME").required().asString();
  }

  static getNodeEnv(): string {
    return env.get("NODE_ENV").required().asString();
  }
}
