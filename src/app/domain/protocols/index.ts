import User from '../entities/user/user';

export interface IUserValidator {
  valid(data: Omit<User, 'id'>): IError
}

export interface IEmailExists {
  valid(email: User['email']): Promise<IError>
}

export interface INewAccount {
  create(data: Omit<User, 'id'>): Promise<string>
}

export interface IUserRepository {
  create(data: Omit<User, 'id'>): Promise<User>
}

export interface IToken {
  token: string
}

export interface ITokenGenerator {
  create(userId: User['id']): IToken
}

export interface IError {
  error?: string
  status?: number
}