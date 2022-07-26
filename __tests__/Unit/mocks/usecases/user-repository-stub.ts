import { IUserRepository } from "../../../../src/app/data/protocols";
import User from "../../../../src/app/domain/entities/user/user";

const makeUserRepository = (): IUserRepository => {
  class UserRepositoryStub implements IUserRepository {
    async create(data: Omit<User, 'id'>): Promise<User> {
      return new Promise(resolve => resolve({
        id: 1,
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid_email',
        password: 'valid_password',
      }));
    }

    async findOneByEmail(email: User['email']): Promise<null | User> {
      return null;
    }
  }

  return new UserRepositoryStub();
};

export default makeUserRepository;