import User from '../../../entities/user/user';

export interface IUserValidator {
  valid(data: Omit<User, 'id'>): { error?: string, status?: number }
}

export interface IError {
  error?: string
  status?: number
}