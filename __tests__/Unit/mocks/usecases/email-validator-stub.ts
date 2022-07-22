import { IEmailValidatorAdapter } from "../../../../src/app/domain/protocols";

const makeEmailValidator = (): IEmailValidatorAdapter => {
  class EmailValidator implements IEmailValidatorAdapter {
    valid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidator;
}

export default makeEmailValidator;