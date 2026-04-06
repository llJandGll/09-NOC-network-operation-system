import "dotenv/config";
import env from "env-var";

export class EnvsPlugin {
  static getPort(): number {
    return env.get("PORT").required().asPortNumber();
  }

  static getMailerEmail(): string {
    return env.get("MAILER_EMAIL").required().asEmailString();
  }

  static getMailerPassword(): string {
    return env.get("MAILER_PASSWORD").required().asString();
  }

  static getMailerSecretKey(): string {
    return env.get("MAILER_SECRET_KEY").required().asString();
  }

  static getNodeEnv(): string {
    return env.get("NODE_ENV").required().asString();
  }
}
