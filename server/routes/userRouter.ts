import express, { Response, Request, NextFunction } from 'express';
const router = express.Router();
import { userController } from '../controllers/userController';

router.post(
  '/signup',
  userController.createUser,
  (req: Request, res: Response) => res.status(201).json(res.locals.newUser)
);

router.post(
  '/signin',
  userController.verifyUser,  
  (req: Request, res: Response) => res.status(200).json(res.locals.user)
);

export default router;