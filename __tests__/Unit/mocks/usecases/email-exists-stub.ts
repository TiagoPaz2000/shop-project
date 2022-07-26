import User from "../../../../src/app/domain/entities/user/user";
import { IEmailExists } from "../../../../src/app/domain/protocols";

const makeEmailExists = (): IEmailExists => {
  class EmailExistsStub implements IEmailExists {
    async valid(email: User['email']): Promise<void | User | null> {
      return undefined;
    }
  }

  return new EmailExistsStub();
};

export default makeEmailExists;