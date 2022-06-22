import User from '../../domain/entities/user/user';
import { AppDataSource } from '../../infra/typeorm/data-source';
import UserEntity from '../../infra/typeorm/entity/User';

export interface IUserRepository {
  create(data: Omit<User, 'id'>): Promise<User>;
  findOne(email: User['email']): Promise<null | User>;
}

export class UserRepository implements IUserRepository {
  private user;

  constructor() {
    this.user = AppDataSource.getRepository(UserEntity);
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    const newUser = await this.user.save({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    });
    return newUser;
  }

  async findOne(email: User['email']): Promise<null | User> {
    const user = await this.user.findOne({ where: { email } });

    return user;
  }
}