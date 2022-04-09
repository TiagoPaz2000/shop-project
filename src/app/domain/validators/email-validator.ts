export interface IEmailValidator {
  valid: (email: string) => boolean;
}

export class EmailValidator implements IEmailValidator {
  valid(email: string) {
    const rgx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!rgx.test(email)) return false;

    return true;
  }
}
