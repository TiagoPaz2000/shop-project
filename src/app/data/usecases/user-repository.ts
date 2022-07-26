import User from '../../domain/entities/user/user';
import { IUserRepository } from '../protocols/index';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    const newUser = await this.prisma.user.create({ data: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    }});
    return newUser;
  }

  async findOneByEmail(email: User['email']): Promise<null | User> {
    const user = await this.prisma.user.findFirst({ where: { email } });

    return user;
  }
}