import 'reflect-metadata';
import { DataSource, Repository } from 'typeorm';
import User from '../../domain/entities/user/user';
// import { AppDataSource } from '../../infra/typeorm/data-source';
import UserEntity from '../../infra/typeorm/entity/User';

export interface IUserRepository {
  create(data: Omit<User, 'id'>): Promise<User>;
  findOneByEmail(email: User['email']): Promise<null | User>;
}

export class UserRepository implements IUserRepository {
  private user: Repository<UserEntity>;

  constructor(dataSource: DataSource) {
    this.user = dataSource.getRepository(UserEntity);
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

  async findOneByEmail(email: User['email']): Promise<null | User> {
    const user = await this.user.findOne({ where: { email } });

    return user;
  }
}