import User from '../entities/user/user';

export interface IUserValidator {
  valid(data: Omit<User, 'id'>): void
}

export interface IEmailExists {
  valid(email: User['email']): Promise<void>
}

export interface INewAccount {
  create(data: Omit<User, 'id'>): Promise<string>
}

export interface IToken {
  token: string
}

export interface ITokenGenerator {
  create(userId: User['id']): IToken
}

export interface ITokenAdapter {
  generate(userId: User['id'],
    expireDate: string
  ): string
}

export interface IError {
  error: Error
  status?: number
}

export interface IHandleError {
  status: number | undefined
  error: Error
}

export interface IEmailValidator {
  valid(email: string): boolean;
}

export interface IPasswordEncrypter {
  encrypt(password: User['password']): Promise<User['password']>;
}

export interface IEmailValidatorAdapter {
  valid(email: string): void;
}
