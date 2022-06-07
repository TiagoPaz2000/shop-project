import User from '../../domain/entities/user/user';

export interface IUserRepository {
  create(data: Omit<User, 'id'>): Promise<User>
}