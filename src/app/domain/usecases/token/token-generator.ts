import User from '../../entities/user/user';
import { ITokenGenerator, IToken, ITokenAdapter } from '../../protocols';

export default class TokenGenerator implements ITokenGenerator {
  constructor(private tokenAdapter: ITokenAdapter) {
    this.tokenAdapter = tokenAdapter;
  }

  create(userId: User['id']): IToken {
    const config = { algoritm: 'HS256', expireData: '7d' };
    const token = this.tokenAdapter
      .generate(userId, config.algoritm, config.expireData);
    return ({ token });
  }
}