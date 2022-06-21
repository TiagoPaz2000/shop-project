import User from '../../entities/user/user';
import { ITokenGenerator, IToken, ITokenAdapter } from '../../protocols';

export default class TokenGenerator implements ITokenGenerator {
  constructor(private tokenAdapter: ITokenAdapter) {
    this.tokenAdapter = tokenAdapter;
  }

  create(userId: User['id']): IToken {
    const config = { expireData: '7d' };
    const token = this.tokenAdapter
      .generate(userId, config.expireData);
    return ({ token });
  }
}