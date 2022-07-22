import { Response, Router, Request } from 'express';
import { signUpFactory } from '../factorys/user-factory';

const userRouter = Router();

userRouter.post('/register', async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, apiKey } = req.body;
  const { body, statusCode } = await signUpFactory().handle({ firstName, lastName, email, password, apiKey });

  res.status(statusCode).json({ response: body });
});

export default userRouter;