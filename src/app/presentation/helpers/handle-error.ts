import { IHandleError } from '../../domain/protocols';

const handleError = (error: IHandleError) => {
  if (error.status) {
    return ({
      body: { error: error.error.message },
      statusCode: error.status,
    });
  }

  return ({
    body: { error: 'internal server error' },
    statusCode: 500,
  });
};

export default handleError;