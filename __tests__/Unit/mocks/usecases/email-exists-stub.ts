import User from "../../../../src/app/domain/entities/user/user";
import { IEmailExists } from "../../../../src/app/domain/protocols";

const makeEmailExists = (): IEmailExists => {
  class EmailExistsStub implements IEmailExists {
    async valid(email: User['email']): Promise<void> {
      return undefined;
    }
  }

  return new EmailExistsStub();
};

export default makeEmailExists;