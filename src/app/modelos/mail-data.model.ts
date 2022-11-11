export class MailData {
  to?: string;
  subject?: string;
  text?: string;

  public constructor(init?: Partial<MailData>) {
    Object.assign(this, init);
  }
}
