import { Response, Router, Request } from 'express';
import { signUpFactory } from '../factorys/user-factory';

const userRouter = Router();

userRouter.post('/register', async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  const { body } = await signUpFactory().handle({ firstName, lastName, email, password });

  res.status(201).json({ body: { user: body } });
});

export default userRouter;