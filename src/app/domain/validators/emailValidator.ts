export interface IEmailValidator {
  valid: (email: string) => boolean;
}