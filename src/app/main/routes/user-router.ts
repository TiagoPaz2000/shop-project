import { Response, Router, Request } from 'express';
import { signUpFactory } from '../factorys/user-factory';

const userRouter = Router();

userRouter.post('/register', async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  const { body, statusCode } = await signUpFactory().handle({ firstName, lastName, email, password });

  res.status(statusCode).json({ response: body });
});

export default userRouter;