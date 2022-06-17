import User from '../entities/user/user';
import { IUserRepository } from '../../data/usecases/user-repository';
import { IEmailExists, IError } from '../protocols';

export default class EmailExists implements IEmailExists {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async valid(email: User['email']): Promise<IError | undefined> {
    const exist = await this.userRepository.findOne(email);
    if (exist) {
      return ({ status: 400, error: 'email already used' });
    }
  }
}