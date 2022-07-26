import User from "../../../../src/app/domain/entities/user/user";
import { INewAccount } from "../../../../src/app/domain/protocols";

const makeNewAccount = (): INewAccount => {
  class NewAccountStub implements INewAccount {
    async create(userData: Omit<User, 'id'>): Promise<string> {
      return 'valid_token';
    }
  }

  return new NewAccountStub();
};

export default makeNewAccount;