import User from "../../../../src/app/domain/entities/user/user";
import { IUserValidator } from "../../../../src/app/domain/protocols";

const makeUserValidator = (): IUserValidator => {
  class UserValidatorStub implements IUserValidator {
    valid({ firstName, lastName, email, password }: Omit<User, 'id'>): void {
      return undefined;
    }
  }

  return new UserValidatorStub();
};

export default makeUserValidator;