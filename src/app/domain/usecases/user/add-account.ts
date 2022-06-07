import User from '../../entities/user/user';
import { INewAccount, ITokenGenerator } from '../../protocols';
import { IUserRepository } from '../../../data/usecases/user-repository';

export default class AddAccount implements INewAccount {
  constructor(private userRepository: IUserRepository, private tokenGenerator: ITokenGenerator) {
    this.userRepository = userRepository;
    this.tokenGenerator = tokenGenerator;
  }

  async create(data: Omit<User, 'id'>): Promise<string> {
    const newUser = await this.userRepository.create(data);
    return this.tokenGenerator.create(newUser.id).token;
  }
}