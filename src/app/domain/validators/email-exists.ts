import User from '../entities/user/user';
import { IUserRepository } from '../../data/protocols';
import { IEmailExists } from '../protocols';
import { badRequest } from '../helpers';

export default class EmailExists implements IEmailExists {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async valid(email: User['email']): Promise<void | User | null> {
    const user = await this.userRepository.findOneByEmail(email);
    if (user) {
      throw badRequest({ status: 400, error: new Error('email already used') });
    }

    return user;
  }
}