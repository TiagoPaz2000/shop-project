import User from '../../domain/entities/user/user';
import UserEntity from '../../infra/typeorm/entity/User';

export interface IUserRepository {
  create(data: Omit<User, 'id'>): Promise<User>;
  findOne(email: User['email']): Promise<null | User>;
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

  async findOne(email: User['email']): Promise<null | User> {
    const user = await UserEntity.findOneBy({ email });

    return user;
  }
}