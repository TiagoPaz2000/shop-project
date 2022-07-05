
import { IHandleError } from '../../domain/protocols';

const handleError = (error: IHandleError) => {
  return ({
    body: { error: error.error.message },
    statusCode: error.status || 500,
  });
};

export default handleError;