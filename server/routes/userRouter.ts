import express, { Response, Request, NextFunction } from 'express';
const router = express.Router();
import { userController } from '../controllers/userController';

router.post(
  '/signup',
  userController.createUser,
  (req: Request, res: Response) => res.status(201).json(res.locals.newUser)
);

export default router;