import { IError } from '../../domain/protocols';

const badRequest = ({ error, status }: IError) => ({ error, status });

export default badRequest;