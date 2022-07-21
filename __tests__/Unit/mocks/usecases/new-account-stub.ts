import User from "../../../../src/app/domain/entities/user/user";

const makeNewAccount = (): any => {
  class NewAccountStub {
    async create(userData: Omit<User, 'id'>): Promise<string> {
      return 'valid_token';
    }
  }

  return new NewAccountStub();
};

export default makeNewAccount;