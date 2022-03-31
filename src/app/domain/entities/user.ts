interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default class User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor({
    firstName,
    lastName,
    email,
    password,
  }: IUser){
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}