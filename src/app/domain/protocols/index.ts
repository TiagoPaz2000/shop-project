import User from '../entities/user/user';

export interface IUserValidator {
  valid(data: Omit<User, 'id'>): IError
}

export interface IEmailExists {
  valid(email: User['email']): Promise<IError>
}

export interface IError {
  error?: string
  status?: number
}