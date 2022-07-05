import User from '../entities/user/user';
import { IUserRepository } from '../../data/usecases/user-repository';
import { IEmailExists } from '../protocols';
import { badRequest } from '../../presentation/helpers';

export default class EmailExists implements IEmailExists {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async valid(email: User['email']): Promise<void> {
    const exist = await this.userRepository.findOneByEmail(email);
    if (exist) {
      throw badRequest({ status: 400, error: new Error('email already used') });
    }
  }
}