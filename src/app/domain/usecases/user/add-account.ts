import User from '../../entities/user/user';
import { INewAccount } from '../../protocols';

export default class AddAccount implements INewAccount {
  constructor(private userRepository: any, private tokenGenerator: any) {
    this.userRepository = userRepository;
    this.tokenGenerator = tokenGenerator;
  }

  async create(data: Omit<User, 'id'>): Promise<string> {
    const newUser = await this.userRepository(data);
    return this.tokenGenerator.create();
  }
}