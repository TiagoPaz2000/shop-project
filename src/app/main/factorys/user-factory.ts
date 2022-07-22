import UserValidator from '../../domain/usecases/user/user-validator';
import { SignUpController } from '../../presentation/controllers/signup-controller';
import { EmailValidator } from '../../domain/validators/email-validator';
import AddAccount from '../../domain/usecases/user/add-account';
import { UserRepository } from '../../data/usecases/user-repository';
import EmailExists from '../../domain/validators/email-exists';
import TokenGenerator from '../../domain/usecases/token/token-generator';
import TokenAdapter from '../../infra/generate-token/token-adapter';
// import AppDataSource from '../../infra/typeorm/data-source';
import EncrypterAdapter from '../../infra/encrypter/encrypter-adapter';
import PasswordEncrypter from '../../domain/usecases/user/password-encrypter';
import ApiKeyDecorator from '../../presentation/decorators/api-key-decorator';
import 'dotenv/config';

const { API_KEY } = process.env;

export const signUpFactory = () => {
  const encrypterAdapter = new EncrypterAdapter();
  const passwordEncrypter = new PasswordEncrypter(encrypterAdapter);
  const emailValidator = new EmailValidator();
  const userValidator = new UserValidator(emailValidator);
  const userRepository = new UserRepository();
  const tokenAdapter = new TokenAdapter();
  const tokenGenerator = new TokenGenerator(tokenAdapter);
  const newAccount = new AddAccount(userRepository, tokenGenerator);
  const emailExists = new EmailExists(userRepository);
  const signUpController = new SignUpController(userValidator, emailExists, newAccount, passwordEncrypter);
  const apiKeyDecorator = new ApiKeyDecorator(signUpController, API_KEY);

  return apiKeyDecorator;
};