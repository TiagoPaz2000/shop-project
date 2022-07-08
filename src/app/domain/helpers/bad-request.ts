import { IError } from '../protocols';

const badRequest = ({ error, status }: IError) => ({ error, status });

export default badRequest;