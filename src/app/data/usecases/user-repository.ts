import User from '../../domain/entities/user/user';
import UserEntity from '../../infra/typeorm/entity/User';

export interface IUserRepository {
  create(data: Omit<User, 'id'>): Promise<User>
}

export class UserRepository implements IUserRepository {
  async create(data: Omit<User, 'id'>): Promise<User> {
    const user = new UserEntity();
    user.email = data.email;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.password = data.password;
    const newUser = await user.save();
    return newUser;
  }
}